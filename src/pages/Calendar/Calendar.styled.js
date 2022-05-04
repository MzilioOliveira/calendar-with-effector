import styled, { css } from "styled-components";
import { FcNext, FcPrevious } from "react-icons/fc";

export const Container = styled.div`
  * {
    margin: 0;
  }
  border-left: 1px solid rgb(0, 0, 0, 0.2);
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(85, 85, 255);
  height: 3em;
`;

export const DayLabel = styled.span`
  flex-grow: 1;
  flex-basis: 0;
  color: white;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

export const DaySlot = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  min-height: 10em;
  border-right: 1px solid rgb(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  background-color: ${(props) => props.isSameDay && "#CCFFFF"};
  pointer-events: ${(props) => !props.isSameMonth && "none"};
`;

export const DaySlotNumber = styled.div`
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  color: transparent;
  text-shadow: ${(props) =>
    !props.isSameMonth ? "0 0 0 #ccc" : "0 0 0 black"};
  &:focus {
    outline: none;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
`;

export const ModalTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: black;
`;

export const ReminderSlot = styled.div`
  border-radius: 10px;
  min-height: 25px;
  width: 95%;
  margin: auto;
  margin-bottom: 5px;
  background-color: rgb(85, 85, 255);
`;

export const ReminderTitle = styled.div`
  font-weight: bold;
  padding-left: 5px;
  padding-right: 2px;
  padding-top: 3px;
  color: transparent;
  text-shadow: 0 0 0 white;
  word-break: break-all;
  &:focus {
    outline: none;
  }
`;

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  width: 20%;
  margin-bottom: 10px;
  h1 {
    margin: 0;
  }
`;

const baseMonthStyles = css`
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  :hover {
    background-color: #ccc;
  }
  margin: 0;
`;

export const PreviousIcon = styled(FcPrevious)`
  ${baseMonthStyles}
`;

export const NextIcon = styled(FcNext)`
  ${baseMonthStyles}
`;

export const Input = styled.input`
  border-radius: 3px;
  font-size: 14px;
  padding: 10px;
  width: 100%;
`;

const baseButtonStyles = css`
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  height: 50px;
  padding: 1rem 1.5rem;
  text-transform: uppercase;
  color: transparent;
  text-shadow: 0 0 0 white;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  :active {
    border: 1px solid #ccc;
    background: #ccc;
  }
`;

export const Button = styled.button`
  ${baseButtonStyles}
  background: rgb(85, 85, 255);
  border: 1px solid rgb(85, 85, 255);
`;

export const DeleteButton = styled.button`
  ${baseButtonStyles}
  background: red;
  border: 1px solid red;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;
`;

export const WeatherInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5em;
`;
