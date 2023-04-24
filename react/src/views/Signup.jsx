import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import axiosClient from '../axios.js'
import { useStateContext } from "../contexts/ContextProvider.jsx";


export default function Signup() {
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

const onSubmit = (ev) => {
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


  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Signup for free
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Login with your account
        </Link>
      </p>

      {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
      </div>)}

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-6"
        action="#"
        method="POST"
      >
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">

        <div>
            <label htmlFor="national_id" className="sr-only">
              National ID
            </label>
            <input
              id="national_id"
              name="id"
              type="number"
              required
              value={id}
              onChange={ev => setFullID(ev.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="National ID"
            />
          </div>

          <div>
            <label htmlFor="full-name" className="sr-only">
              Full Name
            </label>
            <input
              id="full-name"
              name="name"
              type="text"
              required
              value={fullName}
              onChange={ev => setFullName(ev.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Full Name"
            />
          </div>


          <div>
          <label htmlFor="surname" className="sr-only">
              Surname
            </label>
            <input
              id="surname"
              name="surname"
              type="text"
              required
              value={surname}
              onChange={ev => setSurname(ev.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Surname"
            />
          </div>


          <div>
          <label htmlFor="gender" className="sr-only">
              Gender
            </label>
            Male:
            <input
              id="gender"
              name="gender"
              type="radio"
              required
              value='male'
              onChange={ev => setGender(ev.target.value)}
            />
            Female:
            <input
              id="gender"
              name="gender"
              type="radio"
              required
              value='female'
              onChange={ev => setGender(ev.target.value)}
            />
          </div>


          <div>
          <label htmlFor="birth_date" className="sr-only">
              Surname
            </label>
            <input
              id="birth_date"
              name="birth_date"
              type="date"
              required
              value={birth_date}
              onChange={ev => setBirthdate(ev.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="birth date"
            />
          </div>


          <div>
          <label htmlFor="adr" className="sr-only">
              Address
            </label>
            <input
              id="adr"
              name="adr"
              type="text"
              required
              value={adr}
              onChange={ev => setAdr(ev.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Address"
            />
          </div>

          <div>
          <label htmlFor="tel" className="sr-only">
              Phone Number
            </label>
            <input
              id="tel"
              name="tel"
              type="text"
              required
              value={tel}
              onChange={ev => setTel(ev.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="tel"
            />
          </div>

          <div>
            <label htmlFor="email-address" className="sr-only">
              Choose the hospital you want to donate to:
            </label>
            <div className="flex flex-col gap-6">
              <select id="hospital" name="hospital" value={hospital} onChange={ev => setHospital(ev.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Choose the hospital you want to donate to:</option>
                <option>CHU Saadna Abdenour</option>
                <option>Bizarre Hospital</option>
                <option>Saadna Abdel Nour</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>


          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>


          <div>
            <label htmlFor="password-confirmation" className="sr-only">
              Password Confirmation
            </label>
            <input
              id="password-confirmation"
              name="password_confirmation"
              type="password"
              required
              value={passwordConfirmation}
              onChange={ev => setPasswordConfirmation(ev.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password Confirmation"
            />
          </div>

          <div>
            <label htmlFor="password-confirmation" className="sr-only">
              Upload Image
            </label>
            <input
  id="image"
  name="image"
  type="file"
  required
  onChange={(e) => setImage(e.target.files[0])}
  className="relative block w-full ..."
/>

          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Signup
          </button>
        </div>
      </form>
    </>
  );
}
