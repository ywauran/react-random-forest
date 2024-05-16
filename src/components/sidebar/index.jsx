import { NavLink } from "react-router-dom";
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
        <Sidebar.Items>
          <Sidebar.Logo href="#" img={Logo} imgAlt="Logo"></Sidebar.Logo>
          <Sidebar.ItemGroup>
            {navData.map((item, index) => (
              <Sidebar.Item
                key={index}
                icon={item.icon}
                active={item.path === window.location.pathname}
                className="text-red-500 cursor-pointer"
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
