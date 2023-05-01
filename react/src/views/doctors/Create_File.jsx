import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from '../../axios'

export default function Create_File(props) {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        fetchUser()
    },[]);

    console.log(id);

    const fetchUser= () =>{
        http.get('/users/'+id+'/edit').then((res)=>{
            setInputs({
                name:res.data.name,
                surname:res.data.surname,
                gender:res.data.gender,
                birth_date:res.data.birth_date,
                adr:res.data.adr,
                tel:res.data.tel,
                email:res.data.email,
                blood_type:res.data.blood_type,
                status:res.data.status,
            });
        });
    }

    console.log(inputs)

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    const submitForm = () =>{
        console.log(inputs)
          http.post('/doc_users',inputs).then((res)=>{
              navigate('/doctor/users_files');
          })
      }

    return (
        <div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-5">
  <Link to='/doctor/doc_users'>Back</Link>
</button>
            <h1 className="px-6 py-4 text-center text-2xl"><b>Create health status file for: { inputs.surname } { inputs.name }</b></h1>
            <div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                Name
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="text" name="name" value={inputs.name || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"/>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                Surname
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="text" name="surname" value={inputs.surname || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"/>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                Gender
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="text" name="surname" value={inputs.gender || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"/>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                Birthdate
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="text" name="birth_date" value={inputs.birth_date || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"/>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                Address
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="text" name="adr" value={inputs.adr || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"/>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                Phone Number
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="text" name="tel" value={inputs.tel || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"/>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                Email
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="email" name="email" value={inputs.email || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"/>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                Blood type
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="text" name="blood_type" value={inputs.blood_type || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3" required/>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                Health status
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="text" name="status" value={inputs.status || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3" required/>
              </td>
            </tr>
            </tbody>
            </table>
            <div className="flex items-center justify-center mt-6">
        <button type="button" onClick={submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create file</button>
      </div>
      <br />
            </div>
            </div>
            </div>
        </div>
        </div>



    )
}