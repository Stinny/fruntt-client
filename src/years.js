export const years = Array.from({ length: 2010 - 1900 + 1 }, (_, index) => ({
  value: 1900 + index,
  label: (1900 + index).toString(),
}));
