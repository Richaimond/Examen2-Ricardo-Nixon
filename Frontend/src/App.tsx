import { useState, type ChangeEvent } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

interface Item {
  id: number;
  name: string;
  category: string;
  description?: string;
  price?: number;
  stock?: number;
}

interface Filters {
  name?: string;
  category?: string;
}

interface FiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const Filters = ({ filters, onFilterChange }: FiltersProps) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: actualizar filtro de nombre
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // TODO: actualizar filtro de categoría
  };

  return (
    <div className="filters">
      <label>
        Buscar por nombre:
        <input type="text" value={filters.name || ""} onChange={handleNameChange} />
      </label>
      <label>
        Filtrar por categoría:
        <select value={filters.category || ""} onChange={handleCategoryChange}>
          <option value="">Todas</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Ropa">Ropa</option>
          <option value="Alimentos">Alimentos</option>
        </select>
      </label>
    </div>
  );
}

interface ItemListProps {
  items: Item[];
}

const ItemList = ({ items }: ItemListProps) => {
  // TODO: controlar item expandido (estado local)
  // TODO: manejar que solo un item esté expandido a la vez

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id} onClick={() => { /* TODO: toggle expandido */ }}>
          <strong>{item.name}</strong>
          {/* TODO: mostrar detalles solo si está expandido */}
        </li>
      ))}
    </ul>
  );
}

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
  const [filters, setFilters] = useState<Filters>({});

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
