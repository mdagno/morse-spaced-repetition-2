import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.scss'

class Header extends Component {
  static contextType = UserContext
  state = {
    expanded: false,
    loggedIn: false,
  }

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  handleHamburger = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderLogoutLink() {
    return (
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
     )
  }

  renderLoginLink() {
      return (
        <ul className='login-and-register'>
          <li>
          <Link to='/login'>Login</Link>
          </li>
          <li>
          <Link to='/register'>Register</Link>
          </li>
        </ul>
      )
  }


  render() {
    return (
      <header>
        <h1>
          <Link to='/'>
            spaced repetition
          </Link>
        </h1>
        <ul className="header__login-options">
          <li>
          {this.context.user.name ? this.context.user.name : null}
          </li>
          <li>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
          </li>
        </ul>
      </header>
    );
  }
}

export default Header
