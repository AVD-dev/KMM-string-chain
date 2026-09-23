import { createSelectableItem, createCard } from "./view.helpers.js";

export default function createDeletedCard() {
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
