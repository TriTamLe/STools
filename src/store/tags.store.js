import { initState } from '.';

const configureStore = () => {
  const tagsInitialValue = { tags: [] };
  const actions = {
    add_tag: (prevState, payload) => {
      const mergeArray = [...prevState.tags, ...payload];
      const uniqueArr = Array.from(
        new Set(mergeArray.map(skill => skill.id)),
      ).map(id => mergeArray.find(skill => skill.id === id));

      const newState = {
        tags: uniqueArr,
      };
      return newState;
    },
    replace_tag: (prevState, payload) => {
      return { tags: payload };
    },
  };

  initState(tagsInitialValue, actions);
};

export default configureStore;
