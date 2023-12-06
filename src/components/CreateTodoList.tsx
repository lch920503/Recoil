import { useSetRecoilState } from "recoil";
import { todoState } from "../atom";
import { useForm } from "react-hook-form";

interface IForm {
  todo: string;
}

const CreateTodoList = () => {
  const setTodoState = useSetRecoilState(todoState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  const onSubmit = ({ todo }: IForm) => {
    setTodoState((prevTodo) => [
      { id: Date.now(), text: todo, category: "TODO" },
      ...prevTodo,
    ]);
    setValue("todo", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("todo", { required: "할일을 입력하세요" })}
      />
      <span>{errors.todo?.message}</span>
      <button type="submit">등록</button>
    </form>
  );
};

export default CreateTodoList;
