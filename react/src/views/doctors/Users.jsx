import { useState,useEffect } from "react";
import http from '../../axios'
import { Link, Route, Routes } from "react-router-dom";
import TButton from "../../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../../components/PageComponent";
export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{
        fetchAllUsers();
    },[]);

    useEffect(() => {
        const results = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.blood_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.usertype.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toString().includes(searchTerm) || // convert id to a string
            user.birth_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.adr.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const fetchAllUsers = () => {
        setLoading(true);
        http.get('/doc_users').then(res=>{
            setUsers(res.data);
            setLoading(false);
        })
    }

    return (   
        <>
        <PageComponent
      title="Users"
    />  
     <div className="flex justify-center mb-2">
  <div className="relative text-gray-600">
    <input
      type="search"
      className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
      placeholder="Search users by their data"
      value={searchTerm}
      onChange={handleSearch}
    />
    <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
    </button>
  </div>
</div>
    {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-4 py-3">ID</th>
                <th scope="col" class="px-4 py-3">Name</th>
                <th scope="col" class="px-4 py-3">Surname</th>
                <th scope="col" class="px-4 py-3">gender</th>
                <th scope="col" class="px-4 py-3">Birthdate</th>
                <th scope="col" class="px-4 py-3">Address</th>
                <th scope="col" class="px-4 py-3">Phone Number</th>
                <th scope="col" class="px-4 py-3">Usertype</th>
                <th scope="col" class="px-4 py-3">Blood type</th>
                <th scope="col" class="px-4 py-3">Email</th>
                <th scope="col" class="px-4 py-3">Status</th>
                <th scope="col" class="px-4 py-3">File</th>
            </tr>
        </thead>
        <tbody>
            {filteredUsers.map((user,index)=>(
                        <tr key={user.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}</th>
                            <td class="px-3 py-4">{user.name}</td>
                            <td class="px-3 py-4">{user.surname}</td>
                            <td class="px-3 py-4">{user.gender}</td>
                            <td class="px-3 py-4">{user.birth_date}</td>
                            <td class="px-3 py-4">{user.adr}</td>
                            <td class="px-3 py-4">{user.tel}</td>
                            <td class="px-3 py-4">{user.usertype}</td>
                            <td class="px-3 py-4">{user.blood_type}</td>
                            <td class="px-3 py-4">{user.email}</td>
                            <td class="px-3 py-4">{user.status}</td>
                            <td class="px-3 py-4">
                                <TButton color="green" to={{ pathname: "/doctor/doc_users/create_file/" + user.id }}>
                                    <PlusCircleIcon className="h-6 w-6 mr-2" />
                                    Create Health status File
                                </TButton>
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