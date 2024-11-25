import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import SurveyStep from './SurveyStep';
import './Home.css';

function Home({ setIsSurveyComplete }) {
    const [step, setStep] = useState(-1); // 설문 시작 전 상태
    const [answers, setAnswers] = useState({});

    const questions = [
        {
            question: '듀오링고를 어떻게 접하셨나요?',
            options: [
                { label: 'Facebook/Instagram', value: 'facebook' },
                { label: '가족/친구', value: 'family' },
                { label: '뉴스/블로그', value: 'news' },
                { label: 'Google 검색', value: 'google' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'TV', value: 'tv' },
            ],
            key: 'source',
        },
        {
            question: '영어를 얼마나 알고 계시나요?',
            options: [
                { label: '영어를 처음 배워요', value: 'beginner' },
                { label: '자주 사용되는 단어 몇 개를 알고 있어요', value: 'elementary' },
                { label: '기본적인 대화를 할 수 있어요', value: 'intermediate' },
                { label: '다양한 주제에 대해 이야기할 수 있어요', value: 'advanced' },
            ],
            key: 'level',
        },
        {
            question: '영어를 배우는 이유가 무엇인가요?',
            options: [
                { label: '사람들과 소통', value: 'communication' },
                { label: '경력 개발', value: 'career' },
                { label: '학업', value: 'education' },
                { label: '여행 준비', value: 'travel' },
                { label: '취미 활동', value: 'hobby' },
                { label: '생산적인 시간 활용', value: 'productive' },
            ],
            key: 'goal',
        },
        {
            question: '일일 학습 목표가 무엇인가요?',
            options: [
                { label: '하루 5분 - 가볍게', value: '5min' },
                { label: '하루 10분 - 보통', value: '10min' },
                { label: '하루 15분 - 열심히', value: '15min' },
                { label: '하루 20분 - 진지하게', value: '20min' },
            ],
            key: 'dailyGoal',
        },
    ];

    const handleAnswer = async (key, answer) => {
        const updatedAnswers = { ...answers, [key]: answer.value };
        setAnswers(updatedAnswers);

        if (step + 1 < questions.length) {
            setStep(step + 1);
        } else {
            // 설문 완료 후 Firestore에 데이터 저장
            try {
                const user = auth.currentUser;
                if (user) {
                    await setDoc(doc(db, 'users', user.uid), updatedAnswers);
                    console.log('사용자 데이터 저장 완료:', updatedAnswers);
                } else {
                    console.error('사용자가 로그인되어 있지 않습니다.');
                }
                setIsSurveyComplete(true); // 설문 완료 상태 업데이트
            } catch (error) {
                console.error('Firestore 저장 실패:', error);
            }
        }
    };

    return (
        <div className="home-container">
            {step === -1 ? (
                <div className="start-screen">
                    <h1>재미있고 효과적인 무료 언어 학습!</h1>
                    <button className="start-button" onClick={() => setStep(0)}>
                        시작하기
                    </button>
                </div>
            ) : step < questions.length ? (
                <SurveyStep
                    question={questions[step].question}
                    options={questions[step].options}
                    onAnswer={(answer) => handleAnswer(questions[step].key, answer)}
                    step={step}
                    totalSteps={questions.length}
                />
            ) : (
                <div className="summary">
                    <h2>설문 완료!</h2>
                    <p>당신의 학습 추천 데이터를 기반으로 학습을 시작하세요.</p>
                    <pre>{JSON.stringify(answers, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Home;
