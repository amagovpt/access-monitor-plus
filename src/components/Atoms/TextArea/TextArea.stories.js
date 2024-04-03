import React from "react";
import { TextArea } from "./index";

export default {
  title: "components/Atoms/TextArea",
  component: TextArea,
  argTypes: {},
};

const Template = (args) => {
  return <TextArea {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Custom TextArea",
  type: "text",
  placeholder: "Enter value",
  error: "",
};
