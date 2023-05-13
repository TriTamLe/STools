import { Outlet, useRouteLoaderData } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { useStore } from '../store';
import { useCallback } from 'react';

const RootPage = () => {
  const homeloader = useRouteLoaderData('home');
  const dispatch = useStore()[1];

  const firstUpdateStore = useCallback(async () => {
    const skillData = await homeloader.skillsData;
    const tagData = await homeloader.tagsData;
    dispatch('replace_skill', skillData.data);
    dispatch('replace_tag', tagData.data);
  }, [homeloader, dispatch]);

  useEffect(() => {
    firstUpdateStore();
  }, [firstUpdateStore]);

  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};
export default RootPage;
