export const reformateCategory = (categories: string[]) => [
  { value: "all", label: "All Categories" },
  ...categories.map((cat) => ({
    value: cat,
    label: String(cat).charAt(0).toUpperCase() + String(cat).slice(1),
  })),
];
