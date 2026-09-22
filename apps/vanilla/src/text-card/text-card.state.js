const INITIAL_TEXTS = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
  { id: "4", text: "Item 4" },
];

export default function createTextCardState() {
  let texts = [...INITIAL_TEXTS];
  let selectedIds = new Set();

  return {
    getTexts() {
      return [...texts];
    },

    getSelectedIds() {
      return new Set(selectedIds);
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

    addText(text) {
      texts = [
        ...texts,
        {
          id: crypto.randomUUID(),
          text,
        },
      ];
    },
    setAllSelected(isSelected) {
      if (isSelected) {
        selectedIds = new Set(texts.map(({ id }) => id));
        return;
      }

      selectedIds.clear();
    },

    removeSelectedItems() {
      if (selectedIds.size === 0) {
        return;
      }

      texts = texts.filter(({ id }) => !selectedIds.has(id));
      selectedIds.clear();
    },

    reset() {
      texts = [...INITIAL_TEXTS];
      selectedIds.clear();
    },
  };
}
