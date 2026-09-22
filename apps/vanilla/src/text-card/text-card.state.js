const INITIAL_TEXTS = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
  { id: "4", text: "Item 4" },
];

export default function createTextCardState() {
  let texts = [...INITIAL_TEXTS];
  let selectedId = null;

  return {
    getTexts() {
      return [...texts];
    },

    getSelectedId() {
      return selectedId;
    },

    selectItem(id) {
      selectedId = id;
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

    removeSelectedItem() {
      if (!selectedId) {
        return;
      }

      texts = texts.filter(({ id }) => id !== selectedId);
      selectedId = null;
    },

    reset() {
      texts = [...INITIAL_TEXTS];
      selectedId = null;
    },
  };
}
