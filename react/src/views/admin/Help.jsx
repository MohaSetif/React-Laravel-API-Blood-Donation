import { useEffect, useState } from "react";
import http from '../../axios'
import { useNavigate } from "react-router-dom";

export default function Help() {
    const [inputs,setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    const submitForm = () =>{
        console.log(inputs)
          http.post('/notifications',inputs).then((res)=>{
              navigate('/admin');
          })
      }

    return (
<>
<h1 className="font-bold text-center text-2xl m-10">Ask for help</h1>
<table className="w-full table-auto">
  <thead>
    <tr className="bg-gray-200">
      <th className="px-4 py-2 text-left">Field</th>
      <th className="px-4 py-2 text-left">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="px-4 py-2">Write what you want:</td>
      <td className="px-4 py-2"><textarea value={inputs.notification_text} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400" id="grid-last-name" type="text" name="notification_text" rows="10" cols="40"/></td>
    </tr>
    <tr>
      <td className="px-4 py-2">Choose the hospital that you want to send to</td>
      <td className="px-4 py-2">
      <div className="w-72">
      <select
  id="hospital"
  name="hospital"
  value={inputs.hospital}
  onChange={handleChange}
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
>
  <option>Choose the hospital you seek help from:</option>
  <option>CHU Saadna Abdenour</option>
  <option>Bizarre Hospital</option>
  <option>Saadna Abdel Nour</option>
</select>

    </div>
      </td>
    </tr>
  </tbody>
</table>
<div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
        <button type="button" onClick={submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Send</button>
      </div>

</>
    )
}