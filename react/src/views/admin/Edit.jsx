import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from '../../axios'


export default function Edit(props) {
    const navigate = useNavigate();
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
                birth_date:res.data.birth_date,
                adr:res.data.adr,
                tel:res.data.tel,
                usertype:res.data.usertype,
                email:res.data.email,
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
        http.put('/users/'+id, { ...inputs, usertype: usertype }).then((res)=>{
            navigate('/users');
        })
    }

    const handleAccept = () => {
        submitStatus("donor");
      };
      
      const handleReject = () => {
        submitStatus("regular_user");
      };

      const submitStatus = (usertype) => {
        http.put('/users/'+id+'/status', { usertype: usertype }).then((res) => {
          window.location.reload();
        })
      }

    return (
        <div>

            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-5">
  <Link to='/users'>Back</Link>
</button>
            <h1 class="px-6 py-4 text-center text-2xl"><b>Edit User's Details: { inputs.name } { inputs.surname }</b></h1>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <label>Name</label>
                        <input type="text" name="name" className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={inputs.name || ''}
                                onChange={handleChange}
                             />

<label>Surname</label>
                        <input type="text" name="surname" className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={inputs.surname || ''}
                            onChange={handleChange}
                        />

<label>Birthdate</label>
                        <input type="text" name="birth_date" className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={inputs.birth_date || ''}
                            onChange={handleChange}
                        />

<label>Address</label>
                        <input type="text" name="adr" className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={inputs.adr || ''}
                            onChange={handleChange}
                        />

<label>Phone Number</label>
                        <input type="text" name="tel" className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={inputs.tel || ''}
                            onChange={handleChange}
                        />

<div className="flex">
                        <p>Usertype: {inputs.usertype}</p>
                        <div className="button-group px-10">
                        <button type="button" onClick={handleAccept} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5">Accept</button>
                        <button type="button" onClick={handleReject} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Reject</button>
                        </div>
                        </div>
                        
                        <label>Email</label>
                        <input type="email" name="email" className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={inputs.email || ''}
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