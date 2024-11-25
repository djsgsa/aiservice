import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Home from './components/Home';
import Login from './components/Login';
import MyProfile from './components/MyProfile';
import LearningPath from './components/LearningPath';
import PronunciationFeedback from './components/PronunciationFeedback';
import Chatbot from './components/Chatbot';
import QuizComponent from './components/Quiz';
import TextToSpeech from './components/TextToSpeech';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [userData, setUserData] = useState(null); // Store user info

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserData(user);
            } else {
                setIsLoggedIn(false);
                setUserData(null);
            }
        });

        return () => unsubscribe(); // Cleanup listener
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setIsLoggedIn(false);
        setUserData(null);
    };

    return (
        <Router>
            <div className="app-container">
                <nav className="navigation">
                    <Link to="/" className="nav-link">Home</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="nav-link">My Profile</Link>
                            <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="nav-link">Login</Link>
                    )}
                    <Link to="/learning-path" className="nav-link">Learning Path</Link>
                    <Link to="/quiz" className="nav-link">Quiz</Link>
                    <Link to="/pronunciation-feedback" className="nav-link">Pronunciation</Link>
                    <Link to="/text-to-speech" className="nav-link">Text-to-Speech</Link>
                    <Link to="/chatbot" className="nav-link">Chatbot</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<MyProfile userData={userData} />} />
                    <Route path="/learning-path" element={<LearningPath />} />
                    <Route path="/quiz" element={<QuizComponent level="beginner" />} />
                    <Route path="/pronunciation-feedback" element={<PronunciationFeedback />} />
                    <Route path="/text-to-speech" element={<TextToSpeech />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
