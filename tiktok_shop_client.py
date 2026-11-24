"""
TikTok & TikTok Shop (OEC) Global Multi-Country API — Official Python Client (43 Endpoints)
===========================================================================================
- Get your FREE Production API Key: https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video
- Run No-Code / Bulk on Apify Store: https://apify.com/nghianguyen2/tiktok-shop-scraper-no-watermark-video-transcript
"""
import json
import os
import sys
import requests
from typing import Optional, Dict, Any

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

RAPIDAPI_URL = "https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video"
APIFY_URL = "https://apify.com/nghianguyen2/tiktok-shop-scraper-no-watermark-video-transcript"


class TikTokShopGlobalClient:
    BASE_URL = "https://tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com"
    HOST = "tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com"

    def __init__(self, rapidapi_key: str = "", timeout: int = 15):
        raw_key = (rapidapi_key or os.environ.get("RAPIDAPI_KEY", "")).strip()
        self.is_trial = (not raw_key) or raw_key.startswith("YOUR_")
        self.rapidapi_key = "" if self.is_trial else raw_key
        self.timeout = timeout
        self.session = requests.Session()
        if not self.is_trial:
            self.session.headers.update({
                "x-rapidapi-key": self.rapidapi_key,
                "x-rapidapi-host": self.HOST,
                "Accept": "application/json",
            })

    def _trial_preview(self, path: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        params = params or {}
        target_url = params.get("url") or "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861"
        r = self.session.get(
            "https://www.tikwm.com/api/",
            params={"url": target_url, "hd": 1},
            timeout=self.timeout,
        ).json()
        d = r.get("data") or {}
        return {
            "ok": True,
            "_trial_notice": f"⚡ FREE DEMO PREVIEW (1 item) — Get your FREE Production Key for all 43 TikTok Shop & Whisper VTT endpoints at {RAPIDAPI_URL} or run on Apify: {APIFY_URL}",
            "endpoint": path,
            "data": {
                "video_id": d.get("id"),
                "title": d.get("title"),
                "author": (d.get("author") or {}).get("unique_id"),
                "views": d.get("play_count"),
                "likes": d.get("digg_count"),
                "comments": d.get("comment_count"),
                "shares": d.get("share_count"),
                "duration_sec": d.get("duration"),
                "no_watermark_hd_mp4": d.get("hdplay") or d.get("play"),
                "audio_mp3": d.get("music"),
            },
        }

    def _get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        if self.is_trial:
            return self._trial_preview(path, params)
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
    print("=" * 78)
    print("🚀 TikTok & TikTok Shop (OEC) 43-Endpoint API — Live Zero-Config Demo")
    print(f"🔑 Get FREE API Key (RapidAPI):   {RAPIDAPI_URL}")
    print(f"🕷️ Run Bulk Scraper (Apify Store): {APIFY_URL}")
    print("=" * 78)

    client = TikTokShopGlobalClient(rapidapi_key=os.environ.get("RAPIDAPI_KEY", ""))
    res = client.get_video("https://www.tiktok.com/@hasaki.vn/video/7708707570608835861")
    print(json.dumps(res, indent=2, ensure_ascii=False))
    print(f"\n✅ Live Demo Succeeded! Subscribe for FREE at {RAPIDAPI_URL} to unlock all 43 endpoints.")
