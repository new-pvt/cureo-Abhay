import React, { useState, useRef } from 'react';
// import './style.css'; // Import your CSS file

function TextCarouseLogic() {
  const [isDragging, setIsDragging] = useState(false);
  const tabsBoxRef = useRef(null);

  const handleIcons = (scrollVal, leftIconRef, rightIconRef) => {
    const maxScrollableWidth =
      tabsBoxRef.current.scrollWidth - tabsBoxRef.current.clientWidth;
    if (leftIconRef && rightIconRef) {
      leftIconRef.style.display = scrollVal <= 0 ? 'none' : 'flex';
      rightIconRef.style.display =
        maxScrollableWidth - scrollVal <= 1 ? 'none' : 'flex';
    }
  };

  const handleIconClick = (scrollVal, iconId) => {
    if (iconId === 'left' || iconId === 'right') {
      tabsBoxRef.current.scrollLeft +=
        iconId === 'left' ? -340 : 340;
      handleIcons(tabsBoxRef.current.scrollLeft, null, null);
    }
  };

  const handleTabClick = (tab) => {
    tabsBoxRef.current.querySelector('.active').classList.remove('active');
    tab.classList.add('active');
  };

  const dragging = (e) => {
    if (!isDragging) return;
    tabsBoxRef.current.classList.add('dragging');
    tabsBoxRef.current.scrollLeft -= e.movementX;
    handleIcons(tabsBoxRef.current.scrollLeft, null, null);
  };

  const dragStop = () => {
    setIsDragging(false);
    tabsBoxRef.current.classList.remove('dragging');
  };

  return (
    <div className="wrapper">
      <div className="icon">
        <i
          id="left"
          className="fa-solid fa-angle-left"
          onClick={(e) => handleIconClick(e, 'left')}
        ></i>
      </div>
      <ul
        className="tabs-box"
        ref={tabsBoxRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={dragging}
        onMouseUp={dragStop}
      >
        <li className="tab">Coding</li>
        {/* Add other li elements here */}
      </ul>
      <div className="icon">
        <i
          id="right"
          className="fa-solid fa-angle-right"
          onClick={(e) => handleIconClick(e, 'right')}
        ></i>
      </div>
    </div>
  );
}

export default TextCarouseLogic;
