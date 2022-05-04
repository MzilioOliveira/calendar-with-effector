import React from "react";
import { useStore } from "effector-react";
import * as dateFns from "date-fns";

import {
  DaySlot,
  DaySlotNumber,
  ReminderSlot,
  ReminderTitle,
  Row
} from "../Calendar.styled";
import {
  $reminders,
  $selectedMonth,
  loadReminder,
  modalOpenChanged,
  selectedDateChanged
} from "../../../store";

const Days = () => {
  const month = useStore($selectedMonth);
  const reminders = useStore($reminders);

  const onClickSlot = (date) => {
    selectedDateChanged(date);
    modalOpenChanged(true);
  };

  const onClickReminderSlot = (e, reminder) => {
    e.stopPropagation();
    loadReminder(reminder);
    modalOpenChanged(true);
  };

  const renderDays = () => {
    const currentMonth = new Date()
    const monthStart = dateFns.startOfMonth(month);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <DaySlot
            key={day}
            isSameMonth={dateFns.isSameMonth(day, monthStart)}
            isSameDay={dateFns.isSameDay(day, month) && dateFns.isSameMonth(day, currentMonth) }
            onClick={() => onClickSlot(cloneDay)}
          >
            <DaySlotNumber isSameMonth={dateFns.isSameMonth(day, monthStart)}>
              {dateFns.format(day, "d")}
            </DaySlotNumber>
            {reminders
              .filter((reminder) => dateFns.isSameDay(cloneDay, reminder.date))
              .sort((a, b) => a.date - b.date)
              .map((reminder) => (
                <ReminderSlot
                  key={reminder.id}
                  onClick={(e) => onClickReminderSlot(e, reminder)}
                >
                  <ReminderTitle>{`${dateFns.format(
                    reminder.date,
                    "HH:mm"
                  )} - ${reminder.description}`}</ReminderTitle>
                </ReminderSlot>
              ))}
          </DaySlot>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(<Row key={day}>{days}</Row>);
      days = [];
    }

    return <div>{rows}</div>;
  };

  return renderDays();
};

export default Days;
