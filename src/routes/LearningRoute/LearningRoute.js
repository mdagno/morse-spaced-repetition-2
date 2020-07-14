import React, { Component } from 'react'
import Learn from '../../components/Learn/Learn';
import ApiService from '../../services/api-service';
import UserContext from '../../contexts/UserContext';



class LearningRoute extends Component {
  static contextType = UserContext;

  render() {
    return (
      <section className='learn'>
       <Learn />
      </section>
    );
  }
}

export default LearningRoute
