import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, todoSelectorState } from "../atom";
import CreateTodoList from "../components/CreateTodoList";
import Todo from "../components/Todo";

const TodoList = () => {
  const [category, setCategory] = useRecoilState(categoryState);
  const todoCategory = useRecoilValue(todoSelectorState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setCategory(value);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <CreateTodoList />
      <select value={category} onInput={onInput}>
        <option value="TODO">Todo</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      {todoCategory?.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
