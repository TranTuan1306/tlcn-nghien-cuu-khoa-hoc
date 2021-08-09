export interface AuthModel {
  token: string;
  expired: number;
  roles: string[];
  expiresDate: Date;
}

export class UserInfo {
  name: string;
  photoUrl: string;
  email: string;
  constructor(name: string, photoUrl: string, email: string) {
    this.name = name;
    this.photoUrl = photoUrl;
    this.email = email;
  }
}

export class UserInfomation {
  id: string;
  avatar: string;
  danhXung?: string; // ??
  diaChi: string;
  dienThoai: string;
  donVi: string;
  email: string;
  gioiTinh: boolean;
  hoTen: string;
  hocHam: string;
  hocVi: string;
  linhVucUsers: string[];
  taiKhoanId: string;
  trangThai: boolean;
  password?: string;
}

export class UserAccount {
  id: string;
  email: string;
  password: string;
  roles: string[];
  enable: boolean;
  userId: string;
  username: string;
}
