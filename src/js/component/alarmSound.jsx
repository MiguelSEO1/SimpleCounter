import React, { useRef, useEffect } from "react";
import alarm from "../../sound/alarm.mp3";

const AlarmSound = ({ isAlarmOn, setIsAlarmOn, setAlarmOff }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isAlarmOn) {
      if (!audioRef.current) {
        audioRef.current = new Audio(alarm);
        audioRef.current.loop = true;
        audioRef.current.play();
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isAlarmOn]);

  return (
    <button
      className={`${
        isAlarmOn ? "btn btn-danger mx-2 mb-5" : "btn btn-dark mx-2 mb-5"
      }`}
      onClick={() => {
        setIsAlarmOn(!isAlarmOn);
        setAlarmOff(false)
      }}
    >
      {isAlarmOn ? "STOP ALARM" : "START ALARM"}
    </button>
  );
};

export default AlarmSound;
