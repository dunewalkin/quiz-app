import React, { useState, useEffect } from 'react';
import './assets/styles/fonts.scss'
import './assets/styles/global.scss'
import Welcome from './components/Welcome/Welcome';
import MainMenu from './components/MainMenu/MainMenu';
import Questions from './components/Questions/Questions';
import Options from './components/Options/Options';

function App() {
   const [selectedQuiz, setSelectedQuiz] = useState(null);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [quizButtonsVisible, setQuizButtonsVisible] = useState(true);
   const [selectedOption, setSelectedOption] = useState(null); // Состояние для хранения выбранной пользователем опции
   const [submitClicked, setSubmitClicked] = useState(false); // Состояние для отслеживания нажатия на кнопку "Submit"
   const [showErrorMessage, setShowErrorMessage] = useState(false);
   const [buttonsDisabled, setButtonsDisabled] = useState(false);
   const [resultDisplayed, setResultDisplayed] = useState(false);
   const [correctOptionIndex, setCorrectOptionIndex] = useState(null);

   const handleQuizSelection = (quiz) => {
      setSelectedQuiz(quiz);
      setCurrentQuestionIndex(0);
      setQuizButtonsVisible(false);
      setSelectedOption(null); // Сброс выбранной опции при выборе нового теста
      setSubmitClicked(false); // Сброс состояния нажатия на кнопку "Submit" при выборе нового теста
      setShowErrorMessage(false);
   };

   const handleOptionSelect = (option) => {
      setSelectedOption(option);
   };

   const handleNextQuestion = () => {
      // Проверка, выбрана ли какая-либо опция перед переходом к следующему вопросу
      if (selectedOption !== null) {
         // Проверка ответа и вывод сообщения в консоль
         // if (selectedOption === selectedQuiz.questions[currentQuestionIndex].answer) {
         // console.log("Ответ правильный");
         // } else {
         // console.log("Ответ неправильный");
         // }

         if (!resultDisplayed) {
            setResultDisplayed(true);
         }
    
          setButtonsDisabled(true);

         // Если кнопка "Submit" еще не была нажата, меняем ее текст на "Next Question"
         if (!submitClicked) {
         setSubmitClicked(true);
         } else {
         // Если кнопка "Submit" уже была нажата, переходим к следующему вопросу
         setCurrentQuestionIndex(prevIndex => prevIndex + 1);
         // Сброс состояния выбранной опции и состояния нажатия на кнопку "Submit"
         setButtonsDisabled(false);
         setSelectedOption(null);
         setSubmitClicked(false);
         setResultDisplayed(false);
         setCorrectOptionIndex(null);
         }
         setShowErrorMessage(false);
      } else {
         // Если пользователь не выбрал ответ, вы можете вывести сообщение или предпринять другие действия
         setShowErrorMessage(true);
         console.log("Выберите ответ перед переходом к следующему вопросу");
      }
   };

   useEffect(() => {
      if (resultDisplayed) {
        const correctAnswer = selectedQuiz.questions[currentQuestionIndex].answer;
        const newCorrectOptionIndex = selectedQuiz.questions[currentQuestionIndex].options.findIndex(option => option === correctAnswer);
        setCorrectOptionIndex(newCorrectOptionIndex);
      }
    }, [resultDisplayed, currentQuestionIndex, selectedQuiz]);


  return (
    <main className="main-container">
       
      <div className='left-side'>
      {quizButtonsVisible && (
         <Welcome />
      )}
         <Questions selectedQuiz={selectedQuiz} currentQuestionIndex={currentQuestionIndex}/>
      </div>

      <div className='right-side'>
         {quizButtonsVisible && (
            <MainMenu handleQuizSelection={handleQuizSelection}/>
         )}

         <Options 
         selectedQuiz={selectedQuiz} 
         currentQuestionIndex={currentQuestionIndex} 
         handleNextQuestion={handleNextQuestion}
         quizButtonsVisible={quizButtonsVisible}
         handleOptionSelect={handleOptionSelect}
         submitClicked={submitClicked}
         showErrorMessage={showErrorMessage}
         selectedOption={selectedOption}
         buttonsDisabled={buttonsDisabled}
         resultDisplayed={resultDisplayed}
         correctOptionIndex={correctOptionIndex}
         />
      </div>
           
    </main>   
  );
}

export default App;



