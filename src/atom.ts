import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
  category: "TODO" | "DOING" | "DONE";
}

export const todoState = atom<ITodo[]>({
  key: "todoState",
  default: [],
});

export const categoryState = atom({
  key: "categoryState",
  default: "TODO",
});

export const todoSelectorState = selector({
  key: "todoSelectorState",
  get: ({ get }) => {
    const todoList = get(todoState);
    const category = get(categoryState);
    if (category === "TODO")
      return todoList.filter((todo) => todo.category === "TODO");
    if (category === "DOING")
      return todoList.filter((todo) => todo.category === "DOING");
    if (category === "DONE")
      return todoList.filter((todo) => todo.category === "DONE");
  },
});
