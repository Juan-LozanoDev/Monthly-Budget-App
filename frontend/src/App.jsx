import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import Incomes from "./pages/dashboard/Incomes";
import Expenses from "./pages/dashboard/Expenses";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound/NotFound";


const Root = () => {
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? <Navigate to={"/dashboard"} /> : <Navigate to={"/login"} />;
};

const router = createBrowserRouter([
    { path: "/", element: <Root /> },
    { path: "/dashboard", element: <Home /> },
    { path: "/incomes", element: <Incomes /> },
    { path: "/expenses", element: <Expenses /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/*", element: <NotFound /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;