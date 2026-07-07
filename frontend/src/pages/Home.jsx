import UseAuth from "../hooks/UseAuth";



function Home() {

  const {user} = UseAuth()

  return <div>
    {user?user.name:"No user logged in"}
  </div>;
}

export default Home;
