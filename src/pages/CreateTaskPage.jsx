
import { format } from "date-fns";



import { useAuth } from "@/context/AuthContextProvider";
import { createTask, getAllTasks } from "@/api/taskApi";
import { useNavigate } from "react-router-dom";
import { stringToBoolean } from "@/constant";
import { useTasks } from "@/context/TaskContextProvider";
import TaskForm from "@/forms/taskForm";



const CreateTask = () => {
  const { loggedInUser_Info } = useAuth();
  const { setTasks } = useTasks();

  const navigate = useNavigate();

 

  const onSubmit = async (todo) => {

    const completed = stringToBoolean(todo.status);

    let isoDate;
    if (todo?.dueDate !== undefined) {
      const date = new Date(todo.dueDate);
      isoDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    }

    isoDate = todo?.dueDate;

    await createTask(
      todo?.content,
      isoDate,
      completed,
      loggedInUser_Info?.auth_id
    );

    const updatedTasks = await getAllTasks(loggedInUser_Info?.auth_id, 1);

    setTasks(updatedTasks?.tasks);

    navigate("/");
  };

 

  return (
    <div className="px-1">
     <TaskForm onSubmit={onSubmit}/>
    </div>
  );
};

export default CreateTask;
