import React, { useEffect, useState } from 'react';
import "./style.css";

const TOTAL_QUESTIONS = 12;
export const TestPage = () => {
  const [questionList, setQuestionList] = useState([]);
  

  const [mbtiScores, setMbtiScores] = useState({
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  });
  
  useEffect(() => {
    const loadQuestionList = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await fetch(`http://localhost:8080/api/v1/personality/questions`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('questionsList', data); // 데이터 확인용 콘솔 출력
          setQuestionList(data.questions);
        } else {
          console.error("질문 목록을 가져오는 데 실패했습니다:", response.status);
        }
      } catch (error) {
        console.error("내부 문제로 질문 목록을 가져올 수 없습니다:", error);
      }
    };    
    loadQuestionList();
  }, []);

  const loadQuestion = () => {
    const questionData = questionList[currentQuestionId - 1];
    if (questionData) {
      setQuestion(questionData);
      setTitle(questionData.question);
      setAnswerOptions([
        {
          text: questionData.answer1,
          value: questionData.value,
        },
        {
          text: questionData.answer2,
          value: questionData.value,
        },
      ]);
    }
  };

  // return(
  //   <div className="question-list">
  //     {questionList.map((question) => (
  //       <div key={question.id} className="question-item">
  //         <h3>{question.question}</h3>
  //         <div className="answer-buttons">
  //           <button onClick={() => handleAnswer(question.id, question.answer1)}>
  //             {question.answer1}
  //           </button>
  //           <button onClick={() => handleAnswer(question.id, question.answer2)}>
  //             {question.answer2}
  //           </button>
  //         </div>
  //       </div>
  //     ))}
  // </div>
  // );

  return (
    <div className="test-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <img className="polygon" alt="Polygon" src="/img/polygon-3-4.svg" />

            <div className="ellipse" />

            <div className="div" />

            <img className="img" alt="Polygon" src="/img/polygon-3-1.svg" />

            <img
              className="polygon-2"
              alt="Polygon"
              src="/img/polygon-2-3.svg"
            />

            <div className="ellipse-2" />

            <div className="ellipse-3" />

            <img
              className="polygon-3"
              alt="Polygon"
              src="/img/polygon-1-4.svg"
            />

            <div className="ellipse-4" />

            <div className="ellipse-5" />

            <img
              className="polygon-4"
              alt="Polygon"
              src="/img/polygon-1-2.svg"
            />

            <div className="frame">
              <div className="frame-2">
                <img
                  className="logo-white"
                  alt="Logo white"
                  src="/img/logo-white-1-2.svg"
                />
                {questionList.map((question) => (
                  <div key={question.id} className="question-item">
                    <div className="question">
                      <div className="frame-3">
                        <div className="name-field">
                          <div className="text-wrapper">
                            {question.question}
                          </div>
                        </div>
                        <div className="frame-4">
                          <div className="birthdate-field">
                            <button onClick={() => handleAnswer(question.id, question.answer1)}>
                              <div className="text-wrapper-2">{question.answer1}</div>
                            </button> 
                          </div>
                          <div className="gender-field">
                          <button onClick={() => handleAnswer(question.id, question.answer2)}>
                              <div className="text-wrapper-2">{question.answer2}</div>
                            </button> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className='save-button'>
                <img
                  className="save-icon"
                  alt="Save icon"
                  src="/img/saveicon.svg"
                />
              </button>
            </div>
          </div>
          {/* <Goback1 className="goback-1" /> */}
        </div>
      </div>
      </div>
  );
};
