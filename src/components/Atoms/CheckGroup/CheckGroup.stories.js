import React from "react";
import { CheckGroup } from "./index";
import { useTranslation } from "react-i18next"

const {t} = useTranslation()

export default {
  title: "components/Atoms/Checkgroup",
  component: CheckGroup,
  argTypes: {},
};

const data = [
  {
    id: "1",
    name: "item 1",
  },
  {
    id: "2",
    name: "item 2",
  },
  {
    id: "3",
    name: "item 3",
  },
  {
    id: "4",
    name: "item 4",
  },
  {
    id: "5",
    name: "item 5",
    disabled: true,
  },
];

const Template = (args) => {
  const [value, setValue] = React.useState("1");

  return (
    <>
      <CheckGroup {...args} value={value} onChange={setValue} />
      <div>{t("ELEMENT_RESULTS.result.value") + " " + value}</div>
    </>
  );
};

export const _Checkgroup = Template.bind({});
_Checkgroup.args = {
  data,
  inline: true,
};
