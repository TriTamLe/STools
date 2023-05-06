import { defer } from 'react-router-dom';
import Home from '../components/Home';
import { getData } from '../server';

function HomePage() {
  return <Home />;
}

export default HomePage;

export const loaderTags = async () => {
  return await getData('Tag');
};

export const loaderSkills = async () => {
  return await getData('Skills');
};

export const loader = async () => {
  return defer({
    tagsData: loaderTags(),
    skillsData: loaderSkills(),
  });
};
