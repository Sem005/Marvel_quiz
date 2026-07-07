import React, { Fragment, useState, useContext, useEffect } from "react";
import Logout from "../components/Logout";
import Quiz from "../components/Quiz";
import FirebaseContext from "../components/Firebase/contexte";
import { useHistory } from "react-router-dom";

const Welcome: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const [userSession, setUserSession] = useState<any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    if (!firebase) return;
    const listener = firebase.auth.onAuthStateChanged((user: any) => {
      user ? setUserSession(user) : history.push("/");
    });

    if (userSession !== null) {
      firebase
        .fetchUserData()
        .then((user: any) => {
          console.log(".....fetched user....", user);
          setUserData(user);
        })
        .catch(() => {});
    }

    return () => {
      listener();
    };
  }, [firebase, history, userSession]);

  const quiz =
    userData === null ? (
      <div>
        <div className="loader"></div>
        <p className="center">Loading ...</p>
      </div>
    ) : (
      <Quiz userData={userData} />
    );

  return (
    <Fragment>
      <div className="quiz-bg">
        <div className="container">
          <Logout />
          {quiz}
        </div>
      </div>
    </Fragment>
  );
};

export default Welcome;
