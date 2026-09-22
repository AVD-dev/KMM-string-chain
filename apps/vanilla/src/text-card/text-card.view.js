function createAddPanel() {
  const overlay = document.createElement("div");
  overlay.classList.add("add-overlay");

  const form = createCard("add-panel", "form");

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

    open() {
      overlay.classList.add("add-overlay--visible");
      input.focus();
    },

    close() {
      overlay.classList.remove("add-overlay--visible");
      input.value = "";
    },
  };
}

function createCard(className, tagName = "section") {
  const cardElement = document.createElement(tagName);
  cardElement.classList.add(className);

  return cardElement;
}

function createSelectableItem({ id, text, selected, classPrefix, datasetKey }) {
  const item = document.createElement("li");
  item.classList.add(`${classPrefix}__item`);

  const label = document.createElement("label");
  label.classList.add(`${classPrefix}__item-label`);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("text-card__checkbox");
  checkbox.dataset[datasetKey] = id;
  checkbox.checked = selected;

  const itemText = document.createElement("span");
  itemText.textContent = text;

  label.append(checkbox, itemText);
  item.append(label);

  if (selected) {
    item.classList.add(`${classPrefix}__item--selected`);
  }

  return item;
}

function createDeletedCard() {
  const overlay = document.createElement("div");
  overlay.classList.add("deleted-overlay");

  const card = createCard("deleted-card");

  const title = document.createElement("h2");
  title.classList.add("deleted-card__title");
  title.textContent = "The last 10 deleted items";

  const list = document.createElement("ul");
  list.classList.add("deleted-card__list");

  const actions = document.createElement("div");
  actions.classList.add("deleted-card__actions");

  const confirmRestoreButton = document.createElement("button");
  confirmRestoreButton.classList.add("button", "button--primary");
  confirmRestoreButton.type = "button";
  confirmRestoreButton.textContent = "RESTORE";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("button", "button--outline");
  cancelButton.type = "button";
  cancelButton.textContent = "CANCEL";

  actions.append(confirmRestoreButton, cancelButton);
  card.append(title, list, actions);
  overlay.append(card);

  return {
    element: overlay,
    list,
    confirmRestoreButton,
    cancelButton,

    open() {
      overlay.classList.add("deleted-overlay--visible");
    },

    close() {
      overlay.classList.remove("deleted-overlay--visible");
    },

    renderDeletedTexts(texts, selectedIds) {
      list.replaceChildren();

      texts.forEach(({ id, text }) => {
        const item = createSelectableItem({
          id,
          text,
          selected: selectedIds.has(id),
          classPrefix: "deleted-card",
          datasetKey: "deletedItemId",
        });

        list.append(item);
      });

      confirmRestoreButton.disabled = selectedIds.size === 0;
    },
  };
}

function createTextCardHeader() {
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

function createTextCardActions() {
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

export default function createTextCardView(container) {
  const card = createCard("text-card");

  const header = createTextCardHeader();
  const textList = createTextList();
  const actions = createTextCardActions();

  const addPanel = createAddPanel();
  const deletedCard = createDeletedCard();

  card.append(header, textList.element, actions.element);

  container.append(card);
  document.body.append(addPanel.element, deletedCard.element);

  return {
    list: textList.list,
    selectAllCheckbox: textList.selectAllCheckbox,

    resetButton: actions.resetButton,
    deleteButton: actions.deleteButton,
    addButton: actions.addButton,

    addPanel,
    deletedCard,

    renderTexts(texts, selectedIds) {
      textList.render(texts, selectedIds);
    },
  };
}
