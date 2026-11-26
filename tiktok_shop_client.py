"""
Python Client for JiStudio TikTok & TikTok Shop Scraper on Apify Store
Actor: https://apify.com/jistudio/tiktok-shop-scraper
Get free token: https://console.apify.com/account/integrations
"""

import os
import requests

APIFY_TOKEN = os.environ.get("APIFY_TOKEN", "YOUR_APIFY_TOKEN")
ACTOR_SLUG = "jistudio~tiktok-shop-scraper"


def run_tiktok_actor(payload: dict, actor_slug: str = ACTOR_SLUG):
    url = f"https://api.apify.com/v2/acts/{actor_slug}/run-sync-get-dataset-items"
    resp = requests.post(
        url,
        params={"token": APIFY_TOKEN, "clean": "true"},
        json=payload,
        timeout=90,
    )
    resp.raise_for_status()
    return resp.json()


if __name__ == "__main__":
    # 1. Extract TikTok Shop Product Detail
    pdp = run_tiktok_actor({
        "action": "shop_product_detail",
        "productId": "https://vt.tiktok.com/ZS9fE6SehCja8-NGCg0/",
        "country": "VN",
    })
    print("TikTok Shop Product:", pdp[:1])

    # 2. Extract Voiceover Transcript (.VTT & plaintext)
    transcript = run_tiktok_actor(
        {
            "action": "whisper_transcript",
            "videoUrlOrId": "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861",
            "country": "VN",
        },
        actor_slug="jistudio~tiktok-transcript-scraper",
    )
    print("Transcript:", transcript[:1])
