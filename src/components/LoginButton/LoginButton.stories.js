import { LoginButton } from ".";

export default {
  title: "Components/LoginButton",
  component: LoginButton,
  argTypes: {
    state: {
      options: ["hover", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    state: "hover",
    className: {},
  },
};
