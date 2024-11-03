import { useNavigate } from "react-router-dom";
import * as profile from '../static/img/profile_src.js';

const profileImages = [
    profile.boy_blue,
    profile.boy_green,
    profile.girl_pink,
    profile.girl_purple,
];

const getRandomProfileImage = () => {
    return profileImages[Math.floor(Math.random() * profileImages.length)];
};

export const useHandler = () => {
    const navigate = useNavigate();

    // 헤더 아이콘 
    const handleHeaderIcon1 = () => {
        navigate("/main_page");
    };

    const handleHeaderIcon2 = () => {
        navigate("/add_book");
    };

    const handleHeaderIcon3 = () => {
        navigate("/draw");
    };

    // 헤더 프로필
    const handleProfileClick = () => {
        navigate('/kid_detail');
    };

    // 기타 아이콘
    const handleGoBack = () => {
        navigate("/login_screen");
    };

    const handleCreateProfile = () => {
        navigate("/create_profile");
    };


    return {
        handleHeaderIcon1,
        handleHeaderIcon2,
        handleHeaderIcon3,
        handleProfileClick,
        handleGoBack,
        handleCreateProfile,
        getRandomProfileImage,
    };
};