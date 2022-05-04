import { render, fireEvent, screen } from "@testing-library/react";
import ReactModal from "react-modal";

import Calendar from "../../Calendar/Calendar";
import Reminder from "./Reminder";
import { modalOpenChanged } from "../../../store";

ReactModal.setAppElement(document.createElement("div"));

test("Reminder component", () => {
  modalOpenChanged(true);
  render(<Reminder />);

  const inputDate = screen.getByTestId("date");
  fireEvent.change(inputDate, { target: { value: "2021-11-10T23:59" } });

  const inputDescription = screen.getByPlaceholderText("description");
  fireEvent.change(inputDescription, { target: { value: "some time" } });

  const inputCity = screen.getByPlaceholderText("city");
  fireEvent.change(inputCity, { target: { value: "dois vizinhos" } });

  const reminderForm = screen.getByTestId("reminder-form");
  expect(reminderForm).toHaveFormValues({
    date: "2021-11-10T23:59",
    description: "some time",
    city: "dois vizinhos",
  });

  fireEvent.click(screen.getByText(/CREATE/i));
});

test("result of Reminder component", () => {
  render(<Calendar />);
  expect(screen.getByText(/some time/i)).toHaveTextContent("some time");
});
