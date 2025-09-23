import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Loader from "./Loader";
import axios from "axios";
import useUser from "./hooks/useUser";
const AddEditUser = ({ onClose }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const { users, setUsers } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          company: {
            name: user.company,
          },
        }
      );
      setUsers([...users, response.data]);
      setLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="inset-0 fixed bg-black/50 flex justify-center items-center px-6">
      <div className="bg-white p-4 rounded-md w-full max-w-md flex flex-col items-center gap-4">
        <button className="text-2xl self-end" onClick={onClose}>
          <IoClose />
        </button>
        <h2 className="text-2xl font-bold">Add User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="w-full p-2 rounded-md border border-gray-300"
            type="text"
            placeholder="First Name"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <input
            className="w-full p-2 rounded-md border border-gray-300"
            type="text"
            placeholder="Last Name"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          <input
            className="w-full p-2 rounded-md border border-gray-300"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="w-full p-2 rounded-md border border-gray-300"
            type="text"
            placeholder="Company"
            value={user.company}
            onChange={(e) => setUser({ ...user, company: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md flex items-center gap-2 justify-center"
            onClick={handleSubmit}
          >
            {loading ? <Loader /> : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddEditUser;
