import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ButtonChip, type ButtonChipProps } from "./button-chip";

const renderButton = (props: Partial<ButtonChipProps> = {}) => {
  const { children = "MockName", onClick = vi.fn(), ...rest } = props;

  render(
    <ButtonChip {...rest} onClick={onClick}>
      {children}
    </ButtonChip>,
  );

  return {
    button: screen.getByRole("button"),
    onClick,
  };
};

describe("ButtonChip", () => {
  afterEach(() => cleanup());

  it("SHOULD renders its content", () => {
    renderButton();

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("SHOULD has the base class", () => {
    renderButton();

    expect(screen.getByRole("button")).toHaveClass("button-chip");
  });

  it("SHOULD applies the severity class", () => {
    renderButton({ severity: "danger" });

    expect(screen.getByRole("button")).toHaveClass("button-chip--danger");
  });

  it("SHOULD applies the outlined class", () => {
    renderButton({ outlined: true });

    expect(screen.getByRole("button")).toHaveClass("button-chip--outlined");
  });

  it("SHOULD applies a custom class", () => {
    renderButton({ className: "text-card__add" });

    expect(screen.getByRole("button")).toHaveClass("text-card__add");
  });

  it("SHOULD renders an icon", () => {
    renderButton({ icon: <svg data-testid="icon" /> });

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("SHOULD calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const { button, onClick } = renderButton();

    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });
});
