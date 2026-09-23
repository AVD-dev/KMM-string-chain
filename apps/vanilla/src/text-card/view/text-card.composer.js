import createMainCard from "./main-card.view.js";
import createAddPanel from "./add-panel.view.js";
import createDeletedCard from "./deleted-card.view.js";

export default function createTextCardView(container) {
  const mainCard = createMainCard();
  const addPanel = createAddPanel();
  const deletedCard = createDeletedCard();

  container.append(mainCard.element);

  document.body.append(addPanel.element, deletedCard.element);

  return {
    list: mainCard.list,
    selectAllCheckbox: mainCard.selectAllCheckbox,
    resetButton: mainCard.resetButton,
    deleteButton: mainCard.deleteButton,
    addButton: mainCard.addButton,

    addPanel,
    deletedCard,

    renderTexts(texts, selectedIds) {
      mainCard.render(texts, selectedIds);
    },
  };
}
