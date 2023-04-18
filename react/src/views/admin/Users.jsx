import { useState,useEffect } from "react";
import http from '../../axios'
import { Link, Route, Routes } from "react-router-dom";
import TButton from "../../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../../components/PageComponent";
export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        fetchAllUsers();
    },[]);

    const fetchAllUsers = () => {
        setLoading(true);
        http.get('/users').then(res=>{
            setUsers(res.data);
            setLoading(false);
        })
    }


    const deleteUser = (id) => {
        http.delete('/users/'+id).then(res=>{
            fetchAllUsers();
        })
    }



    return (   
        <>
        <PageComponent
      title="Users"
      buttons={
        <TButton color="green" to="/admin/users/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Add new user
        </TButton>
      }
    />  
    {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-4 py-3">ID</th>
                <th scope="col" class="px-4 py-3">Name</th>
                <th scope="col" class="px-4 py-3">Surname</th>
                <th scope="col" class="px-4 py-3">Birthdate</th>
                <th scope="col" class="px-4 py-3">Address</th>
                <th scope="col" class="px-4 py-3">Phone Number</th>
                <th scope="col" class="px-4 py-3">Blood type</th>
                <th scope="col" class="px-4 py-3">User type</th>
                <th scope="col" class="px-4 py-3">Email</th>
                <th scope="col" class="px-4 py-3">Action</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user,index)=>(
                        <tr key={user.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}</th>
                            <td class="px-3 py-4">{user.name}</td>
                            <td class="px-3 py-4">{user.surname}</td>
                            <td class="px-3 py-4">{user.birth_date}</td>
                            <td class="px-3 py-4">{user.adr}</td>
                            <td class="px-3 py-4">{user.tel}</td>
                            <td class="px-3 py-4">{user.blood_type}</td>
                            <td class="px-3 py-4">{user.usertype}</td>
                            <td class="px-3 py-4">{user.email}</td>
                            <td class="px-3 py-4">
                                <Link class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={{ pathname: "/admin/users/edit/" + user.id }}>Edit</Link>&nbsp;
                                <Link class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" to={{ pathname: "/admin/users/" + user.id }}>View</Link>&nbsp;
                                <button type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={()=>{deleteUser(user.id)}}
                                    >Slay</button>
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