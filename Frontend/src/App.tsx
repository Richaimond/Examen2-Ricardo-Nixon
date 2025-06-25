import { useState, type ChangeEvent } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import type { Item } from "./interfaces/item";
import type { filters } from "./interfaces/filters";
import ItemList from "./components/itemList";
import Filters from "./components/filters";



const App = () => {
  const [items] = useState<Item[]>([
    {
      id: 1,
      name: "Producto A",
      category: "Electrónica",
      description: "Descripción del producto A",
      price: 100,
      stock: 5,
    },
    {
      id: 2,
      name: "Producto B",
      category: "Ropa",
      description: "Descripción del producto B",
      price: 50,
      stock: 10,
    },
    {
      id: 3,
      name: "Producto C",
      category: "Alimentos",
      description: "Descripción del producto C",
      price: 10,
      stock: 20,
    },
  ]);
  const [filters, setFilters] = useState<filters>({});

  // TODO: filtrar items por nombre y categoría (AND)

  const filteredItems = items; // reemplazar por lógica

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <Filters filters={filters} onFilterChange={setFilters} />

      <ItemList items={filteredItems} />
    </>
  );
}

export default App;
