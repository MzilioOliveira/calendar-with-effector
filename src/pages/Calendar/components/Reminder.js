import React, { useRef } from "react";
import Modal from "react-modal";
import { useStore } from "effector-react";
import { v4 as uuidv4 } from "uuid";
import * as dateFns from "date-fns";

import {
  Button,
  ButtonsContainer,
  DeleteButton,
  Form,
  Input,
  ModalTitle
} from "../Calendar.styled";
import Weather from "./Weather";
import {
  $currentReminder,
  $modalOpen,
  $selectedDate,
  $selectedMonth,
  createReminder,
  deleteReminder,
  loadReminder,
  modalOpenChanged,
  updateReminder
} from "../../../store";

const Reminder = () => {
  const inputDateRef = useRef(null);
  const inputDescriptionRef = useRef(null);
  const inputCityRef = useRef(null);

  const selectedDate = useStore($selectedDate);
  const modalOpen = useStore($modalOpen);
  const reminder = useStore($currentReminder);
  const selectedMonth = useStore($selectedMonth);

  const monthStart = formatToInputDateTime(dateFns.startOfMonth(selectedMonth));
  const monthEnd = formatToInputDateTime(
    dateFns.endOfMonth(dateFns.startOfMonth(selectedMonth))
  );
  const hour = dateFns.format(selectedMonth, "HH:mm");
  const date = reminder?.date
    ? formatToInputDateTime(reminder.date)
    : dateFns.format(selectedDate, "yyyy-MM-dd") + "T" + hour;

  const getValues = () => ({
    date: dateFns.parseISO(inputDateRef.current.value),
    description: inputDescriptionRef.current.value,
    city: inputCityRef.current.value
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (reminder && reminder.id) {
      updateReminder({
        id: reminder.id,
        ...getValues()
      });
    } else {
      createReminder({
        id: uuidv4(),
        ...getValues()
      });
    }
    onRequestClose();
  };

  const onRequestClose = () => {
    modalOpenChanged(false);
    loadReminder(null);
  };

  const onDeleteReminder = () => {
    deleteReminder(reminder.id);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: !reminder ? 500 : 650,
          height: !reminder ? 400 : 550
        }
      }}
    >
      <ModalTitle>
        {reminder
          ? `${dateFns.format(reminder.date, "MMMM d")} - ${
              reminder.description
            }`
          : dateFns.format(selectedDate, "MMMM d")}
      </ModalTitle>
      <Form data-testid="reminder-form" onSubmit={onSubmit}>
        <div style={{ marginTop: '2em' }}>
          <Input
            data-testid="date"
            name="date"
            type="datetime-local"
            defaultValue={date}
            min={monthStart}
            max={monthEnd}
            required
            ref={inputDateRef}
          />
          <Input
            name="description"
            placeholder="description"
            maxLength={30}
            defaultValue={reminder?.description || ""}
            autoFocus={reminder ? false : true}
            required
            ref={inputDescriptionRef}
          />
          <Input
            name="city"
            placeholder="city"
            defaultValue={reminder?.city || ""}
            required
            ref={inputCityRef}
          />
        </div>
        {reminder && <Weather reminder={reminder} />}
        <ButtonsContainer style={{ justifyContent: !reminder && 'flex-end' }}>
          {reminder && (
            <DeleteButton onClick={onDeleteReminder}>delete</DeleteButton>
          )}
          <Button type="submit">{reminder ? "update" : "create"}</Button>
        </ButtonsContainer>
      </Form>
    </Modal>
  );
};

const formatToInputDateTime = (date) =>
  dateFns.format(date, "yyyy-MM-dd'T'HH:mm");

export default Reminder;
