import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

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
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
     )
  }

  renderLoginLink() {
      return (
        <nav>
          <Link to='/login'>Login</Link>
          {' '}
          <Link to='/register'>Sign up</Link>
        </nav>
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
          <span>{this.context.user.name ? this.context.user.name : null}</span>
            {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
