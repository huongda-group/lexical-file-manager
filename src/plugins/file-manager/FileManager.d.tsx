import { NodeKey } from 'lexical';

export interface FileManagerPayload {
  src: string;
  name: string;
  key?: NodeKey;
}

export interface FileManagerFile {
  src: string;
  name: string;
  id: string;
}
