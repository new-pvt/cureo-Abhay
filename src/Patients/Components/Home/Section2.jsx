import React, { memo } from "react";
import "./Style/section1.css";

const Section2 = () => {
    const imgData = [
        "/Home/Homepage-hero img-1.png",
        "/Home/Homepage-hero-2.png",
        "/Home/Homepage-hero-3.png",
    ];
    return (
        <div className=" relative  -mt-[110px] flex md:justify-center gap-2.5 md:pb-[223px] px-4 py-4 md:px-[50px] overflow-auto md:overflow-visible">
            <div className="w-full h-full blur-[120px] absolute bottom-0 -z-20 bg-gradient-to-r from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>
            {imgData.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt="img"
                    className="animation w-[371.32px] h-[263.86px] md:w-[387px] md:h-[275px]"
                />
            ))}
        </div>
    );
};

export default memo(Section2);
