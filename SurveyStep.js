import React from 'react';
import './SurveyStep.css';

function SurveyStep({ question, options, onAnswer, step, totalSteps }) {
    return (
        <div className="survey-step">
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                ></div>
            </div>
            <h2>{question}</h2>
            <div className="options-container">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className="option"
                        onClick={() => onAnswer(option)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SurveyStep;
