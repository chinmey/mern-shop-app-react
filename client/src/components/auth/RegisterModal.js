import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import {register} from '../../actions/authAction'
import {clearErrors} from '../../actions/errorAction';


import PropTypes from 'prop-types'

class RegisterModal extends Component{
state={
    modal:false,
    name:'',
    email:'',
    password:'',
    msg:null
}
static proptypes={
    isAuthenciated:PropTypes.bool,
    error:PropTypes.object.isRequired,
    register:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired
}
componentDidUpdate(prevProps){
const {error,isAuthenciated}=this.props;
if(error!==prevProps.error){
    if(error.id==='REGISTER_FAIL'){
        this.setState({msg:error.msg.msg})
    }else
    {
        this.setState({msg:null})
    }
}
if(this.state.Modal){
if(isAuthenciated){
    this.toggle();
}
}
}
toggle=()=>{
    this.props.clearErrors();
    this.setState({
        modal:!this.state.modal
    })
}
onChange=(e)=>{
    this.setState({ [e.target.name]:e.target.value})
}
onSubmit=(e)=>{
    e.preventDefault();
    
    const {name,email,password}=this.state;

    const newUser={name,email,password};

    this.props.register(newUser);
    /*this.toggle();*/
}
render(){
    return(
        <div>
            <NavLink onClick={this.toggle} href='#'>Register</NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Register</ModalHeader>
        <ModalBody>
            {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}
          <Form onSubmit={this.OnSubmit}>
            <FormGroup>
              <Label for="name">name</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="enter name"
                onChange={this.onChange}
              />
              <Label for="email">email</Label>
              <Input
                type="email"
                name="email"
                id="item"
                placeholder="enter email"
                onChange={this.onChange}
              />
              <Label for="name">password</Label>
              <Input
                type="password"
                name="password"
                id="item"
                placeholder="enter password"
                onChange={this.onChange}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
        </div>
    )
}

}

const mapStateToProps = (state) => ({
    isAuthenciated:state.auth.isAuthenciated,
    error:state.error
    
  });

export default connect(mapStateToProps, { register,clearErrors })(RegisterModal);


