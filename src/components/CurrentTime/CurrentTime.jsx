import "./CurrentTime.scss";
import { useEffect, useState, useContext } from "react";
import { CloseTimeContext } from "../../provider/CloseTimeProvider";
function CurrentTime() {
  const { closeTime } = useContext(CloseTimeContext);
  const [times, setTimes] = useState(new Date());
  const [close, setClose] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimes(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let greeting = "Good morning";
  if (times.getHours() > 11 && times.getHours() < 18)
    greeting = "Good afternoon";
  if (times.getHours() >= 18) greeting = "Good evening";

  let date =
    day[times.getDay()] +
    ", " +
    month[times.getMonth()] +
    " " +
    times.getDate();

  let minute =
    times.getMinutes() < 10 ? "0" + times.getMinutes() : times.getMinutes();
  let time =
    times.getHours() <= 12
      ? times.getHours() + ":" + minute + " AM"
      : times.getHours() - 12 + ":" + minute + " PM";

  return (
    closeTime && (
      <div className="time">
        <div className="close" onClick={() => setClose(!closeTime)}></div>
        <div className="currentTime">
          <div className="greeting">{greeting}</div>
          <div className="hour">{time}</div>
        </div>
        <div className="date">It's {date}</div>
        <p className="context">
          "Don’t cry because it’s over, smile because it happened"
        </p>
      </div>
    )
  );
}

export default CurrentTime;
