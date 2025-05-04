import { Button, ButtonProps, Popover, PopoverProps } from "antd";
import { FC } from "react";

interface AppButtonProps {
  showPopover?: boolean;
  propsPopover?: PopoverProps;
}

export const AppButton: FC<ButtonProps & AppButtonProps> = ({
  showPopover = false,
  propsPopover,
  ...props
}) => {
  if (showPopover) {
    return (
      <Popover {...propsPopover}>
        <Button {...props} />
      </Popover>
    );
  }

  return <Button {...props} />;
};
