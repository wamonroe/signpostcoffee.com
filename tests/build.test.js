import { describe, it, expect, beforeAll } from "vitest";
import { build } from "vite";
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");

describe("vite build", () => {
  beforeAll(async () => {
    await build({ root, logLevel: "silent" });
  });

  it("produces index.html in dist/", () => {
    expect(existsSync(resolve(root, "dist/index.html"))).toBe(true);
  });

  it("produces CSS and JS assets", () => {
    const assetsDir = resolve(root, "dist/assets");
    expect(existsSync(assetsDir)).toBe(true);

    const assets = readdirSync(assetsDir);
    expect(assets.some((f) => f.endsWith(".css"))).toBe(true);
    expect(assets.some((f) => f.endsWith(".js"))).toBe(true);
  });

  it("built HTML contains the page title", () => {
    const html = readFileSync(resolve(root, "dist/index.html"), "utf-8");
    expect(html).toContain("SignPost Coffee");
  });

  it("built HTML contains the heading text", () => {
    const html = readFileSync(resolve(root, "dist/index.html"), "utf-8");
    expect(html).toContain("SignPost Coffee has Closed");
  });
});
