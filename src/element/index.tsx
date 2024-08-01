import { ButtonUpload } from 'button';
import { NodeKey } from 'lexical';
import React from 'react';

export interface FileItem {
  id: string;
  name: string;
  url: string;
  size?: string;
  thumbnail?: string;
  key?: NodeKey;
  index: number;
}

export type PanelProps = React.PropsWithChildren<{
  title?: string;
  show: boolean;
  files: FileItem[];
  multiple?: boolean;
  upload: ButtonUpload;
  onClose?: () => void;
  onDelete?: (file: FileItem) => void;
  onInsert?: (file: FileItem | FileItem[]) => void;
}>;

export interface PanelState {
  files: FileItem[];
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
