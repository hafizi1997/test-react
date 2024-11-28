import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/authwrapper";
import bgBck from "../../../src/assets/img/bg-gradient.png";

function Login() {
  const navigate = useNavigate();
  const { login } = AuthData();
  const [formData, setFormData] = useReducer(
    (formData, newItem) => {
      return { ...formData, ...newItem };
    },
    { userName: "", password: "" }
  );
  const [errorMessage, setErrorMessage] = useState(null);

  const doLogin = async () => {
    try {
      await login(formData.userName, formData.password);
      navigate("/account");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="absolute inset-0">
      <img
        src={bgBck}
        alt="background"
        className="h-full w-full object-cover"
      />
      <div className="page">
        <h2>Login page</h2>
        <div className="inputs">
          <div className="input">
            <input
              value={formData.userName}
              onChange={(e) => setFormData({ userName: e.target.value })}
              type="text"
            />
          </div>
          <div className="input">
            <input
              value={formData.password}
              onChange={(e) => setFormData({ password: e.target.value })}
              type="password"
            />
          </div>
          <div className="button">
            <button onClick={doLogin}>Log in</button>
          </div>
          {errorMessage ? <div className="error">{errorMessage}</div> : null}
        </div>
      </div>
    </div>
  );
}
export default Login;
