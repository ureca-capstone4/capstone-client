import React, { useState } from "react";
import { SolidInterfaceMenu1 } from "../../icons/SolidInterfaceMenu1";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const AddBook = () => {
  const navigate = useNavigate();
  
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

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publisher: "",
    story: "",
    summary: "",
    recommendedAge: "",
    bookImageUrl: "https://www.nlcy.go.kr/multiLanguageStory/2010/Nlcy_016_001/Nlcy_016_001.png" // 기본 링크 설정
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/books/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: bookData.title,
          story: bookData.story,
          summary: bookData.summary,
          author: bookData.author,
          publisher: bookData.publisher,
          recommendedAge: parseInt(bookData.recommendedAge, 10),
          bookImageUrl: bookData.bookImageUrl
        }),
      });

      if (response.ok) {
        alert("책이 성공적으로 등록되었습니다!");
        setBookData({
          title: "",
          author: "",
          publisher: "",
          story: "",
          summary: "",
          recommendedAge: "",
          bookImageUrl: "https://www.nlcy.go.kr/multiLanguageStory/2010/Nlcy_016_001/Nlcy_016_001.png" // 기본 링크 재설정
        });
      } else {
        alert("책 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 요청에 실패했습니다.");
    }
  };

  return (
    <div className="add-book">
      <div className="div">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="frame">
            <div className="frame-2">
              <img
                className="logo-white"
                alt="Logo white"
                src="/img/logo-white-1-3.svg"
              />
              <div className="frame-3">
                <img
                  className="yellow-bear"
                  alt="Yellow bear"
                  src="/img/yellow-bear.png"
                />
                <img
                  className="three-animals"
                  alt="Three animals"
                  src="/img/three-animals.png"
                />
              </div>
            </div>
            <div className="frame-4">
              <div className="frame-5">
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
              </div>
              <SolidInterfaceMenu1 className="solid-interface-menu-1" />
            </div>
          </div>
        </div>

        <div className="frame-6">
          <div className="frame-7">
             
            <div className="frame-wrapper">
              <div className="frame-8">
                {[
                  { label: "제목", name: "title", placeholder: "제목 입력란" },
                  { label: "저자", name: "author", placeholder: "저자 입력란" },
                  { label: "출판사", name: "publisher", placeholder: "출판사 입력란" },
                  { label: "줄거리", name: "story", placeholder: "줄거리 입력란" },
                  { label: "내용", name: "summary", placeholder: "내용 입력란" },
                  { label: "연령대", name: "recommendedAge", placeholder: "연령대 입력란" }
                ].map(({ label, name, placeholder }) => (
                  <div className="frame-9" key={name}>
                    <div className="text-wrapper-2">{label}</div>
                    <div className="rectangle-2" />
                    <input
                      type="text"
                      name={name}
                      placeholder={placeholder}
                      className="text-wrapper-3"
                      value={bookData[name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </div>
              <div className="view" onClick={handleSubmit}>
                <div className="text-wrapper-6">책 등록</div>
              </div>
            {/* <img className="img" alt="Rectangle" src="/img/rectangle-2.svg" /> */}
          </div>
          
        </div>
      </div>
    </div>
  );
};