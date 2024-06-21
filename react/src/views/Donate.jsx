import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from '../axios'
import Navbar from "./Navbar";

export default function Donate() {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    const submitForm = () =>{
      console.log(inputs)
        http.post('/appointments',inputs).then((res)=>{
            navigate('/');
        })
    }
    return (
<>
<Navbar/>
<br />
<h1 className="font-bold text-center text-4xl">Become a saver and donate now!</h1>
<h3 className="font-bold text-center text-2xl">schedule an appointment here (if you're not a donor, become one by scheduling here!)</h3>
<div className="flex items-center justify-center p-12">
  <div className="mx-auto w-full max-w-[550px]">
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Date
            </label>
            <input
              onChange={handleChange}
              type="date"
              name="date"
              id="date"
              value={inputs.date || ''}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Time
            </label>
            <input
              onChange={handleChange}
              type="time"
              name="time"
              id="time"
              value={inputs.time || ''}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
      </div>
      <div>
        <button onClick={submitForm}
          className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Book Appointment
        </button>
      </div>
  </div>
</div>
</>
    )
}