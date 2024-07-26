import { NodeKey } from 'lexical';
import React from 'react';

export interface File {
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
  files: File[];
  multiple?: boolean;
  onClose?: () => void;
  onDelete?: (file: File) => void;
  onInsert?: (file: File | File[]) => void;
}>;

export interface PanelState {
  files: File[];
  selected: File | null;
  selectedFile: File | File[] | null;
  showDeleteSelected: boolean;
  helperText: string;
}

export type FileProps = React.PropsWithChildren<{
  file: File;
  selected: File | null;
  selectedFile: File | File[] | null;
  onSelect: (f: File | null) => void;
  onDelete?: (f: File) => void;
}>;

export interface FileState {
  showDelete: boolean;
}
