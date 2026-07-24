import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { tools, categories } from "./data/tools";

describe("AI Drop", () => {
  it("renders the AI Drop heading", () => {
    render(<App />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    const found = headings.some((h) =>
      h.textContent.includes("Your next favorite"),
    );
    expect(found).toBe(true);
  });

  it("renders all curated tool names at least once", () => {
    render(<App />);
    for (const tool of tools) {
      const matches = screen.getAllByText(tool.name);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders category chips in the filter", () => {
    render(<App />);
    const filterGroup = screen.getByRole("group", { name: /filter by category/i });
    for (const cat of categories) {
      expect(within(filterGroup).getByRole("button", { name: cat })).toBeInTheDocument();
    }
  });

  it("filters by Code category and hides non-Code cards", async () => {
    const user = userEvent.setup();
    render(<App />);

    const featuredId = tools.find((t) => t.featured)?.id;

    // Only tools that appear EXCLUSIVELY in the grid (not featured, not fresh)
    // These are the only ones we can reliably test for hide/show
    const gridOnlyTools = tools.filter((t) => !t.featured && !t.isNew);
    const codeGridTools = gridOnlyTools.filter((t) => t.category === "Code");
    const nonCodeGridTools = gridOnlyTools.filter((t) => t.category !== "Code");

    await user.click(
      within(screen.getByRole("group", { name: /filter by category/i }))
        .getByRole("button", { name: "Code" }),
    );

    // Code grid-only tools should still be visible
    for (const tool of codeGridTools) {
      expect(screen.getByText(tool.name)).toBeInTheDocument();
    }

    // Non-Code grid-only tools should disappear
    for (const tool of nonCodeGridTools) {
      expect(screen.queryByText(tool.name)).not.toBeInTheDocument();
    }
  });

  it("external links have _blank and noreferrer", () => {
    render(<App />);
    const links = screen.getAllByRole("link", { name: /try it/i });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    }
  });
});