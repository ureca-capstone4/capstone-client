import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const MainPage = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [kidProfileImageUrl, setKidProfileUrl] = useState("");
  const [kidId, setKidId] = useState(localStorage.getItem("kidId") || null); // 초기값 설정
  const [bookId, setBookId] = useState("");
  
  const navigate = useNavigate();

  // kidProfileImageUrl를 로컬에서 가져오기
  useEffect(() => {
    const profileImage = localStorage.getItem("kidProfileImageUrl");
    if (profileImage) {
      setKidProfileUrl(profileImage);
    }
  }, []);

  // kidId가 있을 때만 책 정보를 불러오는 함수
  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/books/recommendations?kidId=${kidId}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const booksToStore = data.slice(0, 10);
        setRecommendedBooks(booksToStore);
        localStorage.setItem("recommendedBooks", JSON.stringify(booksToStore));
      } catch (error) {
        console.error("Failed to fetch recommended books", error);
      }
    };

    if (kidId) {
      fetchRecommendedBooks();
    }
  }, [kidId]); // kidId가 변경될 때마다 호출

  const handleDrawButtonClick = () => {
    navigate("/draw");
  };

  const handleBookClick = (bookId) => {
    localStorage.setItem("bookId", bookId);
    navigate(`/book_detail`);
  };
  
  return (
    <div className="main-page">
      <div className="div-3">
        <div className="overlap-group-3">
          <div className="rectangle-4" />
          <div className="frame-19">
            <div className="frame-20">
              <img className="logo-white-2" alt="Logo white" src="/img/logo-white-1-3.svg" />
              <div className="frame-21">
                <img className="yellow-bear-3" alt="Yellow bear" src="/img/yellow-bear.png" />
                <img className="three-animals-3" alt="Three animals" src="/img/three-animals.png" />
              </div>
            </div>
            <div className="frame-22">
              <div className="frame-23">
                <div className="frame-24">
                  <div className="text-wrapper-10">유레카</div>
                </div>
                <div className="frame-24">
                  <div className="text-wrapper-10">유캐포</div>
                </div>
                <div className="frame-24">
                  <button className="text-wrapper-10" onClick={handleDrawButtonClick}>
                    선착순 응모
                  </button>
                </div>
              </div>
              <div className="profile-picture-container">
                <img
                  className="kid-profile"
                  alt="Kid Profile"
                  src={kidProfileImageUrl}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="frame-25">
          <div className="text-wrapper-11">오늘은 어떤 책을 읽어볼까?</div>
          <div className="frame-26">
            {recommendedBooks.slice(0, 5).map((book, index) => (
              <div className="frame-4" key={index} onClick={() => handleBookClick(book.bookId)}>
                <img className="outline-files-book" alt="Outline files book" src="/img/outline-files-book-mark-1.svg" />
                <img
                  className="overlay-book-image"
                  alt="Overlay book"
                  src={book.bookImageUrl}
                  style={{ position: "absolute", top: "10px", left: "10px", width: "60px", height: "90px" }}
                />
                <div className="text-wrapper-2">{book.title || "책 제목"}</div>
              </div>
            ))}
          </div>
          <div className="frame-26">
            {recommendedBooks.slice(5, 10).map((book, index) => (
              <div className="frame-4" key={index} onClick={() => handleBookClick(book.bookId)}>
                <img className="outline-files-book" alt="Outline files book" src="/img/outline-files-book-mark-1.svg" />
                <img
                  className="overlay-book-image"
                  alt="Overlay book"
                  src={book.bookImageUrl}
                  style={{ position: "absolute", top: "10px", left: "10px", width: "60px", height: "90px" }}
                />
                <div className="text-wrapper-2">{book.title || "책 제목"}</div>
              </div>
            ))}
          </div>
          

        </div>
      </div>
    </div>
  );
};