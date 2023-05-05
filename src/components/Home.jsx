import { Suspense, useState } from 'react';
import TagListButton from '../components/TagListButtons';
import classes from './Home.module.css';
import { Await, useLoaderData } from 'react-router-dom';
import SkillList from './SkillList';

function Home() {
  const [idActive, setIdActive] = useState('all');
  const homeData = useLoaderData();

  const setActive = id => {
    setIdActive(id);
  };

  return (
    <div className={classes.homepage}>
      <h1>Những công cụ để phát triển tư duy</h1>

      <Suspense fallback={<h3>Đang tải công cụ...</h3>}>
        <div className={classes.tagList}>
          <Await resolve={homeData.tagsData}>
            {tags => {
              return (
                <TagListButton
                  tags={tags.data}
                  idActive={idActive}
                  setActive={setActive}
                />
              );
            }}
          </Await>
        </div>
        <div className={classes.skillList}>
          <SkillList idActive={idActive} />
        </div>
      </Suspense>
    </div>
  );
}

export default Home;
