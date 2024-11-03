import React, { useEffect, useState } from "react";
import { SolidInterfaceMenu1 } from "../../icons/SolidInterfaceMenu1";
import { useNavigate } from "react-router-dom";
import { useHandler } from '../../handler.js';
import "./style.css";
import * as logo from '../../../static/img/logo_src.js';

export const AddBook = () => {
  const navigate = useNavigate();
  const {
    handleHeaderIcon1,
    handleHeaderIcon2,
    handleHeaderIcon3,
  } = useHandler();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publisher: "",
    story: "",
    summary: "",
    recommendAge: "",
    bookImageUrl: "https://www.nlcy.go.kr/multiLanguageStory/2010/Nlcy_016_001/Nlcy_016_001.png"
  });

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [editableBookId, setEditableBookId] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/books/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...bookData, recommendAge: parseInt(bookData.recommendAge, 10) }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`"${data.title}" 이(가) 성공적으로 저장되었습니다.`);
        resetForm();
      } else {
        alert("책 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 요청에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/books/all");
        const data = await response.json();
        console.log(data); // 응답 데이터 확인
        setBooks(data.map(book => ({
          ...book,
          recommendAge: book.recommendAge != null ? parseInt(book.recommendAge, 10) : ''
        })));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const resetForm = () => {
    setBookData({
      title: "",
      author: "",
      publisher: "",
      story: "",
      summary: "",
      recommendAge: "",
      bookImageUrl: "https://www.nlcy.go.kr/multiLanguageStory/2010/Nlcy_016_001/Nlcy_016_001.png"
    });
  };

  const enableEdit = (book) => {
    setEditableBookId(book.bookId);
    //setBookData({ ...book });
  };

  const saveEdit = async (bookId) => {
    setLoading(true);
    try {
      const bookToUpdate = books.find(b => b.bookId === bookId);
  
  const response = await fetch(`http://localhost:8080/api/v1/books/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: bookToUpdate.title,
      summary : bookData.summary,
      story : bookData.story,
      author: bookToUpdate.author,
      publisher: bookToUpdate.publisher,
      recommendedAge: bookToUpdate.recommendAge, // recommendedAge를 정수로 변환
      bookImageUrl: bookToUpdate.bookImageUrl // 필요시 다른 필드를 추가
    }),
      });

      if (response.ok) {
        alert("책이 성공적으로 수정되었습니다.");
        resetForm();
        setEditableBookId(null);
      } else {
        alert("책 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 요청에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (bookId) => {
    const confirmDelete = window.confirm("정말로 이 책을 삭제하시겠습니까?");
    if (confirmDelete) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/v1/books/${bookId}`, { method: "DELETE" });

        if (response.ok) {
          alert("책이 성공적으로 삭제되었습니다.");
          setBooks(books.filter(book => book.bookId !== bookId));
        } else {
          alert("책 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("서버 요청에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  return (
    <div className="add-book">
      {loading && <div className="loading-popup">책 분석중...</div>}
      <div className="div">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="frame">
            <div className="frame-2">
              <img className="logo-white" alt="Logo white" src={logo.idle_world_white} />
              <div className="frame-3">
                <img className="yellow-bear" alt="Yellow bear" src={logo.character_left} />
                <img className="three-animals" alt="Three animals" src={logo.character_right} />
              </div>
            </div>
            <div className="frame-4">
              <div className="frame-5">
                <div className="frame-24" onClick={handleHeaderIcon1} style={{ cursor: 'pointer' }}>
                  <div className="text-wrapper-10">책 고를까?</div>
                </div>
                <div className="frame-24" onClick={handleHeaderIcon2} style={{ cursor: 'pointer' }}>
                  <div className="text-wrapper-10">유캐포~</div>
                </div>
                <div className="frame-24">
                  <button className="text-wrapper-10" onClick={handleHeaderIcon3}>선물 응모해!</button>
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
                  { label: "줄거리", name: "summary", placeholder: "줄거리 입력란" },
                  { label: "내용", name: "story", placeholder: "내용 입력란" },
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
          </div>

          <div className="books-table">
            <h2 className="books-management-title">전체 책 관리</h2>
            <div className="table-header">
              <div>ISBN</div>
              <div>제목</div>
              <div>저자</div>
              <div>출판사</div>
              <div>권장연령</div>
              <div></div>
            </div>
            {books.map((book) => (
              <div key={book.bookId} className="book-row">
                <span>{book.bookId}</span>
                {['title', 'author', 'publisher', 'recommendAge'].map((field, index) => (
                  <div key={field}>
                    {editableBookId === book.bookId ? (
                      <input
                      type={field === 'recommendedAge' ? 'number' : 'text'}
                      value={book[field]}
                      onChange={(e) => {
                        const value = field === 'recommendedAge' ? parseInt(e.target.value, 10) : e.target.value;
                        const updatedBooks = books.map((b) =>
                          b.bookId === book.bookId ? { ...b, [field]: value } : b
                        );
                        setBooks(updatedBooks);
                      }}
                    />
                    ) : (
                      <span onClick={() => enableEdit(book)}>{book[field]}</span>
                    )}
                  </div>
                ))}
                <div className="buttons-container">
                  <button onClick={() => saveEdit(book.bookId)}>수정</button>
                  <button onClick={() => deleteBook(book.bookId)}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};