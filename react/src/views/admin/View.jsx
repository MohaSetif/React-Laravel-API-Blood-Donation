import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from '../../axios'


export default function View(props) {
    const [inputs,setInputs] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        fetchUser()
    },[]);

    const fetchUser= () =>{
        http.get('/users/'+id+'/edit').then((res)=>{
            setInputs({
                name:res.data.name,
                surname:res.data.surname,
                gender:res.data.gender,
                birth_date:res.data.birth_date,
                adr:res.data.adr,
                tel:res.data.tel,
                hospital:res.data.hospital,
                blood_type:res.data.blood_type,
                usertype:res.data.usertype,
                email:res.data.email,
            });
        });
    }
    return (
<>
<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-5">
  <Link to='/admin/users'>Back</Link>
</button>
<div className="flex flex-col">
<h1 className="px-6 py-4 text-center text-2xl"><b>User's Details: { inputs.name } { inputs.surname }</b></h1>
<div className="overflow-x-auto sm:-mx-6 lg:-mx-100">
  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
    <div className="overflow-hidden">
      <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
        <table className="min-w-full table-auto text-left text-sm font-light">
          <tbody>
            <tr
              className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4">Name</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{ inputs.name }</td>
            </tr>
            <tr
              className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4">Surname</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{ inputs.surname }</td>
            </tr>
            <tr
              className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4">Gender</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{ inputs.gender }</td>
            </tr>
            <tr
              className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4">Birthdate</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{ inputs.birth_date }</td>
            </tr>
            <tr
              className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4">Address</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{ inputs.adr }</td>
            </tr>
            <tr
              className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4">Hospital</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{ inputs.hospital }</td>
            </tr>
            <tr
              className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4">Phone number</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{ inputs.tel }</td>
            </tr>
            <tr
              className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4">Blood type</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{ inputs.blood_type }</td>
            </tr>
            <tr
              className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4">Usertype</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{ inputs.usertype }</td>
            </tr>
            <tr
              className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4">Email</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{ inputs.email }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</div>
</>
    )
}
