import UseAuth from "../hooks/UseAuth";

function Home() {
  const { user, logout: logoutUser, loading } = UseAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <>
      {user.name}
      <button onClick={handleLogout}>
        {loading ? "Log out..." : "Log out"}
      </button>
    </>
  );
}

export default Home;
