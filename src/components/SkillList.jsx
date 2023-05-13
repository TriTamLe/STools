import { Await } from 'react-router-dom';
import SkillCard from './SkillCard';
import classes from './SkillList.module.css';
import { Suspense } from 'react';
import { useStore } from '../store';

const SkillList = ({ idActive }) => {
  const store = useStore()[0];

  return (
    <Suspense fallback={<p>Đang tải các kỹ năng...</p>}>
      <Await resolve={store.skills}>
        {skills => {
          let skillsdata = skills;
          if (idActive !== 'all') {
            skillsdata = skills.filter(ele => ele.tagId === idActive);
          }
          return (
            <div className={classes.skillList}>
              {skillsdata.map(skill => {
                return (
                  <SkillCard key={skill.id} skill={skill} disabled={false} />
                );
              })}
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default SkillList;
