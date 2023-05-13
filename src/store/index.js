import { useEffect } from 'react';
import { useState } from 'react';

let globalState = {};
let actions = {};
let listeners = [];

const dispatch = (actionIdentifier, payload) => {
  const newState = actions[actionIdentifier](globalState, payload);
  globalState = { ...globalState, ...newState };

  listeners.forEach(listener => {
    listener(globalState);
  });
};

export const initState = (initialValue, actionValue) => {
  if (initState) {
    globalState = { ...globalState, ...initialValue };
  }
  actions = { ...actions, ...actionValue };
};

export const useStore = (shouldListened = true) => {
  const setState = useState(globalState)[1];

  useEffect(() => {
    if (shouldListened) {
      listeners.push(setState);
    }
    return () => {
      listeners = listeners.filter(li => li !== setState);
    };
  }, [setState, shouldListened]);

  return [globalState, dispatch];
};
