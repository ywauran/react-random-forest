import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { Sidebar, Button } from "flowbite-react";
import Logo from "../../assets/logo.png";

const navData = [
  {
    path: "/drugs",
    label: "Data Obat",
    icon: "ri-home-line",
  },
];

const SidebarApp = () => {
  let navigate = useNavigate();
  return (
    <>
      <Sidebar aria-label="Default sidebar example" className="h-screen ">
        <Sidebar.Items className="items-center space-y-2">
          <Sidebar.Logo
            href="#"
            img={Logo}
            className="w-14 h-14"
            imgAlt="Logo"
            style={{ width: "100px" }}
          />
          <Sidebar.ItemGroup>
            {navData.map((item, index) => (
              <Sidebar.Item
                key={index}
                icon={item.icon}
                active={item.path === window.location.pathname}
                className={`font-bold cursor-pointer ${
                  item.path === window.location.pathname ? "border-b-4" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item>
              <Button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/");
                  });
                }}
                color="blue"
                className="w-full"
              >
                Keluar
              </Button>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default SidebarApp;
