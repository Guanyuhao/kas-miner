import { type FC } from 'react';
import { Card, Skeleton, Space, Avatar } from '@arco-design/web-react';
import { type ProfileFormDataType } from '../typing/profile';

interface ProfileInfoProps {
  info?: ProfileFormDataType;
  loading: boolean;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ info, loading }: ProfileInfoProps) => {
  return (
    <Card
      style={{ width: 384 }}
      cover={
        <Skeleton
          loading={loading}
          text={{ rows: 0 }}
          image={{
            style: {
              width: 352,
              height: 188,
              margin: '16px 16px 0 16px',
            },
          }}>
          <div style={{ height: 204, overflow: 'hidden' }}>
            <img
              style={{ width: '100%', transform: 'translateY(-20px)' }}
              alt="dessert"
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </div>
        </Skeleton>
      }>
      <Card.Meta
        avatar={
          <Skeleton
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 4,
            }}
            loading={loading}
            text={{ rows: 1, width: 64 }}
            image={{
              shape: 'circle',
              style: {
                width: 24,
                height: 24,
              },
            }}>
            <Space>
              <Avatar size={24}>A</Avatar>
              <span>{info?.name}</span>
            </Space>
          </Skeleton>
        }
        title={
          <Skeleton
            loading={loading}
            style={{ marginTop: 0 }}
            text={{
              rows: 1,
              width: 72,
            }}>
            {info?.email}
          </Skeleton>
        }
        description={
          <Skeleton loading={loading} text={{ rows: 1, width: 150 }}>
            {info?.phone}
          </Skeleton>
        }
      />
    </Card>
  );
};

export default ProfileInfo;
