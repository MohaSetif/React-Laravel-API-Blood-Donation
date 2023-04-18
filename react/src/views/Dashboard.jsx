import PageComponent from "../components/PageComponent";
import DashboardCard from "../components/DashboardCard.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import TButton from "../components/core/TButton.jsx";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import moment from 'moment';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [interactions, setInteractions] = useState([]);

    useEffect(()=>{
      fetchAllInteractions();
  },[]);

  const fetchAllInteractions = () => {
      setLoading(true);
      axiosClient.get('/interactions').then(res=>{
          setInteractions(res.data);
          setLoading(false);
      })
  }

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/dashboard`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        return res;
      })
      .catch((error) => {
        setLoading(false);
        return error;
      });
  }, []);

  return (
    <PageComponent title="Dashboard">
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
          <DashboardCard
            title="Total Users"
            className="order-1 lg:order-2"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.totalSurveys}
            </div>
          </DashboardCard>
          <DashboardCard
            title="Total Donors"
            className="order-2 lg:order-4"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.totalAnswers}
            </div>
          </DashboardCard>
          <DashboardCard
            title="Latest Post"
            className="order-3 lg:order-1 row-span-2"
            style={{ animationDelay: '0.2s' }}
          >
            <br />
            {data.latestSurvey && (
              <div>
                <img
                  src={data.latestSurvey.image_url}
                  className="w-[240px] mx-auto"
                />
                <br />
                <h3 className="font-bold text-xl mb-3">
                  {data.latestSurvey.title}
                </h3>
                <div className="flex justify-between text-sm mb-1">
                  <div>Create Date:</div>
                  <div>{data.latestSurvey.created_at}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Expire Date:</div>
                  <div>{data.latestSurvey.expire_date}</div>
                </div>
                {/* <div className="flex justify-between text-sm mb-1">
                  <div>Status:</div>
                  <div>{data.latestSurvey.status ? "Active" : "Draft"}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Questions:</div>
                  <div>{data.latestSurvey.questions}</div>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <div>Answers:</div>
                  <div>{data.latestSurvey.answers}</div>
                </div> */}
                <br />
                <div className="flex justify-between">
                  <TButton to={`/surveys/${data.latestSurvey.id}`} link>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Survey
                  </TButton>
                </div>
              </div>
            )}
            {!data.latestSurvey && (
              <div className="text-gray-600 text-center py-16">
                Your don't have posts yet
              </div>
            )}
          </DashboardCard>
          <DashboardCard
            title="Latest Interactions"
            className="order-4 lg:order-3 row-span-2"
            style={{ animationDelay: '0.3s' }}
          >
            <br />
            {interactions.length && (
              <div className="text-left">
                  <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="px-4 py-3">ID</th>
                              <th scope="col" className="px-4 py-3">Donor's id</th>
                              <th scope="col" className="px-4 py-3">Receiver's name</th>
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
                                          <td className="px-3 py-4">{interaction.receiver_name}</td>
                                          <td className="px-3 py-4">{interaction.doctor_id}</td>
                                          <td className="px-3 py-4">{interaction.transfusion_type}</td>
                                          <td className="px-3 py-4">{interaction.transfusion_status}</td>
                                          <td className="px-3 py-4">{moment(interaction.updated_at).format('MMMM Do YYYY, HH:mm:ss')}</td>
                                      </tr>
                                  ))}
                      </tbody>
                  </table>
              </div>
              </div>
            )}
            {!interactions.length && (
              <div className="text-gray-600 text-center py-16">
                There are no interactions yet.
              </div>
            )}
          </DashboardCard>
        </div>
      )}
    </PageComponent>
  );
}
