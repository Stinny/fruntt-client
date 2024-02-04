export const days = Array.from({ length: 31 }, (_, index) => ({
  value: index + 1,
  label: (index + 1).toString(),
}));
