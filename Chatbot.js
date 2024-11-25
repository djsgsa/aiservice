import React, { useState } from 'react';

// API 엔드포인트 및 키 설정
const WHISPER_API_URL = 'https://api.openai.com/v1/audio/transcriptions'; // Whisper API
const CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions'; // ChatGPT API
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;


function AdvancedVoiceChatbot() {
    const [messages, setMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [userInput, setUserInput] = useState('');
    const synth = window.speechSynthesis;

    // 음성 인식 파일 업로드 및 Whisper API 호출
    const processAudio = async (audioBlob) => {
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.wav');
        formData.append('model', 'whisper-1');

        const response = await fetch(WHISPER_API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
            body: formData,
        });

        const data = await response.json();
        console.log('Whisper Response:', data);
        return data.text;
    };

    // ChatGPT API 호출
    const getAIResponse = async (inputText) => {
        const response = await fetch(CHATGPT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: inputText }],
            }),
        });

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;
        console.log('ChatGPT Response:', aiMessage);
        return aiMessage;
    };

    // 음성 녹음 시작
    const startListening = () => {
        if (!navigator.mediaDevices || !window.MediaRecorder) {
            alert('Your browser does not support audio recording.');
            return;
        }

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const transcribedText = await processAudio(audioBlob);
                setMessages((prev) => [...prev, { user: 'User', text: transcribedText }]);

                const aiResponse = await getAIResponse(transcribedText);
                setMessages((prev) => [...prev, { user: 'AI', text: aiResponse }]);

                // 음성 출력
                const utterance = new SpeechSynthesisUtterance(aiResponse);

                // 목소리 선택
                const voices = synth.getVoices();
                utterance.voice = voices.find((voice) => voice.lang === 'en-US' && voice.name.includes('Google')) || voices[0];
                
                // 음성 속성 조정
                utterance.pitch = 1.2; // 피치 (1.0이 기본값)
                utterance.rate = 1.0; // 속도 (1.0이 기본값)
                utterance.volume = 1.0; // 볼륨 (1.0이 기본값)
                
                // 음성 출력
                synth.speak(utterance);
                
            };

            mediaRecorder.start();
            setIsListening(true);

            setTimeout(() => {
                mediaRecorder.stop();
                setIsListening(false);
            }, 5000); // 5초 동안 녹음
        });
    };

    // 텍스트 입력 처리
    const handleTextInput = async () => {
        if (!userInput.trim()) return;

        setMessages((prev) => [...prev, { user: 'User', text: userInput }]);
        const aiResponse = await getAIResponse(userInput);
        setMessages((prev) => [...prev, { user: 'AI', text: aiResponse }]);

        // 음성 출력
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        synth.speak(utterance);

        setUserInput('');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Advanced Voice Chatbot</h2>
            <div
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px',
                    height: '300px',
                    overflowY: 'auto',
                    marginBottom: '10px',
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.user === 'User' ? 'right' : 'left',
                            margin: '10px 0',
                        }}
                    >
                        <strong>{msg.user}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message"
                style={{
                    width: 'calc(100% - 120px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            />
            <button
                onClick={handleTextInput}
                style={{
                    marginLeft: '10px',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Send
            </button>
            <button
                onClick={startListening}
                style={{
                    marginLeft: '10px',
                    padding: '10px',
                    backgroundColor: isListening ? '#ffc107' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                {isListening ? 'Listening...' : 'Speak'}
            </button>
        </div>
    );
}

export default AdvancedVoiceChatbot;
