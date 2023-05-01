import { useState,useEffect } from "react";
import http from '../../axios'
import { Link, Route, Routes } from "react-router-dom";
// import '../../index2.css'
import PageComponent from "../../components/PageComponent";
export default function Doc_Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        fetchAllUsers();
    },[]);

    const fetchAllUsers = () => {
        setLoading(true);
        http.get('/appointments').then(res=>{
            setUsers(res.data);
            setLoading(false);
        })
    }

    return (   
        <>
        <PageComponent
      title="Doctors' Dashboard"
    />  
    {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
<div class="relative overflow-x-auto">
<h1 className="text-center text-2xl font-bold">Donation Appointments</h1>
<br />
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-4 py-3">ID</th>
                <th scope="col" className="px-4 py-3">Name</th>
                <th scope="col" className="px-4 py-3">Surname</th>
                <th scope="col" className="px-4 py-3">gender</th>
                <th scope="col" className="px-4 py-3">Birthdate</th>
                <th scope="col" className="px-4 py-3">Address</th>
                <th scope="col" className="px-4 py-3">Phone Number</th>
                <th scope="col" className="px-4 py-3">User type</th>
                <th scope="col" className="px-4 py-3">Email</th>
                <th scope="col" className="px-4 py-3">date</th>
                <th scope="col" className="px-4 py-3">time</th>
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
                            <td className="px-3 py-4">{user.usertype}</td>
                            <td className="px-3 py-4">{user.email}</td>
                            <td className="px-3 py-4">{user.date}</td>
                            <td className="px-3 py-4">{user.time}</td>
                            <td className="px-3 py-4">
                                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={{ pathname: "/doctor/doc_users/edit/" + user.id }}>View</Link>&nbsp;
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