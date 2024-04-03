import React from "react";
import { Button, buttonVariant } from "./index";
import { Icon } from "../../index";

export default {
  title: "components/Atoms/Button",
  component: Button,
  argTypes: {},
};

const Template = (args) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {Object.values(buttonVariant).map((variant) => (
        <span key={variant} style={{ margin: 5 }}>
          <Button {...args} variant={variant} radius="full">
            {variant}
          </Button>
        </span>
      ))}
    </div>
  );
};

export const _Button = Template.bind({});
_Button.args = {
  loading: false,
};

export const ButtonPrimary = () => (
  <Button variant="primary" text="Primary button" />
);

export const ButtonSecondary = () => (
  <Button variant="secondary" text="Secondary button" />
);

export const ButtonGhost = () => <Button variant="ghost" text="Ghost button" />;

export const ButtonCancel = () => (
  <Button variant="cancel" text="Cancel button" />
);

export const ButtonSuccess = () => (
  <Button variant="success" text="Success button" />
);

export const ButtonDanger = () => (
  <Button variant="danger" text="Danger button" />
);

export const ButtonBorderless = () => (
  <Button variant="danger" radius="none" text="Borderless button" />
);

export const _LoadingButton = Template.bind({});
_LoadingButton.args = {
  loading: true,
};

export const _ButtonWithLeftIcon = Template.bind({});
_ButtonWithLeftIcon.args = {
  loading: false,
  iconLeft: <Icon name="AMA-Setalongaoficial-Line" />,
};

export const _ButtonWithRightIcon = Template.bind({});
_ButtonWithRightIcon.args = {
  loading: false,
  iconRight: <Icon name="AMA-Setalongaoficial-Line" />,
};

export const _ButtonWithBothIcons = Template.bind({});
_ButtonWithBothIcons.args = {
  loading: false,
  variant: buttonVariant.WITH_ICONS,
  iconLeft: <Icon name="AMA-Setalongaoficial-Line" />,
  iconRight: <Icon name="AMA-Setalongaoficial-Line" />,
};
