import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Newsletter from "./Newsletter";

describe("Newsletter", () => {
  it("shows error for invalid email", async () => {
    const user = userEvent.setup();
    render(<Newsletter />);

    const input = screen.getByLabelText("Email address");
    await user.type(input, "bad-email");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it("shows success for valid email", async () => {
    const user = userEvent.setup();
    render(<Newsletter />);

    const input = screen.getByLabelText("Email address");
    await user.type(input, "reader@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByText(/you.*re on the list/i)).toBeInTheDocument();
  });
});