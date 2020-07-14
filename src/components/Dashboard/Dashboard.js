import React from 'react';
import './Dashboard.css';
import UserContext from '../../contexts/UserContext';
import ApiService from '../../services/api-service';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {
  static contextType = UserContext;

  state = {
    languagesExpand: false,
    detailsExpand: false,
    progressExpand: false,
    alphabetExpand: false,
  }
  
  handleDropDown = (value) => {
    this.setState({
      [value]: !this.state[value]
    })
  }

  generateAlphabet = () => {
    const words = this.props.words.sort((a, b) => a.id - b.id)
    return words.map(word => {
      return(
        <li key={word.id}>
          <h4>{word.translation}</h4>
          <p>
            {word.original
            .split('')
            .map(char => char === '.' ?'\u25CF' : '\u268A')
            .join('')}
          </p>
          <p className="word-score">Correct Score: {word.correct_count}</p>
          <p className="word-score">Incorrect Score: {word.incorrect_count}</p>
        </li>
      )
    })
  }

  generateCypressAlphabet = () => {
    return this.props.words.map(word => {
      return(
        <li className='cypress' key={word.id}>
          <h4>{word.original}</h4>
          <p>
           {word.translation} 
           correct answer count: {word.correct_count} 
           incorrect answer count: {word.incorrect_count}
          </p>
        </li>
      )
    })
  }

  renderLanguages = () => {
    if(this.state.languagesExpand === true) {
      return (
        <>
        <ul className='languages'>
        <li className='language'>
        <h2 onClick={() => this.handleDropDown('detailsExpand')}>
          {this.props.language.name} 
          <i class={(this.state.detailsExpand === false) ? "fas fa-chevron-down" : "fas fa-chevron-up"}></i>
          </h2>
         {this.renderLanguageDetails()}
        </li>
        </ul>
        </>
      )
    }
    else {
      return null
    }
  }

  renderLanguageDetails = () => {
    if(this.state.detailsExpand === true) {
      return (
        <ul className='language-details'>
        <li>
          <h3 onClick={() => this.handleDropDown('progressExpand')}>
            Your Progress
            <i class={(this.state.progressExpand === false) ? "fas fa-chevron-down" : "fas fa-chevron-up"}></i>
            </h3>
          {this.renderProgress()}
        </li>
        <li className='alphabet-li'>
          <h3 onClick={() => this.handleDropDown('alphabetExpand')}>
            Alphabet
            <i class={(this.state.alphabetExpand === false) ? "fas fa-chevron-down" : "fas fa-chevron-up"}></i>
          </h3>
          {this.renderAlphabet()}
        </li>
      </ul>
      )
    }
    else {
      return null;
    }
  }

  renderProgress = () => {
    if(this.state.progressExpand === true) {
      return (
       <div className='progress'>
         <p>Total Score: {this.props.language.total_score}</p>
         <Link to='/learn'>
         <button>Learn</button>
         </Link>
       </div>
      )
    }
  }

  renderAlphabet = () => {
    if(this.state.alphabetExpand === true) {
      return (
        <ul className='alphabet'>{this.generateAlphabet()}</ul>
      )
    }
    else {
      return null;
    }
  }
  

  render() {
    return (
      <div className='dashboard'>
        <h2 className='cypress'>
          {this.props.language.name}
          Total correct answers: {this.props.language.total_score}
        </h2>
        <Link to='learn'>
          <h2 className='cypress'>Start practicing</h2>
          </Link>
        <h3 className='cypress'>Words to practice</h3>
        {this.generateCypressAlphabet()}
        <h2 onClick={() => this.handleDropDown('languagesExpand')}>
          Your Languages         
          <i class={(this.state.languagesExpand === false) ? "fas fa-chevron-down" : "fas fa-chevron-up"}></i>
        </h2>
        {this.renderLanguages()}
      </div>
    )
  }
}