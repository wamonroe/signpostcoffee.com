import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");

describe("index.html structure", () => {
  let document;

  beforeAll(() => {
    const html = readFileSync(resolve(root, "index.html"), "utf-8");
    document = new DOMParser().parseFromString(html, "text/html");
  });

  it("has the correct page title", () => {
    expect(document.title).toBe("SignPost Coffee");
  });

  it("has a viewport meta tag", () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    expect(viewport).not.toBeNull();
  });

  it("has the closure heading", () => {
    const h1 = document.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain("SignPost Coffee has Closed");
  });

  it("has the logo image", () => {
    const img = document.querySelector("img");
    expect(img).not.toBeNull();
    expect(img.getAttribute("src")).toContain("logo.png");
  });

  it("has the contact email link", () => {
    const link = document.querySelector('a[href="mailto:connect@signpostcoffee.com"]');
    expect(link).not.toBeNull();
    expect(link.textContent).toContain("connect@signpostcoffee.com");
  });

  it("loads the main.js module", () => {
    const script = document.querySelector('script[type="module"]');
    expect(script).not.toBeNull();
    expect(script.getAttribute("src")).toBe("/src/main.js");
  });
});
