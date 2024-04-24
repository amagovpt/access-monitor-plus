import React from "react";
import { LoadingComponent } from "./index";

export default {
  title: "components/Atoms/Loading",
  component: LoadingComponent,
  argTypes: {},
};

const Template = (args) => <LoadingComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  percentage: 9.5,
};
