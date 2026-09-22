import createTextCardState from "./text-card.state.js";
import createTextCardView from "./text-card.view.js";

export default function createTextCard(container) {
  const state = createTextCardState();
  const view = createTextCardView(container);

  function render() {
    view.renderTexts(state.getTexts(), state.getSelectedId());
  }

  view.list.addEventListener("click", (event) => {
    const item = event.target.closest("[data-item-id]");

    if (!item) {
      return;
    }

    state.selectItem(item.dataset.itemId);

    render();
  });

  view.deleteButton.addEventListener("click", () => {
    state.removeSelectedItem();

    render();
  });

  view.resetButton.addEventListener("click", () => {
    state.reset();

    render();
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
