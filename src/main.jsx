import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import UserProvider from "./UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <UserProvider>
      <App />
    </UserProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </>
);
