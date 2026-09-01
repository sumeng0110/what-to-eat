const RECIPES = [
  {
    id: "tomato-egg",
    name: "番茄炒蛋",
    cuisine: "chinese",
    spice: "none",
    budget: "low",
    skill: "beginner",
    minutes: 15,
    why: "几乎不会失败，洗锅也快，一个人也值得做。",
    steps: ["鸡蛋打散加一点盐", "番茄切块，热锅放油先炒蛋盛出", "炒软番茄，回锅鸡蛋，调味出锅"],
  },
  {
    id: "soy-noodles",
    name: "葱油拌面",
    cuisine: "chinese",
    spice: "mild",
    budget: "low",
    skill: "beginner",
    minutes: 15,
    why: "比外卖还快，葱香能撑起一顿简单的晚饭。",
    steps: ["煮面，同时小火炸香葱花", "酱油、糖、葱油趁热浇上", "可加一颗荷包蛋"],
  },
  {
    id: "egg-fried-rice",
    name: "蛋炒饭",
    cuisine: "chinese",
    spice: "none",
    budget: "low",
    skill: "beginner",
    minutes: 15,
    why: "剩饭的最佳归宿，几分钟就能吃上。",
    steps: ["隔夜饭抓散", "蛋液炒至半熟再下饭", "生抽、葱花快速翻匀"],
  },
  {
    id: "mapo-tofu",
    name: "麻婆豆腐",
    cuisine: "chinese",
    spice: "hot",
    budget: "low",
    skill: "home",
    minutes: 25,
    why: "下饭、省钱，微辣到够辣都能收着调。",
    steps: ["豆腐焯水", "豆瓣酱炒香，加水淀粉勾芡", "豆腐轻轻推匀，撒花椒面"],
  },
  {
    id: "tomato-beef",
    name: "番茄牛腩",
    cuisine: "chinese",
    spice: "mild",
    budget: "high",
    skill: "home",
    minutes: 70,
    why: "适合 3–5 人慢慢吃，汤底可以拌面或泡饭。",
    steps: ["牛腩焯水", "番茄炒出沙，下牛腩小火炖软", "盐、糖调味，出锅前撒葱"],
  },
  {
    id: "steamed-fish",
    name: "清蒸鲈鱼",
    cuisine: "chinese",
    spice: "none",
    budget: "high",
    skill: "home",
    minutes: 30,
    why: "清淡但不寡淡，人多时很适合当主菜。",
    steps: ["鱼改刀，姜丝铺底", "大火蒸 8–10 分钟", "淋热油与蒸鱼豉油"],
  },
  {
    id: "kungpao",
    name: "宫保鸡丁",
    cuisine: "chinese",
    spice: "hot",
    budget: "mid",
    skill: "challenge",
    minutes: 35,
    why: "酸甜微麻，能练火候，也够撑场面。",
    steps: ["鸡丁腌制", "调碗芡", "爆香干辣椒花生，快速翻炒收汁"],
  },
  {
    id: "pasta",
    name: "蒜香橄榄油意面",
    cuisine: "western",
    spice: "mild",
    budget: "mid",
    skill: "beginner",
    minutes: 20,
    why: "西餐里最不吓人的一款，辣度全看辣椒放多少。",
    steps: ["意面煮至微硬", "橄榄油小火浸蒜与辣椒", "面汤一起乳化"],
  },
  {
    id: "sandwich",
    name: "酪梨鸡蛋三明治",
    cuisine: "western",
    spice: "none",
    budget: "mid",
    skill: "beginner",
    minutes: 15,
    why: "几乎不用开火，一个人吃刚刚好。",
    steps: ["吐司烤香", "酪梨压泥，荷包蛋或水煮蛋", "黑胡椒、柠檬汁"],
  },
  {
    id: "salad-bowl",
    name: "烤鸡蔬菜碗",
    cuisine: "western",
    spice: "none",
    budget: "mid",
    skill: "home",
    minutes: 30,
    why: "清爽、能按人数加配菜，不太像“凑合一顿”。",
    steps: ["鸡胸煎至熟", "时蔬焯或烤", "酸奶酱或油醋汁拌匀"],
  },
  {
    id: "risotto",
    name: "蘑菇烩饭",
    cuisine: "western",
    spice: "none",
    budget: "high",
    skill: "challenge",
    minutes: 50,
    why: "愿意花时间时很有仪式感，适合两三人慢慢吃。",
    steps: ["洋葱炒香，米粒挂油", "热高汤分次加入搅动", "出锅拌帕玛森与黄油"],
  },
  {
    id: "steak",
    name: "煎牛排配时蔬",
    cuisine: "western",
    spice: "none",
    budget: "high",
    skill: "home",
    minutes: 25,
    why: "步骤短，观感强，两个人过节或犒劳自己都合适。",
    steps: ["牛排室温回温、擦干", "热锅硬煎两面", "黄油迷迭香浇脂，静置再切"],
  },
  {
    id: "gyudon",
    name: "日式肥牛丼",
    cuisine: "japanese_korean",
    spice: "mild",
    budget: "mid",
    skill: "beginner",
    minutes: 20,
    why: "一锅收汁浇在饭上，日料里最像家常晚饭的那口。",
    steps: ["洋葱炒软", "肥牛片下锅，酱油、糖、味淋收汁", "浇在热饭上，可加半熟蛋"],
  },
  {
    id: "kimchi-fried-rice",
    name: "韩式泡菜炒饭",
    cuisine: "japanese_korean",
    spice: "hot",
    budget: "low",
    skill: "beginner",
    minutes: 15,
    why: "剩饭加泡菜就能出锅，辣度随泡菜自己调。",
    steps: ["泡菜切碎炒出红油", "下隔夜饭翻匀", "煎蛋盖顶，可加芝麻和海苔"],
  },
  {
    id: "miso-salmon",
    name: "味噌烤三文鱼",
    cuisine: "japanese_korean",
    spice: "none",
    budget: "high",
    skill: "home",
    minutes: 25,
    why: "步骤短、观感好，两个人也值得开一次烤箱或空气炸。",
    steps: ["味噌、味淋、糖调酱腌鱼", "烤箱或空气炸至表面上色", "配米饭和焯青菜"],
  },
  {
    id: "vietnamese-rolls",
    name: "越南春卷",
    cuisine: "southeast_asian",
    spice: "none",
    budget: "mid",
    skill: "beginner",
    minutes: 20,
    why: "几乎不用开火，清爽、能按人数加份。",
    steps: ["米纸浸软", "生菜、香草、虾或豆腐卷紧", "配鱼露花生酱或酸甜蘸料"],
  },
  {
    id: "tom-yum",
    name: "泰式冬阴功",
    cuisine: "southeast_asian",
    spice: "hot",
    budget: "mid",
    skill: "home",
    minutes: 30,
    why: "酸辣开胃，人多时一锅汤就能把饭桌撑起来。",
    steps: ["香茅、南姜、柠檬叶煮汤", "下虾和蘑菇", "鱼露、柠檬汁、辣椒调味"],
  },
  {
    id: "coconut-curry",
    name: "南洋咖喱鸡",
    cuisine: "southeast_asian",
    spice: "mild",
    budget: "high",
    skill: "home",
    minutes: 40,
    why: "椰浆把辣收软，适合想吃东南亚但不想太刺激的晚上。",
    steps: ["咖喱膏炒香", "下鸡块上色", "倒入椰浆小火煮软，配米饭"],
  },
];

const SHOPS = [
  {
    id: "lan-zhou",
    name: "老马兰州拉面",
    cuisine: "chinese",
    spice: "mild",
    budget: "low",
    eta: 25,
    dishes: [
      { name: "牛肉拉面", price: 22 },
      { name: "凉拌黄瓜", price: 8 },
      { name: "鸡蛋", price: 3 },
    ],
  },
  {
    id: "chuan",
    name: "小锅香冒菜",
    cuisine: "chinese",
    spice: "hot",
    budget: "mid",
    eta: 35,
    dishes: [
      { name: "中份冒菜", price: 38 },
      { name: "加牛肉", price: 12 },
      { name: "米饭", price: 2 },
    ],
  },
  {
    id: "canton",
    name: "阿姐煲仔饭",
    cuisine: "chinese",
    spice: "none",
    budget: "mid",
    eta: 40,
    dishes: [
      { name: "腊味煲仔饭", price: 32 },
      { name: "白切鸡", price: 28 },
      { name: "例汤", price: 12 },
    ],
  },
  {
    id: "hotpot",
    name: "家里蹲小火锅",
    cuisine: "chinese",
    spice: "hot",
    budget: "high",
    eta: 45,
    dishes: [
      { name: "双人锅底", price: 48 },
      { name: "毛肚牛肉拼盘", price: 68 },
      { name: "蔬菜拼盘", price: 22 },
    ],
  },
  {
    id: "burger",
    name: "街区汉堡",
    cuisine: "western",
    spice: "none",
    budget: "mid",
    eta: 28,
    dishes: [
      { name: "经典牛肉堡套餐", price: 42 },
      { name: "薯条加倍", price: 10 },
      { name: "柠檬汽水", price: 8 },
    ],
  },
  {
    id: "pasta-shop",
    name: "北窗意面",
    cuisine: "western",
    spice: "mild",
    budget: "mid",
    eta: 35,
    dishes: [
      { name: "番茄肉酱面", price: 46 },
      { name: "凯撒沙拉", price: 24 },
      { name: "蒜香面包", price: 9 },
    ],
  },
  {
    id: "poke",
    name: "海风 poke",
    cuisine: "western",
    spice: "mild",
    budget: "high",
    eta: 30,
    dishes: [
      { name: "三文鱼碗", price: 58 },
      { name: "鸡肉碗", price: 42 },
      { name: "味噌汤", price: 12 },
    ],
  },
  {
    id: "pizza",
    name: "石窑披萨",
    cuisine: "western",
    spice: "none",
    budget: "high",
    eta: 50,
    dishes: [
      { name: "玛格丽塔（12寸）", price: 68 },
      { name: "意式肉肠披萨", price: 78 },
      { name: "芝球", price: 16 },
    ],
  },
];

const ICONS = {
  back: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5 8 12l7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cook: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 14h16v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-2Z" stroke="currentColor" stroke-width="1.7"/><path d="M8 14V8a4 4 0 0 1 8 0v6" stroke="currentColor" stroke-width="1.7"/><path d="M9 8c0-2 1.2-3.5 3-4.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  takeout: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10h18l-1.2 9.2A2 2 0 0 1 17.82 21H6.18a2 2 0 0 1-1.98-1.8L3 10Z" stroke="currentColor" stroke-width="1.7"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.7"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v3M12 18v3M4.9 6.5 7 8.6M17 15.4l2.1 2.1M3 12h3M18 12h3M4.9 17.5 7 15.4M17 8.6l2.1-2.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="12" r="2.4" stroke="currentColor" stroke-width="1.7"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11.5 12 4l8 7.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 10.5V20h11V10.5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
};

function budgetBands(mode, people = 1) {
  const group = people >= 2;
  if (mode === "cook") {
    return group
      ? {
          low: { min: 0, max: 30, label: "人均 30 元内", tone: "两个人也先把肚子填饱" },
          mid: { min: 30, max: 55, label: "人均 30–55 元", tone: "家常发挥，吃得舒服" },
          high: { min: 55, max: 100, label: "人均 55–100 元", tone: "今天这顿值得加点戏" },
        }
      : {
          low: { min: 0, max: 20, label: "人均 20 元内", tone: "主打一个会过日子" },
          mid: { min: 20, max: 40, label: "人均 20–40 元", tone: "家常发挥，吃得舒服" },
          high: { min: 40, max: 80, label: "人均 40–80 元", tone: "今天这顿值得加点戏" },
        };
  }
  return group
    ? {
        low: { min: 0, max: 40, label: "人均 40 元内", tone: "两个人点，也要留点余地" },
        mid: { min: 40, max: 80, label: "人均 40–80 元", tone: "该吃吃，该省省" },
        high: { min: 80, max: 130, label: "人均 80–130 元", tone: "今天吃好一点" },
      }
    : {
        low: { min: 0, max: 30, label: "人均 30 元内", tone: "省着吃，也要吃饱" },
        mid: { min: 30, max: 60, label: "人均 30–60 元", tone: "该吃吃，该省省" },
        high: { min: 60, max: 100, label: "人均 60–100 元", tone: "今天吃好一点" },
      };
}

const LOCAL_RECIPE_INGREDIENTS = {
  "tomato-egg": ["番茄", "鸡蛋"],
  "soy-noodles": ["面条", "小葱"],
  "egg-fried-rice": ["米饭", "鸡蛋"],
  "mapo-tofu": ["豆腐", "肉末", "豆瓣酱"],
  "tomato-beef": ["番茄", "牛腩"],
  "steamed-fish": ["鲈鱼", "姜", "小葱"],
  kungpao: ["鸡肉", "花生", "辣椒"],
  pasta: ["意面", "大蒜"],
  sandwich: ["吐司", "牛油果", "鸡蛋"],
  "salad-bowl": ["鸡胸肉", "蔬菜"],
  risotto: ["蘑菇", "洋葱", "意大利米"],
  steak: ["牛排", "时蔬"],
  gyudon: ["肥牛片", "洋葱", "米饭"],
  "kimchi-fried-rice": ["泡菜", "米饭"],
  "miso-salmon": ["三文鱼", "味噌"],
  "vietnamese-rolls": ["米纸", "生菜", "虾"],
  "tom-yum": ["香茅", "虾", "柠檬叶"],
  "coconut-curry": ["鸡腿", "咖喱膏", "椰浆"],
};

let state = {
  view: "splash",
  stepIndex: 0,
  answers: {},
  result: null,
  nearby: [],
  mapStatus: null,
  thinking: false,
  excludeIds: [],
};

function flowSteps() {
  const commonStart = ["people", "mode"];
  if (state.answers.mode === "cook") {
    return [
      ...commonStart,
      "cuisine",
      "spice",
      "budgetCook",
      "skill",
      "timeCook",
      "pantry",
      "willingToShop",
      "result",
    ];
  }
  if (state.answers.mode === "takeout") {
    return [...commonStart, "location", "cuisine", "spice", "budgetTakeout", "result"];
  }
  return [...commonStart];
}

function currentStepId() {
  return flowSteps()[state.stepIndex];
}

function budgetHint(mode) {
  const n = state.answers.people || 1;
  const base = `按人均选择，下方已换算 ${n} 人${mode === "cook" ? "食材" : "整单"}预算`;
  if (mode !== "takeout") return base;
  const typical = window.OrderHistory?.typicalPerPerson?.();
  if (!typical) return `${base}。有常点后，会在你选的上限里优先更接近平时的价。`;
  return `${base}。你的常点大多是人均约 ¥${Math.round(typical)}，选好上限后会优先靠近这个价，而不是顶格花满。`;
}

function budgetLabel(mode, tier, people = state.answers.people || 1) {
  if (tier === "any") return "预算不限";
  return budgetBands(mode, people)?.[tier]?.label || "";
}

function budgetOptions(mode) {
  const people = state.answers.people || 1;
  const rules = budgetBands(mode, people);
  const options = Object.entries(rules).map(([value, rule]) => {
    const total =
      rule.min === 0
        ? `${people} 人约 ${rule.max * people} 元内`
        : `${people} 人约 ${rule.min * people}–${rule.max * people} 元`;
    return { value, label: rule.label, sub: `${total} · ${rule.tone}` };
  });
  options.push({ value: "any", label: "不限", sub: "快乐无价，先吃再说" });
  return options;
}

function stepCopy(id) {
  return {
    people: {
      title: "今晚几个人吃？",
      hint: "超过 5 人就偏宴请了，这版先帮小桌拍板。",
    },
    mode: {
      title: "自己做，还是点外卖？",
      hint: "两条路的问题不一样，选完再往下问。",
    },
    cuisine: {
      title: "更想吃哪边？",
      hint: "不确定就选「都行」，交给运气。",
    },
    spice: {
      title: "能接受辣吗？",
      hint: "按今晚的胃来，不是按平时能吃多辣。",
    },
    budgetCook: {
      title: "食材人均花多少？",
      hint: budgetHint("cook"),
    },
    budgetTakeout: {
      title: "这顿外卖人均多少？",
      hint: budgetHint("takeout"),
    },
    skill: {
      title: "你下厨有多熟？",
      hint: "想挑战时不会再推荐 15 分钟快手菜。",
    },
    timeCook: {
      title: "希望多久能做好？",
      hint: "选 1 小时会优先较费功夫的菜，不是最快出锅的。",
    },
    timeDelivery: {
      title: "希望多久能送到？",
      hint: "用来圈定店家范围。店家数据目前仍是虚拟的。",
    },
    location: {
      title: "想看哪里的店？",
      hint: "定位后可以拖动地图、点击选点。只用于搜索附近餐厅，不需要门牌。",
    },
    pantry: {
      title: "冰箱里有什么？",
      hint: "食材之间用逗号隔开。空冰箱也可以诚实作答。",
    },
    willingToShop: {
      title: "缺食材愿意去买吗？",
      hint: "这一步决定只看现有食材，还是允许生成采购清单。",
    },
  }[id];
}

function optionsFor(id) {
  switch (id) {
    case "people":
      return [
        { value: 1, label: "1", sub: "美美吃独食" },
        { value: 2, label: "2", sub: "享受二人世界！" },
        { value: 3, label: "3", sub: "三人行，必有人比我更能吃" },
        { value: 4, label: "4", sub: "四舍五入，刚好凑一桌" },
        { value: 5, label: "5", sub: "独乐乐不如众乐乐" },
      ];
    case "mode":
      return [
        { value: "cook", label: "自己做", sub: "锅铲在手，晚饭我有", icon: "cook" },
        { value: "takeout", label: "点外卖", sub: "动动手指，坐等开饭", icon: "takeout" },
      ];
    case "cuisine":
      return [
        { value: "chinese", label: "中餐", sub: "这口胃，还是得米饭哄" },
        { value: "western", label: "西餐", sub: "今晚让刀叉上个班" },
        { value: "japanese_korean", label: "日韩料理", sub: "寿司烤肉拉面，今晚出国但不办签证" },
        { value: "southeast_asian", label: "东南亚菜", sub: "香茅柠檬叶，把空调开成热带" },
        { value: "any", label: "都行", sub: "别问我，命运请发牌" },
      ];
    case "spice":
      return [
        { value: "none", label: "不辣", sub: "吃不了一点辣" },
        { value: "mild", label: "微辣", sub: "浅浅感受一下" },
        { value: "hot", label: "中辣", sub: "我能吃我要吃" },
        { value: "extreme", label: "变态辣", sub: "让暴风雨来得更猛烈些吧" },
      ];
    case "budgetCook":
      return budgetOptions("cook");
    case "budgetTakeout":
      return budgetOptions("takeout");
    case "skill":
      return [
        { value: "beginner", label: "不会做", sub: "新手炸厨房" },
        { value: "home", label: "家常水平", sub: "家常菜，拿捏" },
        { value: "challenge", label: "想挑战", sub: "上强度！" },
      ];
    case "timeCook":
      return [
        { value: 15, label: "15 分钟", sub: "饿晕了，需要立刻开吃" },
        { value: 30, label: "30 分钟", sub: "可以等，但不能太久" },
        { value: 60, label: "1 小时", sub: "慢工出细活，今晚有耐心" },
        { value: 999, label: "不限", sub: "不赶时间，慢慢炖" },
      ];
    case "timeDelivery":
      return [
        { value: 30, label: "30 分钟内", sub: "饿晕了，求外卖速速送达" },
        { value: 60, label: "60 分钟内", sub: "还能忍，味道更重要" },
        { value: 999, label: "不急", sub: "好饭值得等一等" },
      ];
    case "willingToShop":
      return [
        { value: false, label: "不愿意", sub: "冰箱有什么，我就做什么" },
        { value: true, label: "可以买", sub: "为了这顿饭，愿意出个门" },
      ];
    default:
      return [];
  }
}

function answerKey(stepId) {
  if (stepId === "budgetCook" || stepId === "budgetTakeout") return "budget";
  if (stepId === "timeCook" || stepId === "timeDelivery") return "time";
  return stepId;
}

function escapeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function postJson(path, body) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error?.message || "请求失败");
    error.details = payload.error?.details;
    throw error;
  }
  return payload;
}

function skillOk(recipeSkill, wanted) {
  if (wanted === "beginner") return recipeSkill === "beginner";
  if (wanted === "home") return recipeSkill === "beginner" || recipeSkill === "home";
  if (wanted === "challenge") return recipeSkill === "home" || recipeSkill === "challenge";
  return true;
}

function cookTimeFits(minutes, selected) {
  const time = Number(selected);
  if (!Number.isFinite(time)) return true;
  if (time <= 15) return minutes <= 20;
  if (time <= 30) return minutes <= 40;
  if (time <= 60) return minutes >= 30 && minutes <= 120;
  return true;
}

function matchesFilters(item, mode) {
  const a = state.answers;
  if (a.cuisine && a.cuisine !== "any" && item.cuisine !== a.cuisine) return false;
  const spiceMatches = a.spice === "extreme" ? item.spice === "hot" : item.spice === a.spice;
  if (a.spice && !spiceMatches) return false;
  if (a.budget && a.budget !== "any" && item.budget !== a.budget) return false;
  if (mode === "cook") {
    if (!skillOk(item.skill, a.skill)) return false;
    if (!cookTimeFits(item.minutes, a.time)) return false;
  } else if (item.eta > a.time) return false;
  return true;
}

function pickFrom(list, mode) {
  const pool = list.filter((item) => matchesFilters(item, mode) && !state.excludeIds.includes(item.id));
  const fallback = list.filter((item) => matchesFilters(item, mode));
  const use = pool.length ? pool : fallback;
  if (!use.length) return null;
  return use[Math.floor(Math.random() * use.length)];
}

function suggestDishes(shop, people) {
  const dishes = shop.dishes.map((d) => ({ ...d }));
  if (people <= 1) return dishes.slice(0, 2);
  if (people <= 3) return dishes;
  return dishes.map((d, i) => (i === 0 ? { ...d, name: `${d.name} ×2`, price: d.price * 2 } : d));
}

function totalPrice(dishes) {
  return dishes.reduce((sum, d) => sum + d.price, 0);
}

function cuisineLabel(v) {
  return {
    chinese: "中餐",
    western: "西餐",
    japanese_korean: "日韩",
    southeast_asian: "东南亚",
    any: "不限",
  }[v] || "";
}

function spiceLabel(v) {
  return { none: "不辣", mild: "微辣", hot: "中辣", extreme: "变态辣" }[v] || "";
}

function clock() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function render() {
  const root = document.getElementById("app");
  const time = clock();

  if (state.view === "splash") {
    const historyCount = window.OrderHistory?.read().length || 0;
    root.innerHTML = "";
    root.append(
      el(`
      <div class="phone">
        <div class="demo-chip">本地优先</div>
        <div class="status-bar"><span>${time}</span><span class="status-icons" aria-hidden="true">•••• 5G</span></div>
        <section class="splash">
          <div class="splash-mark">${ICONS.spark}</div>
          <h1>今天吃什么</h1>
          <p>一步只问一件事。先帮你缩小范围，再给一个今晚就能执行的答案。</p>
          <button class="cta" type="button" id="start">开始决定</button>
          <button class="cta ghost history-entry" type="button" id="history">
            管理我的常点${historyCount ? ` · ${historyCount} 条` : ""}
          </button>
        </section>
      </div>`),
    );
    root.querySelector("#start").addEventListener("click", startWizard);
    root.querySelector("#history").addEventListener("click", openHistory);
    return;
  }

  if (state.view === "history") {
    root.innerHTML = "";
    root.append(renderHistoryScreen(time));
    return;
  }

  const steps = flowSteps();
  const stepId = currentStepId();
  const totalAsk = Math.max(steps.length - 1, 1);
  const progress = stepId === "result" ? 100 : Math.round((state.stepIndex / totalAsk) * 100);
  const canBack = state.view === "wizard" && state.stepIndex > 0;

  const phone = el(`
    <div class="phone">
      <div class="demo-chip">本地优先</div>
      <div class="status-bar"><span>${time}</span><span class="status-icons" aria-hidden="true">•••• 5G</span></div>
      <div class="screen">
        <div class="top-nav">
          <button class="icon-btn" type="button" id="back" ${canBack ? "" : "disabled"} aria-label="返回上一步">${ICONS.back}</button>
          <div class="progress-wrap">
            <div class="progress-label">${stepId === "result" ? "今晚就这个" : `第 ${state.stepIndex + 1} / ${totalAsk} 题`}</div>
            <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
          </div>
          <button class="nav-text-btn" type="button" id="nav-history">常点</button>
          <button class="icon-btn" type="button" id="home" aria-label="回首页">${ICONS.home}</button>
        </div>
        <div id="body"></div>
      </div>
      <div class="toast" id="toast" role="status"></div>
    </div>
  `);

  root.innerHTML = "";
  root.append(phone);
  phone.querySelector("#back").addEventListener("click", () => history.back());
  phone.querySelector("#home").addEventListener("click", goHome);
  phone.querySelector("#nav-history").addEventListener("click", openHistory);

  const body = phone.querySelector("#body");
  if (state.thinking) {
    body.innerHTML = `<div class="thinking">${ICONS.spark}<strong>在几个选项里拍板</strong>不会让你再看一长串菜单</div>`;
    return;
  }
  if (stepId === "result") {
    body.append(renderResult());
    return;
  }
  body.append(renderQuestion(stepId));
}

function renderHistoryScreen(time) {
  const items = window.OrderHistory?.read() || [];
  const phone = el(`
    <div class="phone">
      <div class="status-bar"><span>${time}</span><span class="status-icons" aria-hidden="true">•••• 5G</span></div>
      <div class="screen history-screen">
        <div class="top-nav">
          <button class="icon-btn" type="button" id="history-back" aria-label="返回">${ICONS.back}</button>
          <strong>我的常点</strong>
        </div>
        <p class="eyebrow">只存在这个浏览器里</p>
        <h1 class="question">先把真正常点的记下来</h1>
        <p class="hint">可手填，也可用 Chrome/Edge 扩展导入当前外卖页上已经显示的店和菜。不读取账号。</p>
        <form class="history-form question-form" id="history-form">
          <div class="field-row">
            <label class="field"><span>店名</span><input name="storeName" maxlength="80" placeholder="例如：老马兰州拉面" required /></label>
            <label class="field"><span>常点菜</span><input name="dishName" maxlength="120" placeholder="例如：牛肉拉面" required /></label>
          </div>
          <div class="field-row">
            <label class="field">
              <span>口味</span>
              <select name="cuisine">
                <option value="chinese">中餐</option>
                <option value="western">西餐</option>
                <option value="japanese_korean">日韩料理</option>
                <option value="southeast_asian">东南亚菜</option>
                <option value="any">其他 / 不分类</option>
              </select>
            </label>
            <label class="field">
              <span>辣度</span>
              <select name="spice">
                <option value="none">不辣</option>
                <option value="mild">微辣</option>
                <option value="hot">中辣</option>
                <option value="extreme">变态辣</option>
              </select>
            </label>
          </div>
          <div class="field-row">
            <label class="field">
              <span>当时几个人</span>
              <select name="people">
                <option value="1">1 人</option>
                <option value="2">2 人</option>
                <option value="3">3 人</option>
                <option value="4">4 人</option>
                <option value="5">5 人</option>
              </select>
            </label>
            <label class="field">
              <span>订单总价</span>
              <input name="price" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="例如：46" required />
            </label>
          </div>
          <label class="field"><span>常用地点</span><input name="locationLabel" maxlength="40" placeholder="家 / 公司（可选）" /></label>
          <p class="form-error" id="history-error" role="alert"></p>
          <button class="cta" type="submit">加入我的常点</button>
        </form>
        <section class="history-list" aria-label="已保存的常点">
          ${
            items.length
              ? items
                  .map(
                    (item) => `
                      <article class="history-item">
                        <div>
                          <strong>${escapeText(item.storeName)}</strong>
                          <p>${escapeText(item.dishName)} · ${item.price ? `${item.people || 1} 人 ¥${Number(item.price).toFixed(0)}` : "价格未记录"} · ${budgetLabel("takeout", item.budget, item.people || 1)}</p>
                        </div>
                        <button class="icon-btn delete-history" type="button" data-id="${escapeText(item.id)}" aria-label="删除 ${escapeText(item.storeName)}">×</button>
                      </article>`,
                  )
                  .join("")
              : `<div class="empty compact"><p>还没有常点记录。先加一两家，外卖推荐就不再是虚拟的。</p></div>`
          }
        </section>
      </div>
      <div class="toast" id="toast" role="status"></div>
    </div>
  `);

  phone.querySelector("#history-back").addEventListener("click", () => history.back());
  phone.querySelector("#history-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      window.OrderHistory.add(values);
      render();
    } catch (error) {
      phone.querySelector("#history-error").textContent = error.message;
    }
  });
  phone.querySelectorAll(".delete-history").forEach((button) => {
    button.addEventListener("click", () => {
      window.OrderHistory.remove(button.dataset.id);
      render();
    });
  });
  return phone;
}

function openHistory() {
  state.view = "history";
  history.pushState(snapshot(), "");
  render();
}

function renderQuestion(stepId) {
  if (stepId === "location") return renderLocationQuestion();
  if (stepId === "pantry") return renderPantryQuestion();

  const copy = stepCopy(stepId);
  const key = answerKey(stepId);
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <p class="eyebrow">今天吃什么</p>
    <h1 class="question">${copy.title}</h1>
    <p class="hint">${copy.hint}</p>
    <div class="options" role="listbox" aria-label="${copy.title}"></div>
  `;
  const box = wrap.querySelector(".options");
  if (stepId === "people") box.classList.add("people");
  if (stepId === "mode") box.classList.add("grid-2");

  optionsFor(stepId).forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    if (stepId === "mode") btn.classList.add("mode-card");
    if (state.answers[key] === opt.value) btn.classList.add("is-selected");
    btn.setAttribute("role", "option");
    btn.innerHTML = `${opt.icon ? ICONS[opt.icon] : ""}<span class="label">${opt.label}</span>${opt.sub ? `<span class="sub">${opt.sub}</span>` : ""}`;
    btn.addEventListener("click", () => choose(key, opt.value));
    box.append(btn);
  });

  if (stepId === "mode") {
    const skip = document.createElement("div");
    skip.className = "skip-row";
    skip.innerHTML = `<button class="skip" type="button">还没想好，先随机选一种</button>`;
    skip.querySelector("button").addEventListener("click", () => choose("mode", Math.random() < 0.5 ? "cook" : "takeout"));
    wrap.append(skip);
  }
  return wrap;
}

function renderLocationQuestion() {
  const copy = stepCopy("location");
  const saved = state.answers.location || {};
  const selected = { ...saved };
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <p class="eyebrow">今天吃什么</p>
    <h1 class="question">${copy.title}</h1>
    <p class="hint">${copy.hint}</p>
    <form class="question-form" id="location-form">
      <button class="location-button" type="button" id="locate">
        <span class="label">使用当前位置</span>
        <span class="sub" id="location-status">也可以直接点击地图选点</span>
      </button>
      <div class="location-map" id="location-map" aria-label="地图选点"></div>
      <label class="field">
        <span>给这个地点起个名字（可选）</span>
        <input id="location-label" maxlength="40" placeholder="例如：家 / 公司" />
      </label>
      <p class="form-error" id="location-error" role="alert"></p>
      <button class="cta" type="submit">看看这附近</button>
    </form>
  `;

  const label = wrap.querySelector("#location-label");
  const status = wrap.querySelector("#location-status");
  label.value = saved.label || "";
  if (saved.latitude && saved.longitude) {
    status.textContent = `定位成功，误差约 ${Math.round(saved.accuracyMeters || 0)} 米`;
  }

  let map;
  let marker;

  function selectPoint(latitude, longitude, accuracyMeters) {
    selected.latitude = latitude;
    selected.longitude = longitude;
    selected.accuracyMeters = accuracyMeters || null;
    if (!map) return;
    if (!marker) marker = window.L.marker([latitude, longitude]).addTo(map);
    else marker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude], 16);
    status.textContent = accuracyMeters
      ? `已选定，定位误差约 ${Math.round(accuracyMeters)} 米`
      : "已选定地图上的位置";
  }

  window.setTimeout(() => {
    const mapNode = wrap.querySelector("#location-map");
    if (!window.L || !mapNode?.isConnected) {
      if (!window.L) {
        mapNode.innerHTML = '<p class="map-unavailable">地图没有加载成功，仍可尝试浏览器定位。</p>';
      }
      return;
    }
    const hasSavedPoint = Number.isFinite(saved.latitude) && Number.isFinite(saved.longitude);
    map = window.L.map(mapNode, { zoomControl: true }).setView(
      hasSavedPoint ? [saved.latitude, saved.longitude] : [35.8617, 104.1954],
      hasSavedPoint ? 16 : 4,
    );
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);
    map.on("click", (event) => selectPoint(event.latlng.lat, event.latlng.lng));
    if (hasSavedPoint) selectPoint(saved.latitude, saved.longitude, saved.accuracyMeters);
    window.setTimeout(() => map.invalidateSize(), 0);
  }, 0);

  wrap.querySelector("#locate").addEventListener("click", () => {
    const errorNode = wrap.querySelector("#location-error");
    errorNode.textContent = "";
    if (!navigator.geolocation) {
      errorNode.textContent = "当前浏览器不支持定位，请直接填写地址。";
      return;
    }

    status.textContent = "正在努力找到你…";
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        selectPoint(coords.latitude, coords.longitude, coords.accuracy);
      },
      () => {
        status.textContent = "没有拿到定位，手动填写也完全可以";
        errorNode.textContent = "定位失败或未授权，请填写下面的地址。";
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    );
  });

  wrap.querySelector("#location-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!Number.isFinite(selected.latitude) || !Number.isFinite(selected.longitude)) {
      wrap.querySelector("#location-error").textContent = "请先定位或在地图上点一下。";
      return;
    }
    choose("location", { ...selected, label: label.value.trim() });
  });
  return wrap;
}

function renderPantryQuestion() {
  const copy = stepCopy("pantry");
  const saved = Array.isArray(state.answers.pantry) ? state.answers.pantry.join("，") : "";
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <p class="eyebrow">今天吃什么</p>
    <h1 class="question">${copy.title}</h1>
    <p class="hint">${copy.hint}</p>
    <form class="question-form" id="pantry-form">
      <label class="field">
        <span>现有食材</span>
        <textarea id="pantry-items" rows="5" placeholder="例如：番茄，鸡蛋，小葱"></textarea>
      </label>
      <div class="quick-items" aria-label="常见食材">
        ${["鸡蛋", "番茄", "豆腐", "面条", "小葱"].map((item) => `<button type="button" data-ingredient="${item}">${item}</button>`).join("")}
      </div>
      <button class="cta" type="submit">就这些</button>
    </form>
  `;

  const input = wrap.querySelector("#pantry-items");
  input.value = saved;
  wrap.querySelectorAll("[data-ingredient]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = parsePantry(input.value);
      const ingredient = button.dataset.ingredient;
      if (!current.includes(ingredient)) current.push(ingredient);
      input.value = current.join("，");
    });
  });
  wrap.querySelector("#pantry-form").addEventListener("submit", (event) => {
    event.preventDefault();
    choose("pantry", parsePantry(input.value));
  });
  return wrap;
}

function parsePantry(value) {
  return [...new Set(String(value).split(/[，,、\n]/).map((item) => item.trim()).filter(Boolean))];
}

function renderResult() {
  const wrap = document.createElement("div");
  wrap.className = "result";
  const a = state.answers;
  const item = state.result;

  if (!item) {
    wrap.innerHTML = `
      <div class="empty">
        <h1 class="result-title" style="font-size:24px">这组条件太窄了</h1>
        <p class="hint">当前条件下没有匹配结果。放宽口味、时间或预算再试一次。</p>
      </div>
      <div class="actions">
        <button class="cta" type="button" data-act="retry">放宽条件重来</button>
        <button class="cta ghost" type="button" data-act="home">回到开头</button>
      </div>`;
    bindResultActions(wrap);
    return wrap;
  }

  if (a.mode === "cook") {
    const hasPantryMatch = Array.isArray(item.missingIngredients);
    const missingIngredients = item.missingIngredients || [];
    wrap.innerHTML = `
      <div class="result-kicker">自己做 · ${a.people} 人份</div>
      <h1 class="result-title">${item.name}</h1>
      <div class="meta">
        <span class="chip">${item.minutes} 分钟</span>
        <span class="chip">${cuisineLabel(item.cuisine)}</span>
        <span class="chip">${spiceLabel(a.spice)}</span>
        <span class="chip">${budgetLabel("cook", a.budget)}</span>
      </div>
      <article class="result-card">
        <h3>为什么是它</h3>
        <p>${item.why}</p>
      </article>
      <article class="result-card">
        <h3>大概怎么做</h3>
        <ol>${item.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
      </article>
      ${
        hasPantryMatch && missingIngredients.length
          ? `<article class="result-card shopping-card">
              <h3>顺路买一下</h3>
              <div class="meta">${missingIngredients.map((item) => `<span class="chip">${escapeText(item)}</span>`).join("")}</div>
            </article>`
          : hasPantryMatch
            ? `<article class="result-card shopping-card"><h3>不用买菜</h3><p>冰箱库存足够，省下一次出门。</p></article>`
            : ""
      }
      <div class="actions">
        <button class="cta" type="button" data-act="lock">就这个</button>
        <button class="cta primary" type="button" data-act="redraw">再抽一次</button>
        <button class="cta ghost" type="button" data-act="edit">改条件</button>
        <button class="cta ghost" type="button" data-act="home">回首页</button>
      </div>`;
  } else {
    const historyPick = item.historyPick;
    const picks = item.picks?.length ? item.picks : (item.nearby || []).slice(0, 2);
    const backups = item.backups || (item.nearby || []).slice(picks.length, 10);
    const historyPerPerson =
      historyPick?.price && historyPick?.people
        ? Math.round(historyPick.price / historyPick.people)
        : null;
    const typicalSpend = window.OrderHistory?.typicalPerPerson?.();
    const typicalNote = (() => {
      if (!typicalSpend || !historyPerPerson) return "";
      const roundTypical = Math.round(typicalSpend);
      if (Math.abs(historyPerPerson - roundTypical) > 3) {
        return `你的常点大多人均约 ¥${roundTypical}，今晚在预算上限里优先靠近这个价。`;
      }
      return `和你平时人均约 ¥${roundTypical} 接近。`;
    })();
    const title = historyPick?.dishName || picks[0]?.name || item.searchTerm;
    const kicker = historyPick
      ? "从我的常点里选"
      : picks.length === 2
        ? "今晚先看这两家"
        : picks.length === 1
          ? "今晚先看这家"
          : "按今晚的口味给个方向";
    wrap.innerHTML = `
      <div class="result-kicker">${kicker}</div>
      <h1 class="result-title">${escapeText(title)}</h1>
      <div class="meta">
        <span class="chip">${a.people} 人</span>
        <span class="chip">${cuisineLabel(a.cuisine)}</span>
        <span class="chip">${spiceLabel(a.spice)}</span>
        <span class="chip">${budgetLabel("takeout", a.budget)}</span>
      </div>
      ${
        historyPick
          ? `<article class="result-card featured-order">
              <h3>${escapeText(historyPick.storeName)}</h3>
              <p>这是你自己保存的常点，不是系统编出来的。${historyPerPerson ? `上次人均约 ¥${historyPerPerson}。` : ""}${typicalNote}${historyPick.locationLabel ? ` 常用地点：${escapeText(historyPick.locationLabel)}。` : ""}</p>
            </article>`
          : ""
      }
      ${
        picks.length
          ? `<section class="nearby-section">
              <div class="section-heading">
                <h3>${historyPick ? (picks.length === 1 ? "附近也可以先看这家" : "附近也可以先看这两家") : picks.length === 1 ? "就这家" : "就这两家"}</h3>
                <span>主推</span>
              </div>
              ${picks.map((restaurant) => nearbyItemHtml(restaurant, "pick")).join("")}
            </section>`
          : `<article class="result-card">
              <h3>附近没有对口的店</h3>
              <p>${escapeText(state.mapStatus || "配置高德 Web 服务 Key 后，会在这里拍板 1–2 家。")}</p>
            </article>`
      }
      <article class="result-card">
        <h3>去外卖平台搜</h3>
        <div class="search-term">${escapeText(item.searchTerm)}</div>
        <button class="text-button" type="button" data-act="copy" data-copy="${escapeText(item.searchTerm)}">复制搜索词</button>
      </article>
      ${
        backups.length
          ? `<section class="nearby-section nearby-backup">
              <div class="section-heading">
                <h3>备选</h3>
                <span>${backups.length} 家</span>
              </div>
              <p class="source-note">主推不合适再看，不必把每一家都比一遍。</p>
              ${backups.map((restaurant) => nearbyItemHtml(restaurant, "backup")).join("")}
            </section>`
          : ""
      }
      <p class="source-note">地图结果只表示附近存在，不保证已入驻外卖平台或当前可配送。</p>
      <div class="actions">
        <button class="cta" type="button" data-act="lock">就这个</button>
        <button class="cta primary" type="button" data-act="redraw">再抽一次</button>
        <button class="cta ghost" type="button" data-act="edit">改条件</button>
        <button class="cta ghost" type="button" data-act="home">回首页</button>
      </div>`;
  }
  bindResultActions(wrap);
  return wrap;
}

function nearbyItemHtml(restaurant, tone) {
  return `
    <article class="nearby-item ${tone}">
      <div>
        <strong>${escapeText(restaurant.name)}</strong>
        <p>${escapeText(restaurant.address || restaurant.category || "餐饮")}</p>
      </div>
      <span>${restaurant.distanceMeters ? `${restaurant.distanceMeters}m` : ""}</span>
    </article>`;
}

function splitNearbyPicks(nearby, excludeIds = []) {
  const list = (nearby || []).filter((restaurant) => restaurant?.name);
  if (!list.length) return { picks: [], backups: [] };
  const unused = list.filter((restaurant) => restaurant.id && !excludeIds.includes(restaurant.id));
  const pool = unused.length ? unused : list;
  const picks = pool.slice(0, Math.min(2, pool.length));
  const pickIds = new Set(picks.map((restaurant) => restaurant.id));
  const backups = list.filter((restaurant) => !pickIds.has(restaurant.id)).slice(0, 8);
  return { picks, backups };
}

function takeoutGuidePayload(answers, historyPick, nearby, searchTerm) {
  const { picks, backups } = splitNearbyPicks(nearby, state.excludeIds);
  return {
    id: historyPick?.id || `takeout-${answers.cuisine}-${answers.spice}-${answers.budget}`,
    type: "takeout-guide",
    historyPick,
    nearby,
    picks,
    backups,
    searchTerm,
  };
}

function bindResultActions(wrap) {
  wrap.querySelectorAll("[data-act]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const act = btn.getAttribute("data-act");
      if (act === "lock") showToast("第一版还不能下单或打开菜谱，先记下这个决定。");
      if (act === "copy") {
        if (!navigator.clipboard) {
          showToast("当前浏览器不支持复制，请手动长按搜索词");
        } else {
          navigator.clipboard
            .writeText(btn.dataset.copy || "")
            .then(() => showToast("搜索词已复制"))
            .catch(() => showToast("复制失败，请手动长按搜索词"));
        }
      }
      if (act === "redraw") redraw();
      if (act === "home") goHome();
      if (act === "edit" || act === "retry") restart(true);
    });
  });
}

function showToast(text) {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.classList.add("show");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function snapshot() {
  return {
    view: state.view,
    stepIndex: state.stepIndex,
    answers: { ...state.answers },
    result: state.result,
    nearby: state.nearby,
    mapStatus: state.mapStatus,
    excludeIds: [...state.excludeIds],
  };
}

function applySnapshot(s) {
  if (!s) return;
  state = { ...state, ...s, answers: { ...s.answers }, thinking: false };
  render();
}

function goHome() {
  state = {
    view: "splash",
    stepIndex: 0,
    answers: {},
    result: null,
    nearby: [],
    mapStatus: null,
    thinking: false,
    excludeIds: [],
  };
  history.pushState({ view: "splash" }, "");
  render();
}

function startWizard() {
  state = {
    view: "wizard",
    stepIndex: 0,
    answers: {},
    result: null,
    nearby: [],
    mapStatus: null,
    thinking: false,
    excludeIds: [],
  };
  history.pushState(snapshot(), "");
  render();
}

function choose(key, value) {
  state.answers[key] = value;
  const steps = flowSteps();
  const nextIndex = state.stepIndex + 1;
  const nextId = steps[nextIndex];
  state.stepIndex = nextIndex;
  if (nextId === "result") {
    revealResult(true);
    return;
  }
  history.pushState(snapshot(), "");
  render();
}

function pickApiResult(items) {
  const available = items.filter((item) => !state.excludeIds.includes(item.id));
  const pool = available.length ? available : items;
  if (!pool.length) return null;
  const sorted = [...pool].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  const best = sorted[0].matchScore || 0;
  const top = sorted.filter((item) => (item.matchScore || 0) >= best - 8).slice(0, 2);
  return top[Math.floor(Math.random() * top.length)];
}

function spendFitScore(item, answers) {
  if (!item.price || !item.people) return 0;
  const per = item.price / item.people;
  const typical = window.OrderHistory?.typicalPerPerson?.();
  const band = answers.budget === "any" ? null : budgetBands("takeout", answers.people || 1)?.[answers.budget];
  const ceiling = band?.max ?? Infinity;
  if (per > ceiling + 1) return -6;
  const target = typical == null ? null : Math.min(typical, ceiling);
  if (target == null) return Math.max(0, 4 - per / 20);
  const over = Math.max(0, per - target);
  const under = Math.max(0, target - per);
  return Math.round(8 - over / 3 - under / 8);
}

function pickHistoryOrder(answers) {
  const items = window.OrderHistory?.read() || [];
  const scored = items
    .filter((item) => !state.excludeIds.includes(item.id))
    .map((item) => {
      let score = item.timesOrdered || 1;
      if (answers.cuisine === "any" || item.cuisine === answers.cuisine) score += 5;
      else score -= 8;
      const requestedSpice = answers.spice === "extreme" ? "hot" : answers.spice;
      const itemSpice = item.spice === "extreme" ? "hot" : item.spice;
      if (requestedSpice === itemSpice) score += 4;
      else score -= 5;
      if (answers.budget === "any" || item.budget === answers.budget) score += 3;
      else score -= 8;
      score += spendFitScore(item, answers);
      if (
        answers.location?.label &&
        item.locationLabel &&
        answers.location.label.toLowerCase() === item.locationLabel.toLowerCase()
      ) {
        score += 4;
      }
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return null;
  const topScore = scored[0].score;
  const top = scored.filter(({ score }) => score >= topScore - 2);
  return top[Math.floor(Math.random() * top.length)].item;
}

function takeoutSearchTerm(answers, historyPick) {
  if (historyPick) return `${historyPick.storeName} ${historyPick.dishName}`;
  const cuisine =
    {
      chinese: "中餐",
      western: "西餐",
      japanese_korean: "日料 韩餐",
      southeast_asian: "东南亚 泰餐",
    }[answers.cuisine] || "附近美食";
  const spice = spiceLabel(answers.spice);
  const typical = window.OrderHistory?.typicalPerPerson?.();
  const budgetText =
    typical && answers.budget !== "any"
      ? `人均约${Math.round(typical)}`
      : budgetLabel("takeout", answers.budget);
  return `${cuisine} ${spice} ${budgetText}`.trim();
}

async function requestRecommendation() {
  const a = state.answers;
  const filters = {
    people: a.people,
    cuisine: a.cuisine,
    spice: a.spice,
    budget: a.budget,
    skill: a.skill,
    maxCookMinutes: a.mode === "cook" ? a.time : undefined,
    maxDeliveryMinutes: a.mode === "takeout" ? a.time : undefined,
  };

  if (a.mode === "cook") {
    const payload = await postJson("/api/recommendations/cook", {
      pantryItems: a.pantry,
      willingToShop: a.willingToShop,
      filters,
    });
    const item = pickApiResult(payload.recommendations || []);
    if (!item) return null;
    return {
      ...item,
      budget: item.priceLevel,
      why: item.requiresShopping
        ? `家里已经有一部分食材，补齐 ${item.missingIngredients.length} 样就能开做。`
        : "现有食材就能做，不用为了晚饭再跑一趟。",
      steps: item.steps || ["处理并备好食材", "按合适火候烹饪", "调味后装盘开吃"],
    };
  }

  const historyPick = pickHistoryOrder(a);
  let nearby = [];
  let mapStatus = "地图服务暂不可用，当前只按个人常点推荐";
  try {
    const payload = await postJson("/api/map/nearby", {
      latitude: a.location.latitude,
      longitude: a.location.longitude,
      radius: 3000,
      cuisine: a.cuisine,
    });
    nearby = payload.restaurants || [];
    mapStatus = payload.message;
  } catch (error) {
    console.info("附近餐厅暂不可用：", error.message);
  }
  state.nearby = nearby;
  state.mapStatus = mapStatus;

  return takeoutGuidePayload(a, historyPick, nearby, takeoutSearchTerm(a, historyPick));
}

function localFallback() {
  const mode = state.answers.mode;
  if (mode === "takeout") {
    const historyPick = pickHistoryOrder(state.answers);
    return takeoutGuidePayload(
      state.answers,
      historyPick,
      [],
      takeoutSearchTerm(state.answers, historyPick),
    );
  }

  const pantry = new Set((state.answers.pantry || []).map((item) => item.trim().toLowerCase()));
  const matching = RECIPES.filter(
    (recipe) => matchesFilters(recipe, mode) && !state.excludeIds.includes(recipe.id),
  )
    .map((recipe) => ({
      ...recipe,
      missingIngredients: (LOCAL_RECIPE_INGREDIENTS[recipe.id] || []).filter(
        (item) => !pantry.has(item.toLowerCase()),
      ),
    }))
    .filter((recipe) => state.answers.willingToShop || recipe.missingIngredients.length === 0)
    .sort((a, b) => {
      if (a.missingIngredients.length !== b.missingIngredients.length) {
        return a.missingIngredients.length - b.missingIngredients.length;
      }
      const wantEffort = a.skill === "challenge" || Number(state.answers.time) >= 60 || state.answers.skill === "challenge";
      if (wantEffort) return b.minutes - a.minutes;
      return a.minutes - b.minutes;
    });

  return matching.length ? matching[0] : null;
}

async function revealResult(push) {
  state.thinking = true;
  render();
  const wait = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 420;
  await new Promise((resolve) => window.setTimeout(resolve, wait));

  try {
    state.result = await requestRecommendation();
  } catch (error) {
    console.info("后端暂不可用，使用本地虚拟数据：", error.message);
    state.result = localFallback();
  }

  if (state.result) {
    state.excludeIds.push(state.result.id);
    for (const shop of state.result.picks || []) {
      if (shop.id) state.excludeIds.push(shop.id);
    }
  }
  state.thinking = false;
  if (push) history.pushState(snapshot(), "");
  else history.replaceState(snapshot(), "");
  render();
}

function redraw() {
  revealResult(false);
}

function restart(keepAnswers) {
  const answers = keepAnswers ? { ...state.answers } : {};
  state = {
    view: "wizard",
    stepIndex: 0,
    answers,
    result: null,
    nearby: [],
    mapStatus: null,
    thinking: false,
    excludeIds: [],
  };
  history.pushState(snapshot(), "");
  render();
}

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data?.type !== "whattoeat:history-imported") return;
  if (state.view === "history") render();
});

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.view) {
    applySnapshot(event.state);
    return;
  }
  state = {
    view: "splash",
    stepIndex: 0,
    answers: {},
    result: null,
    nearby: [],
    mapStatus: null,
    thinking: false,
    excludeIds: [],
  };
  render();
});

history.replaceState({ view: "splash" }, "");
render();
setInterval(() => {
  const node = document.querySelector(".status-bar span");
  if (node) node.textContent = clock();
}, 30000);
