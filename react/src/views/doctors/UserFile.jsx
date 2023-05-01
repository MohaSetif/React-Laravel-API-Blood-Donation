import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import http from '../../axios'


export default function UserFile(props) {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        fetchFile()
    },[]);

    const fetchFile= () =>{
        http.get('/users_files/'+id).then((res)=>{
            setInputs({
                name:res.data.name,
                surname:res.data.surname,
                gender:res.data.gender,
                birth_date:res.data.birth_date,
                adr:res.data.adr,
                tel:res.data.tel,
                blood_type:res.data.blood_type,
            });
        });
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: ()=>componentRef.current,
        documentTitle: 'Blood Donation Card'
    })
    return (
        <>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-5">
  <Link to='/doctor/users_files'>Back</Link>
</button>

       <div ref={componentRef} style={{width: '100%', height: window.innerHeight}}>
       <div className="flex justify-center">
  <div className="w-96 rounded-md overflow-hidden shadow-md">
    <div className="bg-gray-800 py-3">
      <h1 className="text-white text-center text-lg font-bold">{inputs.name} {inputs.surname}</h1>
    </div>
    <div className="bg-white px-6 py-4">
      <table className="w-full text-left text-sm">
        <tbody>
          <tr>
            <td className="py-2 font-medium">Gender:</td>
            <td className="py-2">{inputs.gender}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Birthdate:</td>
            <td className="py-2">{inputs.birth_date}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Address:</td>
            <td className="py-2">{inputs.adr}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Phone number:</td>
            <td className="py-2">{inputs.tel}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Blood type:</td>
            <td className="py-2">{inputs.blood_type}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

       </div>
       <div className="flex justify-center">
       <button onClick={handlePrint} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-20">Print</button>
       </div>
       </>
    )

}
