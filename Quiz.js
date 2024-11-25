import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import quizData from '../data/quizData';

function QuizComponent() {
    const [level, setLevel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [matchingAnswers, setMatchingAnswers] = useState({});
    const questions = quizData[level] || [];

    // Fetch user level
    useEffect(() => {
        const fetchLevel = async () => {
            setLoading(true);
            setError(null);
            try {
                const user = auth.currentUser;
                if (!user) throw new Error('User not logged in');

                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setLevel(userDoc.data().level);
                } else {
                    throw new Error('User data not found');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching level:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLevel();
    }, []);

    if (loading) return <p>Loading your quiz...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!questions.length) return <p>No quizzes available for your level: {level}</p>;

    const currentQuiz = questions[currentQuestion];

    const handleNext = () => {
        setUserInput('');
        setMatchingAnswers({});
        setCurrentQuestion(currentQuestion + 1);
    };

    const handleAnswer = () => {
        if (currentQuiz.type === 'multiple-choice') {
            const selectedOption = parseInt(userInput, 10);
            if (selectedOption === currentQuiz.answer) setScore(score + 1);
        } else if (currentQuiz.type === 'fill-in-the-blank') {
            if (userInput.toLowerCase() === currentQuiz.correctAnswer.toLowerCase()) setScore(score + 1);
        } else if (currentQuiz.type === 'match-words') {
            const correctPairs = currentQuiz.pairs.every(
                (pair) => matchingAnswers[pair.word] === pair.match
            );
            if (correctPairs) setScore(score + 1);
        }
        handleNext();
    };

    const renderQuestion = () => {
        switch (currentQuiz.type) {
            case 'multiple-choice':
                return (
                    <>
                        <p>{currentQuiz.question}</p>
                        {currentQuiz.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setUserInput(index)}
                                style={{
                                    margin: '5px',
                                    background: userInput === index ? '#d3d3d3' : 'white',
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </>
                );
            case 'fill-in-the-blank':
                return (
                    <>
                        <p>{currentQuiz.question}</p>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type your answer"
                        />
                    </>
                );
            case 'word-order':
                return (
                    <>
                        <p>{currentQuiz.question}</p>
                        <p>{currentQuiz.words.join(' ')}</p>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Rearrange the words"
                        />
                    </>
                );
            case 'match-words':
                return (
                    <>
                        <p>{currentQuiz.question}</p>
                        <div>
                            {currentQuiz.pairs.map((pair, index) => (
                                <div key={index} style={{ margin: '10px 0' }}>
                                    <span>{pair.word}</span>
                                    <select
                                        onChange={(e) =>
                                            setMatchingAnswers({
                                                ...matchingAnswers,
                                                [pair.word]: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Select</option>
                                        {currentQuiz.pairs.map((p, i) => (
                                            <option key={i} value={p.match}>
                                                {p.match}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </>
                );
            default:
                return <p>Unsupported question type</p>;
        }
    };

    return (
        <div>
            <h2>Quiz for {level}</h2>
            {currentQuestion < questions.length ? (
                <div>
                    {renderQuestion()}
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={handleAnswer}>확인</button>
                        <button onClick={handleNext}>건너뛰기</button>
                    </div>
                </div>
            ) : (
                <p>Quiz Completed! Your Score: {score}/{questions.length}</p>
            )}
        </div>
    );
}

export default QuizComponent;
