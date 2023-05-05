import { defer } from 'react-router-dom';
import Home from '../components/Home';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  import.meta.env.VITE_URL,
  import.meta.env.VITE_ANON_KEY,
);

function HomePage() {
  return <Home />;
}

export default HomePage;

export const loaderTags = async () => {
  return await supabase.from('Tag').select('*');
};

export const loaderSkills = async () => {
  return await supabase.from('Skills').select('*');
};

export const loader = async () => {
  return defer({
    tagsData: loaderTags(),
    skillsData: loaderSkills(),
  });
};
