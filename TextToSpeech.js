import React, { useState } from 'react';
import axios from 'axios';

function TextToSpeech() {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const handleTextToSpeech = async () => {
        try {
            const response = await axios.post(
                `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
                {
                    input: { text },
                    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
                    audioConfig: { audioEncoding: "MP3" },
                }
            );

            const audioContent = response.data.audioContent;
            const audioBlob = new Blob([Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))], { type: 'audio/mp3' });
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
        } catch (error) {
            console.error('Text-to-Speech API 호출 오류:', error);
        }
    };

    return (
        <div>
            <h2>텍스트 발음</h2>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="발음할 텍스트 입력"
            />
            <button onClick={handleTextToSpeech}>발음하기</button>
            {audioUrl && (
                <div>
                    <audio controls>
                        <source src={audioUrl} type="audio/mp3" />
                    </audio>
                </div>
            )}
        </div>
    );
}

export default TextToSpeech;
