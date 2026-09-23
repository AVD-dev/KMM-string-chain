export function createCard(className, tagName = "section") {
  const cardElement = document.createElement(tagName);
  cardElement.classList.add(className);

  return cardElement;
}

export function createSelectableItem({
  id,
  text,
  selected,
  classPrefix,
  datasetKey,
}) {
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
