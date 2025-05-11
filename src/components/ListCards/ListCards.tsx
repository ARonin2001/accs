import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Empty, MenuProps, Row, Typography } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { MouseEvent } from "react";
import { AppCard } from "../AppCard/AppCard";

interface ListCardsProps<T = any> {
  list: T[] | undefined;
  isLoading?: boolean;
  dropdownMenuItems?: MenuProps["items"];
  onClickCard?: (item: T) => void;
  onClickCardSettings?: (item: T) => void;
  onClickDrowpdown?: (info: MenuInfo, item: T) => void;
  onClickCreate?: () => void;
}

export const ListCards = <T extends { id: number; title: string }>({
  list = [],
  isLoading = false,
  dropdownMenuItems,
  onClickCard,
  onClickCardSettings,
  onClickDrowpdown,
  onClickCreate,
}: ListCardsProps<T>) => {
  const handleClickCard = (item: T) => {
    onClickCard?.(item);
  };

  const cardSettingsOnClick = (
    event: MouseEvent<HTMLSpanElement, MouseEvent>,
    item: T
  ) => {
    event.stopPropagation();
    onClickCardSettings?.(item);
  };

  const handleClickDropdown = (info: MenuInfo, item: T) => {
    info.domEvent.stopPropagation();
    console.log("info", info);
    onClickDrowpdown?.(info, item);
  };

  if (!list.length) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        styles={{ image: { height: 60 } }}
        description={<Typography.Text>Здесь пусто :(</Typography.Text>}
      >
        <Button type="primary" onClick={onClickCreate}>
          СОЗДАТЬ
        </Button>
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
                  extra={
                    <Dropdown
                      menu={{
                        items: dropdownMenuItems,
                        onClick: (info) => handleClickDropdown(info, item),
                      }}
                      trigger={["click"]}
                    >
                      <EllipsisOutlined
                        onClick={(event) => cardSettingsOnClick(event, item)}
                      />
                    </Dropdown>
                  }
                ></AppCard>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
