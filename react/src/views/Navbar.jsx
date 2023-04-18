import React from 'react'
import axiosClient from "../axios";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function Navbar() {
  const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();

  const handleLogout = (ev) => {
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
      .catch((error) => {
        console.log(error);
      });
  }, []);


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="https://flowbite.com/" className="flex items-center">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            {userToken ? (
              <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</Link>
                </li>
                <li>
                  <Link to="/posts" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover-md:text-blue-700 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white" aria-label="About us">Posts</Link>
</li>
<li>
<a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover-md:text-blue-700 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white" aria-label="Contact us">Contact us</a>
</li>
<li>
<a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover-md:text-blue-700 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white" aria-label="Profile">Profile</a>
</li>
<li>
<Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {currentUser.name}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/profile"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Profile
                </a>
              )}
            </Menu.Item>
            {currentUser.usertype === 'donor' && (
  <Menu.Item>
    {({ active }) => (
      <a
        href="/donate"
        className={classNames(
          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
          'block px-4 py-2 text-sm'
        )}
      >
        Donate now
      </a>
    )}
  </Menu.Item>
)}
            <form method="POST" action="#" className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button onClick={handleLogout} className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm'
                  )} aria-label="Logout">Logout</button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
</li>
</ul>
) : (
<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
<li>
<a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
</li>
<li>
<a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover-md:text-blue-700 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white" aria-label="About us">About us</a>
</li>
<li>
<a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover-md:text-blue-700 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white" aria-label="Contact us">Contact us</a>
</li>
<li>
<a href="/login" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover-md:text-blue-700 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white" aria-label="Login">Login</a>
</li>
<li>
<a href="/signup" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover-md:text-blue-700 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white" aria-label="Login">Signup</a>
</li>
</ul>
)}
</div>
</div>
</nav>
</div>
);
}

export default Navbar;