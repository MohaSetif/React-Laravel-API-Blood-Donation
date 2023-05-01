import { useState,useEffect } from "react";
import http from '../../axios'
import { Link, Route, Routes } from "react-router-dom";
import TButton from "../../components/core/TButton";
import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
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

                        <br />
    {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-4 py-3">Name</th>
                <th scope="col" className="px-4 py-3">Surname</th>
                <th scope="col" className="px-4 py-3">Birthdate</th>
                <th scope="col" className="px-4 py-3">Address</th>
                <th scope="col" className="px-4 py-3">Phone Number</th>
                <th scope="col" className="px-4 py-3">Blood type</th>
                <th scope="col" className="px-4 py-3">User type</th>
                <th scope="col" className="px-4 py-3">Email</th>
                <th scope="col" className="px-4 py-3">Action</th>
            </tr>
        </thead>
        <tbody>
            {filteredUsers.map((user,index)=>(
                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-2 py-4">{user.name}</td>
                            <td className="px-2 py-4">{user.surname}</td>
                            <td className="px-2 py-4">{user.birth_date}</td>
                            <td className="px-2 py-4">{user.adr}</td>
                            <td className="px-2 py-4">{user.tel}</td>
                            <td className="px-2 py-4">{user.blood_type}</td>
                            <td className="px-2 py-4">{user.usertype}</td>
                            <td className="px-2 py-4">{user.email}</td>
                            <td className="px-2 py-4">
                                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={{ pathname: "/admin/users/edit/" + user.id }}>Edit</Link>&nbsp;
                                <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" to={{ pathname: "/admin/users/" + user.id }}>View</Link>&nbsp;
                                <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                                    onClick={()=>{deleteUser(user.id)}}
                                    >Remove</button>
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