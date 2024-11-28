import About from "../pages/about";
import Account from "../pages/account";
import Home from "../pages/home";
import Login from "../pages/login";
import Private from "../pages/private";

export const Navigation = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isMenu: true,
    isPrivate: false,
    position: "right",
    icon: "pi pi-fw pi-home",
  },
  {
    path: "/about",
    name: "About",
    element: <About />,
    isMenu: true,
    isPrivate: true,
    position: "right",
    icon: "pi pi-fw pi-user",
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isMenu: false,
    isPrivate: false,
    position: "left",
    icon: "pi pi-fw pi-sign-in",
  },
  {
    path: "/private",
    name: "Private",
    element: <Private />,
    isMenu: true,
    isPrivate: true,
    position: "right",
    icon: "pi pi-fw pi-lock",
  },
  {
    path: "/account",
    name: "Account",
    element: <Account />,
    isMenu: false,
    isPrivate: true,
  },
];
