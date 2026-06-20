import { render, splitCells } from "./renderer.js";

const types = new Set(["ojs"]);

async function run(container = document.body) {
  const cells = [];
  for (const script of document.querySelectorAll("script")) {
    if (types.has((script.type || "").trim().toLowerCase())) {
      for (const cell of splitCells(script.textContent)) cells.push(cell);
    }
  }
  if (cells.length) return render(cells, container);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => run());
} else {
  run();
}
