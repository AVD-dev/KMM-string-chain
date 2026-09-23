import { createCard, createSelectableItem } from "./view.helpers.js";

function createHeader() {
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

  return header;
}

function createTextList() {
  const element = document.createElement("div");
  element.classList.add("text-card__list-container");

  const selectAllLabel = document.createElement("label");
  selectAllLabel.classList.add("text-card__select-all");

  const selectAllCheckbox = document.createElement("input");
  selectAllCheckbox.classList.add("text-card__checkbox");
  selectAllCheckbox.type = "checkbox";

  const selectAllText = document.createElement("span");
  selectAllText.textContent = "Seleccionar todo";

  const list = document.createElement("ul");
  list.classList.add("text-card__list");

  selectAllLabel.append(selectAllCheckbox, selectAllText);
  element.append(selectAllLabel, list);

  return {
    element,
    list,
    selectAllCheckbox,

    render(texts, selectedIds) {
      list.replaceChildren();

      const selectedCount = selectedIds.size;
      const totalCount = texts.length;

      selectAllCheckbox.checked =
        totalCount > 0 && selectedCount === totalCount;

      selectAllCheckbox.indeterminate =
        selectedCount > 0 && selectedCount < totalCount;

      selectAllCheckbox.disabled = totalCount === 0;

      texts.forEach(({ id, text }) => {
        const item = createSelectableItem({
          id,
          text,
          selected: selectedIds.has(id),
          classPrefix: "text-card",
          datasetKey: "itemId",
        });

        list.append(item);
      });
    },
  };
}

function createActions() {
  const element = document.createElement("footer");
  element.classList.add("text-card__actions");

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
  element.append(leftActions, addButton);

  return {
    element,
    resetButton,
    deleteButton,
    addButton,
  };
}

export default function createMainCard() {
  const card = createCard("text-card");

  const header = createHeader();
  const textList = createTextList();
  const actions = createActions();

  card.append(header, textList.element, actions.element);

  return {
    element: card,

    list: textList.list,
    selectAllCheckbox: textList.selectAllCheckbox,

    resetButton: actions.resetButton,
    deleteButton: actions.deleteButton,
    addButton: actions.addButton,

    render(texts, selectedIds) {
      textList.render(texts, selectedIds);
    },
  };
}
