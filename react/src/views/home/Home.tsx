import styles from "./Home.module.css";
import { motion as m } from "framer-motion";
import { Link as ScrollLink, animateScroll } from "react-scroll";
import { Link as RouteLink, useSearchParams } from "react-router-dom";
import img4 from "../../assets/images/image_4.jpg";
import About from "./about/about";
import Program from "./programs/programV2";
import Contact from "./contact/Contact";
import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Home() {
  const [searchParams, SetSearchParams] = useSearchParams();

  useEffect(() => {
    if (
      +searchParams.get("scrollY")! !== 0 &&
      searchParams.get("scrollY") != null
    ) {
      animateScroll.scrollTo(+searchParams.get("scrollY")!, {
        duration: 0,
        smooth: true,
      });
      SetSearchParams({ scrollY: "0" });
    }
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

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


  return (
    <div className={styles.home}>
      <div className={styles.main}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <span></span>
            <h4>Bloodify</h4>
          </div>
          <div className={styles.sections}>
            <span>
              <ScrollLink spy={true} smooth={true} to="main">
                Home
              </ScrollLink>
            </span>
            <span>
              <ScrollLink spy={true} smooth={true} to="About_Us">
                About us
              </ScrollLink>
            </span>
            <span>
              <ScrollLink spy={true} smooth={true} to="Our_Program">
                Our Programs
              </ScrollLink>
            </span>
            <span>
              <ScrollLink spy={true} smooth={true} to="Contact_Us">
                Contact
              </ScrollLink>
            </span>
            <span>
            {userToken ? (
              <RouteLink to={"/profile"}>
                {currentUser.name}
              </RouteLink>
            ) : (
              <RouteLink to={"/login"}>
              <span>Login</span>
            </RouteLink>
            )}
            </span>
          </div>
        </div>
        <div className={styles.Body}>
          <div className={styles.leftPart}>
            <div>
              <div>
                <m.h3
                  initial={{ y: "100%" }}
                  animate={{ y: "0" }}
                  transition={{ duration: 1.4, ease: "linear" }}
                >
                  Small Steps to make
                </m.h3>
              </div>
              <div>
                <m.h1
                  className={styles.header}
                  initial={{ y: "80%" }}
                  animate={{ y: "0" }}
                  transition={{ duration: 1.4, ease: "linear" }}
                >
                  <span>Big </span>
                  <span>Impa</span>
                  <span>ct</span>
                </m.h1>
              </div>
            </div>
            <div>
              <p>
                We provide blood bank management system for hospitals and
                flawless communication with patients and donators
              </p>
              {userToken ? (
                <>
               <h2>You'll make a huge impact, {currentUser.name}</h2>
               <img src={`../uploads/images/${currentUser.image}`} alt="User Image" className="w-6 h-6 rounded-full" />
               </>
            ) : (
              <div>
              <button className="border border-gray-400 px-4 py-2">
                <RouteLink to={'/signup'}>Sign up now!</RouteLink>
              </button>
            </div>
            )}
            </div>
          </div>
          <div className={styles.rightPart}>
            <m.img
              initial={{ width: "0%" }}
              animate={{ width: "90%" }}
              transition={{ duration: 1.4, ease: "linear" }}
              src={img4}
            />
          </div>
        </div>
      </div>
      <About />
      <Program />
      <Contact />
    </div>
  );
}
