import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Dashboard/Home";
import Invoices from "./components/Dashboard/Invoices";
import NewInvoice from "./components/Dashboard/NewInvoice";
import Setting from "./components/Dashboard/Setting";
import InvoiceDetail from "./components/Dashboard/InvoiceDetail";

function App() {
  const myRouter = createBrowserRouter([
    { path: "", Component: Login },
    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
    {
      path: "/dashboard",
      Component: Dashboard,
      children: [
        { path: "", Component: Home },
        { path: "home", Component: Home },
        { path: "invoices", Component: Invoices },
        { path: "newinvoice", Component: NewInvoice },
        { path: "setting", Component: Setting },
        { path: "invoice-detail", Component: InvoiceDetail },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={myRouter} />
    </div>
  );
}

export default App;
