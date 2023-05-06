import { compress, decompress } from 'lzma-native';

const LZMA_HOW_STRONG = 6;

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

export function compressSVG(svgString) {
  const parser = new DOMParser();
  const svgDOM = parser.parseFromString(svgString, 'image/svg+xml');
  const svgAc = svgDOM.querySelector('svg');
  const { x, y } = svgAc.getBBox();

  const boxValue = [
    x,
    y,
    svgAc.getAttribute('width'),
    svgAc.getAttribute('height'),
  ].join(' ');
  svgDOM.querySelector('svg').setAttribute('viewBox', boxValue);
  const s = new XMLSerializer();
  let compressString = s.serializeToString(svgDOM);

  // Remove unnecessary spaces
  compressString = compressString.replace(/\s+/g, ' ');

  // Remove unnecessary line breaks
  compressString = compressString.replace(/\n/g, '');

  return compressString;
}

export async function compressString(str) {
  const arrayBuffer = new TextEncoder().encode(str).buffer;

  return await compress(arrayBuffer, LZMA_HOW_STRONG, (buffResult, error) => {
    if (error) {
      throw new Error('Can not compress string');
    }
    return buffResult;
  });
}

export async function decompressString(buffer) {
  return await decompress(buffer, LZMA_HOW_STRONG, (decodedBuffer, error) => {
    if (error) {
      throw new Error('Can not compress string');
    }

    return new TextDecoder().decode(decodedBuffer);
  });
}

export function createBinFile(arrayBuffer, name) {
  const blob = new Blob([arrayBuffer]);
  return new File([blob], `${name}.bin`, {
    type: 'application/octet-stream',
  });
}
