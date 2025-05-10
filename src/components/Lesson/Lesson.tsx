import { Divider, Typography } from "antd";
import parse from "html-react-parser";
import { FC } from "react";
import "./Lesson.scss";

interface LessonProps {
  title: string;
  description?: string;
  body?: string;
}

export const Lesson: FC<LessonProps> = ({ title, description, body }) => {
  return (
    <div className="lesson">
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
