import { createCard } from "./view.helpers.js";

export default function createAddPanel() {
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
