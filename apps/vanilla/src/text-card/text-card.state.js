const INITIAL_TEXTS = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
  { id: "4", text: "Item 4" },
];

export default function createTextCardState() {
  let texts = [...INITIAL_TEXTS];
  let selectedIds = new Set();

  let deletedTexts = [];
  let selectedDeletedIds = new Set();

  return {
    getTexts() {
      return [...texts];
    },

    getSelectedIds() {
      return new Set(selectedIds);
    },

    getDeletedTexts() {
      return [...deletedTexts];
    },

    getSelectedDeletedIds() {
      return new Set(selectedDeletedIds);
    },

    setItemSelected(id, isSelected) {
      const exists = texts.some((item) => item.id === id);

      if (!exists) {
        return;
      }

      if (isSelected) {
        selectedIds.add(id);
        return;
      }

      selectedIds.delete(id);
    },

    setDeletedItemSelected(id, isSelected) {
      const exists = deletedTexts.some((item) => item.id === id);

      if (!exists) {
        return;
      }

      if (isSelected) {
        selectedDeletedIds.add(id);
        return;
      }

      selectedDeletedIds.delete(id);
    },

    setAllSelected(isSelected) {
      if (isSelected) {
        selectedIds = new Set(texts.map(({ id }) => id));
        return;
      }

      selectedIds.clear();
    },

    addText(text) {
      texts = [
        ...texts,
        {
          id: crypto.randomUUID(),
          text,
        },
      ];
    },

    removeSelectedItems() {
      if (selectedIds.size === 0) {
        return;
      }

      const removedTexts = texts.filter(({ id }) => selectedIds.has(id));

      deletedTexts = [...deletedTexts, ...removedTexts];

      texts = texts.filter(({ id }) => !selectedIds.has(id));

      selectedIds.clear();
    },

    restoreSelectedItems() {
      if (selectedDeletedIds.size === 0) {
        return;
      }

      const restoredTexts = deletedTexts.filter(({ id }) =>
        selectedDeletedIds.has(id),
      );

      texts = [...texts, ...restoredTexts];

      deletedTexts = deletedTexts.filter(
        ({ id }) => !selectedDeletedIds.has(id),
      );

      selectedDeletedIds.clear();
    },
  };
}
