import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllTasks = async (auth_id, page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos?page=${page}`, {
      headers: { Authorization: `Bearer ${auth_id}` },
    });
    return {
      tasks: response.data?.data,
      pagination: {
        page: response?.data?.pagination?.page,
        totalPages: response?.data?.pagination?.totalPages,
      },
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (content, dueDate, completed, auth_id) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/todos`,
      { content: content, dueDate: dueDate, completed: completed },
      { headers: { Authorization: `Bearer ${auth_id}` } }
    );
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createSubTask = async (task_id, content, completed, auth_id) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/todos/${task_id}/subTodo`,
      { content, completed },
      { headers: { Authorization: `Bearer ${auth_id}` } }
    );
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateSubTodo = async (
  todoId,
  subTodoId,
  content,
  completed,
  dueDate,
  auth_id
) => {
  try {
    let response;

    if (subTodoId === "") {
      response = await axios.put(
        `${API_BASE_URL}/todos/${todoId}/subTodo`,
        {
          content,
          completed,
          dueDate,
        },
        { headers: { Authorization: `Bearer ${auth_id}` } }
      );
    } else {
      response = await axios.put(
        `${API_BASE_URL}/todos/${todoId}/subTodo/${subTodoId}`,
        {
          content,
          completed,
        },
        { headers: { Authorization: `Bearer ${auth_id}` } }
      );
    }

    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleTask = async (taskId, auth_id) => {
  try {
    const todo = await axios.get(`${API_BASE_URL}/todos/${taskId}`, {
      headers: { Authorization: `Bearer ${auth_id}` },
    });
    return todo?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteSubTodo = async (task_id, subTodoId, auth_id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/todos/${task_id}/delete_subTodo/${subTodoId}`,
      { headers: { Authorization: `Bearer ${auth_id}` } }
    );

    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// TASK COMPLETION COUNTS
export const getMonthlyTaskCompletionCount = async (year, month, auth_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/todos/monthly/count/${year}/${month}`,
      {
        headers: { Authorization: `Bearer ${auth_id}` },
      }
    );
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getYearlyTasksCont = async (year, auth_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos/wholeYear/count/${year}`, {
      headers: { Authorization: `Bearer ${auth_id}` },
    });

    return response?.data

  } catch (error) {
    console.log(error);
    throw error;
  }
};
