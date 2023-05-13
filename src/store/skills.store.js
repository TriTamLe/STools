import { initState } from '.';

const configureStore = () => {
  const skillInitialValue = { skills: [] };
  const actions = {
    add_skill: (prevState, payload) => {
      const mergeArray = [...prevState.skills, ...payload];
      const uniqueArr = Array.from(
        new Set(mergeArray.map(skill => skill.id)),
      ).map(id => mergeArray.find(skill => skill.id === id));

      const newState = {
        skills: uniqueArr,
      };
      return newState;
    },
    replace_skill: (prevState, payload) => {
      return { skills: payload };
    },
  };

  initState(skillInitialValue, actions);
};

export default configureStore;
