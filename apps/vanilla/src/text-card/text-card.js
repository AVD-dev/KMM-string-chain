import createTextCardState from "./text-card.state.js";
import createTextCardView from "./text-card.view.js";

export default function createTextCard(container) {
  const state = createTextCardState();
  const view = createTextCardView(container);

  function render() {
    view.renderTexts(state.getTexts(), state.getSelectedIds());
  }

  function renderDeletedTexts() {
    view.deletedCard.renderDeletedTexts(
      state.getDeletedTexts(),
      state.getSelectedDeletedIds(),
    );
  }

  view.list.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-item-id]");

    if (!checkbox) {
      return;
    }

    state.setItemSelected(checkbox.dataset.itemId, checkbox.checked);

    render();
  });

  view.selectAllCheckbox.addEventListener("change", (event) => {
    state.setAllSelected(event.target.checked);

    render();
  });

  view.deleteButton.addEventListener("click", () => {
    state.removeSelectedItems();

    render();
  });

  view.resetButton.addEventListener("click", () => {
    renderDeletedTexts();

    view.deletedCard.open();
  });

  view.deletedCard.list.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-deleted-item-id]");

    if (!checkbox) {
      return;
    }

    state.setDeletedItemSelected(
      checkbox.dataset.deletedItemId,
      checkbox.checked,
    );

    renderDeletedTexts();
  });

  view.deletedCard.confirmRestoreButton.addEventListener("click", () => {
    state.restoreSelectedItems();

    render();
    renderDeletedTexts();

    view.deletedCard.close();
  });

  view.deletedCard.cancelButton.addEventListener("click", () => {
    view.deletedCard.close();
  });

  view.addButton.addEventListener("click", () => {
    view.addPanel.element.classList.add("add-overlay--visible");

    view.addPanel.input.focus();
  });

  view.addPanel.cancelButton.addEventListener("click", () => {
    view.addPanel.element.classList.remove("add-overlay--visible");

    view.addPanel.input.value = "";
  });

  view.addPanel.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = view.addPanel.input.value.trim();

    if (!text) {
      return;
    }

    state.addText(text);

    view.addPanel.input.value = "";

    view.addPanel.element.classList.remove("add-overlay--visible");

    render();
  });

  render();
}
