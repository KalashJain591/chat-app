import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const { googleAuth, isAuth } = useContext(userContext);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();


  }

  return (
    <div>
      <h1 className=' text-center'>Home Page</h1>

    </div>

  )
}

export default Home
