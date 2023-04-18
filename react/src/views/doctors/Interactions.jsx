import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from '../../axios'
import moment from 'moment';

export default function Create() {
    const [loading, setLoading] = useState(false);
    const [inputs,setInputs] = useState({});
    const [interactions,setInteractions] = useState([]);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    useEffect(()=>{
      fetchAllInteractions();
  },[]);

  const fetchAllInteractions = () => {
      setLoading(true);
      http.get('/interactions').then(res=>{
          setInteractions(res.data);
          setLoading(false);
      })
  }

    const submitForm = () =>{
      console.log(inputs)
        http.post('/interactions',inputs).then((res)=>{
          window.location.reload();
        })
    }
    return (
<>
<h1 className="font-bold text-center text-2xl m-10">Add new interactions</h1>
<table className="w-full table-auto">
  <thead>
    <tr className="bg-gray-200">
      <th className="px-4 py-2 text-left">Field</th>
      <th className="px-4 py-2 text-left">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="px-4 py-2">Donor's ID:</td>
      <td className="px-4 py-2"><input value={inputs.donor_id || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400" id="grid-last-name" type="number" name="donor_id"/></td>
    </tr>
    <tr>
      <td className="px-4 py-2">Receiver's ID:</td>
      <td className="px-4 py-2"><input value={inputs.receiver_id || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400" id="grid-last-name" type="number" name="receiver_id"/></td>
    </tr>
    <tr>
      <td className="px-4 py-2">Doctor's ID:</td>
      <td className="px-4 py-2"><input value={inputs.doctor_id || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400" id="grid-password" type="number" name="doctor_id"/></td>
    </tr>
    <tr>
      <td className="px-4 py-2">Transfusion Type:</td>
      <td className="px-4 py-2"><input value={inputs.transfusion_type || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400" id="grid-password" type="text" name="transfusion_type"/></td>
    </tr>
    <tr>
      <td className="px-4 py-2">Transfusion Status:</td>
      <td className="px-4 py-2"><textarea value={inputs.transfusion_status || ''} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400" id="grid-password" name="transfusion_status" rows="5" cols="10"/></td>
    </tr>
    <tr>
    <td className="px-4 py-2"></td>
      <td className="px-4 py-2">
      <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
        <button type="button" onClick={submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Add</button>
      </div></td>
    </tr>
  </tbody>
</table>


<br />
{loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <>
        <h1 className="text-4xl text-center mx-auto my-10 font-bold">The interactions</h1>
        <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-4 py-3">ID</th>
                    <th scope="col" className="px-4 py-3">Donor's id</th>
                    <th scope="col" className="px-4 py-3">Receiver's id</th>
                    <th scope="col" className="px-4 py-3">Doctor's id</th>
                    <th scope="col" className="px-4 py-3">Transfusion type</th>
                    <th scope="col" className="px-4 py-3">Transfusion status</th>
                    <th scope="col" className="px-4 py-3">Transfusion date</th>
                </tr>
            </thead>
            <tbody>
                {interactions.map((interaction,index)=>(
                            <tr key={interaction.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{interaction.id}</th>
                                <td className="px-3 py-4">{interaction.donor_id}</td>
                                <td className="px-3 py-4">{interaction.receiver_id}</td>
                                <td className="px-3 py-4">{interaction.doctor_id}</td>
                                <td className="px-3 py-4">{interaction.transfusion_type}</td>
                                <td className="px-3 py-4">{interaction.transfusion_status}</td>
                                <td className="px-3 py-4">{moment(interaction.updated_at).format('MMMM Do YYYY, HH:mm:ss')}</td>
                            </tr>
                        ))}
            </tbody>
        </table>
    </div>
    <br />
    </>
      )}
</>
    )
}