import { Button, Col, Empty, Row, Typography } from "antd";
import { AppCard } from "../AppCard/AppCard";

interface ListCardsProps<T = any> {
  list: T[] | undefined;
  isLoading?: boolean;
  onClickCard?: (item: T) => void;
}

export const ListCards = <T extends { id: number; title: string }>({
  list = [],
  isLoading = false,
  onClickCard,
}: ListCardsProps<T>) => {
  const handleClickCard = (item: T) => {
    onClickCard?.(item);
  };

  if (!list.length) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        styles={{ image: { height: 60 } }}
        description={<Typography.Text>Здесь пусто :(</Typography.Text>}
      >
        <Button type="primary">СОЗДАТЬ</Button>
      </Empty>
    );
  }

  return (
    <div className="courses">
      <Row gutter={[16, 16]}>
        {list.length > 0 &&
          list.map((item) => {
            return (
              <Col key={item.id} className="gutter-row" span={6}>
                <AppCard
                  title={item.title}
                  onClick={() => handleClickCard(item)}
                  loading={isLoading}
                ></AppCard>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
