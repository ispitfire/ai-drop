import { useState } from "react";
import { tools, categories } from "./data/tools";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import FeaturedTool from "./components/FeaturedTool";
import CategoryFilter from "./components/CategoryFilter";
import ToolGrid from "./components/ToolGrid";
import FreshDrops from "./components/FreshDrops";
import Footer from "./components/Footer";
import "./styles.css";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredTool = tools.find((t) => t.featured);

  const visibleTools =
    activeCategory === "All"
      ? tools.filter((t) => t.id !== featuredTool?.id)
      : tools.filter((t) => t.category === activeCategory && t.id !== featuredTool?.id);
  const freshTools = visibleTools.filter((t) => t.isNew);

  return (
    <>
      <Nav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <main>
        <Hero />
        <FeaturedTool tool={featuredTool} />
        <section className="browse-section">
          <div className="container">
            <div className="browse-header">
              <h2 className="section-title">{activeCategory === "All" ? "All Tools" : activeCategory}</h2>
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />
            </div>
          </div>
          <div className="container">
            <ToolGrid tools={visibleTools} />
          </div>
        </section>
        <FreshDrops tools={freshTools} />
      </main>
      <Footer />
    </>
  );
}
