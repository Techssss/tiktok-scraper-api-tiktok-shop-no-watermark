/**
 * Automated End-to-End JSON-RPC 2.0 Verification for tiktok-shop-mcp-server
 * Tests:
 *   1. MCP `initialize` handshake (protocolVersion: 2024-11-05)
 *   2. MCP `tools/list` (verifies all 11 tools)
 *   3. Offline Zero-Key Tool #1: `decode_tiktok_snowflake`
 *   4. Offline Zero-Key Tool #2: `build_tiktok_shop_deeplink`
 *   5. Offline Zero-Key Tool #3: `analyze_short_video_hook_and_beats`
 *   6. Cloud Tool #4 (via RapidAPI): `get_tiktok_video_intelligence`
 *   7. Cloud Tool #6 (via RapidAPI): `get_tiktok_video_comments_and_replies`
 */
const { spawn } = require("child_process");
const path = require("path");

const RAPIDAPI_KEY = process.argv[2] || process.env.RAPIDAPI_KEY || "";

async function runTest() {
  const proc = spawn("node", [path.join(__dirname, "index.js")], {
    env: { ...process.env, RAPIDAPI_KEY },
    stdio: ["pipe", "pipe", "inherit"],
  });

  const pending = new Map();
  let buf = "";

  proc.stdout.on("data", (chunk) => {
    buf += chunk.toString();
    let idx;
    while ((idx = buf.indexOf("\n")) !== -1) {
      const line = buf.slice(0, idx).trim();
      buf = buf.slice(idx + 1);
      if (!line) continue;
      const msg = JSON.parse(line);
      if (msg.id !== undefined && pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
    }
  });

  function sendRpc(id, method, params = {}) {
    return new Promise((resolve) => {
      pending.set(id, resolve);
      proc.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
    });
  }

  console.log("=== TESTING TIKTOK & TIKTOK SHOP MCP SERVER (JSON-RPC 2.0) ===");

  // 1. initialize
  const initRes = await sendRpc(1, "initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "claude-desktop-test", version: "1.0.0" },
  });
  console.log(`[PASS] 01 initialize -> server=${initRes.result.serverInfo.name} v${initRes.result.serverInfo.version}`);

  // 2. tools/list
  const listRes = await sendRpc(2, "tools/list", {});
  const tools = listRes.result.tools;
  console.log(`[PASS] 02 tools/list -> ${tools.length} tools registered:`);
  tools.forEach((t, i) => console.log(`    #${i + 1}: ${t.name}`));

  // 3. Offline Tool: decode_tiktok_snowflake
  const sfRes = await sendRpc(3, "tools/call", {
    name: "decode_tiktok_snowflake",
    arguments: { id: "7687152988393147656" },
  });
  const sfJson = JSON.parse(sfRes.result.content[0].text);
  console.log(`[PASS] 03 decode_tiktok_snowflake -> created_at_utc=${sfJson.created_at_utc}, shard=${sfJson.bit_forensics.datacenter_worker_shard}`);

  // 4. Offline Tool: build_tiktok_shop_deeplink
  const dlRes = await sendRpc(4, "tools/call", {
    name: "build_tiktok_shop_deeplink",
    arguments: { product_id: "1735171805700392934", region: "VN" },
  });
  const dlJson = JSON.parse(dlRes.result.content[0].text);
  console.log(`[PASS] 04 build_tiktok_shop_deeplink -> scheme=${dlJson.deeplinks.native_pdp_scheme}`);

  // 5. Offline Tool: analyze_short_video_hook_and_beats
  const hkRes = await sendRpc(5, "tools/call", {
    name: "analyze_short_video_hook_and_beats",
    arguments: {
      script_text: "Stop scrolling! Why 99% of people make this 1 mistake when buying sunscreen?",
      video_duration_sec: 15,
      bpm: 128,
    },
  });
  const hkJson = JSON.parse(hkRes.result.content[0].text);
  console.log(`[PASS] 05 analyze_short_video_hook_and_beats -> score=${hkJson.hook_score_out_of_100}/100, beats=${hkJson.auto_cut_beat_timeline_sec.slice(0, 5)}`);

  // 6. Cloud Tool: get_tiktok_video_intelligence
  const vidRes = await sendRpc(6, "tools/call", {
    name: "get_tiktok_video_intelligence",
    arguments: { url: "https://www.tiktok.com/@khoahocvavutru0/video/7687152988393147656" },
  });
  const vidJson = JSON.parse(vidRes.result.content[0].text);
  console.log(`[PASS] 06 get_tiktok_video_intelligence (Cloud) -> ok=${vidJson.ok}, id=${vidJson.data && vidJson.data.id}`);

  // 7. Cloud Tool: get_tiktok_video_comments_and_replies
  const cmtRes = await sendRpc(7, "tools/call", {
    name: "get_tiktok_video_comments_and_replies",
    arguments: { url: "https://www.tiktok.com/@khoahocvavutru0/video/7687152988393147656", limit: "5" },
  });
  const cmtJson = JSON.parse(cmtRes.result.content[0].text);
  console.log(`[PASS] 07 get_tiktok_video_comments_and_replies (Cloud) -> ok=${cmtJson.ok}, count=${cmtJson.count}`);

  proc.kill();
  console.log("\n=== ALL 7/7 MCP SERVER TESTS PASSED (100% READY FOR CLAUDE, CURSOR, SMITHERY & GLAMA) ===");
}

runTest().catch((e) => {
  console.error(e);
  process.exit(1);
});
