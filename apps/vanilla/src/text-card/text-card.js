import createTextCardState from "./text-card.state.js";
import createTextCardView from "./text-card.view.js";

export default function createTextCard(container) {
  const state = createTextCardState();
  const view = createTextCardView(container);

  // Renders

  function renderActiveTexts() {
    view.renderTexts(state.getTexts(), state.getSelectedIds());
  }

  function renderDeletedTexts() {
    view.deletedCard.renderDeletedTexts(
      state.getDeletedTexts(),
      state.getSelectedDeletedIds(),
    );
  }

  // Handlers

  function handleItemSelection(event) {
    const checkbox = event.target.closest("[data-item-id]");

    if (!checkbox) {
      return;
    }

    state.setItemSelected(checkbox.dataset.itemId, checkbox.checked);

    renderActiveTexts();
  }

  function handleSelectAll(event) {
    state.setAllSelected(event.target.checked);
    renderActiveTexts();
  }

  function handleDelete() {
    state.removeSelectedItems();
    renderActiveTexts();
  }

  function handleOpenDeletedCard() {
    renderDeletedTexts();
    view.deletedCard.open();
  }

  function handleDeletedItemSelection(event) {
    const checkbox = event.target.closest("[data-deleted-item-id]");

    if (!checkbox) {
      return;
    }

    state.setDeletedItemSelected(
      checkbox.dataset.deletedItemId,
      checkbox.checked,
    );

    renderDeletedTexts();
  }

  function handleRestoreDeletedItems() {
    state.restoreSelectedItems();

    renderActiveTexts();
    renderDeletedTexts();

    view.deletedCard.close();
  }

  function handleCloseDeletedCard() {
    view.deletedCard.close();
  }

  function handleOpenAddPanel() {
    view.addPanel.open();
  }

  function handleCloseAddPanel() {
    view.addPanel.close();
  }

  function handleAddText(event) {
    event.preventDefault();

    const text = view.addPanel.input.value.trim();

    if (!text) {
      return;
    }

    state.addText(text);

    view.addPanel.close();

    renderActiveTexts();
  }

  // Event listener

  view.list.addEventListener("change", handleItemSelection);

  view.selectAllCheckbox.addEventListener("change", handleSelectAll);

  view.deleteButton.addEventListener("click", handleDelete);

  view.resetButton.addEventListener("click", handleOpenDeletedCard);

  view.deletedCard.list.addEventListener("change", handleDeletedItemSelection);

  view.deletedCard.confirmRestoreButton.addEventListener(
    "click",
    handleRestoreDeletedItems,
  );

  view.deletedCard.cancelButton.addEventListener(
    "click",
    handleCloseDeletedCard,
  );

  view.addButton.addEventListener("click", handleOpenAddPanel);

  view.addPanel.cancelButton.addEventListener("click", handleCloseAddPanel);

  view.addPanel.form.addEventListener("submit", handleAddText);

  // Initial render

  renderActiveTexts();
}
