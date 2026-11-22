# 🎵 TikTok & TikTok Shop (OEC) Global Multi-Country Scraper API — No-Watermark Video, Whisper VTT Subtitles, Free AI Translation, StrongBeat Audio & Live FLV/HLS (`v3.2.0`)

[![RapidAPI Hub](https://img.shields.io/badge/RapidAPI-Try_35_Endpoints_Free-0055FF?style=for-the-badge&logo=rapidapi&logoColor=white)](https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video)
[![Global Markets](https://img.shields.io/badge/22+_Global_Markets-US_|_UK_|_ID_|_TH_|_VN_|_BR_|_JP_|_KR_|_EU-00F2FE?style=for-the-badge)](https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video)
[![Zero Cookie Required](https://img.shields.io/badge/Auth-Zero_TikTok_Cookies_Required-FE0979?style=for-the-badge)](https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video)

> **🚀 Live on RapidAPI Hub:** [**TikTok Data, TikTok Shop & No Watermark Video API (35 Endpoints)**](https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video)
> **⚡ Gateway Host:** `tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com`

---

## 🔥 Why Developers Switch From `tiktok-api23` / `tikwm` / `Kalodata` To This API

1. **Zero Download Quota Traps:** Other RapidAPI providers cap `/download/video` at 10–500 videos/day and charge `$0.02` per extra download (`$20` per 1,000 videos!). Our API returns **direct No-Watermark HD MP4 & Audio MP3 URLs** inside standard requests starting at **$4.99/month for 30,000 requests** (and a **$0.00/mo Free Tier**).
2. **Real TikTok Shop (OEC) Product & Seller Mall Extraction:** Pass any `vt.tiktok.com` shortlink, `shop.tiktok.com` URL, or 19-digit `product_id` / `seller_id` across **22+ countries (`US`, `GB`, `ID`, `TH`, `MY`, `PH`, `SG`, `VN`, `BR`, `JP`, `KR`, `EU`)** to extract real-time SKU variants, exact stock counts, **16+ uncompressed Studio Master `origin-jpeg` images**, **34+ hidden copywriting paragraphs (`desc_blocks`)**, and official TikTok Shop Mall metrics.
3. **Instant 0.2s Whisper ASR `WEBVTT` Transcripts & Free 0.11s AI Subtitle Translation:** Extract pre-generated Whisper `.vtt` time-synced transcripts without paying for GPU speech-to-text, and translate full time-synced `WEBVTT` subtitles or e-commerce product titles into 12+ languages for free.
4. **Commercial Music + AutoCut `StrongBeat Onsets` Drum-Beat JSON:** Fetch 100% copyright-safe commercial tracks (`is_commercial_music: true`) along with exact millisecond drum-beat onset timestamps (`[0.046, 0.348, 1.114...]`) for automated FFmpeg beat-synced video editing.
5. **Official `vt.tiktok.com` Shortlink Minter, TikCode QR Generator & 16 Native `aweme://ec/` Conversion Deep-Links:** Mint official `https://vt.tiktok.com/ZS.../` shortlinks and generate `decorate_insert_items` deep-links that pin your target product to **#1 on the seller's storefront**.
6. **TikTok Live Stream (`FLV` / `HLS .m3u8` / `Audio-Only` Low-Bandwidth Stream), Total Visitors (`enterCount`), & 850+ Official Live Gift Catalog.**

---

## 📋 Full 35-Endpoint Reference (`v3.2.0`)

### 🎬 1. Video, Profile, Trends & Algorithm Forensics (`VQScore` & `Snowflake`)
| Method & Path | Description |
| :--- | :--- |
| `GET /api/v1/tiktok/video?url=...` | No-Watermark HD MP4, Audio MP3, Whisper `.vtt` URL, Pinned Shop Products, CapCut Template, **Internal `VQScore` (0-100)** & **`LUFS` Loudness**. |
| `GET /api/v1/tiktok/user?username=...` | Full Creator Profile, Followers, Hearts, `sec_uid`, Seller Status & **Snowflake Account Creation Timestamp**. |
| `GET /api/v1/tiktok/user-posts?username=...&limit=6` | Latest Creator Videos + **Aggregated Pinned TikTok Shop Products (`type: 35`)** without `secUid` lookup. |
| `GET /api/v1/tiktok/creator-analytics?username=...` | Engagement Rate %, Tier Rating, Sponsorship Valuation (USD) & Bio Email / Instagram Lead Extractor. |
| `GET /api/v1/tiktok/comments?url=...&limit=20&cursor=0` | Top-level Video Comments, Likes, Reply Counts & Commenter Country/Region. |
| `GET /api/v1/tiktok/comment-replies?video_id=...&comment_id=...` | Nested Comment Replies under any parent comment with Commenter Region. |
| `GET /api/v1/tiktok/trending?region=US&limit=10` | Multi-Country Trending Videos Feed (`US`, `GB`, `VN`, `ID`, `TH`, `BR`, `JP`, `KR`, `DE`, `FR`). |
| `GET /api/v1/tiktok/explore-related-videos?video_id=...&region=US` | Explore Feed, 10+ Trending Category Feeds & Related Videos. |
| `GET /api/v1/tiktok/hashtag-videos?hashtag=tiktokshop&region=US` | Total Hashtag View Count + Top Viral No-Watermark Videos for any Hashtag. |
| `GET /api/v1/tiktok/slideshow?url=...` | Photo Mode Carousel HD Unwatermarked Slide Images + Background Audio MP3. |
| `GET /api/v1/tiktok/snowflake-decode?ids=...` | 64-Bit Snowflake Decoder (`id >> 32`): Exact UTC Creation Date & Age for up to 25 User/Video/Seller/Room IDs. |

### 🛒 2. TikTok Shop (OEC), Seller Mall, Affiliate Attribution & Deep-Links
| Method & Path | Description |
| :--- | :--- |
| `GET /api/v1/tiktok/shop-product?url=...&region=US` | Full TikTok Shop PDP: Real Price, Sold Count, **SKU Variants & Exact Stock**, **14+ Uncompressed Studio `origin-jpeg` Images**, & **34+ Copywriting `desc_blocks`**. |
| `GET /api/v1/tiktok/shop-seller?seller_id=...&region=VN` | OEC Seller Storefront: Shop Rating, Total Sold Count (`11.4M+`), **Official Mall Badge**, 5 Service Ratings & Store Categories. |
| `GET /api/v1/tiktok/creator-showcase?uid=...&region=US` | Creator Affiliate Showcase Tabs & Affiliate AB Configuration Flags. |
| `GET /api/v1/tiktok/shop-trending-keywords?count=10&region=US` | Live TikTok Shop E-Commerce Trending Search Prefetch Keywords. |
| `GET /api/v1/tiktok/search-suggestions?keyword=...&region=US` | Long-Tail SEO Autocomplete Suggestions + National TextNet Industry Keywords. |
| `GET /api/v1/tiktok/shorten-link?url=...` | Mint Official **`https://vt.tiktok.com/ZS.../`** Shortlinks & App Deep-Links. |
| `GET /api/v1/tiktok/parse-affiliate-link?url=...` | Decode any `vt.tiktok.com` link: extract `product_id`, `chain_key`, `ug_btm`, and **Sharer `@username` / `user_id` / `u_code`**. |
| `GET /api/v1/tiktok/qrcode?target_id=...&schema_type=4` | Generate Official **TikCode & Share QR Code** PNG/WebP images. |
| `GET /api/v1/tiktok/deeplink-builder?product_id=...&seller_id=...` | Build 16 Native `aweme://ec/` Deep-Links (including **Storefront #1 Product Pinning `decorate_insert_items`** & 1-Click SKU Picker). |

### 🤖 3. AI Whisper `.vtt` Transcripts, Neural Subtitle/Text Translation & Tako Hooks
| Method & Path | Description |
| :--- | :--- |
| `GET /api/v1/tiktok/video-transcript?url=...` | Instant 0.2s Whisper ASR `WEBVTT` Subtitle Downloader & Time-Synced Transcript Segment Parser. |
| `GET /api/v1/tiktok/translate-subtitle?url=...&target_lang=en` | Translate full time-synced `WEBVTT` video subtitles into `en`, `es`, `pt`, `fr`, `de`, `vi`, `id`, `th`, `zh-Hans`, `ko`, `ja`, `ar` in **0.11s Free**. |
| `GET /api/v1/tiktok/translate-text?text=Text1\|Text2&target_lang=en` | Batch Neural E-Commerce Machine Translation for product titles, specs, and scripts. |
| `GET /api/v1/tiktok/ai-curiosity-hooks?video_id=...` | Tako AI Curiosity Hook Generator: 3-second onboarding hook questions for any video. |

### 🎵 4. Commercial Music, `StrongBeat` Drum-Beat Onsets, Effects & CapCut Templates
| Method & Path | Description |
| :--- | :--- |
| `GET /api/v1/tiktok/commercial-music-beats?count=5&region=US` | Copyright-Safe Commercial Music (`is_commercial_music: true`) + **`StrongBeat Onsets` Drum-Beat Timestamps JSON** for FFmpeg auto-editing. |
| `GET /api/v1/tiktok/unlimited-music-playlists?count=15&region=US` | Unlimited Copyright-Free Creator Sounds & 10+ Commercial Music Collection Playlists. |
| `GET /api/v1/tiktok/music?url=...` | Extract Original Sound / Music MP3 Stream & Track Metadata from any video. |
| `GET /api/v1/tiktok/capcut-template-videos?mv_id=...&region=US` | Extract CapCut template `mv_id` and spy top viral videos created with that template. |
| `GET /api/v1/tiktok/effect-sticker-videos?sticker_id=...&region=US` | Discover trending TikTok Effects/Filters and viral videos using them. |

### 🔴 5. TikTok Live Stream (`FLV/HLS/Audio-Only`), Gift Catalog, Ad & Short Drama Analytics
| Method & Path | Description |
| :--- | :--- |
| `GET /api/v1/tiktok/live-room?username=...` | Direct **Full HD FLV**, **HLS (`.m3u8`)**, and **Low-Bandwidth `Audio-Only (.flv)`** streams + **Total Room Visitors (`total_enter_count`)** + Pinned Live Product. |
| `GET /api/v1/tiktok/live-check-alive?room_ids=...&include_diamonds=1` | Batch check up to 25 Live `room_ids` (`alive: true/false`) + Multi-Currency Diamond Recharge Packages. |
| `GET /api/v1/tiktok/live-categories-gifts?region=US&include_gifts=1` | Full 18 Live Topic Categories, 30 Game Categories & **850+ Official TikTok Live Gifts** with `diamond_count` pricing. |
| `GET /api/v1/tiktok/ad-drama-spy?keyword=ceo&region=US` | Trending Short Dramas (`250M+` views), Ad Creative Candidates & Internal **ML Predicted CTR Score (`predict_ctr_score`)**. |

### ⚡ 6. High-Throughput Batch Endpoints
| Method & Path | Description |
| :--- | :--- |
| `GET /api/v1/tiktok/batch-videos?urls=id1,id2,...` | Hydrate up to 10 videos in parallel in a single request. |
| `GET /api/v1/tiktok/batch-users?usernames=u1,u2,...` | Extract Creator Analytics & Bio Emails for up to 10 creators in parallel. |

---

## 💻 Quickstart Code Examples

### Python (`requests`)
```python
import requests

RAPIDAPI_KEY = "YOUR_RAPIDAPI_KEY"
HEADERS = {
    "x-rapidapi-key": RAPIDAPI_KEY,
    "x-rapidapi-host": "tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com"
}
BASE_URL = "https://tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com"

# 1. Extract TikTok Shop Product (SKUs, Exact Stock, 14+ Studio origin-jpeg Images & 34 Copywriting Blocks)
pdp = requests.get(
    f"{BASE_URL}/api/v1/tiktok/shop-product",
    headers=HEADERS,
    params={"url": "https://vt.tiktok.com/ZS9fE6SehCja8-NGCg0/"}
).json()
print("Product:", pdp["product"]["title"], "| Studio Images:", len(pdp["product"]["studio_master_origin_jpegs"]))

# 2. Translate Video WEBVTT Subtitles in 0.11s + Get StrongBeat Commercial Music
sub = requests.get(
    f"{BASE_URL}/api/v1/tiktok/translate-subtitle",
    headers=HEADERS,
    params={"url": "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861", "target_lang": "en"}
).json()
print("Translated Segments:", sub["segment_count"], "| Sample:", sub["translated_full_text"][:100])
```

### Node.js (`fetch`)
```javascript
const HEADERS = {
  "x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
  "x-rapidapi-host": "tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com",
};
const BASE = "https://tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com";

async function run() {
  const res = await fetch(`${BASE}/api/v1/tiktok/commercial-music-beats?count=3&region=US`, { headers: HEADERS });
  const data = await res.json();
  console.log("Commercial Tracks with StrongBeat Onsets:", data.tracks);
}
run();
```

---

## 🔗 Sister API by Techssss
- 🐦 [**Twitter (X) Real-Time Data & Crypto X-Intel API (Solana / Pump.fun / RugCheck / KOL Velocity)**](https://rapidapi.com/Techssss/api/twitter-x-real-time-data-crypto-x-intel)
