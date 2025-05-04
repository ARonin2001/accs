import { Col, Row } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";
import { AppCard } from "../AppCard/AppCard";

interface ListCardsProps {
  list: any[];
  isLoading?: boolean;
}

export const ListCards: FC<ListCardsProps> = ({ list, isLoading = false }) => {
  const navigate = useNavigate();

  const navigateToLessons = () => {
    navigate("/lessons");
  };

  return (
    <div className="courses">
      <Row gutter={[16, 16]}>
        {list.length > 0 &&
          list.map((item) => {
            return (
              <Col key={item.id} className="gutter-row" span={6}>
                <AppCard
                  title={item.title}
                  onClick={navigateToLessons}
                  loading={isLoading}
                ></AppCard>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
