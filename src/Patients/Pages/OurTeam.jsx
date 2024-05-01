import React, { memo, useCallback, useState } from "react";
import Calender from "../../Common/Components/Calender/Calender";

const OurTeam = () => {
    const [date, setDate] = useState("");
    const [showCalender, setShowCalender] = useState(false);
    const handleDate = useCallback(
        (val) => {
            setDate(val);
            setShowCalender(false);
        },
        [date]
    );
    return (
        <div className="min-h-[calc(100vh-108px)]">
            <input onChange={()=>null} onFocus={()=>setShowCalender(true)} value={date} type="text" />
            {showCalender && <Calender callback={handleDate} />}
        </div>
    );
};

export default memo(OurTeam);
