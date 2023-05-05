import { Await, useRouteLoaderData } from 'react-router-dom';
import SkillCard from './SkillCard';
import classes from './SkillList.module.css';
import { Suspense } from 'react';

const SkillList = ({ idActive }) => {
  const homeData = useRouteLoaderData('home');

  return (
    <Suspense fallback={<p>Đang tải các kỹ năng...</p>}>
      <Await resolve={homeData.skillsData}>
        {skills => {
          let skillsdata = skills.data;
          if (idActive !== 'all') {
            skillsdata = skills.data.filter(ele => ele.tagId === idActive);
          }
          return (
            <div className={classes.skillList}>
              {skillsdata.map(skill => {
                return <SkillCard key={skill.id} skill={skill} />;
              })}
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default SkillList;
