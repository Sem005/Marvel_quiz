import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import type { RouteComponentProps } from "../../types/components";

interface SignupFormData {
  pseudo: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = (props: RouteComponentProps) => {
  const firebase = useContext(FirebaseContext);

  const data: SignupFormData = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState<SignupFormData>(data);
  const [error, setError] = useState<string | Error>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await firebase.signupUser(loginData);
      setLoginData({ ...data });
      props.history.push("/welcome");
    } catch (err) {
      setLoginData({ ...data });
      setError(err as Error);
    }
  };

  const { pseudo, email, password, confirmPassword } = loginData;

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>SignUp</button>
    ) : (
      <button>SignUp</button>
    );

  const errorMsg = error !== "" && (
    <span>{error instanceof Error ? error.message : error}</span>
  );

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>

        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={pseudo}
                  type="text"
                  id="pseudo"
                  autoComplete="off"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  required
                />
                <label htmlFor="confirmPassword">
                  Confirmer votre mot de passe
                </label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Deja inscrit? Connectez-vous{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
