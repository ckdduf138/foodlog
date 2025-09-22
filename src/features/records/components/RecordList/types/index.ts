export type SortOption = "latest" | "rating-high";

export interface SortConfig {
  value: SortOption;
  label: string;
  icon?: React.ReactNode;
}

export interface RecordFilterState {
  searchTerm: string;
  sortBy: SortOption;
}
