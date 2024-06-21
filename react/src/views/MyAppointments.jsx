import { useState, useEffect } from "react";
import http from '../axios'
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingAppointment, setDeletingAppointment] = useState(null);

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  const fetchAllAppointments = () => {
    setLoading(true);
    http.get('/my_appointments').then(res => {
      setAppointments(res.data);
      setLoading(false);
    })
  }

  const deleteAppointment = (id) => {
    setDeletingAppointment(id);
    http.delete('/appointments/' + id).then(res => {
      fetchAllAppointments();
      setDeletingAppointment(null);
    })
  }

  return (
    <>
      <PageComponent
        title="My Appointments"
        subtitle="Here are all your upcoming appointments"
        buttons={
          <TButton to={'/profile'}>
            Go Back
          </TButton>
        }
      />
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && appointments.length === 0 && (
        <div className="text-center text-lg">You have no upcoming appointments</div>
      )}
      {!loading && appointments.length > 0 && (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment, index) => (
                      <tr key={appointment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {appointment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {appointment.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {appointment.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={()=>{deleteAppointment(appointment.id)}}>
                                      Remove
                          </button>
                        </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )}
  </>
  );
}
