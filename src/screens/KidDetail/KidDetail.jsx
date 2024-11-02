import React, { useEffect, useState } from "react";
import { SolidInterfaceMenu1 } from "../../icons/SolidInterfaceMenu1";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import line2 from "../../../static/img/line-2.svg";
import line4 from "../../../static/img/line-4.svg";
import rectanglee from "../../../static/img/rectangle-2-copy.svg";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const KidDetail = () => {
  const navigate = useNavigate();

  //응모페이지 리다이렉트
  const handleDrawButtonClick = () => {
    navigate("/draw");
  };

  const handleTextClick = () => {
    navigate("/main_page"); // 메인 페이지로 리다이렉트
  };

  // "유캐포" 버튼 클릭 핸들러 추가
  const handleYukaepoClick = () => {
    navigate("/add_book"); // add_book 페이지로 리다이렉트
  };

  // KidDetail 컴포넌트 내에 추가
  const handleTestPageClick = () => {
    navigate("/test_page"); // test-page로 리다이렉트
  };

  const handleProfileClick = () => {
    navigate('/kid_detail');
  };
  
  const handleDeletePersonalityClick = async () => {
    const kidId = localStorage.getItem("kidId");
  
    if (kidId) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/v1/kids/${kidId}/personalities`
        );
        console.log("삭제 성공:", response.data); // 삭제 성공 응답 확인
        // 성공적으로 삭제된 후 필요한 동작 추가 (예: 상태 업데이트, 알림 표시 등)
      } catch (error) {
        console.error("MBTI 내역 삭제 중 오류 발생:", error);
        if (error.response) {
          console.error("오류 응답 데이터:", error.response.data); // 에러 응답 확인
        }
      }
    } else {
      console.warn("kidId not found in local storage.");
    }
  };

  const [kidProfileImageUrl, setKidProfileUrl] = useState("");
  const [kidName, setKidName] = useState("");
  const [personalityHistory, setPersonalityHistory] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 변수 추가

  useEffect(() => {
    // Retrieve profile image, name, and kidId from local storage
    const profileImage = localStorage.getItem("kidProfileImageUrl");
    const name = localStorage.getItem("kidName");
    const kidId = localStorage.getItem("kidId");

    if (profileImage) setKidProfileUrl(profileImage);
    if (name) setKidName(name);

    const fetchData = async () => {
      if (kidId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/kids/${kidId}/personalityHistories`
          );
          console.log("API 응답:", response.data); // 응답 확인
          if (response.data && response.data.histories) {
            setPersonalityHistory(response.data.histories);
          } else {
            console.error("Received data is null or undefined.");
          }
        } catch (error) {
          console.error("Error fetching personality history:", error);
          if (error.response) {
            console.error("Error response data:", error.response.data); // 에러 응답 확인
          }
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("kidId not found in local storage.");
        setLoading(false);
      }
    };
    

    fetchData();
  }, []);

  const getGraphData = () => {
    if (!personalityHistory || personalityHistory.length === 0) {
      return {
        labels: ["E-I", "S-N", "T-F", "J-P"],
        datasets: [],
      };
    }
  
    const now = new Date();
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(now.getMonth() - 5);
  
    const recentData = personalityHistory.filter((data) => {
      const createdAt = new Date(data.createdAt);
      return createdAt >= fiveMonthsAgo && createdAt <= now;
    });
  
    // 각 달에 대한 색상 정의 (불투명)
    const monthColors = [
      "#f79393", 
      "#ff7b00", 
      "#ffe500",
      "#6cff85",
      "#2eaafc",
    ];
  
    // MBTI 요소에 대한 데이터 초기화
    const datasets = recentData.map((data, index) => ({
      label: new Date(data.createdAt).toLocaleDateString("ko-KR", { month: "long" }),
      data: [data.ei, data.sn, data.tf, data.jp],
      borderColor: monthColors[index % monthColors.length], // 색상 설정
      backgroundColor: monthColors[index % monthColors.length], // 색상 설정
      fill: false,
    }));
  
    return {
      labels: ["E-I", "S-N", "T-F", "J-P"],
      datasets,
    };
  };
  
  // 로딩 중 화면 표시
  if (loading) {
    return <div className="loading">로딩중...</div>; // 로딩중 메시지 추가
  }

  return (
    <div className="kid-detail">
      <div className="div">
        <div className="overlap">
          <div className="rectangle" />
          <div className="frame">
            <div className="frame-2">
              <img className="logo-white" alt="Logo white" src="/img/logo-white-1.svg" />
              <div className="frame-3">
                <img className="yellow-bear" alt="Yellow bear" src="/img/yellow-bear.png" />
                <img className="three-animals" alt="Three animals" src="/img/three-animals.png" />
              </div>
            </div>
            <div className="frame-4">
            <div className="frame-24">
                  <div className="text-wrapper-10" onClick={handleTextClick} style={{ cursor: 'pointer' }}>
                    책 고를까?
                  </div>
                </div>
                <div className="frame-24">
                  <div className="text-wrapper-10" onClick={handleYukaepoClick} style={{ cursor: 'pointer' }}>
                    유캐포~
                  </div>
                </div>
                <div className="frame-24">
                  <button className="text-wrapper-10" onClick={handleDrawButtonClick}>
                    선물 응모해!
                  </button>
                </div>
                <div className="profile-picture-container" onClick={handleProfileClick}>
                <img className="kid-profile" alt="아이 프로필" src={kidProfileImageUrl} style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="overlap-group">
          <div className="frame-6">
            <div className="frame-7">
              <div className="frame-8">
              <div className="text-wrapper-2" onClick={handleTestPageClick} style={{ cursor: 'pointer' }}>
                MBTI 검사
              </div>
              </div>
              <div className="frame-9">
              <div className="frame-9">
                  <div className="text-wrapper-3" onClick={handleDeletePersonalityClick} style={{ cursor: 'pointer' }}>
                    MBTI 내역 삭제
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-10">
              <div className="frame-11">
                <img className="boy-blue" alt="Boy blue" src={kidProfileImageUrl} />
                <div className="name-field-wrapper">
                  <div className="name-field"><div className="text-wrapper-4">{kidName}</div></div>
                </div>
              </div>
              <div className="image-container">
                <img className="imgggg" alt="Rectangle" src={rectanglee} />
                <div className="graph-container">
                  <Line
                    data={getGraphData()}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: false }, // 범례를 숨깁니다.
                        title: { display: false }, // 제목을 숨깁니다.
                      },
                      scales: {
                        y: {
                          min: 0,
                          max: 100,
                          title: {
                            display: false, // y축 제목 숨김
                          },
                        },
                        x: {
                          title: {
                            display: false, // x축 제목 숨김
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="ellipse" />
            <div className="frame-12">
              <div className="frame-13">
                <div className="text-wrapper-5">{new Date(personalityHistory[personalityHistory.length - 1].createdAt).getMonth() + 1}월</div>
              </div>
              <div className="frame-14">
                <div className="text-wrapper-5">{new Date(personalityHistory[personalityHistory.length - 2].createdAt).getMonth() + 1}월</div>
              </div>
              <div className="frame-15">
                <div className="text-wrapper-5">{new Date(personalityHistory[personalityHistory.length - 3].createdAt).getMonth() + 1}월</div>
              </div>
              <div className="frame-16">
                <div className="text-wrapper-5">{new Date(personalityHistory[personalityHistory.length - 4].createdAt).getMonth() + 1}월</div>
              </div>
              <div className="frame-17">
                <div className="text-wrapper-5">{new Date(personalityHistory[personalityHistory.length - 5].createdAt).getMonth() + 1}월</div>
              </div>
            </div>
          </div>
          <img className="line" alt="Line" src={line2} />
          <img className="line-2" alt="Line" src={line2} />
          <img className="line-3" alt="Line" src={line2} />
          <img className="line-4" alt="Line" src={line4} />
        </div>
      </div>
    </div>
  );
};