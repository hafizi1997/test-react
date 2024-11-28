import { createContext, useContext, useState, useEffect } from "react";
import {
  RenderRoutes,
  RenderMenu,
} from "../components/structure/render-navigation";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          name: "",
          isAuthenticated: false,
          imageUrl: null,
          imageProfile: null,
        };
  });

  const login = (userName, password) => {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:8081/profile";
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          const userData = data.user;
          console.log("data", data.user);
          if (password === userData.password) {
            const authenticatedUser = {
              name: userData.name,
              isAuthenticated: true,
              imageUrl: userData.imageLogo,
              imageProfile: userData.imageProfile,
            };
            setUser(authenticatedUser);
            // Save user data in localStorage
            localStorage.setItem("user", JSON.stringify(authenticatedUser));
            resolve("Login successful");
          } else {
            reject("Incorrect password");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          reject(error.message);
        });
    });
  };

  const logout = () => {
    setUser({
      name: "",
      isAuthenticated: false,
      imageUrl: null,
      imageProfile: null,
    });
    // Clear user data from localStorage
    localStorage.removeItem("user");
  };
  useEffect(() => {
    // Sync state if localStorage changes
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(
        storedUser
          ? JSON.parse(storedUser)
          : { name: "", isAuthenticated: false }
      );
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div className="mt-0">
        <RenderMenu />
        <RenderRoutes />
      </div>
    </AuthContext.Provider>
  );
};
