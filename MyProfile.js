import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function MyProfile({ userData }) {
    const [learningProgress, setLearningProgress] = useState(null);

    useEffect(() => {
        const fetchLearningProgress = async () => {
            if (userData) {
                const docRef = doc(db, 'users', userData.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setLearningProgress(docSnap.data().learningProgress);
                } else {
                    console.log('No learning progress found.');
                }
            }
        };

        fetchLearningProgress();
    }, [userData]);

    return (
        <div>
            <h2>My Profile</h2>
            {userData && (
                <>
                    <p>Email: {userData.email}</p>
                    <p>User ID: {userData.uid}</p>
                </>
            )}
            {learningProgress ? (
                <div>
                    <h3>Learning Progress:</h3>
                    <pre>{JSON.stringify(learningProgress, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading learning progress...</p>
            )}
        </div>
    );
}

export default MyProfile;
