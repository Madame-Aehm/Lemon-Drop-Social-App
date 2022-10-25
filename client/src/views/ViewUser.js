import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import UserPlainView from '../components/UserPlainView';
import UserRecipes from '../components/UserRecipes';
import useSingleUserFetch from '../hooks/useSingleUserFetch';
import { AuthContext } from '../context/AuthContext.js'
import Fade from 'react-bootstrap/Fade';

function ViewUser() {
  const location = useLocation();
  const redirect = useNavigate();
  const { user } = useContext(AuthContext);
  const { userId } = location.state;
  const { userToView } = useSingleUserFetch(userId);
  const [mount, setMount] = useState(false);

  const plainDisplay = {
    display: "flex"
  }

 function profileRedirect() {
  if (user && (userId === user._id)) {
        redirect("/my-profile", {replace: true});
      }
 }
 useEffect(() => {
   profileRedirect();
   setMount(true);
 }, [])
 

  return (
    <Fade in={mount}>
      <div className='simple-display no-padding'>
        {userToView.username && <>
          <h1 className='page-title'>{userToView.username}'s Profile</h1>
          <div className='profile-tabs-container'>
            <Tabs
              defaultActiveKey="account"
              id="uncontrolled-tab-example"
              className="mb-3"
              justify>

              <Tab eventKey="account" title="Account">
                <h4 className='sub-title' style={{textAlign: "center"}}>Account Details</h4>
                <div className='simple-display'>
                  <UserPlainView userToView={userToView} display={plainDisplay} />
                </div>
              </Tab>

              <Tab eventKey="recipes" title="Recipes" className='test'>
                <UserRecipes userToView={userToView} filter={"posted"} />
              </Tab>

              <Tab eventKey="favourites" title="Favourites">
              <UserRecipes userToView={userToView} filter={"favourites"} />
              </Tab>
            </Tabs>
          </div>
        </>}
      </div>
    </Fade>
    
  )
}

export default ViewUser