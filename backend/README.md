# 后端原型

## 启动

只需要 Python 3.10 或更高版本，不使用第三方依赖：

```powershell
cd "C:\Users\Liu.Shumeng.Carmen\Downloads\whattoeat"
python backend/server.py
```

服务默认运行在 `http://localhost:3000`，同时托管当前网页和 `/api/*` 接口。

## 地图附近餐厅

在[高德开放平台](https://console.amap.com/dev/key/app)创建一个 **Web 服务** Key，
然后打开项目根目录的 `.env`：

```dotenv
AMAP_WEB_KEY=你的Web服务Key
PORT=3000
```

保存后运行 `python backend/server.py`。`.env` 已加入 `.gitignore`，不会被 Git
提交；系统环境变量的同名配置会优先于 `.env`。

网页地图使用 OpenStreetMap 进行选点；后端会把浏览器获得的 WGS84 坐标转换为
高德使用的 GCJ-02，再通过 `POST /api/map/nearby` 查询附近餐饮 POI。

个人常点订单保存在浏览器 `localStorage`，不会上传到后端。地图 POI 只能说明附近
存在该餐厅，不能确认外卖平台营业状态、菜单或配送范围。

## 接口

### 服务状态

`GET /api/health`

### 地图附近餐厅

`POST /api/map/nearby`

```json
{
  "latitude": 31.2304,
  "longitude": 121.4737,
  "radius": 3000
}
```

### 推荐自己做

`POST /api/recommendations/cook`

```json
{
  "pantryItems": ["番茄", "鸡蛋"],
  "willingToShop": false,
  "filters": {
    "people": 1,
    "cuisine": "chinese",
    "spice": "none",
    "budget": "low",
    "skill": "beginner",
    "maxCookMinutes": 30
  }
}
```

不愿买菜时，只返回现有食材足够完成的菜谱；愿意买菜时，会返回缺少的食材。
