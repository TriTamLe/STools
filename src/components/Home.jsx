import { Suspense, useState } from 'react';
import TagListButton from '../components/TagListButtons';
import classes from './Home.module.css';
import { Await } from 'react-router-dom';
import SkillList from './SkillList';
import { useStore } from '../store';

function Home() {
  const [idActive, setIdActive] = useState('all');
  const store = useStore()[0];

  const setActive = id => {
    setIdActive(id);
  };

  return (
    <div className={classes.homepage}>
      <h1>Những công cụ để phát triển tư duy</h1>

      <Suspense fallback={<h3>Đang tải công cụ...</h3>}>
        <div className={classes.tagList}>
          <Await resolve={store.tags}>
            {tags => {
              return (
                <TagListButton
                  tags={tags}
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
