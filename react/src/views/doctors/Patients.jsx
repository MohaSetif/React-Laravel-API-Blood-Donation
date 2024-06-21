import { useState,useEffect } from "react";
import http from '../../axios'
import { Link, Route, Routes } from "react-router-dom";
import TButton from "../../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../../components/PageComponent";
export default function Patients() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        fetchAllUsers();
    },[]);

    const fetchAllUsers = () => {
        setLoading(true);
        http.get('/patients').then(res=>{
            setUsers(res.data);
            setLoading(false);
        })
    }

    const deleteUser = (id) => {
        http.delete('/patients/'+id).then(res=>{
            fetchAllUsers();
        })
    }

    return (   
        <>
        <PageComponent
      title="Patients"
      buttons={
        <TButton color="green" to="/doctor/patients/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Add new patient
        </TButton>
      }
    />  
    {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-4 py-3">National ID</th>
                <th scope="col" className="px-4 py-3">Name</th>
                <th scope="col" className="px-4 py-3">Surname</th>
                <th scope="col" className="px-4 py-3">gender</th>
                <th scope="col" className="px-4 py-3">Birthdate</th>
                <th scope="col" className="px-4 py-3">Address</th>
                <th scope="col" className="px-4 py-3">Phone Number</th>
                <th scope="col" className="px-4 py-3">Blood type</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Action</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user,index)=>(
                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}</th>
                            <td className="px-3 py-4">{user.name}</td>
                            <td className="px-3 py-4">{user.surname}</td>
                            <td className="px-3 py-4">{user.gender}</td>
                            <td className="px-3 py-4">{user.birth_date}</td>
                            <td className="px-3 py-4">{user.adr}</td>
                            <td className="px-3 py-4">{user.tel}</td>
                            <td className="px-3 py-4">{user.blood_type}</td>
                            <td className="px-3 py-4">{user.status}</td>
                            <td className="px-3 py-4">
                                <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" to={{ pathname: "/doctor/patients/edit/" + user.id }}>
                                    Edit
                                </Link>
                                <br />
                                <br />
                                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={{ pathname: "/doctor/patients/" + user.id }}>
                                    View
                                </Link>
                                <br />
                                <br />
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{deleteUser(user.id)}}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
        </tbody>
    </table>
</div>
      )}
</>

    )
}