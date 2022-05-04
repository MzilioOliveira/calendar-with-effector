import React from "react";
import { useStore } from "effector-react";
import * as dateFns from "date-fns";

import { MonthContainer, NextIcon, PreviousIcon } from "../Calendar.styled";
import { $selectedMonth, selectedMonthChanged } from "../../../store";

const Month = () => {
  const selectedMonth = useStore($selectedMonth);

  const goToPrevMonth = () =>
    selectedMonthChanged(dateFns.subMonths(selectedMonth, 1));

  const goToNextMonth = () =>
    selectedMonthChanged(dateFns.addMonths(selectedMonth, 1));

  return (
    <MonthContainer>
      <PreviousIcon onClick={goToPrevMonth} />
      <h1>{dateFns.format(selectedMonth, "MMMM yyyy")}</h1>
      <NextIcon onClick={goToNextMonth} />
    </MonthContainer>
  );
};

export default Month;
