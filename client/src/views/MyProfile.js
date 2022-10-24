import React, { useContext, useEffect, useState } from 'react'
import '../css/profile-page.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MyAccount from '../components/MyAccount';
import { AuthContext } from '../context/AuthContext.js'
import UserRecipes from '../components/UserRecipes';
import Fade from 'react-bootstrap/Fade';

function MyProfile() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
}, [])

  return (
    <Fade in={mount}>
        <div className='profile-tabs-container'>
          <Tabs
            defaultActiveKey="account"
            id="uncontrolled-tab-example"
            className="mb-3"
            justify>

            <Tab eventKey="account" title="Account Details">
              <MyAccount loading={loading} setLoading={setLoading} />
            </Tab>

            <Tab eventKey="recipes" title="My Recipes" className='test'>
              <UserRecipes userToView={user} filter={"posted"} />
            </Tab>

            <Tab eventKey="favourites" title="My Favourites">
              <UserRecipes userToView={user} filter={"favourites"} />
            </Tab>
          </Tabs>
        </div>
    </Fade>
  )
}

export default MyProfile