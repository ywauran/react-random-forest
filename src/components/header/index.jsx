import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav className="fixed top-0 left-0 z-20 flex flex-row items-center w-full h-12 bg-gray-200 border-b gap-x-2 place-content-center">
      {userLoggedIn && (
        <>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/");
              });
            }}
            className="text-sm text-blue-600 underline"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Header;
