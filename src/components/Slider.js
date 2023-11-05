import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const MySlider = ({ timezone }) => {
  const minutesInDay = 24 * 60;
  const [time, setTime] = useState('12:00 AM');

  const handleSliderChange = (value) => {

    const hours = Math.floor(value / 60) % 12 || 12;
    const minutes = value % 60;
    const amPm = Math.floor(value / 60) < 12 ? 'AM' : 'PM';
    const formattedTime = `${hours}:${String(minutes).padStart(2, '0')} ${amPm}`;

    setTime(formattedTime);
  };

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <h1>{timezone}</h1>
      <Slider
        min={0}
        max={minutesInDay - 1} 
        step={1} 
        defaultValue={0} 
        vertical={false}
        handleStyle={{ borderColor: 'blue' }}
        trackStyle={[{ backgroundColor: 'blue' }]}
        onChange={handleSliderChange}
      />
      <div style={{ textAlign: 'center' }}>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default MySlider;
