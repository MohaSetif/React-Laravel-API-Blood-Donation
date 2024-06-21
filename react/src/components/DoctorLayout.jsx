import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import '../index3.css'
import { useLocation } from "react-router-dom";
import { Navigate, NavLink, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { useEffect } from "react";
import Toast from "./Toast";
import NotFound from "../NotFound";
const navigation = [
  { name: "Dashboard", to: "/doctor" },
  { name: "Interactions", to: "/doctor/interactions" },
  { name: "Users", to: "/doctor/doc_users" },
  { name: "Users' files", to: "/doctor/users_files" },
  { name: "Blood Bank", to: "/doctor/doc_blood_bank" },
  { name: "Patients", to: "/doctor/patients" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DoctorLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();

    if (!userToken) {
    return <Navigate to="/"/>
  }

  const location = useLocation();

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setCurrentUser({});
      setUserToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get('/me')
      .then(({ data }) => {
        setCurrentUser(data)
      })
  }, [])

if (currentUser.usertype === 'doctor') {
  return (
    <div className="Doctor">
<nav className="fixed top-0 z-50 w-full bg-blue-700 border-b border-blue-700 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
    <div className="flex items-center justify-start">
      <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      <a href="/doctor" className="flex ml-2 md:mr-24">
        <svg height="25" width="25" className="m-1">
          <circle cx="12.5" cy="12.5" r="10" stroke-width="2" fill="red" />
          Sorry, your browser does not support inline SVG.
        </svg>
        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">Bloodify</span>
      </a>
    </div>
      <div className="flex items-center">
          <div className="flex items-center ml-3">
          <Menu as="div" className="relative ml-3">
                <div className="flex-initial flex items-center">
                  <Menu.Button className="max-w-xs bg-blue-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <div className="flex items-center space-x-2">
                      <UserIcon className="w-8 h-8 bg-gray-700/25 p-2 rounded-full text-white" />
                    </div>
                  </Menu.Button>
                </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        <a
                          href="/"
                          className={
                            "block px-4 py-2 text-sm text-blue-700"
                          }
                        >
                          home
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          href="#"
                          onClick={(ev) => logout(ev)}
                          className={
                            "block px-4 py-2 text-sm text-blue-700"
                          }
                        >
                          Sign out
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
          </div>
        </div>
    </div>
  </div>
</nav>

<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-blue-700 border-r border-blue-700 sm:translate-x-0 dark:bg-blue-800 dark:border-blue-700" aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-blue-700 dark:bg-blue-800">
      <ul className="space-y-2 font-medium">
         {navigation.map((item) => (
                    <NavLink
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      "flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-blue-500",
                      item.to === location.pathname
                        ? "bg-blue-400 text-dark"
                        : "text-blue-300 hover:bg-blue-900 hover:text-dark"
                    )}
                  >
                    {item.name}
                  </NavLink>
                  
                  ))}
      </ul>
   </div>
</aside>

<div className="p-4 sm:ml-64">
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <Outlet/>
        <Toast/>
   </div>
</div>
    </div>
  );
} else {
  return <NotFound/>;
}}
