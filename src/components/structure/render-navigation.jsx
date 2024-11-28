import { Route, Routes } from "react-router-dom";
import { AuthData } from "../../auth/authwrapper";
import { Navigation } from "./navigation";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";

export const RenderRoutes = () => {
  const { user } = AuthData();

  return (
    <Routes>
      {Navigation.map((r, i) => {
        if (r.isPrivate && user.isAuthenticated) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else if (!r.isPrivate) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else return null;
      })}
    </Routes>
  );
};

export const RenderMenu = () => {
  const { user, logout } = AuthData();
  const navigate = useNavigate();
  const start = user.isAuthenticated ? (
    <div className="flex align-items-center">
      <img
        alt="logo"
        src={user.imageUrl || "https://via.placeholder.com/40"}
        style={{ height: "40px", width: "50px", cursor: "pointer" }}
        className="ml-4"
        onClick={() => navigate("/")}
      />
    </div>
  ) : null;

  const leftItems = Navigation.filter(
    (r) =>
      r.position === "right" &&
      ((!r.isPrivate && r.isMenu) || (r.isPrivate && user.isAuthenticated))
  ).map((r) => ({
    label: r.name,
    icon: `pi pi-fw ${r.icon}`,
    command: () => navigate(r.path),
  }));

  const right = (
    <div className="flex align-items-center gap-2">
      {user.isAuthenticated ? (
        <>
          <h3>{user.name}</h3>
          <Avatar
            image={user.imageProfile || "https://via.placeholder.com/40"}
            shape="circle"
            onClick={() => navigate("/account")}
            style={{ cursor: "pointer" }}
          />
          <button
            type="button"
            className="p-menuitem-link"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            style={{
              marginLeft: "1rem",
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <span
              className="pi pi-fw pi-sign-out"
              style={{ marginRight: "0.5rem" }}
            ></span>
            Log out
          </button>
        </>
      ) : (
        <button
          type="button"
          className="p-menuitem-link"
          onClick={() => navigate("/login")}
          style={{
            marginLeft: "1rem",
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <span
            className="pi pi-fw pi-sign-in"
            style={{ marginRight: "0.5rem" }}
          ></span>
          Log in
        </button>
      )}
    </div>
  );

  return <Menubar start={start} model={leftItems} end={right} />;
};
