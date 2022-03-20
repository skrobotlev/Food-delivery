import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import CalendarModal from "./calendar-stuff/calendar-modal";
import FullScreenDialog, { dialogOpen } from "./calendar-stuff/calendar-calories-dialog";
import { useStore } from "@/hooks/useStore";
import { useAllDailyRecipes } from "@/hooks/useDailyRecipes";
import { auth } from "@/firebase";
import "./calendar.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
// import Arrow2LeftIcon from "@mui/icons-material/Arr";
import DoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";
import DoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const CalendarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CalendarCalc = () => {
  const [openWindow, setOpenWindow] = useState(false);
  const { uid } = auth.currentUser;

  const { caloriesStore } = useStore();
  const [dayData, setDay] = useState({
    date: new Date(),
  });
  const { date } = dayData;

  const onChange = (date) => {
    setDay({ date });
    caloriesStore.actualDay = `${date.getFullYear().toString()}/${date.getMonth().toString()}/${date.getDate().toString()}`;
    return useAllDailyRecipes(uid, caloriesStore.actualDay, caloriesStore);
  };
  const setOpen = (bool) => setOpenWindow(bool);
  return (
    <CalendarDiv>
      <Calendar
        className={["react-calendar"]}
        onChange={onChange}
        // showNavigation={false}
        next2Label={<DoubleArrowRight fontSize="large" />}
        prev2Label={<DoubleArrowLeft fontSize="large" />}
        nextLabel={<ArrowForwardIosIcon />}
        prevLabel={<ArrowBackIosNewIcon />}
        showNeighboringMonth={true}
        // tileContent={({ date, view }) => {
        //   // console.log(view, "viewww");
        //   return view === "month" && date.getDay() === 6 ? <p>Суббота ;)</p> : null;
        // }}
        // onActiveDateChange={() => console.log("activDchan")}
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
