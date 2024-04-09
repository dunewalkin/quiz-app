import React, { useState, useEffect } from 'react';
import './assets/styles/fonts.scss'
import './assets/styles/global.scss'
import './assets/styles/buttons.scss'
import Welcome from './components/Welcome/Welcome';
import MainMenu from './components/MainMenu/MainMenu';
import Questions from './components/Questions/Questions';
import Options from './components/Options/Options';
import Results from './components/Results/Results';
import ResultsSummary from './components/ ResultsSummary/ ResultsSummary';
import Header from './components/Header/Header';


function App() {
   const [selectedQuiz, setSelectedQuiz] = useState(null);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [quizButtonsVisible, setQuizButtonsVisible] = useState(true);
   const [selectedOption, setSelectedOption] = useState(null); 
   const [submitClicked, setSubmitClicked] = useState(false); 
   const [showErrorMessage, setShowErrorMessage] = useState(false);
   const [buttonsDisabled, setButtonsDisabled] = useState(false);
   const [resultDisplayed, setResultDisplayed] = useState(false);
   const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
   const [allResultDisplayed, setAllResultDisplayed] = useState(false);
   const [correctAnswersCount, setCorrectAnswersCount] = useState(0); 
   const [theme, setTheme] = useState(() => {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'light'; 
    }); 

   const backgroundClasses = {
      "HTML": "html-background",
      "CSS": "css-background",
      "JavaScript": "js-background",
      "Accessibility": "access-background"
   };

   const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
   };

   useEffect(() => {
      document.body.className = theme;
      localStorage.setItem('theme', theme); 
   }, [theme]);

   useEffect(() => {
      const savedTheme = localStorage.getItem('theme'); 
      if (savedTheme) {
         setTheme(savedTheme); 
      }
   }, []);


   const handleQuizSelection = (quiz) => {
      setSelectedQuiz(quiz);
      setCurrentQuestionIndex(0);
      setQuizButtonsVisible(false);
      setSelectedOption(null); 
      setSubmitClicked(false); 
      setShowErrorMessage(false);
      setCorrectAnswersCount(0); 
   };

   const handleOptionSelect = (option) => {
      setSelectedOption(option);
   };

   const handleNextQuestion = () => {
      if (selectedOption !== null) {

         if (!resultDisplayed) {
            setResultDisplayed(true);

            if (selectedOption === selectedQuiz.questions[currentQuestionIndex].answer) {
               setCorrectAnswersCount(prevCount => prevCount + 1); 
               console.log(correctAnswersCount);
            }  
         }
    
         setButtonsDisabled(true);

         if (!submitClicked) {
         setSubmitClicked(true);
         } else {
         setCurrentQuestionIndex(prevIndex => prevIndex + 1);
         setButtonsDisabled(false);
         setSelectedOption(null);
         setSubmitClicked(false);
         setResultDisplayed(false);
         setCorrectOptionIndex(null);

         if (currentQuestionIndex === selectedQuiz.questions.length - 1) {
            setAllResultDisplayed(true); 
         }
         }
         setShowErrorMessage(false);
      } else {
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
   <main className="main-container" role="main">

      <Header 
         toggleTheme={toggleTheme} 
         theme={theme} 
         selectedQuiz={selectedQuiz}
         backgroundClasses={backgroundClasses}
         quizButtonsVisible={quizButtonsVisible}
         />
      

      <div className='main-wrapper'>
         <div className='first-section'>

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

            <div className='second-section'>
            {quizButtonsVisible && (
               <MainMenu 
                  handleQuizSelection={handleQuizSelection}
                  backgroundClasses={backgroundClasses}
               />
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
                  backgroundClasses={backgroundClasses}
               />
            )}
         </div>
      </div>

    </main>   
  );
}

export default App;