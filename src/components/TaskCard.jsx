/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import SubTodoCard from "./SubTodoCard";

const TaskCard = ({ task }) => {
  const statusClass = task?.completed ? "bg-green-300" : "bg-red-300";

  return (
    
      <>
        <article
          key={task?._id}
          className="rounded-xl border border-gray-700 bg-gray-800 p-4"
        >
          <div className="flex flex-col lg:flex-row justify-between  items-center gap-2">
            <h3 className="text-lg font-medium text-white">
              <Link to={`/updateTask/${task?._id}`}>{task?.content}</Link>
            </h3>
            <span className="text-white flex gap-2 items-center">
              {" "}
              <span className={`h-4 w-4 ${statusClass} rounded-lg`}></span>{" "}
              {task?.completed ? "completed" : "Not Completed"}
            </span>
          </div>

          <SubTodoCard taskName={task?.content} task_id={task?._id} />

          <ul className="mt-4 space-y-2">
            {task?.subTodos.map((subTodo) => (
              <>
                <li key={subTodo?._id}>
                  <SubTodoCard
                    taskName={task?.content}
                    subTodo={subTodo}
                    task_id={task?._id}
                  />
                </li>
              </>
            ))}
          </ul>
        </article>
      </>
    
  );
};

export default TaskCard;
