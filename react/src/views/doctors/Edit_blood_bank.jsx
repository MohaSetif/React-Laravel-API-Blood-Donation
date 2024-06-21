import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from '../../axios'


export default function Edit_Blood_Bank(props) {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        fetchBlood()
    },[]);

    const fetchBlood= () =>{
        http.get('/doc_blood_bank/'+id+'/edit').then((res)=>{
            setInputs({
                blood_component:res.data.blood_component,
                quantity:res.data.quantity,
            });
        });
    }
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value,
                                        }))
    }

    const submitForm = () =>{
        http.put('/doc_blood_bank/'+id, { ...inputs}).then((res)=>{
            navigate('/doctor/doc_blood_bank');
        })
    }
    return (
        <div>

            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-5">
  <Link to='/doc_blood_bank'>Back</Link>
</button>
            <h1 class="px-6 py-4 text-center text-2xl"><b>Update { inputs.blood_component }'s Quantity</b></h1>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <label>Quantity: </label>
                        <input type="number" name="quantity" className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={inputs.quantity || ''}
                                onChange={handleChange}
                             />


                        <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
                            <button type="button" onClick={submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}