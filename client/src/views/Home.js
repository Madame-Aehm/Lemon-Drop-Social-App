import React, { useContext } from 'react'
import NavBar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <NavBar />
      Home
    </div>
  )
}

export default Home