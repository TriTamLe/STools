import { Link } from 'react-router-dom';
import classes from './SkillCard.module.css';
import SVGImage from './SVGImage';
import Tag from './Tag';

const SkillCard = ({ skill, disabled }) => {
  const { id, title, icon, tagId, description } = skill;

  return (
    <Link
      className={classes.skillcard}
      to={`/skills/${id}`}
      disabled={disabled}
    >
      <div className={classes.skillIcon}>
        <SVGImage svgString={icon} width='50%' height='100%' />
      </div>

      <h2 className={classes.skillTitle}>{title}</h2>
      <div className={classes.skillTag}>
        <Tag tagId={tagId} />
      </div>
      <p className={classes.skillDes}>{description}</p>
    </Link>
  );
};
export default SkillCard;
