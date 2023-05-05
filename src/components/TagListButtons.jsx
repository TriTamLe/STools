import TagButton from './TagButton';
import classes from './TagListButton.module.css';

const TagListButton = ({ tags, idActive, setActive }) => {
  const all = {
    id: 'all',
    title: 'TẤT CẢ',
    color: '#333333',
  };

  return (
    <ul className={classes.tagslist}>
      <TagButton tag={all} active={idActive === all.id} onclick={setActive} />
      {tags.map(tag => {
        return (
          <TagButton
            tag={tag}
            active={tag.id === idActive}
            onclick={setActive}
            key={tag.id}
          />
        );
      })}
    </ul>
  );
};

export default TagListButton;
