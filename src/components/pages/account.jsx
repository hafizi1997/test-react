import { AuthData } from "../../auth/authwrapper";

function Account() {
  const { user } = AuthData();
  return (
    <div>
      <h4>Title is title Account</h4>
      <p>Username: {user.name}</p>
    </div>
  );
}
export default Account;
