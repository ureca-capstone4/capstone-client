import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

import * as logo from '../../../static/img/logo_src.js';
import * as icon from '../../../static/img/icon_src.js';
import * as shape from '../../../static/img/shape_src.js';

const TOTAL_QUESTIONS = 12;

export const TestPage = () => {
  const [questionList, setQuestionList] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [mbtiResult,  setMbtiResult] = useState("");
  const [personalityResult,  setPersonalityResult] = useState([]);
  const [kidId, setKidId] = useState("");

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

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

  useEffect(() => {
    const kidId = localStorage.getItem("kidId");
    if (kidId) {
      setKidId(kidId);
    }
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
  
  useEffect(() => {
    console.log("MBTI리절트가 업데이트되었습니다:", mbtiResult);
    if (mbtiResult) {
        handleKidsPersonality(); // mbtiResult가 업데이트되면 API 호출
        handleSaveClickNavigate();
    }
}, [mbtiResult]);

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
  }).join('');

  setMbtiResult(result); // 상태 업데이트
  setPersonalityResult(mbtiScores);
  console.log("그냥 리절트:", result); // mbtiResult 대신 result를 출력
};

  const handleKidsPersonality = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8080/api/v1/kids/${kidId}/personalities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      
        body: JSON.stringify({
          ei: personalityResult.EI,
          sn: personalityResult.SN,
          tf: personalityResult.TF,
          jp: personalityResult.JP,
          mbti: mbtiResult
        }),
      });

      if (!response.ok) throw new Error("자녀 성향 업데이트 요청에 실패했습니다.");
      console.log("성향을 업데이트 했습니다.");
    } catch (error) {
      console.error("자녀 성향 업데이트 중 오류 발생:", error);
    }
  };

  const handleSaveClickNavigate = () => { 
    navigate("/kid_detail");
  };
  
  return (
    <div className="test-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <img className="polygon-4" alt="Polygon1" src={shape.triangle_yellow_left} />
            <img className="polygon-3" alt="Polygon4" src={shape.triangle_yellow_right_small}/>
            <img className="polygon-3" alt="Polygon4" src={shape.triangle_yellow_right_small}/>
            <div className="ellipse-4" />
            <div className="ellipse-5" />
            <img className="polygon-2" alt="Polygon3" src={shape.triangle_orange}/>
            <div className="ellipse-2" />
            <div className="ellipse-3" />
            <img className="img" alt="Polygon2" src={shape.triangle_yellow_left} />
            <div className="ellipse-6" />
            <img className="polygon" alt="Polygon2" src={shape.triangle_yellow_right_big} />
            <div className="ellipse" />
            
            <div className="frame">
              <div className="frame-2">
                <img
                  className="logo-white"
                  alt="Logo white"
                  src={logo.idle_world_white}
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
                  src={icon.save}
                />
              </button>
            </div>
          </div>
          <img
            className="go-back"
            alt="Go back"
            src={icon.go_back}
            onClick={handleGoBack}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      </div>
  );
};
