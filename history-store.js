(function exposeOrderHistory(global) {
  const STORAGE_KEY = "whattoeat.order-history.v1";

  function read() {
    try {
      const value = JSON.parse(global.localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function write(items) {
    global.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return items;
  }

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
      id: input.id || global.crypto?.randomUUID?.() || `order-${Date.now()}-${Math.random()}`,
      storeName: String(input.storeName || "").trim().slice(0, 80),
      dishName: String(input.dishName || "").trim().slice(0, 120),
      cuisine: input.cuisine || "any",
      spice: input.spice || "none",
      budget: price ? takeoutBudgetTier(price, people) : input.budget || "mid",
      people,
      price,
      locationLabel: String(input.locationLabel || "").trim().slice(0, 40),
      timesOrdered: Math.max(1, Number(input.timesOrdered) || 1),
      lastOrderedAt: input.lastOrderedAt || new Date().toISOString(),
      createdAt: input.createdAt || new Date().toISOString(),
    };
  }

  function add(input) {
    const item = normalize(input);
    if (!item.storeName || !item.dishName) {
      throw new Error("请填写店名和常点菜");
    }
    if (!item.price) {
      throw new Error("请填写订单总价");
    }
    const items = [item, ...read()];
    write(items);
    return item;
  }

  function remove(id) {
    return write(read().filter((item) => item.id !== id));
  }

  function clear() {
    write([]);
  }

  function typicalPerPerson() {
    const values = read()
      .filter((item) => item.price && item.people)
      .map((item) => item.price / item.people)
      .sort((a, b) => a - b);
    if (!values.length) return null;
    const middle = Math.floor((values.length - 1) / 2);
    if (values.length % 2) return values[middle];
    return (values[middle] + values[middle + 1]) / 2;
  }

  global.OrderHistory = { read, add, remove, clear, typicalPerPerson };
})(window);
