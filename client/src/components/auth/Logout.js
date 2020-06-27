import React, { Fragment,Component } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
/*import { ILogoutProps } from '../../types/interfaces';*/
import PropTypes from 'prop-types'

export class Logout extends Component{

    static proptypes={
        
        logout:PropTypes.func.isRequired
        
    }
render(){
    return(
        <Fragment>

        <NavLink onClick={this.state.logout} href="#">
        Logout
      </NavLink>
        </Fragment>
    )
    }
}


export default connect(null, { logout })(Logout);