// src/data/quizData.js
const quizData = {
    beginner: [
        { type: "multiple-choice", question: "Apple의 뜻은?", options: ["사과", "바나나", "포도"], answer: 0 },
        { type: "multiple-choice", question: "What color is the sky?", options: ["Blue", "Red", "Green"], answer: 0 },
        { type: "fill-in-the-blank", question: "He has no ___.", options: ["luck", "time", "money"], answer: 0 },
        {
            type: "word-order",
            question: "Arrange the words into a correct sentence:",
            words: ["I", "am", "a", "teacher"],
            correctOrder: "I am a teacher",
        },
        {
            type: "word-order",
            question: "Arrange the words into a correct sentence:",
            words: ["The", "sun", "is", "shining"],
            correctOrder: "The sun is shining",
        },
        { type: "multiple-choice", question: "What is 3 + 2?", options: ["4", "5", "6"], answer: 1 },
        { type: "multiple-choice", question: "Which animal barks?", options: ["Dog", "Cat", "Bird"], answer: 0 },
        {
            type: "word-order",
            question: "Arrange the words into a correct sentence:",
            words: ["We", "are", "going", "home"],
            correctOrder: "We are going home",
        },
        {
            type: "fill-in-the-blank",
            question: "My name is ___.",
            options: ["John", "Peter", "Mike"],
            answer: 0,
        },
        { type: "multiple-choice", question: "What is 1 + 1?", options: ["1", "2", "3"], answer: 1 },
    ],
    elementary: [
        { type: "multiple-choice", question: "She ___ to school.", options: ["goes", "go", "going"], answer: 0 },
        { type: "multiple-choice", question: "What is 5 - 2?", options: ["2", "3", "4"], answer: 1 },
        {
            type: "match-words",
            question: "Match the following words with their meanings:",
            pairs: [
                { word: "pen", match: "펜" },
                { word: "chair", match: "의자" },
            ],
        },
        {
            type: "word-order",
            question: "Rearrange to form a sentence:",
            words: ["The", "book", "is", "on", "the", "table"],
            correctOrder: "The book is on the table",
        },
        {
            type: "fill-in-the-blank",
            question: "The cat is ___.",
            options: ["black", "red", "blue"],
            answer: 0,
        },
        { type: "multiple-choice", question: "Which is a fruit?", options: ["Apple", "Carrot", "Potato"], answer: 0 },
        {
            type: "word-order",
            question: "Rearrange to form a sentence:",
            words: ["I", "like", "to", "read", "books"],
            correctOrder: "I like to read books",
        },
        { type: "multiple-choice", question: "What is the opposite of 'big'?", options: ["Small", "Large", "Huge"], answer: 0 },
        {
            type: "match-words",
            question: "Match the following words with their meanings:",
            pairs: [
                { word: "dog", match: "개" },
                { word: "car", match: "차" },
            ],
        },
        {
            type: "word-order",
            question: "Rearrange to form a sentence:",
            words: ["She", "is", "my", "friend"],
            correctOrder: "She is my friend",
        },
    ],
    intermediate: [
        { type: "multiple-choice", question: "Choose the correct sentence:", options: ["He don't go.", "He doesn't go."], answer: 1 },
        { type: "multiple-choice", question: "Which is correct?", options: ["I has a car.", "I have a car."], answer: 1 },
        {
            type: "fill-in-the-blank",
            question: "The sun rises in the ___.",
            options: ["west", "north", "east"],
            answer: 2,
        },
        {
            type: "word-order",
            question: "Arrange the words into a correct sentence:",
            words: ["The", "dog", "is", "in", "the", "garden"],
            correctOrder: "The dog is in the garden",
        },
        { type: "multiple-choice", question: "Which is a verb?", options: ["Run", "Happy", "Green"], answer: 0 },
        {
            type: "word-order",
            question: "Rearrange to form a sentence:",
            words: ["They", "are", "playing", "football"],
            correctOrder: "They are playing football",
        },
        {
            type: "fill-in-the-blank",
            question: "Complete the sentence: 'He is a good ___.'",
            options: ["player", "play", "plays"],
            answer: 0,
        },
        { type: "multiple-choice", question: "What is 10 / 2?", options: ["4", "5", "6"], answer: 1 },
        {
            type: "match-words",
            question: "Match the following words with their meanings:",
            pairs: [
                { word: "happy", match: "기쁜" },
                { word: "strong", match: "강한" },
            ],
        },
        {
            type: "word-order",
            question: "Arrange the words into a correct sentence:",
            words: ["He", "is", "watching", "a", "movie"],
            correctOrder: "He is watching a movie",
        },
    ],
    advanced: [
        { type: "multiple-choice", question: "Which is a complex sentence?", options: ["I eat.", "I eat because I'm hungry."], answer: 1 },
        { type: "multiple-choice", question: "Select the correct synonym for 'elated':", options: ["Happy", "Sad", "Angry"], answer: 0 },
        {
            type: "fill-in-the-blank",
            question: "Complete the sentence: 'Success is achieved through ___.'",
            options: ["hard work", "luck", "laziness"],
            answer: 0,
        },
        {
            type: "word-order",
            question: "Arrange the words into a correct sentence:",
            words: ["If", "it", "rains", "we", "will", "stay", "home"],
            correctOrder: "If it rains, we will stay home",
        },
        {
            type: "match-words",
            question: "Match the following words with their meanings:",
            pairs: [
                { word: "arduous", match: "difficult" },
                { word: "serene", match: "calm" },
            ],
        },
        { type: "multiple-choice", question: "What is the opposite of 'abundant'?", options: ["Scarce", "Plenty", "Huge"], answer: 0 },
        {
            type: "word-order",
            question: "Rearrange to form a sentence:",
            words: ["The", "sky", "is", "blue"],
            correctOrder: "The sky is blue",
        },
        {
            type: "fill-in-the-blank",
            question: "The answer to life is ___.",
            options: ["42", "24", "84"],
            answer: 0,
        },
        {
            type: "match-words",
            question: "Match the following words with their meanings:",
            pairs: [
                { word: "tranquil", match: "calm" },
                { word: "eloquent", match: "expressive" },
            ],
        },
        {
            type: "word-order",
            question: "Rearrange to form a sentence:",
            words: ["Reading", "books", "is", "important"],
            correctOrder: "Reading books is important",
        },
    ],
};

export default quizData;
