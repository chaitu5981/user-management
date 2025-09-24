import { useEffect, useState } from "react";
import useUser from "./hooks/useUser";
import Loader from "./Loader";
import AddEditUser from "./AddEditUser";
import axios from "axios";
import Pagination from "./Pagination";
import Filters from "./Filters";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const App = () => {
  const { users, loading, setUsers } = useUser();
  const [showAddEditUser, setShowAddEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentFilteredUsers, setCurrentFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [applyFilters, setApplyFilters] = useState(false);
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("id");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const noOfPages = Math.ceil(
    (hasAppliedFilters ? filteredUsers.length : users.length) / rowsPerPage
  );
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirm) {
      setDeletingId(id);
      try {
        const response = await axios.delete(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        console.log(response);
        setUsers(users.filter((user) => user.id !== id));
        setDeletingId(null);
      } catch (error) {
        console.log(error);
        setDeletingId(null);
      }
    }
  };
  useEffect(() => {
    if (!applyFilters) return;
    let newFilteredUsers = users;
    let anyFilterApplied = false;
    if (applyFilters) {
      newFilteredUsers = newFilteredUsers.filter((user) => {
        if (filters.firstName) {
          if (
            user.name.split(" ")[0].toLowerCase() !==
            filters.firstName.toLowerCase()
          ) {
            anyFilterApplied = true;
            return false;
          }
        }
        if (filters.lastName) {
          if (
            user.name.split(" ")[1].toLowerCase() !==
            filters.lastName.toLowerCase()
          ) {
            anyFilterApplied = true;
            return false;
          }
        }
        if (filters.email) {
          if (user.email.toLowerCase() !== filters.email.toLowerCase()) {
            anyFilterApplied = true;
            return false;
          }
        }
        if (filters.company) {
          if (user.company.name !== filters.company) {
            anyFilterApplied = true;
            return false;
          }
        }
        return true;
      });
      setCurrentPage(1);
      setApplyFilters(false);
      setHasAppliedFilters(anyFilterApplied);
    }
    setFilteredUsers(newFilteredUsers);
  }, [users, applyFilters, filters]);

  useEffect(() => {
    if (search === "") {
      setHasSearched(false);
      return;
    }
    let usersToSearch = hasAppliedFilters ? filteredUsers : users;

    setSearchedUsers(
      usersToSearch.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.company.name.toLowerCase().includes(search.toLowerCase())
      )
    );

    setHasSearched(true);
  }, [search, filteredUsers, hasAppliedFilters, users]);
  useEffect(() => {
    let usersToDisplay = hasSearched
      ? searchedUsers
      : hasAppliedFilters
      ? filteredUsers
      : users;
    setCurrentFilteredUsers(
      usersToDisplay.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    );
  }, [
    users,
    filteredUsers,
    searchedUsers,
    currentPage,
    rowsPerPage,
    hasAppliedFilters,
    hasSearched,
  ]);
  return (
    <div className="w-full min-h-screen py-4">
      <h1 className="text-2xl font-bold text-center my-4">
        User Management Dashboard
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto px-4 flex flex-col items-center gap-4">
          <button
            className="bg-blue-500 text-white px-5 py-2 rounded-md mb-4 mx-auto"
            onClick={() => {
              setShowAddEditUser(true);
              setSelectedUser(null);
            }}
          >
            Add User
          </button>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col items-center gap-4 ">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-blue-500 text-white px-4 py-1 rounded-md self-start"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
              {showFilters && (
                <Filters
                  filters={filters}
                  setFilters={setFilters}
                  setShowFilters={setShowFilters}
                  setApplyFilters={setApplyFilters}
                  setHasAppliedFilters={setHasAppliedFilters}
                />
              )}
            </div>
            <div className="flex items-center gap-2 self-start">
              <span>Search: </span>
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 rounded-md border border-gray-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 self-start">
              <p>Sort by: </p>
              <select
                className="w-full p-2 rounded-md border border-gray-300"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="id">ID</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="email">Email</option>
                <option value="company">Company</option>
              </select>
            </div>
          </div>
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
              {currentFilteredUsers.length > 0 ? (
                currentFilteredUsers.map((user) => (
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
                    <td className="text-center border border-gray-300 py-2 flex flex-col sm:flex-row px-2 gap-2 justify-center">
                      <button
                        onClick={() => {
                          setShowAddEditUser(true);
                          setSelectedUser(user);
                        }}
                      >
                        <FaEdit color="blue" size={23} />
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(user.id);
                        }}
                      >
                        {deletingId === user.id ? (
                          <Loader />
                        ) : (
                          <MdDelete color="red" size={23} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center border border-gray-300 py-2"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            noOfPages={noOfPages}
          />
        </div>
      )}
      {showAddEditUser && (
        <AddEditUser
          onClose={() => setShowAddEditUser(false)}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};
export default App;
