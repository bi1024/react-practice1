
import { create } from "zustand";

const createSelectors = (_store) => {
  let store = _store;
  store.use = {}; // Initialize `use` object to hold selector functions

  // Iterate over the keys of the state returned by getState()
  for (let k of Object.keys(store.getState())) {
    // For each key, create a function in `store.use` that selects that specific state
    store.use[k] = () => store((s) => s[k]);
  }

  return store; // Return the enhanced store with selectors
}

const useStoreBase = createSelectors(create((set) => ({
  category: '',
  isModalOpen: false,
  changed: (newCategory) => { set({ category: newCategory }) },
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
})));

export default useStoreBase;