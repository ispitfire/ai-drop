import { tools } from "./data/tools";

export default function App() {
  return (
    <div>
      <h1>Your next favorite AI tool just dropped</h1>
      <ul>
        {tools.map((tool) => (
          <li key={tool.id}>{tool.name}</li>
        ))}
      </ul>
    </div>
  );
}