import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AppLayout from "./components/layout/AppLayout";
import Products from "./pages/Products";
import Inbox from "./pages/Inbox";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddProduct from "./components/UI/AddProduct";
import About from "./pages/About";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products/>
        },
        {
          path: "/inbox",
          element: <Inbox/>
        },
        {
          path: "/profile",
          element: <Profile/>
        },
        {
          path: "/signup",
          element: <Signup/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/addproduct",
          element: <AddProduct/>
        },
        {
          path: "/about",
          element: <About/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;