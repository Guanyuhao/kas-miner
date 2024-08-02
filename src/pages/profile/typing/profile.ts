export type ProfileFormDataType = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
};

export enum ProfilePageStatusEnum {
  edit = 'edit',
  view = 'view',
}

export const PROFILE_FORM_DEFAULT_DATA: ProfileFormDataType = {
  name: '我是兜底的',
  email: 'tests@test.com',
  phone: '17688886666',
};
