let start = 0;
const KEYMAP = {};

const input = document.getElementById("input");
const metrics = document.getElementById("metrics");

input.addEventListener("keydown", e => {
  if (start !== 0) {
    const stop = performance.now();
    KEYMAP[e.key] = [...(KEYMAP[e.key] || []), Math.floor(stop - start)];
    metrics.innerHTML = JSON.stringify(KEYMAP);
  }

  start = performance.now();
});
