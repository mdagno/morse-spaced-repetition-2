import React from 'react';
import './Landing.scss';
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div className="landing">
            <div className="landing__main">
            <h2 className="heading-secondary">
                Welcome to Spaced Repetition
            </h2>
            <span><Link to='/register'>Practice spaced repetition today!</Link></span>
    
           
            </div>
            <div className="landing__secondary">
                <h3 className="heading-tertiary">What is spaced repetition?</h3>
                <p>Spaced repetition is an evidence-based learning technique that is usually performed with flashcards. Newly introduced and more difficult flashcards are shown more frequently while older and less difficult flashcards are shown less frequently in order to exploit the psychological spacing effect. The use of spaced repetition has been shown to increase rate of learning.</p>
            </div>
        </div>
    )
}

export default Landing;