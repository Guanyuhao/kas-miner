import type { FC } from 'react';
import { Form, Input, Button } from '@arco-design/web-react';
import { useRef } from 'react';
import { type ProfileFormDataType } from '../typing/profile';

const FormItem = Form.Item;

interface ProfileFormProps {
  formData?: ProfileFormDataType;
  handleSubmitSuccess?: (id: ProfileFormDataType) => void;
}

const ProfileForm: FC<ProfileFormProps> = ({ formData, handleSubmitSuccess }) => {
  const formRef = useRef(null);
  return (
    <Form<ProfileFormDataType>
      ref={formRef}
      autoComplete="off"
      size="large"
      style={{ width: 600 }}
      initialValues={formData}
      scrollToFirstError
      onSubmit={handleSubmitSuccess}>
      <FormItem label="用户名" field="name" rules={[{ required: true }]}>
        <Input placeholder="请输入用户名" />
      </FormItem>
      <Form.Item
        label="手机号"
        field="phone"
        rules={[
          { required: true, message: '请输入手机号' },
          { match: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
        ]}>
        <Input placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item
        field="email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            validateLevel: 'warning',
          },
          {
            required: true,
            type: 'string',
            minLength: 6,
          },
        ]}>
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 24 }}>
          提交
        </Button>
      </FormItem>
    </Form>
  );
};

export default ProfileForm;
