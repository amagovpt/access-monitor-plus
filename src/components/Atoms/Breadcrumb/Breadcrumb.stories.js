import React from "react";
import { Breadcrumb } from "./index";

export default {
  title: "components/Atoms/Breadcrumb",
  component: Breadcrumb,
  argTypes: {},
};

const Template = ({ data, ...args }) => {
  return <Breadcrumb data={data} {...args} />;
};

export const _Breadcrumb = Template.bind({});

_Breadcrumb.args = {
  data: [
    {
      title: "Acessibilidade.gov.pt",
      href: "#",
    },
    {
      title: "Observatório",
      href: "#",
    },
    {
      title: "Diretórios",
      href: "#",
    },
  ],
};
