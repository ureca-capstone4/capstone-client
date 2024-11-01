import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Goback1 } from "../../icons/Goback1";
import "./style.css";

const TOTAL_QUESTIONS = 12;
const TOTAL_TIME = 60;
export const TestPage = () => {
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [question, setQuestion] = useState({});
  const [answerOptions, setAnswerOptions] = useState([]);
  const [mbti, setMbti] = useState([]);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [answerList, setAnswerList] = useState([]);  
  // const navigate = useNavigate();
  
  const getQuestions = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch("http://localhost:8080/api/v1/personality/questions", {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`,  
        },
      });

      const data = await response.json();

      if(response.ok){
        alert("질문 가져오기 성공");
        // navigate("/login_screen");
      } else {
        alert("질문 가져오기 실패");
      }

    } catch (error) {
      console.error("질문 가져오는 과정에서 실패", error);
    }
  }

  // / 질문 목록을 받아오는 함수
  
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
          setQuestionList(data);
        } else {
          console.error("질문 목록을 가져오는 데 실패했습니다:", response.status);
        }
      } catch (error) {
        console.error("내부 문제로 질문 목록을 가져올 수 없습니다:", error);
      }
    };

    if (currentQuestionId <= TOTAL_QUESTIONS) {
      loadQuestionList();
    }
  }, [currentQuestionId]);

  const loadQuestionList = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch('http://localhost:8080/api/v1/personality/questions', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('questionsList', data); // 데이터 확인용 콘솔 출력
        setQuestionList(data);
      } else {
        console.error("질문 목록을 가져오는 데 실패했습니다:", response.status);
      }
    } catch (error) {
      console.error("내부 문제로 질문 목록을 가져올 수 없습니다:", error);
    }
  };

  // questionList가 업데이트된 후 질문을 로드
  useEffect(() => {
    if (questionList.length > 0 && currentQuestionId <= TOTAL_QUESTIONS) {
      loadQuestion();
    }
  }, [questionList, currentQuestionId]);

  const loadQuestion = () => {
    const questionData = questionList[currentQuestionId - 1];
    if (questionData) {
      setQuestion(questionData);
      setAnswerOptions([
        { text: questionData.answer1, value: questionData.value },
        { text: questionData.answer2, value: questionData.value },
      ]);
    }
  };

  // 진행률 및 남은 시간 업데이트
  useEffect(() => {
    const newProgress = ((currentQuestionId - 1) / TOTAL_QUESTIONS) * 100;
    setProgress(newProgress);

    const elapsedTime =
      ((currentQuestionId - 1) / TOTAL_QUESTIONS) * TOTAL_TIME;
    const remainingTime = TOTAL_TIME - elapsedTime;

    if (remainingTime <= 5) {
      setTimeLeft(`완료까지 ${Math.max(remainingTime, 0)}초 남았어요!`);
    } else {
      setTimeLeft(`완료까지 ${Math.round(remainingTime)}초 남았어요!`);
    }
  }, [currentQuestionId]);

  // 답변 선택 시 처리 함수
  const handleAnswerSelect = async (value) => {
    setMbti((prevMbti) => {
      const updatedMbti = [...prevMbti, value];

      if (currentQuestionId === TOTAL_QUESTIONS) {
        const calculateMBTI = () => {
          const countOccurrences = (arr, target) =>
            arr.filter((item) => item === target).length;

          const E_count = countOccurrences(updatedMbti, 'E');
          const I_count = countOccurrences(updatedMbti, 'I');
          const dominantEI = E_count > I_count ? 'E' : 'I';

          const T_count = countOccurrences(updatedMbti, 'T');
          const F_count = countOccurrences(updatedMbti, 'F');
          const dominantTF = T_count > F_count ? 'T' : 'F';

          const P_count = countOccurrences(updatedMbti, 'P');
          const J_count = countOccurrences(updatedMbti, 'J');
          const dominantPJ = P_count > J_count ? 'P' : 'J';

          const dominantSN = updatedMbti.includes('S') ? 'S' : 'N';

          return `${dominantEI}${dominantSN}${dominantTF}${dominantPJ}`;
        };

        const mbtiResult = calculateMBTI();

        setTimeout(() => {
          updateUser({ ...userData, mbti: mbtiResult });
          navigate(`/result/${mbtiResult.toLowerCase()}`);
        }, 0);

        return updatedMbti;
      }

      return updatedMbti;
    });

    setAnswerList((prevAnswers) => [
      ...prevAnswers,
      { questionId: currentQuestionId, selectedAnswer: value },
    ]);

    setCurrentQuestionId((prevId) => prevId + 1);
  };


  
  return (
    // <div>
    //   <h2>{question.question}</h2>
    //   {answerOptions.map((option, index) => (
    //     <button key={index} onClick={() => handleAnswerSelect(option.value)}>
    //       {option.text}
    //     </button>
    //   ))}
    //   <p>진행률: {progress}%</p>
    //   <p>{timeLeft}</p>
    // </div>
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

                <div className="question">
                  <div className="frame-3">
                    <div className="name-field">
                      <div className="text-wrapper">
                        1번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="question">
                  <div className="frame-3">
                    <div className="name-field">
                      <div className="text-wrapper">
                        2번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="question">
                  <div className="frame-3">
                    <div className="name-field">
                      <div className="text-wrapper">
                        3번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="question">
                  <div className="frame-3">
                    <div className="name-field">
                      <div className="text-wrapper">
                        4번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="question">
                  <div className="frame-3">
                    <div className="name-field">
                      <div className="text-wrapper">
                        5번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="question">
                  <div className="frame-3">
                    <div className="name-field">
                      <div className="text-wrapper">
                        6번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="question">
                  <div className="frame-3">
                    <div className="name-field">
                      <div className="text-wrapper">
                        7번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="question">
                  <div className="frame-3">
                    <div className="name-field">
                      <div className="text-wrapper">
                        8번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="question">
                  <div className="frame-3">
                    <div className="div-wrapper">
                      <div className="text-wrapper">
                        9번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="question">
                  <div className="frame-3">
                    <div className="name-field">
                      <div className="text-wrapper">
                        10번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="question">
                  <div className="frame-3">
                    <div className="name-field">
                      <div className="text-wrapper">
                        11번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="question">
                  <div className="frame-3">
                    <div className="name-field">
                      <div className="text-wrapper">
                        12번 질문이 들어갈 칸이에요
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="birthdate-field">
                        <div className="text-wrapper-2">응</div>
                      </div>

                      <div className="gender-field">
                        <div className="text-wrapper-3">아니</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className='save-button' onClick={getQuestions}>
                <img
                  className="save-icon"
                  alt="Save icon"
                  src="/img/saveicon.svg"
                />
              </button>
            </div>
          </div>
          <Goback1 className="goback-1" />
        </div>
      </div>
      </div>
  );
};
