import { PlusOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { FC, PropsWithChildren } from "react";

import { AppButton } from "../AppButton/AppButton";
import style from "./Actions.module.scss";

interface ActionsProps {
  showAddButton?: boolean;
  onClickAdd?: () => void;
}

export const Actions: FC<PropsWithChildren<ActionsProps>> = ({
  showAddButton = true,
  children,
  onClickAdd,
}) => {
  return (
    <Flex wrap gap={10} className={style.course_actions}>
      {showAddButton && (
        <AppButton
          type="primary"
          size={"large"}
          color="default"
          variant="outlined"
          icon={<PlusOutlined />}
          showPopover
          propsPopover={{
            content: "Добавить",
          }}
          onClick={() => onClickAdd?.()}
        />
      )}

      {children}
    </Flex>
  );
};
