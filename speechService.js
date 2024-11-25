import axios from 'axios';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const speechToText = async (audioContent) => {
    const url = `https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}`;
    const data = {
        config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        },
        audio: {
            content: audioContent,
        },
    };

    try {
        const response = await axios.post(url, data);

        const transcript = response.data.results?.[0]?.alternatives?.[0]?.transcript || '';
        if (!transcript) {
            throw new Error('Speech-to-Text API 결과가 비어 있습니다.');
        }
        return transcript;
    } catch (error) {
        console.error('Speech-to-Text API 호출 오류:', error?.response?.data || error.message);
        throw error;
    }
};


// Text-to-Speech API 호출
export const textToSpeech = async (text) => {
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
    const data = {
        input: { text },
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    try {
        const response = await axios.post(url, data);
        return response.data.audioContent; // base64 오디오 데이터
    } catch (error) {
        console.error('Error in Text-to-Speech:', error);
        throw error;
    }
};
