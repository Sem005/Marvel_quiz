import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import type { RouteComponentProps } from "../../types/components";

const Login = (props: RouteComponentProps) => {
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState<string | Error>("");

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [password, email, btn]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await firebase.loginUser(email, password);
      setEmail("");
      setPassword("");
      props.history.push("/welcome");
    } catch (err) {
      setError(err as Error);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>

        <div className="formBoxRight">
          <div className="formContent">
            {error !== "" && (
              <span>{error instanceof Error ? error.message : error}</span>
            )}

            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              {btn ? (
                <button>Connexion</button>
              ) : (
                <button disabled>Connexion</button>
              )}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Nouveau sur Marvel Quiz? inscrivez-vous maintenant
              </Link>
              <br />
              <Link className="simpleLink" to="/forgetpassword">
                Mot de passe oublié? Récupérez-le ici.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
