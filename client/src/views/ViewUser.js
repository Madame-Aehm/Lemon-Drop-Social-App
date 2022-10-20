import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation } from 'react-router-dom';
import UserPlainView from '../components/UserPlainView';
import UserRecipes from '../components/UserRecipes';
import useSingleUserFetch from '../hooks/useSingleUserFetch';

function ViewUser() {
  const location = useLocation();
  const { userId } = location.state;
  const { userToView } = useSingleUserFetch(userId);
  console.log(userToView);


  const plainDisplay = {
    display: "flex"
  }

  return (
    <>
      {userToView.username && 
        <div className='simple-display no-padding'>
          <h1 className='page-title'>{userToView.username}'s Profile</h1>
          <div className='profile-tabs-container'>
            <Tabs
              defaultActiveKey="account"
              id="uncontrolled-tab-example"
              className="mb-3"
              justify>

              <Tab eventKey="account" title="Account">
                <h4 className='sub-title' style={{textAlign: "center"}}>Account Details</h4>
                <UserPlainView userToView={userToView} display={plainDisplay} />
              </Tab>

              <Tab eventKey="recipes" title="Recipes" className='test'>
                <UserRecipes userToView={userToView} />
              </Tab>

              <Tab eventKey="favourites" title="Favourites">
                <p>testing3</p>
              </Tab>
            </Tabs>
          </div>
          
        </div>
      }
    </>
    
      
      
  )
}

export default ViewUser