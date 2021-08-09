export class FileController {
  filePath: string;
  id: string;
  ngayUpload: Date;
  tenFile: string;
}

export class ListFilesPatch {
  id: string;
  filename: string;
}

export interface FileInfo {
  filePath: string;
  fileType: string;
  id: string;
  ngayUpload: Date;
  tenFile: string;
}
