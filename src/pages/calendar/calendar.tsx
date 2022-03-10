import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Calendar from "react-calendar";
import styled from "styled-components";
import CalendarModal from "./calendar-stuff/calendar-modal";
import FullScreenDialog, { dialogOpen } from "./calendar-stuff/calendar-calories-dialog";
import { useStore } from "@/hooks/useStore";
import { useAllDailyRecipes } from "@/hooks/useDailyRecipes";
import { auth } from "@/firebase";

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
  const [currData, setCurrData] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openWindow, setOpenWindow] = useState(false);
  const { uid } = auth.currentUser;

  const { caloriesStore } = useStore();
  const [dayData, setDay] = useState({
    date: new Date(),
  });
  const { date } = dayData;

  // useEffect(() => {
  //   console.log(currData, "currData");
  //   console.log(dayData, "dayData");
  // }, [currData, dayData]);

  const onChange = (date) => {
    setDay({ date });
    setCurrData(`${date.getFullYear().toString()}/${date.getMonth().toString()}/${date.getDate().toString()}`);
    caloriesStore.actualDay = `${date.getFullYear().toString()}/${date.getMonth().toString()}/${date.getDate().toString()}`;
    return useAllDailyRecipes(uid, caloriesStore.actualDay, caloriesStore);
  };
  const setOpen = (bool) => setOpenWindow(bool);
  return (
    <CalendarDiv>
      <Calendar
        onChange={onChange}
        // tileContent={({ date, view }) => {
        //   // console.log(view, "viewww");
        //   return view === "month" && date.getDay() === 6 ? <p>Суббота ;)</p> : null;
        // }}
        onActiveDateChange={() => console.log("activDchan")}
        value={date}
        onClickDay={() => {
          dialogOpen(setOpen);
        }}
      />
      <FullScreenDialog openWindow={openWindow} closeWindow={setOpenWindow} />
    </CalendarDiv>
  );
};

export default CalendarCalc;
