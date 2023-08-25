import { Navigate, createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import { DashBoard, HomePage, PageNotFound, About } from "@/pages/index";
import AdminBlog from "./pages/Admin/Blog";
import AdminBlogUpdate from "./pages/Admin/Blog/update";
import AdminBlogAdd from "./pages/Admin/Blog/add";
import AdminProject from "./pages/Admin/Project";
import AdminProjectAdd from "./pages/Admin/Project/add";
import AdminProjectUpdate from "./pages/Admin/Project/update";
import AdminTag from "./pages/Admin/Tag";
import AdminTagAdd from "./pages/Admin/Tag/add";
import AdminTagUpdate from "./pages/Admin/Tag/update";
import AdminCustomerReview from "./pages/Admin/CustomerReview";
import AdminCustomerReviewAdd from "./pages/Admin/CustomerReview/add";
import AdminCustomerReviewUpdate from "./pages/Admin/CustomerReview/update";
export const router = createBrowserRouter([
  /*Admin */
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Navigate to={"dashboard"} /> },
      {
        path: "dashboard",
        element: <DashBoard />,
      },
      {
        path: "blogs",
        element: <AdminBlog />,
      },
      {
        path: "blogs/add",
        element: <AdminBlogAdd />,
      },
      {
        path: "blogs/update/:id",
        element: <AdminBlogUpdate />,
      },
      {
        path: "projects",
        element: <AdminProject />,
      },
      {
        path: "projects/add",
        element: <AdminProjectAdd />,
      },
      {
        path: "projects/update/:id",
        element: <AdminProjectUpdate />,
      },
      {
        path: "tags",
        element: <AdminTag />,
      },
      {
        path: "tags/add",
        element: <AdminTagAdd />,
      },
      {
        path: "tags/update/:id",
        element: <AdminTagUpdate />,
      },
      {
        path: "reviews",
        element: <AdminCustomerReview />,
      },
      {
        path: "reviews/add",
        element: <AdminCustomerReviewAdd />,
      },
      {
        path: "reviews/update/:id",
        element: <AdminCustomerReviewUpdate />,
      },
    ],
  },
  /* Client */
  {
    path: "/",
    element: <HomePage />,
  },
  { path: "#about", element: <About /> },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
