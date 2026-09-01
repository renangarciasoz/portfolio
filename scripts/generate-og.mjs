/**
 * Generates the static Open Graph image at public/images/og.png (1200x630).
 *
 * Run with:  npm run generate:og
 *
 * It reuses the wasm based renderer that ships inside Next.js (@vercel/og), so
 * it needs no extra dependency and works on any platform. Re-run it whenever
 * the name, role or colors below change.
 */
import { pathToFileURL } from "node:url";
import { writeFileSync } from "node:fs";
import path from "node:path";

const ogModPath = path.join(
  process.cwd(),
  "node_modules/next/dist/compiled/@vercel/og/index.node.js"
);
const { ImageResponse } = await import(pathToFileURL(ogModPath).href);

const div = (style, children) => ({ type: "div", props: { style, children } });

const el = div(
  {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#100F0D",
    color: "#ECE8E0",
    padding: "80px",
  },
  [
    div(
      { display: "flex", fontSize: 30, letterSpacing: "0.35em", color: "#9B9488" },
      "PORTFOLIO"
    ),
    div({ display: "flex", flexDirection: "column" }, [
      div(
        { display: "flex", fontSize: 118, fontWeight: 700, letterSpacing: "-0.03em" },
        "Renan Garcia"
      ),
      div(
        { display: "flex", fontSize: 46, color: "#C3B8A6", marginTop: 8 },
        "Software Engineer"
      ),
    ]),
    div(
      {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 28,
        color: "#9B9488",
      },
      [
        div({ display: "flex" }, "Los Angeles, California"),
        div({ display: "flex" }, "renangarcia.com"),
      ]
    ),
  ]
);

const res = new ImageResponse(el, { width: 1200, height: 630 });
const buf = Buffer.from(await res.arrayBuffer());
const out = path.join(process.cwd(), "public", "images", "og.png");
writeFileSync(out, buf);
console.log(`Wrote ${out} (${buf.length} bytes)`);
