import { useState, useEffect } from 'react';
import classes from './SkillContent.module.css';
import SVGImage from './SVGImage';
import Tag from './Tag';
import { useStore } from '../store';
import { Suspense } from 'react';
import { Await } from 'react-router-dom';

const SKillContent = ({ skill }) => {
  const { fileURL, title, icon, tagId, description } = skill;
  const store = useStore()[0];

  const tag = store.tags.find(tag => tag.id === tagId);
  const fetchContent = async () => {
    return fetch(fileURL).then(response => response.text());
  };

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
          <Suspense fallback={<p>Đang tải nội dung...</p>}>
            <Await resolve={fetchContent()}>
              {response => {
                return <div dangerouslySetInnerHTML={{ __html: response }} />;
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};
export default SKillContent;
