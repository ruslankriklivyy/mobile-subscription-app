const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

export const rgbToHex = (rgb: Record<string, number>) => {
  const { r, g, b } = rgb;
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
