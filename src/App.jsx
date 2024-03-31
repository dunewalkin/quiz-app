import React, { useState, useEffect } from 'react';
import './assets/styles/fonts.scss'
import './assets/styles/global.scss'
import Welcome from './components/Welcome/Welcome';
import MainMenu from './components/MainMenu/MainMenu';
import Questions from './components/Questions/Questions';
import Options from './components/Options/Options';
import Results from './components/Results/Results';
import ResultsSummary from './components/ ResultsSummary/ ResultsSummary';

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
   const [allResultDisplayed, setAllResultDisplayed] = useState(false);
   const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Состояние для подсчета правильных ответов

   const handleQuizSelection = (quiz) => {
      setSelectedQuiz(quiz);
      setCurrentQuestionIndex(0);
      setQuizButtonsVisible(false);
      setSelectedOption(null); // Сброс выбранной опции при выборе нового теста
      setSubmitClicked(false); // Сброс состояния нажатия на кнопку "Submit" при выборе нового теста
      setShowErrorMessage(false);
      setCorrectAnswersCount(0); // Сброс количества правильных ответов при выборе нового теста
   };

   const handleOptionSelect = (option) => {
      setSelectedOption(option);
   };

   const handleNextQuestion = () => {
      if (selectedOption !== null) {

         if (!resultDisplayed) {
            setResultDisplayed(true);

            if (selectedOption === selectedQuiz.questions[currentQuestionIndex].answer) {
               setCorrectAnswersCount(prevCount => prevCount + 1); // Увеличить количество правильных ответов
               console.log(correctAnswersCount);
            }  
         }

         if (currentQuestionIndex === selectedQuiz.questions.length - 1) {
            setAllResultDisplayed(true); // Показать результаты теста после ответа на последний вопрос
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
            <Questions 
               selectedQuiz={selectedQuiz}
               currentQuestionIndex={currentQuestionIndex}
               allResultDisplayed={allResultDisplayed}
            />

         {allResultDisplayed && (
            <Results />
         )}
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
               allResultDisplayed={allResultDisplayed}
            />

         {allResultDisplayed && (
            <ResultsSummary
            selectedQuiz={selectedQuiz}
            correctAnswersCount={correctAnswersCount}
            />
         )}
      </div>
           
    </main>   
  );
}

export default App;



