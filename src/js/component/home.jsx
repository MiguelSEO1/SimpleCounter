import React, { useState } from "react";
import AlarmSound from "./alarmSound";
import Chronometer from "./chronometer";
import ImputAlarmOn from "./imputAlarmOn";

//include sound and images into your bundle
import fondoPared from "../../img/fondoPared.jpg";

//create your first component
const Home = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [regressive, setRegressive] = useState(false);
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [alarmOff, setAlarmOff] = useState([]);
  const [newAlarm, setNewAlarm] = useState([]);

  const img = {
    backgroundImage: `URl(${fondoPared})`,
  };

  return (
    <div
      className="imgFondo min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={img}
    >
      <ImputAlarmOn
        timer={timer}
        newAlarm={newAlarm}
        setNewAlarm={setNewAlarm}
        setIsAlarmOn={setIsAlarmOn}
        setIsRunning={setIsRunning}
        setRegressive={setRegressive}
      />
      <Chronometer
        timer={timer}
        setTimer={setTimer}
        isRunning={isRunning}
        regressive={regressive}
        setIsRunning={setIsRunning}
        setRegressive={setRegressive}
        setIsAlarmOn={setIsAlarmOn}
      />
      <AlarmSound setIsAlarmOn={setIsAlarmOn} isAlarmOn={isAlarmOn} />
    </div>
  );
};

export default Home;
