import React, { useState } from 'react';
import axios from 'axios';

function PronunciationPractice() {
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    // 표준 발음 생성 및 재생
    const generateStandardPronunciation = async (text) => {
        if (!text) return;

        try {
            const response = await axios.post(
                `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
                {
                    input: { text },
                    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
                    audioConfig: { audioEncoding: 'MP3' },
                }
            );

            const audioContent = response.data.audioContent;
            const audioBlob = new Blob([Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))], {
                type: 'audio/mp3',
            });
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url); // 새로운 표준 발음 URL 설정
        } catch (error) {
            console.error('Text-to-Speech API 호출 오류:', error);
            setFeedback('표준 발음을 생성할 수 없습니다.');
        }
    };

    // 음성 인식 시작
    const startRecognition = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setFeedback('이 브라우저는 Web Speech API를 지원하지 않습니다.');
            return;
        }

        // 이전 상태 초기화
        setTranscript('');
        setAudioUrl('');
        setFeedback('음성 인식 중...');

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript.trim();
            setTranscript(spokenText); // 인식된 텍스트 업데이트
            setFeedback('발음이 인식되었습니다.');
            generateStandardPronunciation(spokenText); // 인식된 텍스트로 표준 발음 생성
        };

        recognition.onerror = (event) => {
            setFeedback(`음성 인식 오류: ${event.error}`);
        };

        recognition.start();
    };

    return (
        <div>
            <h2>발음 연습</h2>
            <button onClick={startRecognition}>발음 시작</button>
            <p>인식된 텍스트: {transcript}</p>
            <p>피드백: {feedback}</p>
            {audioUrl && (
                <div>
                    <h3>표준 발음</h3>
                    <audio controls>
                        <source src={audioUrl} type="audio/mp3" />
                    </audio>
                </div>
            )}
        </div>
    );
}

export default PronunciationPractice;
