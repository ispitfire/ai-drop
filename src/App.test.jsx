import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { tools, categories } from "./data/tools";

describe("AI Drop", () => {
  function getCuratedGrid() {
    const grid = document.querySelector("#tools .tool-grid");
    expect(grid).not.toBeNull();
    return grid;
  }

  function getGridToolNames() {
    return within(getCuratedGrid())
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
  }

  it("renders the AI Drop heading", () => {
    render(<App />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    const found = headings.some((h) =>
      h.textContent.includes("Your next favorite"),
    );
    expect(found).toBe(true);
  });

  it("renders all eight curated records in the main tool grid", () => {
    render(<App />);

    expect(getGridToolNames()).toEqual(tools.map((tool) => tool.name));
    expect(within(getCuratedGrid()).getAllByRole("article")).toHaveLength(8);
  });

  it("renders category chips in the filter", () => {
    render(<App />);
    const filterGroup = screen.getByRole("group", { name: /filter by category/i });
    for (const cat of categories) {
      expect(within(filterGroup).getByRole("button", { name: cat })).toBeInTheDocument();
    }
  });

  it("shows every exact-category record and marks only that filter active", async () => {
    const user = userEvent.setup();
    render(<App />);

    const filterGroup = screen.getByRole("group", { name: /filter by category/i });

    for (const category of categories) {
      await user.click(
        within(filterGroup).getByRole("button", { name: category }),
      );

      const expectedNames = tools
        .filter((tool) => category === "All" || tool.category === category)
        .map((tool) => tool.name);

      expect(getGridToolNames()).toEqual(expectedNames);

      for (const filterCategory of categories) {
        expect(
          within(filterGroup).getByRole("button", { name: filterCategory }),
        ).toHaveAttribute(
          "aria-pressed",
          String(filterCategory === category),
        );
      }
    }
  });

  it("uses safe external links for every curated tool card", () => {
    render(<App />);

    const links = within(getCuratedGrid()).getAllByRole("link", { name: /try it/i });
    expect(links).toHaveLength(tools.length);

    for (const [index, link] of links.entries()) {
      expect(link).toHaveAttribute("href", tools[index].url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
      expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    }
  });

  it("connects Browse Tools links to the tool collection", () => {
    render(<App />);
    const links = screen.getAllByRole("link", { name: "Browse Tools" });

    for (const link of links) {
      const target = link.getAttribute("href");
      expect(target).toBe("#tools");
      expect(document.querySelector(target)).toBeInTheDocument();
    }
  });

  it("uses honest footer destinations and safe external links", () => {
    render(<App />);

    const footer = screen.getByRole("contentinfo");
    const expectedInPageLinks = [
      ["Browse Tools", "#tools"],
      ["Featured", "#featured"],
      ["Newsletter", "#newsletter"],
    ];

    for (const [name, href] of expectedInPageLinks) {
      const link = within(footer).getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(document.querySelector(href)).toBeInTheDocument();
    }

    for (const link of within(footer).getAllByRole("link")) {
      const href = link.getAttribute("href");
      expect(href).not.toBe("#");

      if (href.startsWith("#")) {
        expect(document.querySelector(href)).toBeInTheDocument();
      } else {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
        expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
      }
    }
  });

  it("does not render bare placeholder links", () => {
    render(<App />);

    for (const link of screen.getAllByRole("link")) {
      expect(link).not.toHaveAttribute("href", "#");
    }
  });
});
