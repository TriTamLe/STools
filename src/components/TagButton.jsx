import { useEffect, useState } from 'react';
import classes from './TagButton.module.css';

const TagButton = props => {
  const { title, color, id } = props.tag;
  const [isActive, setIsActive] = useState(props.active);
  const setButtonActived = () => {
    return props.onclick(id);
  };

  useEffect(() => {
    setIsActive(props.active);
  }, [props.active]);

  return (
    <button
      className={classes.tagbutton}
      style={
        isActive
          ? {
              '--bg-color': color,
              '--bd-Color': color,
              '--text-color': '#f5f5f5',
            }
          : {
              '--bg-color': 'transparent',
              '--text-color': color,
              '--bd-Color': color,
            }
      }
      onClick={setButtonActived}
      onMouseOver={() => setIsActive(true)}
      onMouseOut={() => setIsActive(props.active)}
    >
      {title}
    </button>
  );
};

export default TagButton;
