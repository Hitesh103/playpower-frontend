import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../style/slider.css";

const MySlider = ({
  timezone,
  commonTime,
  offset,
  setCommonTime,
  sliderValue,
  setSliderValue,
}) => {
  function minutesToAMPM(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60) % 12 || 12;
    const minutes = totalMinutes % 60;
    const amPm = Math.floor(totalMinutes / 60) < 12 ? "AM" : "PM";
    const formattedTime = `${hours}:${String(minutes).padStart(
      2,
      "0"
    )} ${amPm}`;
    return formattedTime;
  }

  function addMinutesWithOffset(minutes, offset) {
    // Split the offset string to get the offset hours and minutes
    const offsetParts = offset.match(/([-+])(\d+):(\d+)/);
    if (!offsetParts) {
      // Invalid offset format
      return null;
    }
  
    const offsetSign = offsetParts[1] === "-" ? -1 : 1;
    const offsetHours = parseInt(offsetParts[2]);
    const offsetMinutes = parseInt(offsetParts[3]);
  
    // Calculate the total minutes after adding the offset
    const totalMinutes = minutes + offsetSign * (offsetHours * 60 + offsetMinutes);
  
    // Ensure the total minutes are within a day (0 to 1440 minutes)
    return (totalMinutes + 1440) % 1440;
  }

  function calculateTimeWithOffset(mainTimeInMinutes, offset) {
    // Split the offset string to get the offset hours and minutes
    const offsetParts = offset.match(/([-+])(\d+):(\d+)/);
    if (!offsetParts) {
      // Invalid offset format
      return "Invalid Offset";
    }
  
    const offsetSign = offsetParts[1] === "-" ? -1 : 1;
    const offsetHours = parseInt(offsetParts[2]);
    const offsetMinutes = parseInt(offsetParts[3]);
  
    // Calculate the adjusted time in minutes
    let adjustedTimeInMinutes = mainTimeInMinutes + offsetSign * (offsetHours * 60 + offsetMinutes);
  
    // Ensure the adjusted time is within a day (0 to 1440 minutes)
    adjustedTimeInMinutes = (adjustedTimeInMinutes + 1440) % 1440;
  
    // Convert the adjusted time to AM/PM format
    const hours = Math.floor(adjustedTimeInMinutes / 60) % 12 || 12;
    const minutes = adjustedTimeInMinutes % 60;
    const amPm = Math.floor(adjustedTimeInMinutes / 60) < 12 ? "AM" : "PM";
    const formattedTime = `${hours}:${String(minutes).padStart(2, "0")} ${amPm}`;
  
    return formattedTime;
  }

  let val = "12:00 AM";

  const minutesInDay = 24 * 60;
  const [displayedTime, setDisplayedTime] = useState("12:00 AM");

  const handleSliderChange = (value) => {
    const hours = Math.floor(value / 60) % 12 || 12;
    const minutes = value % 60;
    const amPm = Math.floor(value / 60) < 12 ? "AM" : "PM";
    const formattedTime = `${hours}:${String(minutes).padStart(
      2,
      "0"
    )} ${amPm}`;
    setSliderValue(value);
    setDisplayedTime(formattedTime);

    // Update the commonTime using the prop received from the parent component
    setCommonTime(value);
  };

  useEffect(() => {
    if (offset) {
      // Split the offset string (e.g., "+5:30") to get the offset hours and minutes
      const offsetParts = offset.match(/([-+])(\d+):(\d+)/);
      const offsetSign = offsetParts[1] === "-" ? -1 : 1;
      const offsetHours = parseInt(offsetParts[2]);
      const offsetMinutes = parseInt(offsetParts[3]);

      // Calculate the initial value in minutes
      let initialValue = 0;

      if (offsetSign === -1) {
        initialValue = (12 - offsetHours) * 60 - offsetMinutes;
      } else {
        initialValue = offsetHours * 60 + offsetMinutes;
      }

      // Set the slider value
      setSliderValue(initialValue);
      let val = minutesToAMPM(initialValue);
      setCommonTime(val);
    }
  }, [offset, setCommonTime]);

  return (
    <div className="main-container">
      <div className="info">
        <h2>{timezone}</h2>
        <p>{calculateTimeWithOffset(sliderValue,offset)}</p>
      </div>
      <Slider
        min={0}
        max={minutesInDay - 1}
        step={1}
        defaultValue={sliderValue}
        value={addMinutesWithOffset(sliderValue, offset)}
        vertical={false}
        handleStyle={{ borderColor: "orange" }}
        trackStyle={[{ backgroundColor: "orange" }]}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default MySlider;
