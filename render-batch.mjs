import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";

async function main() {
  console.log("🚀 Bắt đầu quá trình render video hàng loạt với Remotion & Antigravity...");
  
  const configFile = path.resolve("./batch-config.json");
  if (!fs.existsSync(configFile)) {
    console.error("❌ Không tìm thấy file batch-config.json!");
    process.exit(1);
  }

  const items = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  console.log(`📋 Tìm thấy ${items.length} video cần sản xuất.`);

  const outDir = path.resolve("./out");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log("📦 Đang đóng gói dự án Remotion (Bundle một lần duy nhất)...");
  const entryPoint = path.resolve("./src/index.ts");
  const bundleLocation = await bundle(entryPoint);
  console.log("✅ Đóng gói hoàn tất!");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const outputPath = path.join(outDir, `${item.id}.mp4`);
    console.log(`\n🎬 [${i + 1}/${items.length}] Đang render: ${item.id} (${item.props.title})...`);

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: "MyComp",
      inputProps: item.props,
    });

    const startTime = Date.now();
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: outputPath,
      inputProps: item.props,
      onProgress: ({ progress }) => {
        const percent = Math.round(progress * 100);
        process.stdout.write(`   Tiến độ: ${percent}%\r`);
      },
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n   ✅ Đã xuất: ${outputPath} (${duration}s)`);
  }

  console.log("\n🎉 HOÀN TẤT TOÀN BỘ DANH SÁCH VIDEO! Thư mục lưu trữ: " + outDir);
}

main().catch((err) => {
  console.error("❌ Lỗi trong quá trình render:", err);
  process.exit(1);
});
