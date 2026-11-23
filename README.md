# TikTok & TikTok Shop MCP Server + 35-Endpoint Global API (No-Watermark Video, Comments, Subtitles, Beat-Sync & CapCut Templates)

[![RapidAPI](https://img.shields.io/badge/RapidAPI-TikTok%20%26%20TikTok%20Shop%20Global%20API-0055FF?style=for-the-badge&logo=rapidapi)](https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video)
[![MCP Server](https://img.shields.io/badge/MCP-Model%20Context%20Protocol%202024--11--05-7C3AED?style=for-the-badge)](https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video)
[![Service Level](https://img.shields.io/badge/Service%20Level-100%25-00C853?style=for-the-badge)](https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video)

An **open-source Model Context Protocol (MCP) Server** and **Python / Node.js SDK** for **Claude Desktop, Cursor, Windsurf, VS Code Copilot, Smithery.ai, and Glama.ai**, powered by our **35-Endpoint Global Multi-Country TikTok & TikTok Shop Edge Engine** (`22+ Regions`: `US`, `UK`, `VN`, `ID`, `TH`, `BR`, `MY`, `PH`, `SG`, `JP`, `KR`, `DE`, `FR`, `ES`, `IT`, `MX`, `CA`, `AU`, `SA`, `AE`, `TW`).

👉 **[Get Your FREE RapidAPI Key in 10 Seconds — TikTok Data, TikTok Shop & No Watermark Video](https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video)**

---

## 🤖 What Makes This MCP Server Special?

### 1. Instant Free Offline / Zero-Key Tools (Works Out-of-the-Box Without Any API Key!)
Even before you add an API key, Claude and Cursor can immediately use **3 built-in offline forensics & creative tools**:
- **`decode_tiktok_snowflake`** — Bitwise 64-bit Snowflake ID forensics: decode any TikTok Video ID, User ID, Comment ID, Live Room ID, or Product ID into its exact UTC creation timestamp (millisecond precision), age in days, and datacenter worker shard.
- **`build_tiktok_shop_deeplink`** — Generate native mobile app deep-links (`snssdk1233://` & `snssdk1180://`) and universal attribution links for any TikTok Shop product across 22+ countries.
- **`analyze_short_video_hook_and_beats`** — Score any video opening script/transcript (`0–100`) for 3-second viewer retention triggers and generate an auto-cut beat timeline (`[0.469s, 1.407s, 2.345s...]`) synced to audio BPM.

### 2. Real-Time Global Cloud Tools (22+ Markets via `RAPIDAPI_KEY`)
Add your free `RAPIDAPI_KEY` from **[RapidAPI Hub](https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video)** to unlock 8 live multi-region AI Agent tools backed by 35 production endpoints:
- **`get_tiktok_video_intelligence`** — Full video metadata, views/likes/shares/saves, author details, music info, no-watermark HD video streams & photo carousel slideshows.
- **`get_tiktok_creator_profile_and_analytics`** — Creator profile, follower/heart totals, engagement velocity analytics & recent posts with tagged products.
- **`get_tiktok_video_comments_and_replies`** — Top viewer comments & nested reply threads for audience sentiment analysis and product FAQ discovery.
- **`get_tiktok_trending_and_search`** — Trending feeds, search autocomplete suggestions, short-drama/ad spy & related videos across 22+ countries.
- **`get_tiktok_shop_product_and_seller`** — TikTok Shop product detail, seller store metrics, creator showcase items & affiliate shortlink (`vt.tiktok.com`) forensics.
- **`get_tiktok_transcript_and_translate`** — Extract WebVTT subtitles/transcripts and neural translations into any target language.
- **`get_tiktok_commercial_music_and_capcut_templates`** — Commercial-cleared music tracks with millisecond **`StrongBeat` onset arrays**, unlimited music playlists, CapCut template videos & effect/sticker trends.
- **`get_tiktok_live_room_intelligence`** — Batch check live rooms (`check_alive`), fetch live room viewer counts, or browse regional live categories and virtual gift catalogs.

---

## ⚡ Quick Setup for Claude Desktop, Cursor & Windsurf

### 1. Clone & Test Locally (Zero External Dependencies — Pure Node.js `>=18`)
```bash
git clone https://github.com/Techssss/tiktok-scraper-api-tiktok-shop-no-watermark.git
cd tiktok-scraper-api-tiktok-shop-no-watermark
node test_mcp.js
```

### 2. Add to Claude Desktop (`claude_desktop_config.json`) or Cursor (`.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "tiktok-shop": {
      "command": "node",
      "args": ["/absolute/path/to/tiktok-scraper-api-tiktok-shop-no-watermark/index.js"],
      "env": {
        "RAPIDAPI_KEY": "YOUR_FREE_RAPIDAPI_KEY"
      }
    }
  }
}
```
*(Get your free `RAPIDAPI_KEY` at: https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video)*

### 3. Example Prompts to Ask Claude / Cursor
- *"Decode TikTok video ID `7687152988393147656` to see the exact UTC second it was uploaded and which datacenter shard generated it."*
- *"Fetch the full video stats, comments, and transcript for `https://www.tiktok.com/@khoahocvavutru0/video/7687152988393147656` and summarize the audience sentiment."*
- *"Find 5 commercial-cleared TikTok music tracks in the US with their exact StrongBeat timestamps so I can auto-sync my video cuts."*
- *"Analyze what products are in creator UID `6816691226508608513`'s TikTok Shop showcase and generate native mobile deeplinks for them."*

---

## 🌐 Direct REST API Usage (Python & Node.js — 35 Global Endpoints)

### Python Quickstart
```python
import requests

HEADERS = {
    "x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
    "x-rapidapi-host": "tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com"
}
BASE = "https://tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com"

# 1. No-Watermark HD Video & Engagement Stats
res = requests.get(f"{BASE}/api/v1/tiktok/video", headers=HEADERS, params={
    "url": "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861"
}).json()
print("Video:", res)

# 2. Video Comments & Nested Replies
comments = requests.get(f"{BASE}/api/v1/tiktok/comments", headers=HEADERS, params={
    "url": "https://www.tiktok.com/@scout2015/video/6718335390845095173",
    "limit": "20"
}).json()
print("Comments:", comments)
```

---

## 🔗 Sister E-Commerce & Crypto APIs by Techssss on RapidAPI
- 🛍️ [**Shopee E-Commerce, Live & Affiliate Intelligence API (8 Countries: VN, ID, TH, PH, MY, SG, TW, BR)**](https://rapidapi.com/Techssss/api/shopee-e-commerce-live-affiliate-intelligence)
- 🎵 [**TikTok Data, TikTok Shop & No Watermark Video API (35 Endpoints, 22+ Countries)**](https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video)
- 🐦 [**Twitter (X) Real-Time Data & Crypto X-Intel API (Solana / Pump.fun / RugCheck / KOL Velocity)**](https://rapidapi.com/Techssss/api/twitter-x-real-time-data-crypto-x-intel)
