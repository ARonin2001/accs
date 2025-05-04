import { PlusOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { FC, MouseEventHandler, PropsWithChildren } from "react";

import { AppButton } from "../../AppButton/AppButton";
import style from "./CourseActions.module.scss";

interface CourseActionsProps {
  onClick?: (buttonAction: string | null) => void;
}

export enum BUTTON_ACTIONS {
  ADD = "add",
}

const BTN_ATTRIBUTE_NAME = "data-click";

export const CourseActions: FC<PropsWithChildren<CourseActionsProps>> = ({
  children,
  onClick,
}) => {
  const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
    const btnAttributeValue =
      event.currentTarget.getAttribute(BTN_ATTRIBUTE_NAME);

    onClick?.(btnAttributeValue);
  };

  return (
    <Flex wrap gap={10} className={style.course_actions}>
      <AppButton
        type="primary"
        size={"large"}
        color="default"
        variant="outlined"
        icon={<PlusOutlined />}
        showPopover
        propsPopover={{
          content: "Добавить курс",
        }}
        onClick={handleClick}
        data-click={BUTTON_ACTIONS.ADD}
      />
      {children}
    </Flex>
  );
};
