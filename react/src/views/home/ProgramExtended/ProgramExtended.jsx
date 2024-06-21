import { Link, useLocation, useParams, Navigate, useNavigate } from 'react-router-dom';
import managerProgram from '../../../assets/images/managerImg.jpg';
import doctorProgram from '../../../assets/images/doctorImg.jpg';
import donorProgram from '../../../assets/images/donorImg.jpg';
import styles from './ProgramExtended.module.css';
import { motion as m } from "framer-motion";
import backArrow from "../../../assets/images/arrow-left-solid.svg";
import { useEffect } from 'react';
import { animateScroll } from "react-scroll";

const PROGRAMS = [
  {
    title: "Service Managers Program",
    img: managerProgram,
    useCases: [
      {
        title: "Managing service doctors",
        description:
          "Service managers will be responsible for adding new doctor from their service to manage blood exchanges, also they reset the password in case of forgetting it or delete the doctor. They can browse doctors and check the blood exchanges that they controlled.",
      },
      {
        title: "Browse donors",
        description:
          "Also they can browse donors that exist in the system and check someone profile information like tel, gmail, address, full name and most notably their old blood exchanges that helps him get a picture about the donor and try communicating with gmail or telephone number also the search can be filtered by national ids or address or name or age and blood type.",
      },
      {
        title: "Creating Posts",
        description:
          "Service managers can add blood demand posts for donors and that helps them give a message about their blood need.",
      },
      {
        title: "Request management",
        description:
          "Service can ask others for blood by sending request listing their need of  plasma, red cells, platelets, full blood and they bind message to the request that helps explaining their situation. On the other hand, receiving service can either accept or reject and bind respond message with that also the same service can mark this request as fulfilled making the blood bank update automatically.",
      },
      {
        title: "Managing Blood bank",
        description:
          "The manager can update the quantities of the blood bank manually for plasma, red cells, platelets, full blood and also they can set minimal quantity for each and that will alert them to make post to donors or requests to other services.",
      },
      {
        title: "Appointments management",
        description:
          "Browsing to donors appointments to make a donation and respond by rejection or acceptance",
      },
    ],
  },
  {
    title: "Doctors Program",
    img: doctorProgram,
    useCases: [
      {
        title: "Managing blood exchanges",
        description:
          "Doctors will be responsible for managing blood exchanges for their patients, they can browse blood exchanges and check the donors and patients information, they can also mark a blood exchange as completed or cancel it.",
      },
      {
        title: "Request blood from other services",
        description:
          "Doctors can request blood from other services by creating a request for plasma, red cells, platelets, or full blood with a message that explains the patient's situation.",
      },
      {
        title: "Viewing blood bank",
        description:
          "Doctors can browse the blood bank and check the quantities of plasma, red cells, platelets, and full blood.",
      },
      {
        title: "Creating blood exchange posts",
        description:
          "Doctors can create blood exchange posts for their patients and choose the blood type they need, then donors can respond to the post if they are eligible to donate.",
        },
        {
        title: "Appointments management",
        description:
        "Doctors can manage appointments for their patients to donate blood.",
        },
        ],
        },
        {
        title: "Donors Program",
        img: donorProgram,
        useCases: [
        {
        title: "Managing blood exchanges",
        description:
        "Donors can manage their blood exchanges, see the details of the exchange and mark it as completed or cancel it if necessary.",
        },
        {
        title: "Viewing appointments",
        description:
        "Donors can see their appointments and mark them as completed or cancel them.",
        },
        {
        title: "Viewing requests",
        description:
        "Donors can view the blood requests made by others and respond to them with a message.",
        },
        {
        title: "Creating posts",
        description:
        "Donors can create posts offering to donate blood and specifying the blood type they can donate.",
        },
        ],
        },
        ];
        
        const ProgramExtended = () => {
          const location = useLocation();
        
          // Map program titles to program objects
          const programsMap = {
            manager_program: PROGRAMS[0],
            doctor_program: PROGRAMS[1],
            donor_program: PROGRAMS[2],
          };
        
          const program = programsMap[location.pathname.split('/')[1]];
        
          if (!program) {
            return (
              <div className={styles.container}>
                <h1>Program not found</h1>
                <Link to="/">
                  <img src={backArrow} alt="Back to home" />
                </Link>
              </div>
            );
          }
        
          const navigate = useNavigate();
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
      smooth: true,
    });
  }, []);

          return (
            <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "linear" }}
      className={styles.ProgramExtended}
    >
            <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <div
        className={styles.middleLayer}
        style={{ backgroundImage: `url(${program.img})` }}
      >
        <h1>{program.title}</h1>
      </div>
      <div className={styles.lastLayer}>
        {program.useCases.map((current, index) => (
          <div className={styles.Case}>
            <div>
              <span>{index + 1}</span>
              <h3>{current.title}</h3>
            </div>
            <p>{current.description}</p>
          </div>
        ))}
      </div>
              </m.div>
          );
        };
        export default ProgramExtended;
