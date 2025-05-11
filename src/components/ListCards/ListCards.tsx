import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Empty, MenuProps, Row, Typography } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { useRef } from "react";
import { AppCard } from "../AppCard/AppCard";

interface ListCardsProps<T = any> {
  list: T[] | undefined;
  isLoading?: boolean;
  dropdownMenuItems?: MenuProps["items"];
  onClickCard?: (item: T) => void;
  onClickCardSettings?: (item: T) => void;
  onClickDrowpdown?: (info: MenuInfo, item: T) => void;
  onClickCreate?: () => void;
  onClickDropdownDelete?: () => void;
  onClickDropdownEdit?: () => void;
  onOpenDropdown?: (open: boolean, item: T) => void;
}

export const ListCards = <T extends { id: number; title: string }>({
  list = [],
  isLoading = false,
  dropdownMenuItems,
  onClickCard,
  onClickCardSettings,
  onClickDrowpdown,
  onClickCreate,
  onClickDropdownDelete,
  onClickDropdownEdit,
  onOpenDropdown,
}: ListCardsProps<T>) => {
  const dropdownMenu = useRef<MenuProps["items"]>([
    {
      key: 1,
      label: (
        <Typography.Text
          data-action="delete"
          type="danger"
          editable={{ icon: <DeleteOutlined /> }}
        >
          Удалить
        </Typography.Text>
      ),
      onClick: onClickDropdownDelete,
    },
    {
      key: 2,
      label: (
        <Typography.Text
          data-action="edit"
          editable={{ icon: <EditOutlined /> }}
        >
          Редактировать
        </Typography.Text>
      ),
      onClick: onClickDropdownEdit,
    },
  ]);

  const handleClickCard = (item: T) => {
    onClickCard?.(item);
  };

  const cardSettingsOnClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    item: T
  ) => {
    event.stopPropagation();
    onClickCardSettings?.(item);
  };

  const handleClickDropdownItem = (info: MenuInfo, item: T) => {
    info.domEvent.stopPropagation();
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
                        items: dropdownMenu.current,
                        onClick: (info) => handleClickDropdownItem(info, item),
                      }}
                      trigger={["click"]}
                      onOpenChange={(open: boolean) =>
                        onOpenDropdown?.(open, item)
                      }
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
