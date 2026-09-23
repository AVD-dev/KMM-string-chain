if (!("AnimationEvent" in window)) {
  Object.defineProperty(window, "AnimationEvent", {
    writable: true,
    value: Event,
  });
}

import "@testing-library/jest-dom/vitest";
