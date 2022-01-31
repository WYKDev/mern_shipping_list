import React, { Component, Fragment } from 'react';
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

class AppNavBar extends Component {
   state = {
      isOpen: false
   }

   static propTypes = {
      auth: PropTypes.object.isRequired
   }
   
   toggle = () => this.setState({ isOpen: !this.state.isOpen })

   render() {
      const { state, props } = this;
      const { toggle, isOpen } = state;
      const { auth } = props;
      const { user, isAuthenticated } = auth;

      return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
               <Container>
                  <NavbarBrand href="/">Shopping List</NavbarBrand>
                  <NavbarToggler onClick={toggle} />
                  
                  <Collapse isOpen={isOpen} navbar>
                     <Nav className="ml-auto" navbar>
                        {
                           isAuthenticated ? (
                              <Fragment>
                                 <NavItem>
                                    <span className="navbar-text mr-3" style={{color: 'white'}}>Welcome {user.name}</span>
                                 </NavItem>
                                 <NavItem> <Logout /> </NavItem>
                              </Fragment>
                           ) : (
                              <Fragment>
                                 <NavItem> <RegisterModal /> </NavItem>
                                 <NavItem> <LoginModal /> </NavItem>
                              </Fragment>
                           )
                        }
                     </Nav>
                  </Collapse>
               </Container>
            </Navbar>
         </div>
      )
   }
}

const mapStateToProps = (state) => ({ 
   auth: state.auth 
})

export default connect(mapStateToProps, null)(AppNavBar);