import React, { Component } from 'react';
import { Container, Button, Modal, ModalHeader,  ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
   state = {
      modal: false,
      name: ''
   }

   static propTypes = {
      addItem: PropTypes.func.isRequired,
      item: PropTypes.object.isRequired,
      isAuthenticated: PropTypes.bool
   }

   toggle= () => this.setState({ modal: !this.state.modal })

   onChange = evt => {
      const { name, value } = evt.target;   
      this.setState({ [name]: value })
   }

   onSubmit = evt => {
      evt.preventDefault();
      
      const item = { name: this.state.name };
      
      this.props.addItem(item);
      this.toggle();
   }

   render() {
      const { isAuthenticated } = this.props;
      return(
         <Container>
            {
               isAuthenticated ? (
                  <Button color="dark" style={{ marginBottom: '15px' }} onClick={this.toggle} >
                     Add Item
                  </Button>
               ) : (
                  <h4 className="mb-3">Please log in to manage items</h4>
               )
            }
            

            <Modal isOpen={this.state.modal} toggle={this.toggle} >
               <ModalHeader toggle={this.toggle}>
                  Add to Shopping List
               </ModalHeader>

               <ModalBody>
                  <Form onSubmit={this.onSubmit}>
                     <FormGroup>
                        <Label for="item">Item</Label>
                        <Input
                           type="text"
                           name="name"
                           id="item"
                           placeholder="Add shopping item"
                           onChange={this.onChange}
                        />
                        <Button color="dark" style={{ marginTop: "15px" }} block>Add Item</Button>
                     </FormGroup>
                  </Form>
               </ModalBody>
            </Modal>
         </Container>
      )
   }
}

const mapStateToProps = (state) => ({ 
   item: state.item,
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(ItemModal);