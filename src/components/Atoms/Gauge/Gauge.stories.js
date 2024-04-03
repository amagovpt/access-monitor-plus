import React from "react";
import { Gauge } from "./index";

export default {
  title: "components/Atoms/Gauge",
  component: Gauge,
  argTypes: {},
};

const Template = (args) => <Gauge {...args} />;

export const Default = Template.bind({});
Default.args = {
  percentage: 9.5,
};
