import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import SurveyPublicView from "./views/SurveyPublicView";
import Surveys from "./views/Surveys";
import SurveyView from "./views/SurveyView";
import AddUsers from "./views/admin/Create";
import UserEdit from "./views/admin/Edit";
import UserView from "./views/admin/View";
import Users from './views/admin/Users'
import BloodBank from './views/admin/Blood_bank'
import EditBloodBank from './views/admin/Edit_blood_bank'
import EditBloodGroup from './views/admin/Edit_Blood_Group'
import DoctorLayout from "./components/DoctorLayout";
import Doc_Dashboard from './views/doctors/Doc_Dashboard'
import Doc_Users from './views/doctors/Users'
import Doc_Interactions from './views/doctors/Interactions'
import Doc_Blood_Bank from './views/doctors/Blood_bank'
import DocEditBloodBank from './views/doctors/Edit_blood_bank'
import DocEditBloodGroup from './views/doctors/Edit_Blood_Group'
import UserFile from './views/doctors/Create_File'
import Home from "./views/home/Home";
import File from "./views/doctors/File";
import Profile from "./views/Profile";
import Posts from "./views/Posts";
import Notifications from "./views/admin/Notifications";
import Notification from "./views/admin/Notification";
import Help from "./views/admin/Help";
import Donate from "./views/Donate";
import Doc_Users_Edit from "./views/doctors/Doc_Users_Edit";
import AddPatients from "./views/doctors/Add_Patient";
import Patients from "./views/doctors/Patients";
import PatientEdit from "./views/doctors/EditPatients";
import PatientView from "./views/doctors/PatientsView";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <DefaultLayout />,
    children: [
      {
        path: '/admin/dashboard',
        element: <Navigate to="/admin" />
      },
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/surveys",
        element: <Surveys />,
      },
      {
        path: "/admin/surveys/create",
        element: <SurveyView />,
      },
      {
        path: "/admin/surveys/:id",
        element: <SurveyView />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/users/create",
        element: <AddUsers />,
      },
      {
        path: "/admin/users/:id",
        element: <UserView />,
      },
      {
        path: "/admin/users/edit/:id",
        element: <UserEdit />,
      },
      {
        path: "/admin/blood_bank",
        element: <BloodBank />,
      },
      {
        path: "/admin/blood_bank/edit/:id",
        element: <EditBloodBank />,
      },
      {
        path: "/admin/blood_groups/edit/:id",
        element: <EditBloodGroup />,
      },
      {
        path: "/admin/notifications",
        element: <Notifications />,
      },
      {
        path: "/admin/notifications/edit/:id",
        element: <Notification />,
      },
      {
        path: "/admin/help",
        element: <Help />,
      },
    ],
  },
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/posts",
    element: <Posts/>
  },
  {
    path: "/donate",
    element: <Donate/>
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/posts",
        element: <Posts/>
      },
    ],
  },
  {
    path: "/survey/public/:slug",
    element: <SurveyPublicView />,
  },
  {
    path: "/doctor",
    element: <DoctorLayout />,
    children: [
      {
        path: '/doctor/dashboard',
        element: <Navigate to="/doctor" />
      },
      {
        path: "/doctor",
        element: <Doc_Dashboard />,
      },
      {
        path: "/doctor/doc_users",
        element: <Doc_Users />,
      },
      {
        path: "/doctor/doc_users/edit/:id",
        element: <Doc_Users_Edit />,
      },
      {
        path: "/doctor/interactions",
        element: <Doc_Interactions />,
      },
      {
        path: "/doctor/doc_blood_bank",
        element: <Doc_Blood_Bank />,
      },
      {
        path: "/doctor/doc_blood_bank/edit/:id",
        element: <DocEditBloodBank />,
      },
      {
        path: "/doctor/doc_blood_groups/edit/:id",
        element: <DocEditBloodGroup />,
      },
      {
        path: '/doctor/doc_users/create_file/:id',
        element: <UserFile />,
      },
      {
        path: '/doctor/users_files',
        element: <File />,
      },
      {
        path: "/doctor/patients",
        element: <Patients />,
      },
      {
        path: "/doctor/patients/create",
        element: <AddPatients />,
      },
      {
        path: "/doctor/patients/:id",
        element: <PatientView />,
      },
      {
        path: "/doctor/patients/edit/:id",
        element: <PatientEdit />,
      },
    ],
  },
]);

export default router;
