import React, { useEffect } from "react";

const Chronometer = ({
  timer,
  setTimer,
  isRunning,
  setIsRunning,
  regressive,
  setRegressive,
  setIsAlarmOn,
}) => {
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

    // Asegurarse de detener el sonido cuando el componente se desmonte
    return () => {
      clearTimeout(timeOut);
      clearTimeout(timeOut2);
      console.log("Componente @@@@");
    };
  }, [isRunning, regressive, timer]);

  return (
    <>
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
      <div className="mt-3 mb-4">
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
    </>
  );
};

export default Chronometer;
