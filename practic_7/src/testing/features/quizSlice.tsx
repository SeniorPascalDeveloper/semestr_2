import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
  lists: string[][];      // порядок ответов для каждого M/S задания (по индексу)
  choices: string[][];    // выбранные варианты для каждого C задания (по индексу)
}

const initialState: ListsState = {
  lists: [],
  choices: [],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    // добавить список ответов задания по индексу
    addList: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },
    // обновить порядок ответов задания (при перетаскивании)
    setDraggedItems: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },
    // сохранить выбор пользователя для задания типа C
    setChoice: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.choices[index] = items;
    },
  },
});

export const { addList, setDraggedItems, setChoice } = listsSlice.actions;
export default listsSlice.reducer;