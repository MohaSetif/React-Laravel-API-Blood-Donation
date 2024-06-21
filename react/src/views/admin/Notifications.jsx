import { useState, useEffect } from "react";
import http from '../../axios';
import PageComponent from "../../components/PageComponent";
import moment from 'moment';
import { Link } from "react-router-dom";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  const fetchAllNotifications = () => {
    setLoading(true);
    http.get('/notifications').then(res => {
      setNotifications(res.data);
      setLoading(false);
    })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const filteredNotifications = filter ? notifications.filter(notification => notification.mark_as_read === filter) : notifications;

  return (
    <div className="flex justify-center mt-8">
      <div className="w-3/4 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <PageComponent title="Notifications" />
        <div className="flex justify-end mb-4">
          <label className="mr-2">Filter by mark as read:</label>
          <select className="border rounded py-1" value={filter} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="seen">Seen</option>
            <option value="not seen">Not seen</option>
          </select>
        </div>
        {loading && <div className="text-center text-lg">Loading...</div>}
        {!loading && (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">ID</th>
                  <th scope="col" className="px-4 py-3">From</th>
                  <th scope="col" className="px-4 py-3">To</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3">Notified at</th>
                  <th scope="col" className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotifications.map((notification, index) => (
                  <tr key={notification.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{notification.id}</th>
                    <td className="px-3 py-4">{notification.current_hospital}</td>
                    <td className="px-3 py-4">{notification.hospital}</td>
                    <td className="px-3 py-4">{notification.mark_as_read}</td>
                    <td className="px-3 py-4">{moment(notification.updated_at).format('MMMM Do YYYY, HH:mm:ss')}</td>
                    <td className="px-3 py-4">
                      <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={{ pathname: "/admin/notifications/edit/" + notification.id }}>Read more</Link> </td>
</tr>
))}
</tbody>
</table>
</div>
)}
</div>
</div>
);
}