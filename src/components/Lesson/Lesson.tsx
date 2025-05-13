import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Divider, Typography } from "antd";
import parse from "html-react-parser";
import { FC } from "react";
import { Actions } from "../Actions/Actions";
import { AppButton } from "../AppButton/AppButton";
import "./Lesson.scss";

interface LessonProps {
  title: string;
  description?: string;
  body?: string;
  onClickEditButton?: () => void;
  onClickDelte?: () => void;
}

export const Lesson: FC<LessonProps> = ({
  title,
  description,
  body,
  onClickEditButton,
  onClickDelte,
}) => {
  return (
    <div className="lesson">
      <Actions showAddButton={false}>
        <AppButton
          icon={<EditOutlined />}
          showPopover
          propsPopover={{
            content: "редактировать",
          }}
          onClick={onClickEditButton}
        />
        <AppButton
          icon={<DeleteOutlined />}
          danger
          showPopover
          propsPopover={{
            content: "удалить",
          }}
          onClick={onClickDelte}
        />
      </Actions>
      <Typography.Title>{title}</Typography.Title>
      <Typography.Paragraph
        ellipsis={{
          rows: 3,
          expandable: "collapsible",
        }}
      >
        {description}
      </Typography.Paragraph>
      <Divider />
      <div className="preview-content">{body && parse(body)}</div>
    </div>
  );
};
