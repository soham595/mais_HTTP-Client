import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink} from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/logo.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_pic: '',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }
    };
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 120, height: 32, alt: 'Altiostar Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Altiostar Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/dashboard" className={window.location.href.includes('dashboard')?"nav-link blue":"nav-link"}>Dashboard</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/ems-users" className={window.location.href.includes('users')?"nav-link blue":"nav-link"}>Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/http-client" className={window.location.href.includes('client')?"nav-link blue":"nav-link"}>HTTP Client</Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          {/*<AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>*/}
          <DropdownItem className="text-right" onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
