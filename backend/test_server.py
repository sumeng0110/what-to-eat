import os
import unittest
from unittest.mock import patch

from backend.server import ApiError, recommend_recipes, search_nearby, wgs84_to_gcj02


class RecipeRecommendationTests(unittest.TestCase):
    def test_existing_ingredients_need_no_shopping(self):
        result = recommend_recipes(
            {
                "pantryItems": ["番茄", "鸡蛋"],
                "willingToShop": False,
                "filters": {
                    "cuisine": "chinese",
                    "spice": "none",
                    "budget": "low",
                    "skill": "beginner",
                    "maxCookMinutes": 30,
                },
            }
        )

        self.assertEqual(result["recommendations"][0]["id"], "tomato-egg")
        self.assertFalse(result["recommendations"][0]["requiresShopping"])
        self.assertEqual(result["recommendations"][0]["missingIngredients"], [])

    def test_no_recipe_when_shopping_is_disabled(self):
        result = recommend_recipes(
            {
                "pantryItems": [],
                "willingToShop": False,
                "filters": {
                    "cuisine": "western",
                    "spice": "none",
                    "budget": "high",
                    "skill": "challenge",
                    "maxCookMinutes": 60,
                },
            }
        )

        self.assertEqual(result["recommendations"], [])

    def test_missing_ingredients_returned_when_shopping_is_allowed(self):
        result = recommend_recipes(
            {
                "pantryItems": ["蘑菇"],
                "willingToShop": True,
                "filters": {
                    "cuisine": "western",
                    "spice": "none",
                    "budget": "high",
                    "skill": "challenge",
                    "maxCookMinutes": 60,
                },
            }
        )

        recipe = result["recommendations"][0]
        self.assertEqual(recipe["id"], "mushroom-risotto")
        self.assertTrue(recipe["requiresShopping"])
        self.assertIn("意大利米", recipe["missingIngredients"])

    def test_japanese_korean_recipe_matches_cuisine_filter(self):
        result = recommend_recipes(
            {
                "pantryItems": ["泡菜", "米饭", "鸡蛋"],
                "willingToShop": False,
                "filters": {
                    "cuisine": "japanese_korean",
                    "spice": "hot",
                    "budget": "low",
                    "skill": "beginner",
                    "maxCookMinutes": 20,
                },
            }
        )

        self.assertEqual(result["recommendations"][0]["id"], "kimchi-fried-rice")

    def test_challenge_and_hour_skips_quick_noodles(self):
        result = recommend_recipes(
            {
                "pantryItems": [],
                "willingToShop": True,
                "filters": {
                    "cuisine": "chinese",
                    "spice": "mild",
                    "budget": "any",
                    "skill": "challenge",
                    "maxCookMinutes": 60,
                },
            }
        )

        ids = [recipe["id"] for recipe in result["recommendations"]]
        self.assertNotIn("soy-noodles", ids)
        self.assertEqual(result["recommendations"][0]["id"], "tomato-beef")


class MapProviderTests(unittest.TestCase):
    @patch.dict(os.environ, {}, clear=True)
    def test_missing_key_returns_unconfigured_state(self):
        result = search_nearby({"latitude": 31.2304, "longitude": 121.4737})

        self.assertFalse(result["configured"])
        self.assertEqual(result["restaurants"], [])

    def test_invalid_coordinates_are_rejected(self):
        with self.assertRaises(ApiError):
            search_nearby({"latitude": 1000, "longitude": 121.4737})

    def test_china_coordinate_conversion_changes_point(self):
        latitude, longitude = wgs84_to_gcj02(31.2304, 121.4737)

        self.assertNotAlmostEqual(latitude, 31.2304, places=4)
        self.assertNotAlmostEqual(longitude, 121.4737, places=4)


if __name__ == "__main__":
    unittest.main()
