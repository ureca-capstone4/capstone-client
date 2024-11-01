import React, { useEffect, useState } from 'react';
import "./style.css";

const TOTAL_QUESTIONS = 12;

export const TestPage = () => {
  const [questionList, setQuestionList] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [mbtiResult,  setMbtiResult] = useState([]);
  const [personalityResult,  setPersonalityResult] = useState([]);
  
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

  const handleAnswer = (questionId, answer, mbtiType, value) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: { answer, mbtiType, value }
    }));
  };

  const handleSave = () => {
    // 모든 질문에 답변했는지 확인하고 결과 계산
    if (Object.keys(selectedAnswers).length === questionList.length) {
      calculateMBTIResult(selectedAnswers);
    } else {
      alert("모든 질문에 답해주세요.");
    }
  };
  
  const calculateMBTIResult = (answers) => {
    const mbtiScores = {"EI": 50, "SN": 50, "TF": 50, "JP": 50};
  
    Object.values(answers).forEach(({answer, mbtiType, value}) => {
      if (answer === "네") {
        mbtiScores[mbtiType] += value; // "네"일 경우 value를 더함
      } else {
        mbtiScores[mbtiType] -= value; // "아니오"일 경우 value를 뺌
      }
    });
  
    const result = Object.entries(mbtiScores).map(([type, score]) => {
      return score >= 50 ? type[0] : type[1]; // 점수에 따라 MBTI 유형 결정
    }).join('');mbtiScores
  
    setMbtiResult(result);
    setPersonalityResult(mbtiScores);

    console.log("MBTI 결과:", result); // mbtiResult 대신 result를 출력

    // 여기에서 바로 POST로 API 




  };
  

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
                            {/* <button onClick={() => handleAnswer(question.id, question.answer1)}> */}
                            <button onClick={() => {handleAnswer(question.id, question.answer1, question.mbti, question.value);     console.log("클릭된 값:", question.id, question.answer1, question.mbti, question.value);
;}} className={selectedAnswers[question.id]?.answer === question.answer1 ? 'selected' : '' }>
                              <div className="text-wrapper-2">{question.answer1}</div>
                            </button> 
                          </div>
                          <div className="gender-field">
                            {/* <button onClick={() => handleAnswer(question.id, question.answer2)}> */}
                            <button onClick={() => handleAnswer(question.id, question.answer2, question.mbti, question.value)} className={selectedAnswers[question.id]?.answer === question.answer2 ? 'selected' : ''}>
                              <div className="text-wrapper-2">{question.answer2}</div>
                            </button> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className='save-button' onClick={handleSave}>
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
