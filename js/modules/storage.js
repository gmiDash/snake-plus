"use strict";

const setStorageHighestScore = (currentScore = null) => {
    // read highest score from local storage (no score = null)
    let highestScore = localStorage.getItem("gmi-snakeGameHighestScore");
    //console.log("score storage:", highestScore);
    if (highestScore < currentScore) {
        //console.log("score storage:", highestScore, "current score:", currentScore);
        highestScore = currentScore;
        localStorage.setItem("gmi-snakeGameHighestScore", highestScore);
    } else if (!highestScore) {
        highestScore = "-";
    }
    return highestScore;
}

export { setStorageHighestScore };