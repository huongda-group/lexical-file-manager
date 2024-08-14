import { ButtonUpload } from 'button';
import { NodeKey } from 'lexical';
import React from 'react';

export type Mimetype =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/bmp'
  | 'image/webp'
  | 'image/tiff'
  | 'image/svg+xml'
  | 'audio/mpeg'
  | 'audio/wav'
  | 'audio/ogg'
  | 'audio/mp4'
  | 'audio/aac'
  | 'audio/flac'
  | 'audio/amr'
  | 'audio/x-ms-wma'
  | 'video/mp4'
  | 'video/webm'
  | 'video/x-msvideo'
  | 'video/quicktime'
  | 'video/x-ms-wmv'
  | 'video/x-flv'
  | 'video/x-matroska'
  | 'video/mpeg'
  | string;

export type FileItem = {
  id: string;
  name: string;
  url: string;
  size: number;
  key?: NodeKey;
  mimetype: Mimetype;
  index: number;
};

export type PanelProps = React.PropsWithChildren<{
  title?: string;
  show: boolean;
  files: FileItem[];
  onChange: (f: FileItem[]) => void;
  multiple?: boolean;
  onUpload: ButtonUpload;
  onClose?: () => void;
  onDelete?: (file: FileItem) => void;
  onInsert?: (file: FileItem | FileItem[]) => void;
}>;

export interface PanelState {
  selected: FileItem | null;
  selectedFile: FileItem | FileItem[] | null;
  showDeleteSelected: boolean;
  helperText: {
    variant: 'info' | 'error';
    message: string;
  };
  dragging: boolean;
}

export type FileProps = React.PropsWithChildren<{
  file: FileItem;
  selected: FileItem | null;
  selectedFile: FileItem | FileItem[] | null;
  onSelect: (f: FileItem | null) => void;
  onDelete?: (f: FileItem) => void;
}>;

export interface FileState {
  showDelete: boolean;
}
