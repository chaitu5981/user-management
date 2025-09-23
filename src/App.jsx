import { useState } from "react";
import useUser from "./hooks/useUser";
import Loader from "./Loader";
import AddEditUser from "./AddEditUser";

const App = () => {
  const { users, loading } = useUser();
  const [showAddEditUser, setShowAddEditUser] = useState(false);
  return (
    <div className="w-full h-screen">
      <h1 className="text-2xl font-bold text-center my-4">
        User Management Dashboard
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto px-4 flex flex-col items-center">
          <button
            className="bg-blue-500 text-white px-5 py-2 rounded-md mb-4 mx-auto"
            onClick={() => setShowAddEditUser(true)}
          >
            Add User
          </button>
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 py-2">ID</th>
                <th className="border border-gray-300 py-2 whitespace-normal break-words">
                  First Name
                </th>
                <th className="border border-gray-300 py-2 whitespace-normal break-words">
                  Last Name
                </th>
                <th className="border border-gray-300 py-2 whitespace-normal break-words">
                  Email
                </th>
                <th className="border border-gray-300 py-2 whitespace-normal break-words">
                  Company
                </th>
                <th className="border border-gray-300 py-2 whitespace-normal break-words">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="text-center border border-gray-300 py-2">
                    {user.id}
                  </td>
                  <td className="text-center border border-gray-300 py-2 whitespace-normal break-words">
                    {user.name.split(" ")[0]}
                  </td>
                  <td className="text-center border border-gray-300 py-2 whitespace-normal break-words">
                    {user.name.split(" ")[1]}
                  </td>
                  <td className="text-center border border-gray-300 py-2 whitespace-normal break-words">
                    {user.email}
                  </td>
                  <td className="text-center border border-gray-300 py-2 whitespace-normal break-words">
                    {user.company.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showAddEditUser && (
        <AddEditUser onClose={() => setShowAddEditUser(false)} />
      )}
    </div>
  );
};
export default App;
