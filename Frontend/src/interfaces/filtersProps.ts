import type { Filters } from "./Filters";

export interface FiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}