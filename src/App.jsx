import useUser from "./hooks/useUser";
import Loader from "./Loader";

const App = () => {
  const { users, loading } = useUser();
  return (
    <div className="w-full h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div>
          {users.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};
export default App;
