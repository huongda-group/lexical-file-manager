import { NodeKey } from 'lexical';
import React from 'react';

export interface File {
  id: string;
  name: string;
  url: string;
  size?: string;
  thumbnail?: string;
  key?: NodeKey;
}

export type PanelProps = React.PropsWithChildren<{
  show: boolean;
  files: File[];
  onClose?: () => void;
  onDelete?: (file: File) => void;
  onInsert?: (file: File) => void;
}>;

export interface PanelState {
  files: File[];
  selected: File | null;
}

export type FileProps = React.PropsWithChildren<{
  file: File;
  onSelect: (f: File) => void;
  onDelete?: (f: File) => void;
}>;

export interface FileState {}
