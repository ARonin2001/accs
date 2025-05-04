import { Card, CardProps } from "antd";
import { FC } from "react";

import "./AppCard.scss";

export const AppCard: FC<CardProps> = (props) => {
  return <Card className="app_card" {...props}></Card>;
};
