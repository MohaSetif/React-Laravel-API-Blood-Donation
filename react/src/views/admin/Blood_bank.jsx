import { PencilIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TButton from "../../components/core/TButton";
import DashboardCard from '../../components/DashboardCard'
import http from '../../axios'
import moment from 'moment';
import PageComponent from '../../components/PageComponent';

function Blood_bank() {
  const [loading, setLoading] = useState(false);
  const [blood, setBlood] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(()=>{
    fetchAllBlood();
    fetchBlood();
},[]);

  const fetchAllBlood = () => {
    setLoading(true);
    http.get('/blood_bank').then(res=>{
        setBlood(res.data);
        setTypes(res.data)
        setLoading(false);
    })
}

const fetchBlood = () => {
  setLoading(true);
  http.get('/blood_groups').then(res=>{
      setTypes(res.data)
      setLoading(false);
  })
}

  return (
    <>
    <PageComponent
      title="Blood Bank"
      // buttons={
      //   <TButton color="green" to="/blood_bank/create">
      //     <PlusCircleIcon className="h-6 w-6 mr-2" />
      //     Add new user
      //   </TButton>
      // }
    />  
    {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700 m-5">
      {blood.map((blood_group,index)=>(
        <div>
                  <DashboardCard
                  title={blood_group.blood_component}
                  className="order-2 lg:order-4"
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <div>Quantity:</div>
                    <div>{blood_group.quantity} pockets</div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <div>Latest Update:</div>
                    <div>{moment(blood_group.updated_at).subtract(1, 'hours').format('MMMM Do YYYY, h:mm:ss a')}</div>
                  </div>
                  <br />
                  <br />
                  <div className="flex justify-between">
                  <TButton to={`/admin/blood_bank/edit/${blood_group.id}`} link>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Quantity
                  </TButton>
                </div>
                </DashboardCard>
                </div>
              ))}
  </div>
      )};
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-gray-700 m-5">
      {types.map((type,index)=>(
        <div>
                  <DashboardCard
                  title={[type.blood_group, type.Rh]}
                  className="order-2 lg:order-4"
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <div>Quantity:</div>
                    <div>{type.quantity} pockets</div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <div>Latest Update:</div>
                    <div>{moment(type.updated_at).subtract(1, 'hours').format('MMMM Do YYYY')}</div>
                  </div>
                  <br />
                  <br />
                  <div className="flex justify-between">
                  <TButton to={`/admin/blood_groups/edit/${type.id}`} link>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Quantity
                  </TButton>
                </div>
                </DashboardCard>
                <br />
                </div>
              ))}
  </div>
    </>
  )
}

export default Blood_bank

