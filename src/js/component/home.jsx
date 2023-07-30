import React, { useState, useEffect, useRef } from "react";

//include sound and images into your bundle
import alarm from "../../sound/alarm.mp3";
import fondoPared from "../../img/fondoPared.jpg";

//create your first component
const Home = () => {
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const audioRef = useRef(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [regressive, setRegressive] = useState(false);
  const [newAlarm, setNewAlarm] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);
  const [alert4, setAlert4] = useState(false);
  const regex = /^0+/;
  const img = {
    backgroundImage: `URl(${fondoPared})`,
  };

  useEffect(() => {
    let timeOut;
    if (isRunning) {
      timeOut = setTimeout(() => {
        setTimer((x) => x + 1);
      }, 1000);
    }

    let timeOut2;
    if (regressive && timer > 0) {
      timeOut2 = setTimeout(() => {
        setTimer((x) => x - 1);
      }, 1000);
    }

    if (isAlarmOn) {
      // Si no hay una instancia de Audio, la creamos
      if (!audioRef.current) {
        audioRef.current = new Audio(alarm);
        audioRef.current.loop = true;
        console.log(audioRef.current);
      }
      // Reproducir el sonido de la alarma
      audioRef.current.play();
    }

    // Asegurarse de detener el sonido cuando el componente se desmonte
    return () => {
      clearTimeout(timeOut);
      clearTimeout(timeOut2);
      console.log("Componente @@@@");
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null; // Limpiamos la referencia cuando se desmonte el componente
        console.log("Componente desmontado");
      }
    };
  }, [isAlarmOn, isRunning, regressive, timer]);

  useEffect(() => {
    if (newAlarm.includes(timer.toString())) {
      console.log(timer);
      setIsAlarmOn(true);
      setIsRunning(false);
      setRegressive(false);
    }
  }, [timer]);

  return (
    <div
      className="imgFondo min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={img}
    >
      <div className="text-center mt-5">
        {alert ? (
          <p className=" Alerta alert alert-warning">
            Por Favor, introduzca un número entre 1 y 999.999
          </p>
        ) : null}
        {alert2 ? (
          <p className="Alerta alert alert-warning">
            Por Favor, no introduzca campos vacíos
          </p>
        ) : null}
        {alert3 ? (
          <p className=" Alerta alert alert-warning">
            Por Favor, no introduzca campos repetidos
          </p>
        ) : null}
        {alert4 ? (
          <p className=" Alerta alert alert-warning">
            El valor no puede tener ceros al inicio (por ejemplo, 01, 001,
            etc.).
          </p>
        ) : null}

        <label className="mb-3 fw-semibold fs-1" htmlFor="inputPassword2">
          Introduzca Alarma
        </label>
        <input
          onKeyUp={(e) => {
            console.log(e.target.value);
            if (
              e.key == "Enter" &&
              e.target.value.trim() != " " &&
              !newAlarm.includes(e.target.value.trim()) &&
              e.target.value <= 999999 &&
              e.target.value >= 1 &&
              e.target.value.toString().length <= 6 &&
              !regex.test(e.target.value)
            ) {
              setNewAlarm([...newAlarm, e.target.value]);
              e.target.value = "";
              setAlert(false);
              setAlert2(false);
              setAlert3(false);
              setAlert4(false);
            } else {
              if (
                (e.target.value.toString().length > 6 && e.key == "Enter") ||
                (e.key == "Enter" &&
                  (e.target.value == "0" ||
                    e.target.value == "00" ||
                    e.target.value == "000" ||
                    e.target.value == "0000" ||
                    e.target.value == "00000" ||
                    e.target.value == "000000"))
              ) {
                setAlert(true);
                setAlert2(false);
                setAlert3(false);
                setAlert4(false);
              } else if (e.target.value.trim() == "" && e.key == "Enter") {
                setAlert2(true);
                setAlert(false);
                setAlert3(false);
                setAlert4(false);
              } else if (
                e.key == "Enter" &&
                newAlarm.includes(e.target.value.trim())
              ) {
                setAlert2(false);
                setAlert(false);
                setAlert3(true);
                setAlert4(false);
              } else if (e.key == "Enter" && regex.test(e.target.value)) {
                setAlert(false);
                setAlert2(false);
                setAlert3(false);
                setAlert4(true);
              }
            }
          }}
          type="number"
          className=" form-control rounded text-center mb-3 "
          id="alarm"
          inputMode="numeric"
          placeholder="Introduzca Alarma"
          min="0"
          max="999999"
        />
        {newAlarm.map((e, index) => (
          <div key={index} className=" mostrar row">
            <p className=" alerta alert alert-warning col-12 d-flex justify-content-evenly">
              <b>
                {index + 1}.- Alarm: {e}
              </b>

              <i
                className=" ocultar p-1 fa-solid fa-trash"
                onClick={() => {
                  setNewAlarm(newAlarm.filter((e, i) => i != index));
                }}
              ></i>
            </p>
          </div>
        ))}
      </div>

      <div className="p-5 px-md-5 counter d-flex bg-dark align-items-center my-4 rounded">
        <div className="row row-cols-lg-12 row-cols-md-12 g-5">
          <div className="col">
            <div className="time p-5 text-light rounded">
              <i className="fa-solid fa-clock fa-4x"></i>
            </div>
          </div>
          <div className="col">
            <div className="time p-5 fs-1 fw-semibold text-light rounded">
              {Math.floor(timer / 100000) % 10}
            </div>
          </div>
          <div className="col">
            <div className="time p-5 fs-1 fw-semibold text-light rounded">
              {Math.floor(timer / 10000) % 10}
            </div>
          </div>
          <div className="col">
            <div className="time p-5 fs-1 fw-semibold text-light rounded">
              {Math.floor(timer / 1000) % 10}
            </div>
          </div>
          <div className="col">
            <div className="time p-5 fs-1 fw-semibold text-light rounded">
              {Math.floor(timer / 100) % 10}
            </div>
          </div>
          <div className="col">
            <div className="time p-5 fs-1 fw-semibold text-light rounded">
              {Math.floor(timer / 10) % 10}
            </div>
          </div>
          <div className="col">
            <div className="time p-5 fs-1 fw-semibold text-light rounded">
              {Math.floor(timer / 1) % 10}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <button
          className="btn btn-dark mx-2"
          onClick={() => {
            setIsAlarmOn(!isAlarmOn);
          }}
        >
          {`${isAlarmOn ? "STOP ALARM" : "START ALARM"}`}
        </button>
        <button
          className={`${
            isRunning ? "btn btn-danger mx-2" : "btn btn-primary mx-2"
          }`}
          onClick={() => {
            setIsRunning(!isRunning);
            setRegressive(false);
            setIsAlarmOn(false);
          }}
        >
          {`${isRunning ? "STOP" : "START"}`}
        </button>
        <button
          className="btn btn-warning mx-2"
          onClick={() => {
            setTimer(0);
            setIsRunning(false);
            setRegressive(false);
            setIsAlarmOn(false);
          }}
        >
          RESET
        </button>
        <button
          className={`${
            regressive && timer > 0
              ? "btn btn-danger mx-2"
              : "btn btn-info mx-2"
          }`}
          onClick={() => {
            setRegressive(!regressive);
            setIsRunning(false);
            setIsAlarmOn(false);
          }}
        >
          {regressive && timer > 0 ? "STOP" : "ATRÁS"}
        </button>
      </div>
    </div>
  );
};

export default Home;
