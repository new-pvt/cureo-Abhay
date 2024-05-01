import React from "react";
import Avatar from "../../Common/Components/Avatar/Avatar";
import { useSelector } from "react-redux";

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <header className="flex justify-between items-center p-4 md:px-[50px] md:pt-[34px]">
            <img
                onClick={() => navigate("/")}
                src="/Home/IMG_20240127_122502.png"
                alt="logo"
                className="w-[88px] h-[27px] md:w-[136px] md:h-[43px]"
            />
            {/* <Avatar
                src={user?.imgurl ? user.imgurl : "/EditProfile/Profile.png"}
                className={"w-[52px] h-[52px]"}
            /> */}
        </header>
    );
};

export default Header;
