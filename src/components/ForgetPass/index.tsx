import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import type { RouteComponentProps } from "../../types/components";

const ForgetPassword = (props: RouteComponentProps) => {
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firebase?.passwordReset) {
      setError("Service indisponible.");
      return;
    }

    try {
      await firebase.passwordReset(email);
      setError("");
      setSuccess(`Consultez votre email ${email} pour changer le mot de passe`);
      setEmail("");

      setTimeout(() => {
        props.history.push("/login");
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSuccess("");
    }
  };

  const successMessage = success && (
    <span
      style={{
        border: "1px solid green",
        background: "green",
        color: "#ffffff",
      }}
    >
      {success}
    </span>
  );

  const disabled = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>

        <div className="formBoxRight">
          <div className="formContent">
            {successMessage}
            {error && <span>{error}</span>}

            <h2>Mot de passe oublié ?</h2>
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

              <button disabled={disabled}>Récupérer</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit ? Connectez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
