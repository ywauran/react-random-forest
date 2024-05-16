import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const Layout = ({ children }) => {
  const { userLoggedIn } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    // Redirect the user to the login page if not logged in
    if (!userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  if (!userLoggedIn) {
    return (
      <div class="flex items-center justify-center w-full h-full">
        <div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <svg
            fill="none"
            class="w-6 h-6 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>

          <div>Memuat ...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="relative w-full h-full p-10 overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:ml-64">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
