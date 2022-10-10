import React, { useContext } from 'react'
import '../css/profile-page.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MyAccount from '../components/MyAccount';
import { AuthContext } from '../context/AuthContext.js'

function MyProfile() {
  const { user } = useContext(AuthContext);

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
              <MyAccount user={user} />
            </Tab>

            <Tab eventKey="recipes" title="Recipes" className='test'>
              <p>testing2</p>
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