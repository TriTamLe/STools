import { Await, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import SKillContent from '../components/SkillContent';
import { Suspense } from 'react';

const SKillContentPage = () => {
  const homeData = useRouteLoaderData('home');
  const skillId = useLoaderData();

  return (
    <Suspense fallback={<p>Tải nội dung...</p>}>
      <Await resolve={homeData.skillsData}>
        {skills => {
          const skill = skills.data.find(ele => ele.id === skillId);

          return <SKillContent skill={skill} />;
        }}
      </Await>
    </Suspense>
  );
};

export default SKillContentPage;

export const loader = async ({ params }) => {
  const skillId = await params.skillId;
  return skillId;
};
