import { Card, CardProps } from "antd";
import { FC, ReactNode, useMemo } from "react";

import { CloseOutlined } from "@ant-design/icons";
import "./AppCard.scss";

interface AppCardProps {
  showExtraClose?: boolean;
  onExtraClick?: () => void;
}

export const AppCard: FC<CardProps & AppCardProps> = ({
  showExtraClose = false,
  extra,
  className,
  onExtraClick,
  ...props
}) => {
  const extraElement: ReactNode = useMemo(() => {
    if (showExtraClose) return <CloseOutlined onClick={onExtraClick} />;

    return <div onClick={onExtraClick}>{extra}</div>;
  }, [showExtraClose, extra]);

  return (
    <Card
      className={"app_card " + className}
      extra={extraElement}
      {...props}
    ></Card>
  );
};
