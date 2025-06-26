import type { filters } from "./filters";

export interface FiltersProps {
  filters: filters;
  onFilterChange: (filters: filters) => void;
}