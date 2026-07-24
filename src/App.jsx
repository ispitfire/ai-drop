import { useState } from "react";
import { tools, categories } from "./data/tools";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import FeaturedTool from "./components/FeaturedTool";
import CategoryFilter from "./components/CategoryFilter";
import ToolGrid from "./components/ToolGrid";
import FreshDrops from "./components/FreshDrops";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredTool = tools.find((t) => t.featured);

  const visibleTools =
    activeCategory === "All"
      ? tools
      : tools.filter((t) => t.category === activeCategory);
  const freshTools = visibleTools.filter((t) => t.isNew);

  return (
    <>
      <Nav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <main>
        <Hero />
        <FeaturedTool tool={featuredTool} />
        <section id="tools" className="browse-section" aria-labelledby="tools-heading">
          <div className="container">
            <div className="browse-header">
              <h2 id="tools-heading" className="section-title">
                {activeCategory === "All" ? "All Tools" : activeCategory}
              </h2>
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
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
