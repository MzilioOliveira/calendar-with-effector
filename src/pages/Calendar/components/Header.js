import React from 'react'
import { DayLabel, HeaderContainer } from "../Calendar.styled";

const Header = () => (
  <HeaderContainer>
    <DayLabel>Sunday</DayLabel>
    <DayLabel>Monday</DayLabel>
    <DayLabel>Tuesday</DayLabel>
    <DayLabel>Wednesday</DayLabel>
    <DayLabel>Thursday</DayLabel>
    <DayLabel>Friday</DayLabel>
    <DayLabel>Saturday</DayLabel>
  </HeaderContainer>
);

export default Header;
