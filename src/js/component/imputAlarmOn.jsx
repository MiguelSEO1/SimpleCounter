import React, { useState, useEffect } from "react";

const ImputAlarmOn = ({
  newAlarm,
  setNewAlarm,
  timer,
  setIsAlarmOn,
  setIsRunning,
  setRegressive,
}) => {
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);
  const [alert4, setAlert4] = useState(false);
  const regex = /^0+/;

  useEffect(() => {
    console.log(timer, "BBBB");
    if (newAlarm.includes(timer.toString())) {
      setIsAlarmOn(true);
      setIsRunning(false);
      setRegressive(false);
    }
  }, [timer]);

  return (
    <div className="text-center mt-5 mb-3">
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
          El valor no puede tener ceros al inicio (por ejemplo, 01, 001, etc.).
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
  );
};

export default ImputAlarmOn;
