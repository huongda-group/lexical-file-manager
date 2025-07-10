import { FileManager as FileManagerLib } from "@huongda-group/react-file-manager";
import { ImageNode } from './node/ImageNode';
import Plugin, { INSERT_FILE_COMMAND as COMMAND } from './plugin';
import React from "react";
import { FileManagerProps } from "./types/FileManagerProps";
import "@huongda-group/react-file-manager/dist/style.css";

export type { File, FileManagerPermissions, FileManagerProps, FileUploadConfig } from './types/FileManagerProps';

export const FileManager: React.FC<FileManagerProps> = FileManagerLib;
export const FileManagerPlugin = Plugin;
export const FileManagerNode = ImageNode;
export const INSERT_FILE_COMMAND = COMMAND;
