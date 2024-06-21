import { useState } from "react";
import axiosClient from '../../../axios'
import { useStateContext } from "../../../contexts/ContextProvider";
import styles from "./sign.module.css";
import { Link } from "react-router-dom";

export default function Sign() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [id, setFullID] = useState("");
  const [fullName, setFullName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [birth_date, setBirthdate] = useState("");
  const [adr, setAdr] = useState("");
  const [hospital, setHospital] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ __html: "" });
  const [phase, setPhase] = useState(0);

  const onSubmit = async (ev) => {
    ev.preventDefault();
  setError({ __html: "" });

  const formData = new FormData();
  formData.append("name", fullName);
  formData.append("id", id);
  formData.append("surname", surname);
  formData.append("gender", gender);
  formData.append("birth_date", birth_date);
  formData.append("adr", adr);
  formData.append("tel", tel);
  formData.append("hospital", hospital);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("password_confirmation", passwordConfirmation);
  formData.append("image", image);

  axiosClient
    .post("/signup", formData)
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
        console.log(finalErrors);
        setError({ __html: finalErrors.join("<br>") });
      }
      console.error(error);
    });
  };

  const phasesUi = [
    <div className={styles.phase} key={0}>
      <div>
        <span>Full Name</span>
        <input
          id="full-name"
          name="name"
          type="text"
          required
          value={fullName}
          onChange={ev => setFullName(ev.target.value)}
          placeholder="Full Name"
        />
      </div>
      <div>
        <span>Surname</span>
        <input
          id="surname"
          name="surname"
          type="text"
          required
          value={surname}
          onChange={ev => setSurname(ev.target.value)}
          placeholder="Surname"
        />
      </div>
      <div>
        <span>Birthday</span>
        <input
          id="birth-date"
          name="birthDate"
          type="date"
          required
          value={birth_date}
          onChange={ev => setBirthdate(ev.target.value)}
          placeholder="Birth Date"
        />
      </div>
      <div className={styles.radioGroup}>
        <span>Male:</span>
        <input
          id="male"
          name="gender"
          type="radio"
          required
          value="male"
          onChange={(ev) => setGender(ev.target.value)}
        />
        <span>Female:</span>
        <input
          id="female"
          name="gender"
          type="radio"
          required
          value="female"
          onChange={(ev) => setGender(ev.target.value)}
        />
        </div>

      <button onClick={() => setPhase(1)}>Next</button>
    </div>,
    <div className={styles.phase} key={1}>
      <div>
        <span>National Id</span>
        <input
          id="national-id"
          name="id"
          type="number"
          required
          value={id}
          onChange={ev => setFullID(ev.target.value)}
          placeholder="National ID"
        />
      </div>
      <div>
        <span>Email</span>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          placeholder="Email"
        />
      </div>
      <div>
        <span>Password</span>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          placeholder="Password"
        />
      </div>
      <div>
        <span>Confirm Password</span>
        <input
          id="password-confirmation"
          name="password_confirmation"
          type="password"
          required
          value={passwordConfirmation}
          onChange={ev => setPasswordConfirmation(ev.target.value)}
          placeholder="Confirm Password"
          />
        </div>
      <button onClick={() => setPhase(0)}>Back</button>
      <button onClick={() => setPhase(2)}>Next</button>
      </div>,
      <div className={styles.phase} key={2}>
        <div>
          <span>Address</span>
          <input
                 id="address"
                 name="adr"
                 type="text"
                 required
                 value={adr}
                 onChange={ev => setAdr(ev.target.value)}
                 placeholder="Address"
               />
          </div>
        <div>
          <span>Hospital</span>
          <select id="hospital" name="hospital" value={hospital} onChange={ev => setHospital(ev.target.value)}>
                <option>Choose the hospital you want to donate to:</option>
                <option>CHU Saadna Abdenour</option>
                <option>Bizarre Hospital</option>
                <option>Saadna Abdel Nour</option>
              </select>
        </div>
        <div>
          <span>Phone Number</span>
          <input
                 id="phone-number"
                 name="tel"
                 type="tel"
                 required
                 value={tel}
                 onChange={ev => setTel(ev.target.value)}
                 placeholder="Phone Number"
               />
        </div>
        <div>
          <span>Profile Picture</span>
          <input
                 className="image"
                 id="profile-picture"
                 name="image"
                 type="file"
                 accept="image/*"
                 onChange={(e) => setImage(e.target.files[0])}
                 placeholder="Upload you profile image"
               />
        </div>
      <button onClick={() => setPhase(1)}>Back</button>
      <button onClick={onSubmit} type="submit">Sign Up</button>
    </div>,
  ];
          
  return (
    <div className={styles.sign}>
      <div className={styles.rightSide}>
        <div>
          <h1>Bloodify</h1>
          <h3>Sign up and your journey to help people start here</h3>
      <h4>
        Or{" "}
        <Link to="/login">
          Login with your account
        </Link>
      </h4>

      {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 text-white"
          dangerouslySetInnerHTML={error}
        ></div>
      )}
        </div>
        {phasesUi[phase]}
        {error == 401 && <div>user already exist</div>}
      </div>
      <div className={styles.leftSide}>
        <div className={styles.img}></div>
        <div className={styles.overlay}></div>
      </div>
    </div>
  );
}
