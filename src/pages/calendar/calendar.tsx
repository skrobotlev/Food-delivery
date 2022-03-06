import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Calendar from "react-calendar";
import styled from "styled-components";
import CalendarModal from "./calendar-stuff/calendar-modal";
import FullScreenDialog, { dialogOpen } from "./calendar-stuff/calendar-calories-dialog";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const CalendarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarCalc = () => {
  const [currDay, setCurrDay] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openWindow, setOpenWindow] = useState(false);
  const [dayData, setDay] = useState({
    date: new Date(),
  });
  const { date } = dayData;

  useEffect(() => {
    console.log(currDay);
  }, [currDay]);

  const onChange = (date) => setDay({ date });
  const setOpen = (bool) => setOpenWindow(bool);
  // console.log(date.date.getDay(), "date");
  return (
    <CalendarDiv>
      <Calendar
        onChange={onChange}
        // onClickDay={ }
        showNeighboringMonth={true}
        // selectRange
        tileContent={({ date, view }) => {
          // console.log(view, "viewww");
          return view === "month" && date.getDay() === 6 ? <p>Суббота ;)</p> : null;
        }}
        value={date}
        onClickDay={() => {
          // console.log(date.getFullYear(), "date");
          // console.log(date.getMonth(), "month");
          // console.log(date.getDate(), "month");
          // console.log(date.toDateString(), "utcmonth");
          // console.log(date., "month");
          setCurrDay(`${date.getFullYear().toString()}/${date.getMonth().toString()}/${date.getDate().toString()}`);
          dialogOpen(setOpen);
        }}

      />
      <FullScreenDialog openWindow={openWindow} closeWindow={setOpenWindow} />
      {/* <CalendarModal openMod={openModal} closeMod={setOpenModal} /> */}
    </CalendarDiv>
  );
};

export default CalendarCalc;
