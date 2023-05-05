export function getHSL(hex) {
  var r = parseInt(hex.substring(1, 3), 16) / 255;
  var g = parseInt(hex.substring(3, 5), 16) / 255;
  var b = parseInt(hex.substring(5, 7), 16) / 255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var delta = max - min;

  var hue =
    max == r
      ? (60 * ((g - b) / delta) + 360) % 360
      : max == g
      ? (60 * ((b - r) / delta) + 120) % 360
      : (60 * ((r - g) / delta) + 240) % 360;

  var saturation = max == 0 ? 0 : delta / max;
  var lightness = (max + min) / 2;

  return {
    hue: Math.round(hue),
    saturation: saturation,
    lightness: lightness,
  };
}
