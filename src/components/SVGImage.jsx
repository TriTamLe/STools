import { useCallback, useEffect, useState } from 'react';
import { Canvg } from 'canvg';

const SVGImage = ({ svgString, width, height }) => {
  const [image, setImage] = useState(null);

  const convertToImage = useCallback(
    async canvas => {
      const v = await Canvg.from(canvas.getContext('2d'), svgString);
      v.start();
      const dataURL = canvas.toDataURL();
      setImage(dataURL);
    },
    [svgString],
  );

  useEffect(() => {
    const canvas = document.createElement('canvas');
    convertToImage(canvas);
  }, [convertToImage]);

  return <img src={image} alt='icon' width={width} height={height} />;
};

export default SVGImage;
