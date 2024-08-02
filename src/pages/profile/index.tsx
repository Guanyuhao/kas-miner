import { useCallback, useEffect, useState } from 'react';
import { Button, Message } from '@arco-design/web-react';

import api from '../../libs/api';
import ProfileForm from './components/profile-form';
import ProfileInfo from './components/profile-info';
import { ProfilePageStatusEnum, PROFILE_FORM_DEFAULT_DATA, ProfileFormDataType } from './typing/profile';

function ProfilePage() {
  const [pageStatus, setPageStatus] = useState<ProfilePageStatusEnum>(ProfilePageStatusEnum.view);
  const [profileDate, setProfileDate] = useState<ProfileFormDataType>();
  const [loading, setLoading] = useState<boolean>(true);

  const getProfileDate = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/profile/info');
      // eslint-disable-next-line no-promise-executor-return
      const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(1000);
      // console.log(`Message from api: ${JSON.stringify(data)}`);
      if (data?.data) {
        setProfileDate(data?.data);
      } else {
        throw new Error('获取用户信息失败');
      }
    } catch (error) {
      setProfileDate(PROFILE_FORM_DEFAULT_DATA);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmitSuccess = useCallback(
    (values: ProfileFormDataType) => {
      api
        .post('/api/profile/edit', { ...values, _id: profileDate?._id })
        .then(({ data }) => {
          if (data?.status === 'success') {
            setPageStatus(ProfilePageStatusEnum.view);
            setProfileDate(data?.data);
          }
        })
        .catch((err) => {
          Message.error(err);
          console.log(err);
        });
    },
    [profileDate],
  );

  useEffect(function handleInit() {
    getProfileDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center w-screen">
      {pageStatus === ProfilePageStatusEnum.view && (
        <div className="m-4">
          <Button size="large" type="primary" onClick={() => setPageStatus(ProfilePageStatusEnum.edit)}>
            编辑
          </Button>
        </div>
      )}
      {pageStatus === ProfilePageStatusEnum.edit && (
        <ProfileForm formData={profileDate} handleSubmitSuccess={handleSubmitSuccess} />
      )}
      {pageStatus === ProfilePageStatusEnum.view && <ProfileInfo loading={loading} info={profileDate} />}
    </div>
  );
}

export default ProfilePage;
