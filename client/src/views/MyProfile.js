import React, { useContext, useState } from 'react'
import '../css/profile-page.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MyAccount from '../components/MyAccount';
import { AuthContext } from '../context/AuthContext.js'
import MyRecipes from '../components/MyRecipes';

function MyProfile() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  return (
      <div className='simple-display no-padding'>
        <h1 className='page-title'>My Profile</h1>
        <div className='profile-tabs-container'>
          <Tabs
            defaultActiveKey="account"
            id="uncontrolled-tab-example"
            className="mb-3"
            justify>

            <Tab eventKey="account" title="Account">
              <MyAccount user={user} loading={loading} setLoading={setLoading} />
            </Tab>

            <Tab eventKey="recipes" title="Recipes" className='test'>
              <MyRecipes />
            </Tab>

            <Tab eventKey="favourites" title="Favourites">
              <p>testing3</p>
            </Tab>
          </Tabs>
        </div>
        
      </div>
  )
}

export default MyProfile