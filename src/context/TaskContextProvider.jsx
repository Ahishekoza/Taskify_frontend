/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/// TasksContext.js
import { getAllTasks } from "@/api/taskApi";
import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContextProvider";

const TasksContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const { loggedInUser_Info } = useAuth();

  const [isLoadingTask, setIsLoadingTask] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [pagination_Info, setPagination_Info] = useState({
    page: 1,
    totalPages: 0,
  });



  useEffect(() => {
    const fetchTasks = async () => {
      if (!loggedInUser_Info?.auth_id) {
        return;
      }

      setIsLoadingTask(true);
      try {
        
        const result = await getAllTasks(loggedInUser_Info.auth_id, pagination_Info.page);
        setTasks(result.tasks || []);
        setPagination_Info(prev => ({
          ...prev,
          totalPages: result.pagination.totalPages,
        }));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoadingTask(false);
      }
    };

    fetchTasks();
  }, [pagination_Info.page, loggedInUser_Info?.auth_id]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks, pagination_Info, setPagination_Info, isLoadingTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);

