import { Route, Routes } from "react-router-dom";
import BasicLayout from "./Layouts/BasicLayout";
import Homepage from "./pages/Homepage";
import CreateTaskPage from "./pages/CreateTaskPage";
import LoginPage from "./pages/LoginPage";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import TaskOverViewPage from "./pages/TaskOverViewPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<Homepage />} />
          <Route
            path="/create_task"
            element={
              <AuthenticatedLayout>
                <CreateTaskPage />
              </AuthenticatedLayout>
            }
          />
          <Route
            path="/updateTask/:taskId"
            element={
              <AuthenticatedLayout>
                <UpdateTaskPage />
              </AuthenticatedLayout>
            }
          />
           <Route
            path="/task_overview"
            element={
              <AuthenticatedLayout>
                <TaskOverViewPage />
              </AuthenticatedLayout>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
