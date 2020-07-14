import React, { Component } from 'react'
import './DashboardRoute.css'
import UserContext from '../../contexts/UserContext'
import ApiService from '../../services/api-service'
import Dashboard from '../../components/Dashboard/Dashboard'

class DashboardRoute extends Component {
static contextType = UserContext;

componentDidMount() {
  ApiService.getUserDetails()
  .then(res => {
    this.context.setUserDetails({ 
      language: res.language,
       words: res.words})
    })
}

  renderDashboard() {
    if(Object.keys(this.context.userDetails).length) {
      return (
        <Dashboard 
        words={this.context.userDetails.words} 
        language={this.context.userDetails.language}
        />
      )
    }
    else {
      return null;
    }
  }

  render() {
    return (
      <section className='dashboard'>
        {this.renderDashboard()}
      </section>
    );
  }
}

export default DashboardRoute
