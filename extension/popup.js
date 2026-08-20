import { extractVisibleOffers } from "./extract.js";

const statusEl = document.getElementById("status");
const listEl = document.getElementById("list");
const importBtn = document.getElementById("import");
const rescanBtn = document.getElementById("rescan");

function setStatus(text) {
  statusEl.textContent = text;
}

function field(name, value, type = "text") {
  const input = document.createElement("input");
  input.name = name;
  input.type = type;
  input.value = value ?? "";
  if (type === "number") {
    input.min = "0.01";
    input.step = "0.01";
  }
  return input;
}

function renderItems(items) {
  listEl.replaceChildren();
  items.forEach((item, index) => {
    const card = document.createElement("label");
    card.className = "card";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.name = "pick";
    check.value = String(index);
    check.checked = index < 8;

    const fields = document.createElement("div");
    fields.className = "fields";
    fields.append(field("storeName", item.storeName), field("dishName", item.dishName), field("price", item.price, "number"));

    const cuisine = document.createElement("input");
    cuisine.type = "hidden";
    cuisine.name = "cuisine";
    cuisine.value = item.cuisine || "any";
    const spice = document.createElement("input");
    spice.type = "hidden";
    spice.name = "spice";
    spice.value = item.spice || "none";

    fields.append(cuisine, spice);
    card.append(check, fields);
    listEl.append(card);
  });
  importBtn.disabled = items.length === 0;
}

async function scan() {
  importBtn.disabled = true;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    setStatus("找不到当前标签页。");
    return;
  }

  const url = tab.url || "";
  if (/^(chrome|edge|about|chrome-extension):/i.test(url)) {
    setStatus("请先打开美团、饿了么等已经显示出店铺或菜单的网页，再点这个图标。");
    return;
  }

  try {
    const [injection] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractVisibleOffers,
    });
    const result = injection?.result;
    if (!result?.items?.length) {
      setStatus("这一页没有识别到带价格的店或菜。请滚到店铺列表或菜单已经显示的位置后再试。页面改版后也可能读不到。");
      renderItems([]);
      return;
    }
    setStatus(`看到 ${result.items.length} 条可见内容。勾选后写入本地常点，不会上传。`);
    renderItems(result.items);
  } catch {
    setStatus("当前页无法读取。扩展只能在你主动点击时查看这个标签页已经渲染的内容。");
    renderItems([]);
  }
}

function selectedOrders() {
  return [...listEl.querySelectorAll(".card")]
    .filter((card) => card.querySelector('input[name="pick"]').checked)
    .map((card) => ({
      storeName: card.querySelector('input[name="storeName"]').value.trim(),
      dishName: card.querySelector('input[name="dishName"]').value.trim(),
      price: Number(card.querySelector('input[name="price"]').value),
      cuisine: card.querySelector('input[name="cuisine"]').value,
      spice: card.querySelector('input[name="spice"]').value,
      people: 1,
      locationLabel: "扩展导入",
    }))
    .filter((item) => item.storeName && item.dishName && item.price > 0);
}

async function importSelected() {
  const orders = selectedOrders();
  if (!orders.length) {
    setStatus("请至少勾选一条，并填好店名、菜名和价格。");
    return;
  }

  const { pendingImports = [] } = await chrome.storage.local.get("pendingImports");
  await chrome.storage.local.set({ pendingImports: [...orders, ...pendingImports] });
  setStatus(`已记下 ${orders.length} 条。打开 http://localhost:3000 并进入「我的常点」，会自动写进这个浏览器。`);
  importBtn.disabled = true;
}

rescanBtn.addEventListener("click", scan);
importBtn.addEventListener("click", importSelected);
scan();
