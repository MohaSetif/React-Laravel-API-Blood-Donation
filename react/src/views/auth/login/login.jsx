import { useRef, useState } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from '../../../axios'

export default function Login() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          setError({ __html: finalErrors.join("<br>") });
        }
        console.error(error);
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.rightSide}>
        <div>
          <h1>Bloodify</h1>
          <h2>Let's continue our journey on helping people</h2>
          <h2>
        Sign in to your account
      </h2>
      <h4>
        Or{" "}
        <Link to="/signup">
          signup for free
        </Link>
      </h4>

      {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 text-white"
          dangerouslySetInnerHTML={error}
        ></div>
      )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button onClick={onSubmit}>Login</button>
        </div>
      </div>
      <div className={styles.leftSide}>
        <div className={styles.img}></div>
        <div className={styles.overlay}></div>
      </div>
    </div>
  );
}
