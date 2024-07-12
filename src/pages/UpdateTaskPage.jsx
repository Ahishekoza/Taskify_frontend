import { getAllTasks, getSingleTask, updateSubTodo } from "@/api/taskApi";
import { formatDate, stringToBoolean } from "@/constant";
import { useAuth } from "@/context/AuthContextProvider";
import { useTasks } from "@/context/TaskContextProvider";
import TaskForm from "@/forms/taskForm";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTaskPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { setTasks } = useTasks();
  const { loggedInUser_Info } = useAuth();
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    const fetchSingleTask = async () => {
      const result = await getSingleTask(taskId, loggedInUser_Info?.auth_id);
      setCurrentTodo(result);
    };

    fetchSingleTask();
  }, [taskId, loggedInUser_Info?.auth_id]);

  const onSubmit = async (todo) => {
    const completed = stringToBoolean(todo.status);

    let dueDate;
    if (todo?.dueDate !== undefined) {
      dueDate = formatDate(todo?.dueDate);
    }

    dueDate = todo?.dueDate;

    const result = await updateSubTodo(
      taskId,
      "",
      todo?.content,
      completed,
      dueDate,
      loggedInUser_Info?.auth_id
    );

    if (result?._id) {
      const updatedTasks = await getAllTasks(loggedInUser_Info?.auth_id, 1);

      setTasks(updatedTasks?.tasks);

      navigate("/");
    }
  };
  

  return (
    <div className="px-1">
      <TaskForm
        onSubmit={onSubmit}
        content={currentTodo.content}
        completed={currentTodo.completed}
        dueDate={currentTodo.dueDate}
        _id={currentTodo?._id}
      />
    </div>
  );
};

export default UpdateTaskPage;
