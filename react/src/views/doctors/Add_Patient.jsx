import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from '../../axios'

export default function Add_Patient() {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    const submitForm = () =>{
      console.log(inputs)
        http.post('/patients',inputs).then((res)=>{
            navigate('/doctor/patients');
        })
    }
    return (
<>
<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-5">
  <Link to='/doctor/patients'>Back</Link>
</button>
<h1 className="font-bold text-center text-2xl">Add new patient</h1>
<form className="w-full max-w-lg mx-auto mt-10" method="POST" onSubmit={submitForm}>
  <div className="flex flex-wrap -mx-20  mb-6">
  <div className="w-full md:w-1/3 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        National ID
      </label>
      <input value={inputs.id || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" name="id"/>
    </div>
  <div className="w-full md:w-1/3 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Name
      </label>
      <input value={inputs.name || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" name="name"/>
    </div>
    <div className="w-full md:w-1/3 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Surname
      </label>
      <input value={inputs.surname || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" name="surname"/>
    </div>
  </div>

  <div className="flex flex-wrap -mx-20 mb-6">
  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
        Gender
      </label>
      <div className="relative">
        <select onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="gender" value={inputs.gender || ''}>
          <option>Choose:</option>
          <option>male</option>
          <option>female</option>
        </select>
      </div>
    </div>
    <div className="w-full md:w-2/3 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Birthdate
      </label>
      <input value={inputs.birth_date || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="date" name="birth_date"/>
    </div>
  </div>

  <div className="flex flex-wrap -mx-20  mb-6">
  <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Address
      </label>
      <input value={inputs.adr || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" name="adr"/>
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Phone number
      </label>
      <input value={inputs.tel || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" name="tel"/>
    </div>
  </div>
  
  <div className="flex flex-wrap -mx-20 mb-6">
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Blood type
      </label>
      <input value={inputs.blood_type || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="text" name="blood_type"/>
    </div>

    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Health status
      </label>
      <textarea value={inputs.status || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" rows="5" name="status"/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-20 mb-2">
    <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
      <button type="button" onClick={submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Add</button>
    </div>
  </div>
</form>
</>
    )
}