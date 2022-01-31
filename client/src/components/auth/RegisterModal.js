import React, { Component } from 'react';
import { 
   Container, Button, Modal, ModalHeader, ModalBody, 
   Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
   state = {
      modal: false,
      name: '',
      email: '',
      password: '',
      msg: null
   }

   static propTypes = {
      isAuthenticated: PropTypes.bool,
      error: PropTypes.object.isRequired,
      register: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired
   }

   componentDidUpdate(prevProps) {
      const { error, isAuthenticated } = this.props;
      if(error !== prevProps.error) {
         error.id === 'REGISTER_FAIL' ? this.setState({ msg: error.msg.msg }) : this.setState({ msg: null })
      }

      this.state.modal && isAuthenticated && this.toggle()
   }

   toggle = () => {
      this.props.clearErrors();
      this.setState({ modal: !this.state.modal })
   }

   onChange = evt => {
      const { name, value } = evt.target;   
      this.setState({ [name]: value })
   }

   onSubmit = evt => {
      evt.preventDefault();
      
      const { name, email, password } = this.state;
      const newUser = { name, email, password };
      
      this.props.register(newUser)
   }

   render() {
      const { toggle, onSubmit, onChange, state } = this;
      const { modal, msg } = state;

      return(
         <Container>
            <NavLink onClick={toggle} href="#">Register</NavLink>
            
            <Modal isOpen={modal} toggle={toggle} >
               <ModalHeader toggle={toggle}>
                  Register
               </ModalHeader>

               <ModalBody>
                  {
                     msg ? (
                        <Alert color="danger">{msg}</Alert>
                     ) : null
                  }
                  <Form onSubmit={onSubmit}>
                     <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                           type="text"
                           name="name"
                           id="id"
                           placeholder="Name"
                           className="mb-3"
                           onChange={onChange}
                        />

                        <Label for="email">Email</Label>
                        <Input
                           type="email"
                           name="email"
                           id="email"
                           placeholder="Email"
                           className="mb-3"
                           onChange={onChange}
                        />

                        <Label for="password">Password</Label>
                        <Input
                           type="password"
                           name="password"
                           id="password"
                           placeholder="Password"
                           className="mb-3"
                           onChange={onChange}
                        />
                        <Button color="dark" style={{ marginTop: "15px" }} block>Register</Button>
                     </FormGroup>
                  </Form>
               </ModalBody>
            </Modal>
         </Container>
      )
   }
}

const mapStateToProps = (state) => ({ 
   isAuthenticated: state.auth.isAuthenticated, 
   error: state.error 
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);