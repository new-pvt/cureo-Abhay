import React from "react";
import Illistration from "../Illustration/Illistration";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
    return (
        <div className="overflow-x-hidden relative min-h-[calc(100vh-108px)] mt-[40px] px-4 md:px-[50px]">
            <div className="md:w-[55%] h-1/3 blur-[120px] absolute bottom-0 right-0 left-0 mx-auto -z-10 bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>
            <div className=" flex  flex-col gap-4 w-full md:w-[39.33%]"></div>
            <Illistration src="/ErrorIllistrations/404.svg" imgClassName="h-[236px] md:w-[544px] md:h-[322px]" errorTitle="OOPS! Looks like you’re Lost!" subText="Let’s get back you to home, while we solve the problem!" button={{content:"Home", onclick:()=>navigate('/')}}/>
          
        </div>
    );
};

export default NotFound;
