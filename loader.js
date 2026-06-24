import { render, split } from "./renderer.js";

const dedent = (text) => {
  const lines = text.replace(/^\r?\n/, "").split(/\r?\n/);
  const nonBlank = lines.filter(line => line.trim());
  if (!nonBlank.length) return "";
  const indent = Math.min(
    ...nonBlank.map(line => line.match(/^[ \t]*/)[0].length)
  );
  return lines
    .map(line => line.trim() ? line.slice(indent) : "")
    .join("\n");
}

const run = async (container = document.body) => {
  const cells = [];
  for (const script of document.querySelectorAll("script")) {
    const type = (script.type || "").trim().toLowerCase();
    if (!/^o[a-z0-9]+$/.test(type)) continue;
    const kind = type.slice(1);
    const show = !script.hasAttribute("hidden");
    const pinned = script.hasAttribute("pinned");
    const v = dedent(script.textContent);
    if (kind === "js") {
      for (const value of split(v)) cells.push({ value, type: "js", show, pinned });
    } else {
      cells.push({ value: v, type: kind, show, pinned });
    }
  }
  if (cells.length) return render(cells, container);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => run());
} else {
  run();
}
