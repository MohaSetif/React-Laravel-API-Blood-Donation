import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import http from "../../axios";
import moment from "moment";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Edit(props) {
  const [inputs, setInputs] = useState({});
  const { id } = useParams();
  const { currentUser, setCurrentUser} = useStateContext();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    http.get("/notifications/" + id + "/edit").then((res) => {
      setInputs({
        id: res.data.id,
        notification_text: res.data.notification_text,
        hospital: res.data.hospital,
        current_hospital: res.data.current_hospital,
        mark_as_read: res.data.mark_as_read,
        updated_at: res.data.updated_at,
      });
    });
  };

  useEffect(() => {
    http.get('/me')
      .then(({ data }) => {
        setCurrentUser(data)
      })
  }, [])

  const handleSeen = () => {
    submitStatus("seen");
  };

  const submitStatus = (mark_as_read) => {
    http
      .put("/notifications/" + id + "/status", { mark_as_read: mark_as_read })
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            Notification's Details from: {inputs.hospital}
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Notification content
                </th>
                <th scope="col" className="px-4 py-3">
                  From
                </th>
                <th scope="col" className="px-4 py-3">
                  To
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Notified at
                </th>
                {inputs.mark_as_read !== "seen" && (
                  <th scope="col" className="px-4 py-3">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr
                key={inputs.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {inputs.id}
                </th>
                <td className="px-3 py-4">{inputs.notification_text}</td>
                <td className="px-3 py-4">{inputs.current_hospital}</td>
                <td className="px-3 py-4">{inputs.hospital}</td>
                <td className="px-3 py-4">{inputs.mark_as_read}</td>
                <td className="px-3 py-4">
                  {moment(inputs.updated_at).format("MMMM Do YYYY, HH:mm:ss")}
                </td>
                {inputs.mark_as_read !== "seen" && (
                  <td>
                    <button
                      type="button"
                      onClick={handleSeen}
                      className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                      >
                      Mark as Seen
                      </button>
                      </td>
                      )}
                      </tr>
                      </tbody>
                      </table>
                      <div className="mt-4">
                      <Link
                                 to="/admin/notifications"
                                 className="inline-block bg-gray-300 hover:bg-gray-400 rounded-lg px-4 py-2 text-gray-600 font-semibold"
                               >
                      Back to notifications
                      </Link>
                      </div>
                      </div>
                      </div>
                      </div>
                      );
                      }
