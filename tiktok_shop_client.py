"""
TikTok & TikTok Shop (OEC) Global Multi-Country API — Official Python Client (35 Endpoints)
Get your API Key at: https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video
"""
import requests
from typing import Optional, Dict, Any


class TikTokShopGlobalClient:
    BASE_URL = "https://tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com"
    HOST = "tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com"

    def __init__(self, rapidapi_key: str, timeout: int = 15):
        self.rapidapi_key = rapidapi_key
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({
            "x-rapidapi-key": self.rapidapi_key,
            "x-rapidapi-host": self.HOST,
            "Accept": "application/json",
        })

    def _get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        resp = self.session.get(f"{self.BASE_URL}{path}", params=params or {}, timeout=self.timeout)
        resp.raise_for_status()
        return resp.json()

    def get_video(self, url_or_id: str) -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/video", {"url": url_or_id})

    def get_user(self, username: str) -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/user", {"username": username})

    def get_user_posts_and_shop_products(self, username: str, limit: int = 6) -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/user-posts", {"username": username, "limit": limit})

    def get_shop_product(self, url_or_product_id: str, region: str = "") -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/shop-product", {"url": url_or_product_id, "region": region})

    def get_shop_seller(self, seller_id: str, region: str = "US") -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/shop-seller", {"seller_id": seller_id, "region": region})

    def get_video_transcript(self, url_or_id: str) -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/video-transcript", {"url": url_or_id})

    def translate_subtitle(self, url_or_video_id: str, target_lang: str = "en", subtitle_id: str = "") -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/translate-subtitle", {
            "url": url_or_video_id,
            "target_lang": target_lang,
            "subtitle_id": subtitle_id,
        })

    def translate_text(self, pipe_separated_texts: str, target_lang: str = "en") -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/translate-text", {"text": pipe_separated_texts, "target_lang": target_lang})

    def get_commercial_music_beats(self, count: int = 5, region: str = "US") -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/commercial-music-beats", {"count": count, "region": region})

    def shorten_link(self, target_url: str) -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/shorten-link", {"url": target_url})

    def build_deeplinks(self, product_id: str, seller_id: str = "", region: str = "US") -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/deeplink-builder", {
            "product_id": product_id,
            "seller_id": seller_id,
            "region": region,
        })

    def get_live_room(self, username_or_room_id: str) -> Dict[str, Any]:
        return self._get("/api/v1/tiktok/live-room", {"username": username_or_room_id})


if __name__ == "__main__":
    client = TikTokShopGlobalClient(rapidapi_key="YOUR_RAPIDAPI_KEY")
    print(client.get_shop_product("https://vt.tiktok.com/ZS9fE6SehCja8-NGCg0/"))
