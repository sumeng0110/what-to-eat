# 今天吃什么

一个帮助 1–5 人决定今天吃什么的网页应用。它将“自己做”和“点外卖”拆成两条决策流程，并优先使用用户自己的真实常点记录，而不是虚构外卖平台数据。

## 功能

### 自己做

- 按人数、口味、辣度、人均预算、厨艺和时间筛选
- 记录冰箱现有食材
- 根据是否愿意买菜生成菜谱和采购清单

### 点外卖

- 浏览器定位或地图点击选点
- 从浏览器本地保存的“我的常点”中推荐
- 通过高德 Web 服务查询地图上真实存在的附近餐厅
- 生成可复制到外卖平台的搜索词

> 地图 POI 只能说明餐厅位于附近，不能确认其已入驻外卖平台、当前营业、菜单在售或可以配送。

## 技术栈

- 前端：原生 HTML、CSS、JavaScript
- 地图选点：Leaflet + OpenStreetMap
- 附近餐厅：高德 Web 服务 API
- 后端：Python 标准库，无第三方依赖
- 个人历史：浏览器 `localStorage`

## 本地运行

需要 Python 3.10 或更高版本。

1. 复制环境变量示例：

   ```powershell
   Copy-Item ".env.example" ".env"
   ```

2. 在 `.env` 中填写高德开放平台的 **Web 服务** Key：

   ```dotenv
   AMAP_WEB_KEY=your_amap_web_service_key
   PORT=3000
   ```

3. 启动服务：

   ```powershell
   python backend/server.py
   ```

4. 打开 <http://localhost:3000>。

没有高德 Key 时，做饭流程和个人常点仍可使用，但不会显示附近餐厅。

## 测试

```powershell
python -m unittest -v backend.test_server
```

测试覆盖菜谱食材匹配、买菜逻辑、地图配置缺失、坐标校验和 WGS84 → GCJ-02 坐标转换。

## 数据与隐私

- `.env` 已被 Git 忽略，真实 Key 不会进入仓库
- 个人常点记录只保存在当前浏览器，不会上传到服务器
- 地图搜索只向后端发送用户选定的经纬度
- 应用不读取外卖平台账号、Cookie 或订单页面

## 项目结构

```text
.
├── index.html
├── styles.css
├── app.js
├── history-store.js
├── .env.example
└── backend
    ├── server.py
    ├── test_server.py
    └── README.md
```

## 当前限制

- 没有美团、淘宝闪购或京东外卖的实时菜单与配送数据
- 附近餐厅结果不能作为实时外卖库存使用
- Chrome/Edge 页面导入扩展尚未实现
