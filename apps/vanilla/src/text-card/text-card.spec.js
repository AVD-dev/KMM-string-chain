// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";

import createTextCard from "./text-card.js";

describe("GIVEN createTextCard", () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '<main id="app"></main>';

    container = document.querySelector("#app");

    createTextCard(container);
  });

  function getActiveItemTexts() {
    return [...document.querySelectorAll(".text-card__item span")].map(
      (element) => element.textContent,
    );
  }

  function selectItem(id) {
    const checkbox = document.querySelector(`[data-item-id="${id}"]`);

    checkbox.checked = true;
    checkbox.dispatchEvent(
      new Event("change", {
        bubbles: true,
      }),
    );
  }

  it("SHOULD render the initial texts", () => {
    expect(getActiveItemTexts()).toEqual([
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
    ]);
  });

  it("SHOULD select an item", () => {
    selectItem("2");

    const checkbox = document.querySelector('[data-item-id="2"]');

    expect(checkbox.checked).toBe(true);
  });

  it("SHOULD select all items", () => {
    const selectAllCheckbox = document.querySelector(
      ".text-card__select-all input",
    );

    selectAllCheckbox.checked = true;

    selectAllCheckbox.dispatchEvent(
      new Event("change", {
        bubbles: true,
      }),
    );

    const checkboxes = document.querySelectorAll("[data-item-id]");

    expect([...checkboxes].every((checkbox) => checkbox.checked)).toBe(true);
  });

  it("SHOULD delete selected items", () => {
    selectItem("2");
    selectItem("3");

    const deleteButton = document.querySelector(
      ".text-card__actions-left .button--outline",
    );

    deleteButton.click();

    expect(getActiveItemTexts()).toEqual(["Item 1", "Item 4"]);
  });

  it("SHOULD open the add panel", () => {
    const addButton = document.querySelector(
      ".text-card__actions > .button--primary",
    );

    addButton.click();

    const overlay = document.querySelector(".add-overlay");

    expect(overlay.classList.contains("add-overlay--visible")).toBe(true);
  });

  it("SHOULD add a new text", () => {
    const addButton = document.querySelector(
      ".text-card__actions > .button--primary",
    );

    addButton.click();

    const input = document.querySelector(".add-panel__input");
    const form = document.querySelector(".add-panel");

    input.value = "New item";

    form.dispatchEvent(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(getActiveItemTexts()).toContain("New item");

    expect(input.value).toBe("");

    expect(
      document
        .querySelector(".add-overlay")
        .classList.contains("add-overlay--visible"),
    ).toBe(false);
  });

  it("SHOULD open deleted items", () => {
    selectItem("2");

    document.querySelector(".text-card__actions-left .button--outline").click();

    document.querySelector('[aria-label="Reset"]').click();

    const overlay = document.querySelector(".deleted-overlay");

    expect(overlay.classList.contains("deleted-overlay--visible")).toBe(true);

    expect(document.querySelector('[data-deleted-item-id="2"]')).not.toBeNull();
  });

  it("SHOULD restore a deleted item", () => {
    selectItem("2");

    document.querySelector(".text-card__actions-left .button--outline").click();

    document.querySelector('[aria-label="Reset"]').click();

    const checkbox = document.querySelector('[data-deleted-item-id="2"]');

    checkbox.checked = true;

    checkbox.dispatchEvent(
      new Event("change", {
        bubbles: true,
      }),
    );

    const restoreButton = document.querySelector(
      ".deleted-card__actions .button--primary",
    );

    restoreButton.click();

    expect(getActiveItemTexts()).toContain("Item 2");

    expect(
      document
        .querySelector(".deleted-overlay")
        .classList.contains("deleted-overlay--visible"),
    ).toBe(false);
  });

  it("SHOULD close the deleted items card", () => {
    document.querySelector('[aria-label="Reset"]').click();

    const cancelButton = document.querySelector(
      ".deleted-card__actions .button--outline",
    );

    cancelButton.click();

    expect(
      document
        .querySelector(".deleted-overlay")
        .classList.contains("deleted-overlay--visible"),
    ).toBe(false);
  });
});
