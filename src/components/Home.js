import React, { useState } from 'react';
import Slider from './Slider';

function Home() {
  const [commonTime, setCommonTime] = useState('12:00');
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <div>
      <Slider timezone="UTC" commonTime={commonTime} offset="+5:30" setCommonTime={setCommonTime} sliderValue={sliderValue} setSliderValue={setSliderValue} />
      <Slider timezone="UTC" commonTime={commonTime} offset="+2:30" setCommonTime={setCommonTime} sliderValue={sliderValue} setSliderValue={setSliderValue} />
      <Slider timezone="UTC" commonTime={commonTime} offset="+3:30" setCommonTime={setCommonTime} sliderValue={sliderValue} setSliderValue={setSliderValue} />
    </div>
  );
}

export default Home;
