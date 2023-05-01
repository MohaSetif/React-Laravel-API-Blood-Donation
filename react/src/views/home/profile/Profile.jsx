import { useEffect, useState } from "react";
import styles from "../profile/profile.module.css";
import axiosClient from "../../../axios";
import moment from "moment";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  const [interactions,setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();
  const [inputs,setInputs] = useState({});

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values,[name]:value}))
  }

  const submitForm = () =>{
    console.log(inputs)
    axiosClient.post('/appointments',inputs).then((res)=>{
          navigate('/my_appointments');
      })
  }

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setCurrentUser({});
      setUserToken(null);
      navigate('/');
    });
  };

  useEffect(() => {
    axiosClient.get('/me')
      .then(({ data }) => {
        setCurrentUser(data)
      })
  }, [])

  useEffect(()=>{
    fetchAllInteractions();
},[]);

const fetchAllInteractions = () => {
    setLoading(true);
    axiosClient.get('/profile').then(res=>{
        setInteractions(res.data);
        setLoading(false);
    })
}


console.log(currentUser.image)

  return (
    <div className={styles.body}>
      <div className={styles.profile}>
        <div className={styles.card}>
        <div>
          
        </div>
        <div className="flex-1">
          <button onClick={logout} className="absolute top-9 right-20 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center">
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2"/>
            <span className="text-sm">Logout</span>
          </button>
        </div>
          <div className={styles.userInfo}>
            <h2>{currentUser.surname} {currentUser.name}</h2>
            <hr />
            <p><strong>Birthday:</strong> {currentUser.birth_date}</p>
            <p><strong>Address:</strong> {currentUser.adr}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Birthday:</strong> {currentUser.tel}</p>
            <p><strong>Blood type:</strong> {currentUser.blood_type}</p>
          </div>
          <div className={styles.table}>
          {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
          <table className={styles.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Your ID</th>
                    <th>Receiver's ID</th>
                    <th>Doctor's ID</th>
                    <th>Transfusion type</th>
                    <th>Transfusion status</th>
                    <th>Transfusion date</th>
                </tr>
            </thead>
            <tbody>
                {interactions.map((interaction,index)=>(
                            <tr key={interaction.id}>
                                <th>{interaction.id}</th>
                                <td>{interaction.donor_id}</td>
                                <td>{interaction.receiver_id}</td>
                                <td>{interaction.doctor_id}</td>
                                <td>{interaction.transfusion_type}</td>
                                <td>{interaction.transfusion_status}</td>
                                <td>{moment(interaction.updated_at).format('MMMM Do YYYY, HH:mm:ss')}</td>
                            </tr>
                        ))}
            </tbody>
        </table>
        )}
          </div>
        </div>
        {currentUser.usertype === 'donor' && (
  <div className={styles.card}>
    <div className={styles.appointments}>
      <h3>Schedule an Appointment for a Donation</h3>
      <label htmlFor="date">Date:</label>
      <input
        onChange={handleChange}
        type="date"
        name="date"
        id="date"
        value={inputs.date || ''}
        required
      />
      <label htmlFor="time">Time:</label>
      <input
        onChange={handleChange}
        type="time"
        name="time"
        id="time"
        value={inputs.time || ''}
        required
      />
      <button onClick={submitForm}>Schedule Appointment</button>
      <Link to={"/my_appointments"} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white text-xl py-3 px-4 border border-red-500 hover:border-transparent rounded ml-5">
        Check Appointments
      </Link>
    </div>
  </div>
)}
      </div>
      <br />
    </div>
  );
}