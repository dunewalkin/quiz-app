import React, { useState } from 'react';
import './assets/styles/fonts.scss'
import './assets/styles/global.scss'
import data from '../data.json';

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizButtonsVisible, setQuizButtonsVisible] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null); // Состояние для хранения выбранной пользователем опции
  const [submitClicked, setSubmitClicked] = useState(false); // Состояние для отслеживания нажатия на кнопку "Submit"

  const handleQuizSelection = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setQuizButtonsVisible(false);
    setSelectedOption(null); // Сброс выбранной опции при выборе нового теста
    setSubmitClicked(false); // Сброс состояния нажатия на кнопку "Submit" при выборе нового теста
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Проверка, выбрана ли какая-либо опция перед переходом к следующему вопросу
    if (selectedOption !== null) {
      // Проверка ответа и вывод сообщения в консоль
      if (selectedOption === selectedQuiz.questions[currentQuestionIndex].answer) {
        console.log("Ответ правильный");
      } else {
        console.log("Ответ неправильный");
      }
      // Если кнопка "Submit" еще не была нажата, меняем ее текст на "Next Question"
      if (!submitClicked) {
        setSubmitClicked(true);
      } else {
        // Если кнопка "Submit" уже была нажата, переходим к следующему вопросу
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        // Сброс состояния выбранной опции и состояния нажатия на кнопку "Submit"
        setSelectedOption(null);
        setSubmitClicked(false);
      }
    } else {
      // Если пользователь не выбрал ответ, вы можете вывести сообщение или предпринять другие действия
      console.log("Выберите ответ перед переходом к следующему вопросу");
    }
  };

  return (
    <main className="main-container">
      {quizButtonsVisible && (
        <div className="quiz-buttons">
         {data.quizzes.map((quiz, index) => (
            <button 
               key={index} 
               className="quiz-button" 
               onClick={() => handleQuizSelection(quiz)}>
               <img src={quiz.icon} alt={quiz.title} />
               <h1 className='heading-xs'>{quiz.title}</h1>
            </button>
         ))}
        </div>
      )}
      {selectedQuiz && (
        <div className="selected-quiz">
          <h2>{selectedQuiz.questions[currentQuestionIndex].question}</h2>
          {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => (
            <button 
              key={index} 
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {!quizButtonsVisible && (
        <button onClick={handleNextQuestion}>{submitClicked ? "Next Question" : "Submit"}</button>
      )}
    </main>   
  );
}

export default App;
