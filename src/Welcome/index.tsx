import React, { Fragment, useContext, useEffect, useState } from "react";
import Logout from "../components/Logout";
import Quiz from "../components/Quiz";
import { FirebaseContext } from "../components/Firebase";
import type { UserData } from "../types";

const Welcome = (props: { history: { push: (path: string) => void } }) => {
  const firebase = useContext(FirebaseContext);
  const [userSession, setUserSession] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((user: any) => {
      user ? setUserSession(user) : props.history.push("/");
    });

    if (userSession !== null) {
      firebase.fetchUserData().then((user: UserData | undefined) => {
        setUserData(user ?? null);
      });
    }

    return () => {
      listener();
    };
  }, [firebase, props.history, userSession]);

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
