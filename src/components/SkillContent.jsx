import { useState, useEffect } from 'react';
import classes from './SkillContent.module.css';
import SVGImage from './SVGImage';
import Tag from './Tag';
import { useStore } from '../store';

const SKillContent = ({ skill }) => {
  const { fileURL, id, title, icon, tagId, description } = skill;
  const [htmlContent, setHtmlContent] = useState('');
  const store = useStore()[0];

  const tag = store.tags.find(tag => tag.id === tagId);

  useEffect(() => {
    fetch(fileURL)
      .then(response => response.text())
      .then(data => setHtmlContent(data));
  }, []);

  return (
    <>
      <div
        className={classes.skillContent}
        style={{
          '--mainColor': tag.color,
        }}
      >
        <div className={classes.headerCard}>
          <div className={classes.skillIcon}>
            <SVGImage svgString={icon} width='100%' height='auto' />
          </div>
          <div className={classes.skillInfo}>
            <h2 className={classes.skillTitle}>{title}</h2>
            <div className={classes.skillTag}>
              <Tag tagId={tagId} />
            </div>
            <p className={classes.skillDes}>{description}</p>
          </div>
        </div>

        <div className={classes.content}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </>
  );
};
export default SKillContent;
