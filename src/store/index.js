import { createEffect, createEvent, createStore } from "effector";

import { fetchWeatherByCity } from "../services/weather";

// events
export const selectedMonthChanged = createEvent();
export const selectedDateChanged = createEvent();
export const modalOpenChanged = createEvent();
export const createReminder = createEvent();
export const updateReminder = createEvent();
export const deleteReminder = createEvent();
export const loadReminder = createEvent();

// effects
export const fetchWeatherByCityFx = createEffect(async ({ city }) => {
  // some logic here if needs
  return fetchWeatherByCity({ city });
});

// stores
export const $selectedMonth = createStore(new Date()).on(
  selectedMonthChanged,
  (_, payload) => payload
);

export const $selectedDate = createStore(new Date()).on(
  selectedDateChanged,
  (_, payload) => payload
);

export const $modalOpen = createStore(false).on(
  modalOpenChanged,
  (_, payload) => payload
);

export const $reminders = createStore([])
  .on(createReminder, (state, payload) => [...state, payload])
  .on(updateReminder, (state, payload) => [...state.filter(reminder => reminder.id !== payload.id), payload])
  .on(deleteReminder, (state, id) =>
    state.filter((reminder) => reminder.id !== id)
  );

export const $currentReminder = createStore(null).on(
  loadReminder,
  (_, payload) => payload
);
