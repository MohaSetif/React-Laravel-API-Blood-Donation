import React, { useState } from 'react';
import axiosClient from "../axios";
import { useEffect } from "react";
import { useStateContext } from '../contexts/ContextProvider';
import Navbar from './Navbar';
import moment from 'moment';

function Profile() {
    const { currentUser, setCurrentUser} =
    useStateContext();
    const [interactions,setInteractions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axiosClient.get('/me')
          .then(({ data }) => {
            setCurrentUser(data)
          })
      }, [])

      useEffect(()=>{
        fetchAllInteractions();
    },[]);
  
    const fetchAllInteractions = () => {
        setLoading(true);
        axiosClient.get('/profile').then(res=>{
            setInteractions(res.data);
            setLoading(false);
        })
    }

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-lightGrey">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-3/4">
        <div className="px-4 py-6">
          <div className="flex items-center">
            <img
              className="h-24 w-24 object-cover rounded-full shadow mr-4"
              src="https://i.pravatar.cc/300"
              alt="User avatar"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentUser.name}</h2>
              <p className="text-gray-600">{currentUser.usertype}</p>
              <div className="flex mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
</svg>

                <a className="text-gray-600 hover:underline">
                  {currentUser.email}
                </a>
              </div>
            </div>
          </div>
          <hr className="my-6" />
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="px-4 py-2 font-bold text-gray-500">Username:</td>
                <td className="px-4 py-2">{currentUser.name} {currentUser.surname}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-gray-500">Birthdate:</td>
                <td className="px-4 py-2">{currentUser.birth_date}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-gray-500">Location:</td>
                <td className="px-4 py-2">{currentUser.adr}</td>
              </tr>
              <br />
</tbody>
</table>
<hr />
<br />
<h1 className="text-3xl text-center font-bold">Your latest interactions</h1>
<br />
{loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-4 py-3">ID</th>
                    <th scope="col" className="px-4 py-3">Donor's id</th>
                    <th scope="col" className="px-4 py-3">Receiver's name</th>
                    <th scope="col" className="px-4 py-3">Doctor's id</th>
                    <th scope="col" className="px-4 py-3">Transfusion type</th>
                    <th scope="col" className="px-4 py-3">Transfusion status</th>
                    <th scope="col" className="px-4 py-3">Transfusion date</th>
                </tr>
            </thead>
            <tbody>
                {interactions.map((interaction,index)=>(
                            <tr key={interaction.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{interaction.id}</th>
                                <td className="px-3 py-4">{interaction.donor_id}</td>
                                <td className="px-3 py-4">{interaction.receiver_name}</td>
                                <td className="px-3 py-4">{interaction.doctor_id}</td>
                                <td className="px-3 py-4">{interaction.transfusion_type}</td>
                                <td className="px-3 py-4">{interaction.transfusion_status}</td>
                                <td className="px-3 py-4">{moment(interaction.updated_at).format('MMMM Do YYYY, HH:mm:ss')}</td>
                            </tr>
                        ))}
            </tbody>
        </table>
        )}
</div>
</div>
</div>
</>
);
}

export default Profile;