import React, { memo, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton"; 
import { LinkText, P5, TextButton } from "../../../Common/Components/Text/Textt"
import { useSelector } from "react-redux";
import Avatar from "../../../Common/Components/Avatar/Avatar"; 
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose"; 

const MobileNav = ({ data, logoutUser, setMenu }) => {
    const { pathname } = useLocation();
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    const clickAwayToClose = () => setMenu(false);

    const ref = useClickAwayToClose(clickAwayToClose);

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    return (
        <div className="fixed flex md:hidden justify-center items-end h-screen inset-0 z-40 bg-c21 px-4">
            <div
                ref={ref}
                className="flex flex-col items-center relative my-4 py-4 bg-c2 w-full rounded-[13px]"
            >
                {isLoggedIn && (
                    <div>
                        <Avatar
                            src={
                                user?.imgurl
                                    ? user?.imgurl
                                    : "/Navbar/human.png"
                            }
                            className={"w-[56px] h-[56px] mx-auto"}
                        />
                        <P5
                            content={user?.name}
                            className={"text-center my-[6px] text-[16px]"}
                        />
                    </div>
                )}
                {data.map((item, i) => (
                    <LinkText
                        key={i}
                        to={item.pathname}
                        onclick={() => setMenu(false)}
                        content={item.content}
                        className={` ${isLoggedIn && i === 0 && "border-t"} border-b py-3 w-full text-center border-c27 ${item.pathname == pathname ? "text-c1" : "text-c20"} text-[16px]`}
                    />
                ))}
                {isLoggedIn && (
                    <TextButton
                        content="Logout"
                        onclick={logoutUser}
                        className={`border-b py-3 w-full text-center border-c27 text-c20 text-[16px]`}
                    />
                )}
                {!isLoggedIn && (
                    <div className="flex w-full gap-2.5 mt-4 px-2">
                        <PrimaryButton
                            content={"Sign In"}
                            className={`bg-c3 font-f2 w-full`}
                            h={"45px"}
                            bg={"c1"}
                            color={"white"}
                            radius={"44px"}
                            // disabled={!signInInfo.password}
                        />
                        <PrimaryButton
                            content={"Sign Up"}
                            className={`bg-c1 font-f2 w-full`}
                            h={"45px"}
                            bg={"c1"}
                            color={"white"}
                            radius={"44px"}
                            // disabled={!signInInfo.password}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(MobileNav);
