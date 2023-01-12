import { authStore } from "../features/auth/auth.store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout() {
  const navigate = useNavigate();
  const { resetUser, setError, setSuccess, setLoading, setMessage } =
    authStore();

  const onLogout = async () => {
    await setError(false);
    await setSuccess(false);
    await setLoading(false);
    await setMessage("");
    await resetUser();
    toast.success("You have successfully logged out");
    navigate("/login");
  };

  return (
    <a onClick={onLogout} className="item">
      Logout
    </a>
  );
}

export default Logout;
