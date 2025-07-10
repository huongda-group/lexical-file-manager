export type File = {
  name: string;
  isDirectory: boolean;
  path: string;
  updatedAt?: string;
  size?: number;
  url?: string;
};

export type FileUploadConfig = {
  url: string;
  method?: 'POST' | 'PUT';
  headers?: { [key: string]: string };
};

export type FileManagerPermissions = {
  create?: boolean;
  upload?: boolean;
  move?: boolean;
  copy?: boolean;
  rename?: boolean;
  download?: boolean;
  delete?: boolean;
};

export interface FileManagerProps {
  acceptedFileTypes?: string;
  collapsibleNav?: boolean;
  defaultNavExpanded?: boolean;
  enableFilePreview?: boolean;
  filePreviewPath?: string;
  filePreviewComponent?: (file: File) => React.ReactNode;
  fileUploadConfig?: FileUploadConfig;
  files: File[];
  fontFamily?: string;
  height?: string | number;
  initialPath?: string;
  isLoading?: boolean;
  language?: string;
  layout?: 'list' | 'grid';
  maxFileSize?: number;
  onCopy?: (files: File[]) => void;
  onCut?: (files: File[]) => void;
  onCreateFolder?: (name: string, parentFolder: File) => void;
  onDelete?: (files: File[]) => void;
  onDownload?: (files: File[]) => void;
  onError?: (error: { type: string; message: string }, file: File) => void;
  onFileOpen?: (file: File) => void;
  onFileUploaded?: (response: { [key: string]: any }) => void;
  onFileUploading?: (file: File, parentFolder: File) => { [key: string]: any };
  onLayoutChange?: (layout: 'list' | 'grid') => void;
  onPaste?: (
    files: File[],
    destinationFolder: File,
    operationType: 'copy' | 'move'
  ) => void;
  onRefresh?: () => void;
  onRename?: (file: File, newName: string) => void;
  onSelect?: (files: File[]) => void;
  permissions?: FileManagerPermissions;
  primaryColor?: string;
  width?: string | number;
}
