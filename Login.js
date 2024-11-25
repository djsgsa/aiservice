import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleAuth = async () => {
        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
                setSuccessMessage('회원가입 성공! 이제 로그인 해주세요.');
                setIsRegistering(false);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                setSuccessMessage('로그인 성공!');
            }
            setError('');
        } catch (err) {
            setError('이메일 또는 비밀번호가 잘못되었습니다.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">{isRegistering ? '회원가입' : '로그인'}</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    className="login-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    className="login-input"
                />
                <button onClick={handleAuth} className="login-button">
                    {isRegistering ? '회원가입' : '로그인'}
                </button>
                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="toggle-button"
                >
                    {isRegistering ? '로그인으로 전환' : '회원가입으로 전환'}
                </button>
            </div>
        </div>
    );
}

export default Login;
