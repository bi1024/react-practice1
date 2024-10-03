//done only for demonstration purposes, app is too simple for any meaningful useReducer usage

export function filterCategoryReducer(filterCategory, action) {
  switch (action.type) {
    case 'changed': {
      return action.filterCategory;
    }
    case 'deleted': {
      return "";
    }
    default: {

      // throw Error('Unknown action: ' + action.type);
    }
  }
}
