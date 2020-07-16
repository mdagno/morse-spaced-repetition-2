import React from 'react';
import './Learn.scss'
import UserContext from '../../contexts/UserContext';
import ApiService from '../../services/api-service';

export default class Learn extends React.Component {
  static contextType = UserContext;

  state = {
    guess: '',
    answered: false,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    nextWord: '',
  }

  componentDidMount() {
    ApiService.getLanguageHead()
    .then(res => {
      this.context.setCurrentWord(res)
      this.context.updateNextWord(res.nextWord)
      this.context.updateTotalScore(res.totalScore)
    })
    .then(() => {
      this.setState({
        totalScore: this.context.currentWord.totalScore,
        correctScore: this.context.currentWord.wordCorrectCount,
        incorrectScore: this.context.currentWord.wordIncorrectCount,
        nextWord: this.context.currentWord.nextWord
      })
    })

  }
  renderNextButton = () => {
    if(this.state.answered) {
      return (
        <button id='next-button' onClick={this.handleNextButton}>Try another word!</button>
      )
    }
    else {
      return null;
    }
  }

  renderSubmitButton = () => {
    if(this.state.answered === false) {
      return (
        <button type='submit' id='submit-button'>Submit your answer</button>
      )
    }
    else {
      return null;
    }
  }

  handleNextButton = () => {
    this.setState({
      answered: false,
      isCorrect: null,
    })
    ApiService.getLanguageHead()
    .then(res => {
      this.context.setCurrentWord(res)
      this.context.updateNextWord(res.nextWord)
    })
    .then(() => {
      this.setState({
        totalScore: this.context.currentWord.totalScore,
        correctScore: this.context.currentWord.wordCorrectCount,
        incorrectScore: this.context.currentWord.wordIncorrectCount,
      })
    })
  }

  renderFeedBack = () => {
    if(this.state.answered === true) {
      if(this.context.isCorrect === true) {
        return (
          <div className='feedback'>
            <h3>Correct!</h3>
            <p>The correct translation was {this.context.answer} and you answered: {this.state.guess}</p>
          </div>
        )
        }
       else {
        return (
          <div className='feedback'>
            <h3>Good try, but not quite right</h3>
            <p>The correct translation was {this.context.answer} and you answered: {this.state.guess}</p>
          </div>
        )
      }
    }
  }

  handleSubmitAnswer = e => {
    e.preventDefault();
    this.setState({
      answered: true,
    })
    document.getElementById('learn-guess-input').value='';
    ApiService.postGuess({guess: this.state.guess})
    .then(res => {
      this.context.updateWordCorrectCount(res.wordCorrectCount)
      this.context.updateWordIncorrectCount(res.wordIncorrectCount)
      this.context.updateTotalScore(res.totalScore)
      this.context.updateAnswer(res.answer)
      this.context.updateIsCorrect(res.isCorrect)
      this.setState({nextWord: res.nextWord})
      if(res.isCorrect) {
        this.setState({
          correctScore: this.state.correctScore + 1}
          )
      }
      else {
        this.setState({incorrectScore: this.state.incorrectScore + 1})
      }
      })
  }

  handleGuessField = (answer) => {
    this.setState({
      guess: answer,
    })
  }

  render() {
    const { totalScore, wordCorrectCount, wordIncorrectCount, nextWord, isCorrect, answer} = this.context;
      return (
        <>
        <div className="scoreCounts">
        <p>Correct: {this.state.correctScore}</p>
        
        <p>Incorrect: {this.state.correctScore}</p>
        </div>
        <h2>Translate the word:</h2>
        <div className="DisplayScore">
        <p>
        Your total score is: {this.context.totalScore}
        </p>
        </div>
        <p className='current-word'>
          {nextWord
              .split('')
              .map(char => char === '.' ?'\u25CF' : '\u0082')
              .join('')}
        </p>
        <form onSubmit={this.handleSubmitAnswer}>
        <label for='learn-guess-input'>Your answer:</label>
        <input type='text' id='learn-guess-input' onChange={e => this.handleGuessField(e.target.value)} required></input>
        {this.renderSubmitButton()}
        </form>
        <div className="DisplayFeedback">
        {this.renderFeedBack()}
        {this.renderNextButton()}
        </div>
        </>
      )
  }
}