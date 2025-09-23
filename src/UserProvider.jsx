import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <UserContext.Provider value={{ users, setUsers, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
