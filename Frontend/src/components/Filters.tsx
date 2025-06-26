import type { ChangeEvent } from "react";
import type { FiltersProps } from "../interfaces/filtersProps";


export default function Filters({ filters, onFilterChange }: FiltersProps) {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      name: e.target.value
    });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      category: e.target.value
    });
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