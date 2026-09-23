import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ButtonChip } from "./button-chip";

describe("ButtonChip", () => {
  afterEach(() => cleanup());

  it("SHOULD renders its content", () => {
    render(<ButtonChip onClick={() => {}}>ADD</ButtonChip>);

    expect(screen.getByRole("button", { name: "ADD" })).toBeInTheDocument();
  });

  it("SHOULD has the base class", () => {
    render(<ButtonChip onClick={() => {}}>ADD</ButtonChip>);

    expect(screen.getByRole("button")).toHaveClass("button-chip");
  });

  it("SHOULD applies the severity class", () => {
    render(
      <ButtonChip severity="danger" onClick={() => {}}>
        DELETE
      </ButtonChip>,
    );

    expect(screen.getByRole("button")).toHaveClass("button-chip--danger");
  });

  it("SHOULD applies the outlined class", () => {
    render(
      <ButtonChip outlined onClick={() => {}}>
        RESET
      </ButtonChip>,
    );

    expect(screen.getByRole("button")).toHaveClass("button-chip--outlined");
  });

  it("SHOULD applies a custom class", () => {
    render(
      <ButtonChip className="text-card__add" onClick={() => {}}>
        ADD
      </ButtonChip>,
    );

    expect(screen.getByRole("button")).toHaveClass("text-card__add");
  });

  it("SHOULD renders an icon", () => {
    render(
      <ButtonChip icon={<svg data-testid="icon" />} onClick={() => {}}>
        RESET
      </ButtonChip>,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("SHOULD calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ButtonChip onClick={onClick}>ADD</ButtonChip>);

    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
