import { useState,useEffect } from "react";
import http from '../../axios'
import PageComponent from "../../components/PageComponent";

export default function Users() {
    const [usersFiles, setUsersFiles] = useState([]);
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

    return (
        <>
            <PageComponent title="Users' files" />
            {loading && <div className="text-center text-lg">Loading...</div>}
            {!loading && (
                <div className="flex flex-wrap justify-start">
                     {usersFiles.length === 0 && (
            <div className="py-8 text-center text-gray-700">
              No files have been created yet.
            </div>
          )}
                    {usersFiles.map((user,index)=>(
                        <div key={user.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
                            <div className="bg-white rounded-lg shadow-lg">
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{user.name} {user.surname}</h3>
                                    <p className="text-gray-600 mt-2">{user.email}</p>
                                </div>
                                <div className="px-4 pb-4">
                                    <ul className="text-sm text-gray-600">
                                        <li className="py-1"><span className="font-semibold mr-2">Id:</span>{user.id}</li>
                                        <li className="py-1"><span className="font-semibold mr-2">Gender:</span>{user.gender}</li>
                                        <li className="py-1"><span className="font-semibold mr-2">Birthdate:</span>{user.birth_date}</li>
                                        <li className="py-1"><span className="font-semibold mr-2">Address:</span>{user.adr}</li>
                                        <li className="py-1"><span className="font-semibold mr-2">Phone Number:</span>{user.tel}</li>
                                        <li className="py-1"><span className="font-semibold mr-2">Blood Type:</span>{user.blood_type}</li>
                                        <li className="py-1"><span className="font-semibold mr-2">Health status:</span>{user.status}</li>
                                    </ul>
                                </div>
                                <div className="px-4 pb-4">
                                    <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={()=>{deleteUser(user.id)}}
                                        >Delete file</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
