const STORAGE_KEY = "whattoeat.order-history.v1";

function takeoutBudgetTier(price, people) {
  if (!price) return "mid";
  const perPerson = price / people;
  const lowMax = people >= 2 ? 40 : 30;
  const midMax = people >= 2 ? 80 : 60;
  if (perPerson <= lowMax) return "low";
  if (perPerson <= midMax) return "mid";
  return "high";
}

function normalize(input) {
  const people = Math.max(1, Math.min(5, Number(input.people) || 1));
  const parsedPrice = Number(input.price);
  const price = Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : null;
  return {
    id: `ext-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    storeName: String(input.storeName || "").trim().slice(0, 80),
    dishName: String(input.dishName || "").trim().slice(0, 120),
    cuisine: input.cuisine || "any",
    spice: input.spice || "none",
    budget: price ? takeoutBudgetTier(price, people) : "mid",
    people,
    price,
    locationLabel: String(input.locationLabel || "扩展导入").trim().slice(0, 40),
    timesOrdered: 1,
    lastOrderedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
}

function readHistory() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function mergePending(pending) {
  if (!Array.isArray(pending) || !pending.length) return 0;
  const items = readHistory();
  const seen = new Set(items.map((item) => `${item.storeName}::${item.dishName}`));
  let added = 0;
  for (const raw of pending) {
    const item = normalize(raw);
    if (!item.storeName || !item.dishName || !item.price) continue;
    const key = `${item.storeName}::${item.dishName}`;
    if (seen.has(key)) continue;
    items.unshift(item);
    seen.add(key);
    added += 1;
  }
  if (added) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return added;
}

async function flush() {
  const { pendingImports = [] } = await chrome.storage.local.get("pendingImports");
  const added = mergePending(pendingImports);
  if (!pendingImports.length) return;
  await chrome.storage.local.set({ pendingImports: [] });
  window.postMessage({ type: "whattoeat:history-imported", added }, "*");
}

flush();
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.pendingImports) flush();
});
