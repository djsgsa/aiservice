export const saveProgressToStorage = (progress) => {
    localStorage.setItem("chatProgress", JSON.stringify(progress));
  };
  
  export const loadProgressFromStorage = () => {
    const savedProgress = localStorage.getItem("chatProgress");
    return savedProgress ? JSON.parse(savedProgress) : null;
  };
  