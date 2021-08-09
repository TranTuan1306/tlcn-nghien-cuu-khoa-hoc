/* eslint-disable no-unused-vars */
export class EditCache<T> {
  [key: string]: {
    edit: boolean;
    data: {
      id: string;
      data: T;
      isLock: boolean;
    };
  };
}
