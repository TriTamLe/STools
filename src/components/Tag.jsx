import { Suspense } from 'react';
import { Await, useRouteLoaderData } from 'react-router-dom';
import classes from './Tag.module.css';
import { getHSL } from '../util';

const Tag = ({ tagId }) => {
  const tagsData = useRouteLoaderData('home').tagsData;
  return (
    <Suspense fallback={<p>Phân loại....</p>}>
      <Await resolve={tagsData}>
        {tags => {
          const _tag = tags.data.find(tag => tag.id === tagId);
          const hslColor = getHSL(_tag.color);
          const textColor = `hsl(${Math.round(hslColor.hue)}, ${Math.round(
            hslColor.saturation * 100,
          )}%, ${Math.round(hslColor.lightness * 100)}%)`;
          const bgColor = `hsl(${Math.round(hslColor.hue)}, ${Math.round(
            hslColor.saturation * 100,
          )}%, 95%)`;

          return (
            <div
              className={classes.tag}
              style={{
                '--text-color': textColor,
                '--bg-color': bgColor,
              }}
            >
              {_tag.title}
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Tag;
