"""今天吃什么：零依赖 Python 原型后端。"""

from __future__ import annotations

import json
import math
import os
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any


PROJECT_ROOT = Path(__file__).resolve().parent.parent


def load_env_file(path: Path) -> None:
    """Load simple KEY=VALUE pairs without adding a third-party dependency."""
    if not path.is_file():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", maxsplit=1)
        key = key.strip()
        value = value.strip()
        if value[:1] == value[-1:] and value.startswith(("'", '"')):
            value = value[1:-1]
        if key:
            os.environ.setdefault(key, value)


load_env_file(PROJECT_ROOT / ".env")

HOST = os.environ.get("HOST", "127.0.0.1")
PORT = int(os.environ.get("PORT", "3000"))
MAX_BODY_BYTES = 64 * 1024
AMAP_API_URL = "https://restapi.amap.com/v5/place/around"

RECIPES = [
    {
        "id": "tomato-egg",
        "name": "番茄炒蛋",
        "cuisine": "chinese",
        "spice": "none",
        "priceLevel": "low",
        "skill": "beginner",
        "minutes": 15,
        "ingredients": ["番茄", "鸡蛋", "食用油", "盐"],
        "pantryStaples": ["食用油", "盐"],
        "steps": ["鸡蛋打散，番茄切块", "先炒鸡蛋并盛出", "炒软番茄，鸡蛋回锅调味"],
    },
    {
        "id": "soy-noodles",
        "name": "葱油拌面",
        "cuisine": "chinese",
        "spice": "mild",
        "priceLevel": "low",
        "skill": "beginner",
        "minutes": 15,
        "ingredients": ["面条", "小葱", "食用油", "生抽", "糖"],
        "pantryStaples": ["食用油", "生抽", "糖"],
        "steps": ["煮面", "小火炸香小葱", "加入生抽和糖，与面条拌匀"],
    },
    {
        "id": "mapo-tofu",
        "name": "麻婆豆腐",
        "cuisine": "chinese",
        "spice": "hot",
        "priceLevel": "low",
        "skill": "home",
        "minutes": 25,
        "ingredients": ["豆腐", "肉末", "豆瓣酱", "花椒", "食用油"],
        "pantryStaples": ["食用油"],
        "steps": ["豆腐切块焯水", "炒香肉末和豆瓣酱", "加入豆腐烧入味，撒花椒"],
    },
    {
        "id": "steamed-fish",
        "name": "清蒸鲈鱼",
        "cuisine": "chinese",
        "spice": "none",
        "priceLevel": "high",
        "skill": "home",
        "minutes": 30,
        "ingredients": ["鲈鱼", "姜", "小葱", "蒸鱼豉油", "食用油"],
        "pantryStaples": ["食用油"],
        "steps": ["鱼身铺姜丝", "大火蒸熟", "淋蒸鱼豉油和热油"],
    },
    {
        "id": "tomato-beef",
        "name": "番茄牛腩",
        "cuisine": "chinese",
        "spice": "mild",
        "priceLevel": "high",
        "skill": "home",
        "minutes": 70,
        "ingredients": ["番茄", "牛腩", "葱", "食用油", "盐"],
        "pantryStaples": ["食用油", "盐"],
        "steps": ["牛腩焯水", "番茄炒出沙，下牛腩小火炖软", "盐、糖调味"],
    },
    {
        "id": "kungpao",
        "name": "宫保鸡丁",
        "cuisine": "chinese",
        "spice": "hot",
        "priceLevel": "mid",
        "skill": "challenge",
        "minutes": 35,
        "ingredients": ["鸡肉", "花生", "干辣椒", "食用油", "盐"],
        "pantryStaples": ["食用油", "盐"],
        "steps": ["鸡丁腌制", "调碗芡", "爆香干辣椒花生，快速翻炒收汁"],
    },
    {
        "id": "garlic-pasta",
        "name": "蒜香橄榄油意面",
        "cuisine": "western",
        "spice": "mild",
        "priceLevel": "mid",
        "skill": "beginner",
        "minutes": 20,
        "ingredients": ["意面", "大蒜", "橄榄油", "辣椒", "盐"],
        "pantryStaples": ["盐"],
        "steps": ["意面煮至微硬", "橄榄油小火炒香蒜片", "加入面汤和意面拌匀"],
    },
    {
        "id": "avocado-sandwich",
        "name": "牛油果鸡蛋三明治",
        "cuisine": "western",
        "spice": "none",
        "priceLevel": "mid",
        "skill": "beginner",
        "minutes": 15,
        "ingredients": ["吐司", "牛油果", "鸡蛋", "黑胡椒", "盐"],
        "pantryStaples": ["黑胡椒", "盐"],
        "steps": ["吐司烤香", "牛油果压泥并煎蛋", "夹好后加黑胡椒调味"],
    },
    {
        "id": "mushroom-risotto",
        "name": "蘑菇烩饭",
        "cuisine": "western",
        "spice": "none",
        "priceLevel": "high",
        "skill": "challenge",
        "minutes": 50,
        "ingredients": ["意大利米", "蘑菇", "洋葱", "高汤", "帕玛森", "黄油"],
        "pantryStaples": [],
        "steps": ["炒香洋葱和蘑菇", "分次加入高汤煮米", "拌入帕玛森和黄油"],
    },
    {
        "id": "gyudon",
        "name": "日式肥牛丼",
        "cuisine": "japanese_korean",
        "spice": "mild",
        "priceLevel": "mid",
        "skill": "beginner",
        "minutes": 20,
        "ingredients": ["肥牛片", "洋葱", "米饭", "酱油", "糖"],
        "pantryStaples": ["酱油", "糖"],
        "steps": ["洋葱炒软", "肥牛片下锅收汁", "浇在热饭上"],
    },
    {
        "id": "kimchi-fried-rice",
        "name": "韩式泡菜炒饭",
        "cuisine": "japanese_korean",
        "spice": "hot",
        "priceLevel": "low",
        "skill": "beginner",
        "minutes": 15,
        "ingredients": ["泡菜", "米饭", "鸡蛋", "食用油"],
        "pantryStaples": ["食用油"],
        "steps": ["泡菜炒出红油", "下隔夜饭翻匀", "煎蛋盖顶"],
    },
    {
        "id": "miso-salmon",
        "name": "味噌烤三文鱼",
        "cuisine": "japanese_korean",
        "spice": "none",
        "priceLevel": "high",
        "skill": "home",
        "minutes": 25,
        "ingredients": ["三文鱼", "味噌", "味淋", "糖"],
        "pantryStaples": ["糖"],
        "steps": ["味噌酱腌鱼", "烤至表面上色", "配米饭和青菜"],
    },
    {
        "id": "vietnamese-rolls",
        "name": "越南春卷",
        "cuisine": "southeast_asian",
        "spice": "none",
        "priceLevel": "mid",
        "skill": "beginner",
        "minutes": 20,
        "ingredients": ["米纸", "生菜", "虾", "香菜", "鱼露"],
        "pantryStaples": [],
        "steps": ["米纸浸软", "生菜香草和虾卷紧", "配蘸料"],
    },
    {
        "id": "tom-yum",
        "name": "泰式冬阴功",
        "cuisine": "southeast_asian",
        "spice": "hot",
        "priceLevel": "mid",
        "skill": "home",
        "minutes": 30,
        "ingredients": ["香茅", "南姜", "柠檬叶", "虾", "蘑菇"],
        "pantryStaples": [],
        "steps": ["香料煮汤", "下虾和蘑菇", "鱼露柠檬汁调味"],
    },
    {
        "id": "coconut-curry",
        "name": "南洋咖喱鸡",
        "cuisine": "southeast_asian",
        "spice": "mild",
        "priceLevel": "high",
        "skill": "home",
        "minutes": 40,
        "ingredients": ["鸡腿", "咖喱膏", "椰浆", "洋葱"],
        "pantryStaples": [],
        "steps": ["咖喱膏炒香", "下鸡块上色", "倒入椰浆小火煮软"],
    },
]

SKILL_RANK = {"beginner": 1, "home": 2, "challenge": 3}

CUISINE_NEARBY = {
    "chinese": {"types": "050100", "keywords": ""},
    "western": {"types": "050000", "keywords": "西餐|意大利菜|披萨"},
    "japanese_korean": {"types": "050201|050202", "keywords": "日本料理|韩国料理"},
    "southeast_asian": {"types": "050000", "keywords": "泰国菜|越南菜|东南亚"},
}

CUISINE_TEXT = {
    "japanese_korean": re.compile(r"日本|日式|日料|寿司|刺身|居酒屋|韩国|韩式|韩餐|韩料|和食|料亭|寿喜|鳗鱼|石锅"),
    "southeast_asian": re.compile(r"泰国|泰式|泰餐|越南|越式|南洋|马来|新加坡|东南亚|冬阴功|印尼"),
    "western": re.compile(r"西餐|西式|意大利|披萨|比萨|汉堡|牛排|法式|美式|意面"),
}


class ApiError(Exception):
    def __init__(self, status: int, code: str, message: str) -> None:
        super().__init__(message)
        self.status = status
        self.code = code
        self.message = message


def finite_number(value: Any) -> float | None:
    try:
        number = float(value)
        return number if math.isfinite(number) else None
    except (TypeError, ValueError):
        return None


def normalized_set(values: Any) -> set[str]:
    if not isinstance(values, list):
        return set()
    return {str(value).strip().lower() for value in values if str(value).strip()}


def recipe_matches(recipe: dict[str, Any], filters: dict[str, Any]) -> bool:
    cuisine = filters.get("cuisine", "any")
    if cuisine != "any" and recipe["cuisine"] != cuisine:
        return False

    spice = filters.get("spice", "any")
    requested_spice = "hot" if spice == "extreme" else spice
    if requested_spice != "any" and recipe["spice"] != requested_spice:
        return False

    budget = filters.get("budget", "any")
    if budget != "any" and recipe["priceLevel"] != budget:
        return False

    if not cook_time_fits(recipe["minutes"], finite_number(filters.get("maxCookMinutes"))):
        return False

    return skill_fits(recipe["skill"], filters.get("skill"))


def cook_time_fits(minutes: int, selected: float | None) -> bool:
    if selected is None:
        return True
    if selected <= 15:
        return minutes <= 20
    if selected <= 30:
        return minutes <= 40
    if selected <= 60:
        return 30 <= minutes <= 120
    return True


def skill_fits(recipe_skill: str, wanted: Any) -> bool:
    rank = SKILL_RANK.get(recipe_skill, 1)
    if wanted == "beginner":
        return rank == 1
    if wanted == "home":
        return rank <= 2
    if wanted == "challenge":
        return rank >= 2
    return True


def recommend_recipes(body: dict[str, Any]) -> dict[str, Any]:
    pantry = normalized_set(body.get("pantryItems"))
    willing_to_shop = bool(body.get("willingToShop"))
    filters = body.get("filters") if isinstance(body.get("filters"), dict) else {}
    candidates = []

    for recipe in RECIPES:
        if not recipe_matches(recipe, filters):
            continue

        staples = {item.lower() for item in recipe["pantryStaples"]}
        missing = [
            item
            for item in recipe["ingredients"]
            if item.lower() not in pantry and item.lower() not in staples
        ]
        if missing and not willing_to_shop:
            continue

        available = [
            item
            for item in recipe["ingredients"]
            if item.lower() in pantry or item.lower() in staples
        ]
        coverage = len(available) / len(recipe["ingredients"])
        score = coverage * 100 - len(missing) * 5
        selected_time = finite_number(filters.get("maxCookMinutes"))
        if filters.get("skill") == "challenge" or (selected_time is not None and 30 < selected_time <= 60):
            score += recipe["minutes"] / 4 + SKILL_RANK[recipe["skill"]] * 10
        else:
            score -= recipe["minutes"] / 10
        score = round(max(0, score))
        candidates.append(
            {
                **recipe,
                "matchScore": score,
                "availableIngredients": available,
                "missingIngredients": missing,
                "requiresShopping": bool(missing),
            }
        )

    candidates.sort(key=lambda item: item["matchScore"], reverse=True)
    return {
        "recommendations": candidates[:5],
        "needsPantryConfirmation": not isinstance(body.get("pantryItems"), list),
        "message": (
            "已优先按现有食材匹配"
            if candidates
            else "当前条件没有匹配菜谱，可以允许买菜或放宽条件"
        ),
    }


def out_of_china(latitude: float, longitude: float) -> bool:
    return not (72.004 <= longitude <= 137.8347 and 0.8293 <= latitude <= 55.8271)


def transform_latitude(x: float, y: float) -> float:
    result = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * math.sqrt(abs(x))
    result += (20 * math.sin(6 * x * math.pi) + 20 * math.sin(2 * x * math.pi)) * 2 / 3
    result += (20 * math.sin(y * math.pi) + 40 * math.sin(y / 3 * math.pi)) * 2 / 3
    result += (160 * math.sin(y / 12 * math.pi) + 320 * math.sin(y * math.pi / 30)) * 2 / 3
    return result


def transform_longitude(x: float, y: float) -> float:
    result = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * math.sqrt(abs(x))
    result += (20 * math.sin(6 * x * math.pi) + 20 * math.sin(2 * x * math.pi)) * 2 / 3
    result += (20 * math.sin(x * math.pi) + 40 * math.sin(x / 3 * math.pi)) * 2 / 3
    result += (150 * math.sin(x / 12 * math.pi) + 300 * math.sin(x / 30 * math.pi)) * 2 / 3
    return result


def wgs84_to_gcj02(latitude: float, longitude: float) -> tuple[float, float]:
    if out_of_china(latitude, longitude):
        return latitude, longitude

    axis = 6378245.0
    eccentricity = 0.006693421622965943
    delta_lat = transform_latitude(longitude - 105, latitude - 35)
    delta_lng = transform_longitude(longitude - 105, latitude - 35)
    rad_lat = latitude / 180 * math.pi
    magic = 1 - eccentricity * math.sin(rad_lat) ** 2
    sqrt_magic = math.sqrt(magic)
    delta_lat = delta_lat * 180 / ((axis * (1 - eccentricity) / (magic * sqrt_magic)) * math.pi)
    delta_lng = delta_lng * 180 / ((axis / sqrt_magic) * math.cos(rad_lat) * math.pi)
    return latitude + delta_lat, longitude + delta_lng


def first_text(value: Any) -> str:
    if isinstance(value, list):
        return str(value[0]) if value else ""
    return value if isinstance(value, str) else ""


def compatible_ssl_context() -> ssl.SSLContext:
    """Keep certificate validation while tolerating legacy corporate CAs."""
    context = ssl.create_default_context()
    strict_flag = getattr(ssl, "VERIFY_X509_STRICT", 0)
    if strict_flag:
        context.verify_flags &= ~strict_flag
    return context


def parse_amap_location(value: Any) -> dict[str, float] | None:
    try:
        longitude, latitude = (float(part) for part in str(value).split(",", maxsplit=1))
        return {"latitude": latitude, "longitude": longitude}
    except (TypeError, ValueError):
        return None


def poi_matches_cuisine(name: str, category: str, cuisine: str) -> bool:
    if cuisine in {"", "any"}:
        return True
    blob = f"{name} {category}"
    if cuisine == "chinese":
        return not any(pattern.search(blob) for pattern in CUISINE_TEXT.values())
    pattern = CUISINE_TEXT.get(cuisine)
    return bool(pattern and pattern.search(blob))


def search_nearby(body: dict[str, Any]) -> dict[str, Any]:
    latitude = finite_number(body.get("latitude"))
    longitude = finite_number(body.get("longitude"))
    radius = finite_number(body.get("radius")) or 3000

    if (
        latitude is None
        or longitude is None
        or not -90 <= latitude <= 90
        or not -180 <= longitude <= 180
    ):
        raise ApiError(HTTPStatus.BAD_REQUEST, "INVALID_LOCATION", "需要有效的地图选点坐标")

    key = os.environ.get("AMAP_WEB_KEY")
    if not key:
        return {
            "configured": False,
            "provider": "amap",
            "restaurants": [],
            "message": "尚未配置 AMAP_WEB_KEY，附近餐厅暂不显示",
        }

    gcj_latitude, gcj_longitude = wgs84_to_gcj02(latitude, longitude)
    cuisine = str(body.get("cuisine") or "any")
    nearby_query = CUISINE_NEARBY.get(cuisine, {"types": "050000", "keywords": ""})
    query = {
        "key": key,
        "location": f"{gcj_longitude:.6f},{gcj_latitude:.6f}",
        "types": nearby_query["types"],
        "radius": str(round(max(100, min(10000, radius)))),
        "sortrule": "distance",
        "page_size": "25",
        "show_fields": "business",
    }
    if nearby_query["keywords"]:
        query["keywords"] = nearby_query["keywords"]
    params = urllib.parse.urlencode(query)
    request = urllib.request.Request(
        f"{AMAP_API_URL}?{params}",
        headers={"User-Agent": "whattoeat/0.1"},
    )

    try:
        with urllib.request.urlopen(request, timeout=8, context=compatible_ssl_context()) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
        raise ApiError(HTTPStatus.BAD_GATEWAY, "MAP_PROVIDER_ERROR", f"高德地点搜索失败：{error}") from error

    if payload.get("status") != "1":
        info = str(payload.get("info") or "")
        if "USERKEY" in info.upper() or "INVALID" in info.upper() and "KEY" in info.upper():
            raise ApiError(
                HTTPStatus.BAD_GATEWAY,
                "MAP_PROVIDER_ERROR",
                f"高德地点搜索失败：{info or '未知错误'}",
            )
        if cuisine != "any":
            return {
                "configured": True,
                "provider": "amap",
                "restaurants": [],
                "message": "附近地图点里没有明显符合所选口味的店，可以用搜索词去外卖平台确认",
            }
        raise ApiError(
            HTTPStatus.BAD_GATEWAY,
            "MAP_PROVIDER_ERROR",
            f"高德地点搜索失败：{info or '未知错误'}",
        )

    restaurants = [
        {
            "id": poi.get("id"),
            "name": poi.get("name"),
            "category": poi.get("type"),
            "address": first_text(poi.get("address")),
            "distanceMeters": finite_number(poi.get("distance")),
            "location": parse_amap_location(poi.get("location")),
            "telephone": first_text(poi.get("tel")),
            "provider": "amap",
            "availabilityVerified": False,
        }
        for poi in payload.get("pois", [])
        if poi_matches_cuisine(str(poi.get("name") or ""), str(poi.get("type") or ""), cuisine)
    ]
    message = "地图数据不能确认外卖平台营业状态、菜单或配送范围"
    if cuisine != "any" and not restaurants:
        message = "附近地图点里没有明显符合所选口味的店，可以用搜索词去外卖平台确认"
    return {
        "configured": True,
        "provider": "amap",
        "restaurants": restaurants[:20],
        "message": message,
    }


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def send_json(self, status: int, payload: dict[str, Any]) -> None:
        content = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(content)

    def read_json(self) -> dict[str, Any]:
        content_length = int(self.headers.get("Content-Length", "0"))
        if content_length > MAX_BODY_BYTES:
            raise ApiError(HTTPStatus.REQUEST_ENTITY_TOO_LARGE, "BODY_TOO_LARGE", "请求内容过大")
        try:
            data = json.loads(self.rfile.read(content_length).decode("utf-8") or "{}")
        except (UnicodeDecodeError, json.JSONDecodeError) as error:
            raise ApiError(HTTPStatus.BAD_REQUEST, "INVALID_JSON", "请求体不是有效的 JSON") from error
        if not isinstance(data, dict):
            raise ApiError(HTTPStatus.BAD_REQUEST, "INVALID_JSON", "请求体必须是 JSON 对象")
        return data

    def do_GET(self) -> None:  # noqa: N802
        if self.path == "/api/health":
            self.send_json(
                HTTPStatus.OK,
                {
                    "ok": True,
                    "runtime": "python",
                    "mapProvider": "amap",
                    "mapConfigured": bool(os.environ.get("AMAP_WEB_KEY")),
                    "personalHistoryStorage": "browser-localStorage",
                },
            )
            return
        if self.path.startswith("/api/"):
            self.send_json(
                HTTPStatus.NOT_FOUND,
                {"error": {"code": "NOT_FOUND", "message": "接口不存在"}},
            )
            return
        super().do_GET()

    def do_POST(self) -> None:  # noqa: N802
        try:
            body = self.read_json()
            if self.path == "/api/map/nearby":
                self.send_json(HTTPStatus.OK, search_nearby(body))
                return
            if self.path == "/api/recommendations/cook":
                self.send_json(HTTPStatus.OK, recommend_recipes(body))
                return
            raise ApiError(HTTPStatus.NOT_FOUND, "NOT_FOUND", "接口不存在")
        except ApiError as error:
            self.send_json(
                error.status,
                {"error": {"code": error.code, "message": error.message}},
            )
        except Exception as error:  # Keep internal details out of API responses.
            self.log_error("Unhandled API error: %r", error)
            self.send_json(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                {"error": {"code": "INTERNAL_ERROR", "message": "服务器暂时开小差了"}},
            )


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"WhatToEat is running at http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()
