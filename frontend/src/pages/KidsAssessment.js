import React, { useState } from "react";
import "./KidsAssessment.css";

import correctSoundFile from "../assets/correct.mp3";
import wrongSoundFile from "../assets/wrong.mp3";
import catImg from "../assets/cat.png";
import numbersImg from "../assets/numbers.png";
import colorsImg from "../assets/colors.png";
import bananaImg from "../assets/banana.png";
import triangleImg from "../assets/triangle.png";
import jupiterImg from "../assets/jupiter.png";

const questions = [
  { id: 1, text: "Which animal says 'Meow'?", img: catImg, options: ["Dog", "Cat", "Elephant"], answer: "Cat" },
  { id: 2, text: "Which number comes after 2?", img: numbersImg, options: ["1", "2", "3"], answer: "3" },
  { id: 3, text: "Find the color Red!", img: colorsImg, options: ["Blue", "Green", "Red"], answer: "Red" },
  { id: 4, text: "Which fruit is yellow?", img: bananaImg, options: ["Apple", "Banana", "Grapes"], answer: "Banana" },
  { id: 5, text: "Which shape has 3 sides?", img: triangleImg, options: ["Square", "Triangle", "Circle"], answer: "Triangle" },
  { id: 6, text: "Which is the largest planet?", img: jupiterImg, options: ["Mars", "Earth", "Jupiter"], answer: "Jupiter" }
];

const KidsAssessment = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [message, setMessage] = useState("");

  // Preload audio
  const correctAudio = new Audio(correctSoundFile);
  const wrongAudio = new Audio(wrongSoundFile);

  const handleAnswer = (selected) => {
    if (selected === questions[currentQ].answer) {
      setScore(score + 1);
      setMessage("🎉 Correct! 🎉");
      correctAudio.play();
    } else {
      setMessage("❌ Wrong! Try again! ❌");
      wrongAudio.play();
    }

    setTimeout(() => {
      setMessage("");
      if (currentQ === questions.length - 1) {
        setFinished(true); // Once all questions are answered, set finished to true
      } else {
        setCurrentQ(currentQ + 1);
      }
    }, 1000); // Wait a moment to display the message
  };

  const calculateSeverity = (score) => {
    const scorePercentage = (score / questions.length) * 100;

    if (scorePercentage === 100) {
      return "High - Excellent!";
    } else if (scorePercentage >= 70) {
      return "Medium - Good job!";
    } else {
      return "Low - Keep practicing!";
    }
  };

  const restartGame = () => {
    setFinished(false);
    setCurrentQ(0);
    setScore(0);
  };

  return (
    <div className="kids-container">
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="confetti"></div>
      <div className="confetti2"></div>
      <div className="confetti3"></div>
      <div className="star star1"></div>
      <div className="star star2"></div>
      <div className="star star3"></div>
      <div className="sound-wave"></div>
      
      {finished ? (
        <div className="score-screen">
          <h1>Your Score: {score} / {questions.length}</h1>
          <h2>{calculateSeverity(score)}</h2>
          <button className="restart-btn" onClick={restartGame}>Play Again</button>
        </div>
      ) : (
        <div className="game-screen">
          <h2>{questions[currentQ].text}</h2>
          <img className="question-img" src={questions[currentQ].img} alt="question" />
          <div className="options">
            {questions[currentQ].options.map((option, idx) => (
              <button key={idx} className="option-btn" onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          {message && <div className="message">{message}</div>}
        </div>
      )}
    </div>
  );
};

export default KidsAssessment;
