import { beforeEach, describe, expect, it } from "vitest";

import createTextCardState from "./text-card.state.js";

describe("GIVEN createTextCardState", () => {
  let state;

  beforeEach(() => {
    state = createTextCardState();
  });

  describe("WHEN initial state", () => {
    it("SHOULD initialize with the default texts", () => {
      expect(state.getTexts()).toEqual([
        { id: "1", text: "Item 1" },
        { id: "2", text: "Item 2" },
        { id: "3", text: "Item 3" },
        { id: "4", text: "Item 4" },
      ]);
    });

    it("SHOULD initialize without selected items", () => {
      expect(state.getSelectedIds().size).toBe(0);
    });

    it("SHOULD initialize without deleted items", () => {
      expect(state.getDeletedTexts()).toEqual([]);
    });

    it("SHOULD initialize without selected deleted items", () => {
      expect(state.getSelectedDeletedIds().size).toBe(0);
    });
  });

  describe("WHEN selection", () => {
    it("SHOULD select an item", () => {
      state.setItemSelected("2", true);

      expect(state.getSelectedIds()).toEqual(new Set(["2"]));
    });

    it("SHOULD deselect an item", () => {
      state.setItemSelected("2", true);
      state.setItemSelected("2", false);

      expect(state.getSelectedIds().size).toBe(0);
    });

    it("SHOULD ignore an unknown item", () => {
      state.setItemSelected("unknown", true);

      expect(state.getSelectedIds().size).toBe(0);
    });

    it("SHOULD select all items", () => {
      state.setAllSelected(true);

      expect(state.getSelectedIds()).toEqual(new Set(["1", "2", "3", "4"]));
    });

    it("SHOULD deselect all items", () => {
      state.setAllSelected(true);
      state.setAllSelected(false);

      expect(state.getSelectedIds().size).toBe(0);
    });
  });

  describe("WHEN add", () => {
    it("SHOULD add a new text", () => {
      state.addText("New item");

      const texts = state.getTexts();

      expect(texts).toHaveLength(5);
      expect(texts.at(-1)).toEqual({
        id: expect.any(String),
        text: "New item",
      });
    });
  });

  describe("WHEN delete", () => {
    it("SHOULD remove all selected items", () => {
      state.setItemSelected("2", true);
      state.setItemSelected("3", true);

      state.removeSelectedItems();

      expect(state.getTexts()).toEqual([
        { id: "1", text: "Item 1" },
        { id: "4", text: "Item 4" },
      ]);
    });

    it("SHOULD store removed items as deleted", () => {
      state.setItemSelected("2", true);
      state.setItemSelected("3", true);

      state.removeSelectedItems();

      expect(state.getDeletedTexts()).toEqual([
        { id: "2", text: "Item 2" },
        { id: "3", text: "Item 3" },
      ]);
    });

    it("SHOULD clear the selection after deleting", () => {
      state.setItemSelected("2", true);

      state.removeSelectedItems();

      expect(state.getSelectedIds().size).toBe(0);
    });
  });

  describe("WHEN restore", () => {
    it("SHOULD restore selected deleted items", () => {
      state.setItemSelected("2", true);
      state.setItemSelected("3", true);
      state.removeSelectedItems();

      state.setDeletedItemSelected("2", true);
      state.restoreSelectedItems();

      expect(state.getTexts()).toEqual([
        { id: "1", text: "Item 1" },
        { id: "4", text: "Item 4" },
        { id: "2", text: "Item 2" },
      ]);

      expect(state.getDeletedTexts()).toEqual([{ id: "3", text: "Item 3" }]);
    });

    it("SHOULD clear deleted selection after restoring", () => {
      state.setItemSelected("2", true);
      state.removeSelectedItems();

      state.setDeletedItemSelected("2", true);
      state.restoreSelectedItems();

      expect(state.getSelectedDeletedIds().size).toBe(0);
    });
  });
});
