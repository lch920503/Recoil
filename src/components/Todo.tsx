import { useSetRecoilState } from "recoil";
import { ITodo, todoState } from "../atom";
import dayjs from "dayjs";

const Todo = ({ id, text, category }: ITodo) => {
  const day = dayjs(id).format("YYYY-MM-DD");
  const setTodoState = useSetRecoilState(todoState);

  const handleChangeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodoState((prev) => {
      const index = prev.findIndex((todo) => todo.id === id);
      const newCategory = { id, text, category: name as any };
      return [...prev.slice(0, index), newCategory, ...prev.slice(index + 1)];
    });
  };

  return (
    <ul>
      <li>
        <span>
          {category} : {text}({day})
        </span>
        {category !== "TODO" && (
          <button name="TODO" onClick={handleChangeCategory}>
            Todo
          </button>
        )}
        {category !== "DOING" && (
          <button name="DOING" onClick={handleChangeCategory}>
            Doing
          </button>
        )}
        {category !== "DONE" && (
          <button name="DONE" onClick={handleChangeCategory}>
            Done
          </button>
        )}
      </li>
    </ul>
  );
};

export default Todo;
