import React from "react";
import { Tabs } from "./index";
import { useTranslation } from "react-i18next"

const {t} = useTranslation()

export default {
  title: "components/Molecules/Tabs",
  component: Tabs,
  argTypes: {},
};

const tabs = [
  {
    eventKey: "tab1",
    title: t("HEADER.dialog.insert_url"),
    component: <div>tab 1</div>,
  },
  {
    eventKey: "tab2",
    title: t("HEADER.dialog.insert_html"),
    component: <div>tab 2</div>,
  },
  {
    eventKey: "tab3",
    title: t("HEADER.dialog.upload_html"),
    component: <div>tab 3</div>,
    // disabled: true,
  },
];

const Template = (args) => {
  return <Tabs {...args} />;
};

export const _Tabs = Template.bind({});
_Tabs.args = {
  tabs,
  defaultActiveKey: "tab1",
  vertical: false,
};
