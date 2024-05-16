import React from "react";
import Login from "./components/auth/login";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import NotFound from "./pages/404";
import Drugs from "./pages/drugs";
import DetailDrugs from "./pages/drugs/detail-drugs";
import CalculateDrugs from "./pages/drugs/calculate-drugs";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/drugs",
      element: <Drugs />,
    },
    {
      path: "/drugs/:id",
      element: <DetailDrugs />,
    },
    {
      path: "/drugs/calculate/:id",
      element: <CalculateDrugs />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <React.Fragment>{routesElement}</React.Fragment>
    </AuthProvider>
  );
}

export default App;
