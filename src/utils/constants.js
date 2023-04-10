import advanced from "/assets/images/icon-advanced.svg";
import arcade from "/assets/images/icon-arcade.svg";
import pro from "/assets/images/icon-pro.svg";

export const steps = [
  {
    step: 1,
    title: "YOUR INFO",
  },
  {
    step: 2,
    title: "SELECT PLAN",
  },
  {
    step: 3,
    title: "ADD-ONS",
  },
  {
    step: 4,
    title: "SUMMARY",
  },
];

export const plans = [
  {
    id: 1,
    icon: arcade,
    title: "Arcade",
    price: 9,
  },
  {
    id: 2,
    icon: advanced,
    title: "Advanced",
    price: 12,
  },
  {
    id: 3,
    icon: pro,
    title: "Pro",
    price: 15,
  },
];

export const infoFields = [
  {
    id: 1,
    label: "name",
    name: "name",
    type: "text",
    placeholder: "e.g. Vanessa Mint",
  },
  {
    id: 2,
    label: "email address",
    name: "email",
    type: "text",
    placeholder: "e.g. vanessamint@mail.com",
  },
  {
    id: 3,
    label: "phone number",
    name: "phone",
    type: "text",
    placeholder: "e.g. +1 234 567 890",
  },
];

export const allAddOns = [
  {
    id: 1,
    title: "Online service",
    description: "Access to multiplayer games",
    price: 1,
  },
  {
    id: 2,
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: 2,
  },
  {
    id: 3,
    title: "Customizable Profile",
    description: "Custom theme on your profile",
    price: 2,
  },
];
