/** Self-contained: Chrome serializes this function into the active tab. */
export function extractVisibleOffers() {
  const href = location.href;
  const source = /meituan\.com|dianping\.com/i.test(href)
    ? "meituan"
    : /ele\.me|eleme/i.test(href)
      ? "eleme"
      : /jd\.com/i.test(href)
        ? "jd"
        : "web";

  function isVisible(el) {
    const box = el.getBoundingClientRect();
    if (box.width < 72 || box.height < 20) return false;
    if (box.bottom < 0 || box.top > innerHeight + 120) return false;
    const style = getComputedStyle(el);
    return style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) !== 0;
  }

  function guessCuisine(text) {
    if (/日料|寿司|刺身|拉面|寿喜|韩式|烤肉|泡菜|石锅/.test(text)) return "japanese_korean";
    if (/泰式|越南|冬阴功|咖喱|南洋|马来|新加坡|香茅/.test(text)) return "southeast_asian";
    if (/披萨|意面|牛排|汉堡|沙拉|西餐/.test(text)) return "western";
    if (/面|饭|火锅|麻辣|炒|川|粤|湘/.test(text)) return "chinese";
    return "any";
  }

  function guessSpice(text) {
    if (/变态辣|地狱辣/.test(text)) return "extreme";
    if (/特辣|中辣|麻辣|香辣|辣/.test(text) && !/微辣|不辣/.test(text)) return "hot";
    if (/微辣/.test(text)) return "mild";
    return "none";
  }

  function parseBlock(text) {
    const priceMatch = text.match(/人均\s*[¥￥]?\s*(\d+(?:\.\d+)?)|[¥￥]\s*(\d+(?:\.\d+)?)/);
    const price = priceMatch ? Number(priceMatch[1] || priceMatch[2]) : null;
    if (!price || !Number.isFinite(price) || price <= 0) return null;

    const cleaned = text
      .replace(/月售\s*\d+[+\万]?/g, " ")
      .replace(/评分\s*\d+(?:\.\d+)?/g, " ")
      .replace(/配送约?\s*\d+\s*分钟/g, " ")
      .replace(/起送\s*[¥￥]?\s*\d+/g, " ")
      .replace(/[¥￥]\s*\d+(?:\.\d+)?/g, " ")
      .replace(/人均\s*[¥￥]?\s*\d+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const parts = cleaned
      .split(/[|·•，,]/)
      .map((part) => part.trim())
      .filter((part) => part.length >= 2 && part.length <= 40 && !/分钟|起送|配送|评分|月售/.test(part));

    const storeName = (parts[0] || cleaned).slice(0, 80);
    if (storeName.length < 2) return null;

    const dishName =
      parts.find((part, index) => index > 0 && !/起|配|评/.test(part)) || "到店再选";

    return {
      storeName,
      dishName: dishName.slice(0, 120),
      price,
      people: 1,
      cuisine: guessCuisine(text),
      spice: guessSpice(text),
      source,
    };
  }

  const nodes = [...document.querySelectorAll("a, li, article, [role='listitem']")];
  const parsed = [];

  for (const el of nodes) {
    if (!isVisible(el)) continue;
    const text = (el.innerText || "").replace(/\s+/g, " ").trim();
    if (text.length < 8 || text.length > 240) continue;
    if (!/[¥￥]|人均/.test(text)) continue;
    const item = parseBlock(text);
    if (item) parsed.push({ ...item, _len: text.length });
  }

  parsed.sort((a, b) => a._len - b._len);

  const unique = [];
  const seen = new Set();
  for (const item of parsed) {
    const key = `${item.storeName}::${item.dishName}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
    if (unique.length >= 24) break;
  }

  const items = unique.map(({ _len, ...rest }) => rest);

  return {
    pageUrl: href,
    pageTitle: document.title || "",
    source,
    items,
  };
}
