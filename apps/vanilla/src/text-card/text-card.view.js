export default function createTextCardView(container) {
  const card = document.createElement("section");
  card.classList.add("text-card");

  const header = document.createElement("header");
  header.classList.add("text-card__header");

  const title = document.createElement("h1");
  title.classList.add("text-card__title");
  title.textContent = "This is a technical proof";

  const description = document.createElement("p");
  description.classList.add("text-card__description");
  description.textContent =
    "Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere augue fames dictumst placerat porttitor, dis mi pharetra vestibulum venenatis phasellus.";

  header.append(title, description);

  const list = document.createElement("ul");
  list.classList.add("text-card__list");

  const actions = document.createElement("footer");
  actions.classList.add("text-card__actions");

  const leftActions = document.createElement("div");
  leftActions.classList.add("text-card__actions-left");

  const resetButton = document.createElement("button");
  resetButton.classList.add("button", "button--icon");
  resetButton.type = "button";
  resetButton.setAttribute("aria-label", "Reset");
  resetButton.textContent = "↶";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button", "button--outline");
  deleteButton.type = "button";
  deleteButton.textContent = "DELETE";

  const addButton = document.createElement("button");
  addButton.classList.add("button", "button--primary");
  addButton.type = "button";
  addButton.textContent = "ADD";

  leftActions.append(resetButton, deleteButton);
  actions.append(leftActions, addButton);

  card.append(header, list, actions);

  const addPanel = createAddPanel();

  container.append(card);
  document.body.append(addPanel.element);

  return {
    list,
    resetButton,
    deleteButton,
    addButton,
    addPanel,

    renderTexts(texts, selectedIds) {
      list.replaceChildren();

      texts.forEach(({ id, text }) => {
        const item = document.createElement("li");
        item.classList.add("text-card__item");

        const label = document.createElement("label");
        label.classList.add("text-card__item-label");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("text-card__checkbox");
        checkbox.dataset.itemId = id;
        checkbox.checked = selectedIds.has(id);

        const itemText = document.createElement("span");
        itemText.textContent = text;

        label.append(checkbox, itemText);
        item.append(label);

        if (selectedIds.has(id)) {
          item.classList.add("text-card__item--selected");
        }

        list.append(item);
      });

      deleteButton.disabled = selectedIds.size === 0;
    },
  };
}

function createAddPanel() {
  const overlay = document.createElement("div");
  overlay.classList.add("add-overlay");

  const form = document.createElement("form");
  form.classList.add("add-panel");

  const label = document.createElement("label");
  label.classList.add("add-panel__label");
  label.textContent = "Add item to list";

  const input = document.createElement("input");
  input.classList.add("add-panel__input");
  input.type = "text";
  input.placeholder = "Type the text here...";

  const actions = document.createElement("div");
  actions.classList.add("add-panel__actions");

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("button", "button--primary");
  confirmButton.type = "submit";
  confirmButton.textContent = "ADD";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("button", "button--outline");
  cancelButton.type = "button";
  cancelButton.textContent = "CANCEL";

  actions.append(confirmButton, cancelButton);
  form.append(label, input, actions);
  overlay.append(form);

  return {
    element: overlay,
    form,
    input,
    confirmButton,
    cancelButton,
  };
}
