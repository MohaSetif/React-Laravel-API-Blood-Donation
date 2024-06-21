import { useState, useEffect } from "react";
import http from '../../axios'
import PageComponent from "../../components/PageComponent";
import { Link } from "react-router-dom";

export default function Users() {
    const [usersFiles, setUsersFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        fetchAllUsers();
    },[]);

    const fetchAllUsers = () => {
        setLoading(true);
        http.get('/users_files').then(res=>{
            setUsersFiles(res.data);
            setLoading(false);
        })
    }

    const deleteUser = (id) => {
        http.delete('/users_files/'+id).then(res=>{
            fetchAllUsers();
        })
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredUsers = usersFiles.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.adr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.tel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.blood_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <PageComponent title="Users' files" />
            <div className="flex justify-end pb-4">
                <input type="text" placeholder="Search..." className="border rounded py-2 px-3 mr-4" onChange={handleSearchChange} />
            </div>
            {loading && <div className="text-center text-lg">Loading...</div>}
            {!loading && (
                <div className="flex flex-wrap justify-start">
                    {filteredUsers.length === 0 && (
                        <div className="py-8 text-center text-gray-700">
                            No files found for "{searchTerm}".
                        </div>
                    )}
                    {filteredUsers.map((user,index)=>(
                        <div key={user.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
                            <div className="bg-white rounded-lg shadow-lg">
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{user.name} {user.surname}</h3>
                                    <p className="text-gray-600 mt-2">{user.email}</p>
                                </div>
                                <div className="px-4 pb-4">
                                    <ul className="text-sm text-gray-600">
                                        <li className="py-1"><span className="font-semibold mr-2">Gender:</span>{user.gender}</li>
                                        <li className="py-1"><span className="font-semibold mr-2">Birthdate:</span>{user.birth_date}</li>
                                        <li className="py-1"><span className="font-semibold mr-2">Address:</span>{user.adr}</li>
                                        <li className="py-1"><span className="font-semibold mr-2">Phone Number:</span>{user.tel}</li>
                                        <li className="py-1"><span className="font-semibold mr-2">Blood Type:</span>{user.blood_type}</li>
                                        <li className="py-1"><span className="font-semibold mr-2">Health status:</span>{user.status}</li>
                                    </ul>
                                </div>
                                <div className="flex justify-end px-4 pb-4">
                                <Link to={`/doctor/user_file/${user.id}`} className="text-blue-600 hover:underline mr-4">View</Link>
                                <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:underline">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </>
  )
}
