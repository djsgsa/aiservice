import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useEffect, useState } from 'react';

function PersonalizedLearningPath() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = () => {
            const user = auth.currentUser; // 현재 로그인된 사용자
            if (user) {
                const docRef = doc(db, "users", user.uid); // 로그인된 사용자의 Firestore 경로
                // 실시간 리스너 추가
                const unsubscribe = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                    setLoading(false); // 데이터 로드 완료
                });

                return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 정리
            } else {
                console.log("사용자가 로그인되어 있지 않습니다.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {loading ? (
                <p>로딩 중...</p>
            ) : userData ? (
                <div>
                    <h2>맞춤형 학습 경로</h2>
                    <p>학습 목표: {userData.goal}</p>
                    <p>현재 수준: {userData.level}</p>
                </div>
            ) : (
                <p>사용자 데이터를 불러올 수 없습니다.</p>
            )}
        </div>
    );
}

export default PersonalizedLearningPath;
