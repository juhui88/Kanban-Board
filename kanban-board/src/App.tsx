import React from "react";
import { useRecoilState} from "recoil";
import { hourSelector, minuteState } from "./atom";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState)
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinutesChange = (e:React.FormEvent<HTMLInputElement>) => {
    setMinutes(+e.currentTarget.value); 
    // string값을 number로 바꾸고 싶으면 앞에 +
    // input은 항상 string을 value로 반환함
  }
  const onHoursChange = (e:React.FormEvent<HTMLInputElement>) => {
    setHours(+e.currentTarget.value); 
  }
  return (
    <div>
      <input value = {minutes} onChange={onMinutesChange} type="number" placeholder="Minutes"/>
      <input value = {hours} onChange={onHoursChange} type="number" placeholder="Seconds"/>
    </div>
  );
}

export default App;
