import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation } from 'react-router-dom';
import useSingleUserFetch from '../hooks/useSingleUserFetch';

function ViewUser() {
  const location = useLocation();
  const { userId } = location.state;
  const { userToView } = useSingleUserFetch(userId);
  console.log(userToView);

  return (
    <div className='simple-display no-padding'>
      <h1 className='page-title'>User Profile</h1>
      <div className='profile-tabs-container'>
        <Tabs
          defaultActiveKey="account"
          id="uncontrolled-tab-example"
          className="mb-3"
          justify>

          <Tab eventKey="account" title="Account">
            
          </Tab>

          <Tab eventKey="recipes" title="Recipes" className='test'>
            user recipes
          </Tab>

          <Tab eventKey="favourites" title="Favourites">
            <p>testing3</p>
          </Tab>
        </Tabs>
      </div>
      
    </div>
  )
}

export default ViewUser