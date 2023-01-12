import { useState } from "react";
import { toast } from "react-toastify";
import { authStore } from "../features/auth/auth.store";
import { authService } from "../features/auth/auth.service";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Register() {
  let navigate = useNavigate();

  const { setUser, setError, setSuccess, setLoading, setMessage } = authStore();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = formData;

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (password === password2) {
      setLoading(true);
      setIsLoading(true);
      const responseData = await authService.register(formData);
      if (responseData.error) {
        await setError(true);
        await setSuccess(false);
        await setMessage(responseData.error);
        toast.error(responseData.error);
      } else {
        await setError(false);
        await setSuccess(true);
        await setMessage("");
        await setUser(responseData.access_token);
        toast.success("You have successfully logged in");
        return navigate("/");
      }
      setLoading(false);
      setIsLoading(false);
    } else {
      toast.error("Your password does not match its confirmation");
    }
  };

  return (
    <div
      className="ui middle aligned center aligned grid"
      style={{ marginTop: 60, marginBottom: "justify" }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ maxWidth: "450px" }}>
          <h2 className="ui teal header">Create a new account</h2>
          <form className="ui middle form" onSubmit={onSubmit}>
            <div className="ui stacked segment">
              <div className="field">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Your email"
                  onChange={onChange}
                />
              </div>
              <div className="field">
                <label className="form-label">Create a Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="New password"
                  onChange={onChange}
                />
              </div>
              <div className="field">
                <label className="form-label">Confirm your Password</label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  value={password2}
                  placeholder="Confirm password"
                  onChange={onChange}
                />
              </div>
              <input
                className="ui fluid large teal submit button"
                type="submit"
                value="Register"
              />
            </div>
          </form>

          <div className="ui message">
            Do you have an account?
            <Link className="ui fluid large submit blue button" to="/login">
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
