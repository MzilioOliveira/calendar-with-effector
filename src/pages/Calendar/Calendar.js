import React from "react";

import { Container } from "./Calendar.styled";
import Header from "./components/Header";
import Days from "./components/Days";
import Reminder from "./components/Reminder";
import Month from "./components/Month";

const Calendar = () => {
  return (
    <div className="container">
      <Month />
      <Container>
        <Header />
        <Days />
        <Reminder />
      </Container>
    </div>
  );
};

export default Calendar;
