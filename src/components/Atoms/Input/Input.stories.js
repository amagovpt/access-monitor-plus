import React from "react";
import { Input } from "./index";

export default {
  title: "components/Atoms/Input",
  component: Input,
  argTypes: {},
};

const Template = (args) => {
  return <Input {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  label: "Custom Input",
  type: "text",
  placeholder: "http(s)",
  error: "",
};
