import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import Logo from "../../../assets/logo.png";
import { Card, Button, TextInput, Label, Spinner } from "flowbite-react";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Email dan kata sandi harus diisi");
      return;
    }

    setIsSigningIn(true);
    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (error) {
      setErrorMessage(error.message);
      setIsSigningIn(false);
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/drugs" replace={true} />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-36 h-36" />
        </div>
        {errorMessage && (
          <div className="w-full p-2 font-semibold text-center text-red-600 bg-red-300">
            <p>{errorMessage}</p>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email" className="text-sm font-bold text-gray-600">
              Email
            </Label>
            <TextInput
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              color="blue"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mt-4 space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-bold text-gray-600"
            >
              Kata Sandi
            </Label>
            <TextInput
              id="password"
              type="password"
              placeholder="Kata Sandi"
              value={password}
              color="blue"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              size="md"
              disabled={isSigningIn}
              color={isSigningIn ? "gray" : "blue"}
              className="w-full"
            >
              {isSigningIn ? <Spinner /> : "Masuk"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
