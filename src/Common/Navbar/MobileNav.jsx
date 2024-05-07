import React, { memo, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import { LinkText, P5, TextButton } from "../Components/Text/Textt";
import { useSelector } from "react-redux";
import Avatar from "../Components/Avatar/Avatar";
import useClickAwayToClose from "../../Utils/Hooks/useClickAwayToClose";

const MobileNav = ({
    data,
    logoutUser,
    setMenu,
    cardContent,
    handleAuthClick,
}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [authCard, setAuthCard] = useState(false);

    const clickAwayToClose = () => setMenu(false);

    const ref = useClickAwayToClose(clickAwayToClose);

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    return (
        <div className="fixed flex md:hidden justify-center items-end h-[100dvh] inset-0 z-40 bg-c21 px-4">
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
                            onclick={()=>{navigate('/patient/edit-profile'); setMenu(false)}}
                            avatar="Edit"
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
                    <>
                        {authCard && (
                            <div className="w-full flex flex-col bg-white  rounded-[5px] ">
                                {cardContent.map((items, i) => (
                                    <React.Fragment key={i}>
                                        <div className=" flex justify-between items-center my-3 mx-4 px-8">
                                            <p className="font-f2 font-w1 leading-[15.89px] text-[0.813rem]	">
                                                {items.signInAs}{" "}
                                            </p>
                                            <div className="">
                                                {items.options.map(
                                                    (option, index) => (
                                                        <button
                                                            onClick={() => {
                                                                handleAuthClick(
                                                                    option
                                                                );
                                                                setAuthCard(
                                                                    false
                                                                );
                                                                setMenu(false);
                                                            }}
                                                            key={index}
                                                            className={`mr-[10px] ${index === 0 && "border-b-2 border-dashed border-[#108ED6]"} text-c14 font-f2 font-w1 text-[0.813rem] leading-[15.89px]`}
                                                        >
                                                            {option.text}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <hr className="border border-c27" />
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                        <div className="flex w-full gap-2.5 mt-4 px-2">
                            <PrimaryButton
                                content={"Sign In"}
                                onclick={() =>
                                    setAuthCard((prevVal) => !prevVal)
                                }
                                className={`bg-c3 font-f2 w-full`}
                                h={"45px"}
                                bg={"c1"}
                                color={"white"}
                                radius={"44px"}
                                // disabled={!signInInfo.password}
                            />
                            <PrimaryButton
                                content={"Sign Up"}
                                onclick={() =>
                                    setAuthCard((prevVal) => !prevVal)
                                }
                                className={`bg-c1 font-f2 w-full`}
                                h={"45px"}
                                bg={"c1"}
                                color={"white"}
                                radius={"44px"}
                                // disabled={!signInInfo.password}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default memo(MobileNav);
