import { FileManager as FileManagerLib } from "@huongda-group/react-file-manager";
import { ImageNode } from './node/ImageNode';
import Plugin, { INSERT_FILE_COMMAND as INSERT_FILE_COMMAND_LIB, } from './plugin';
import React from "react";
import { FileManagerModalProps, FileManagerProps } from "./types/FileManagerProps";
import Modal from 'react-modal';
// Configure Modal
Modal.setAppElement('#root');
import "@huongda-group/react-file-manager/dist/style.css";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export type { File, FileManagerPermissions, FileManagerProps, FileUploadConfig, FileManagerModalProps } from './types/FileManagerProps';

export const FileManager: React.FC<FileManagerProps> = FileManagerLib;
export const FileManagerPlugin = Plugin;
export const FileManagerNode = ImageNode;
export const INSERT_FILE_COMMAND = INSERT_FILE_COMMAND_LIB;

export const FileManagerModal = ({open, setOpen, title="File Manager", files, ...rest} : FileManagerModalProps) => {
  const [editor] = useLexicalComposerContext();

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      contentLabel="Modal"
      style={{
        content: {
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
      }}
    >
      <h2>{title}</h2>
      <FileManager enableFilePreview={false} files={files} 
        onFileOpen={(file) => {
          if (!file.isDirectory) {
            editor.dispatchCommand(INSERT_FILE_COMMAND, {
              altText: file.url?? '',
              src: file.url?? ''
            });
            setOpen(false);
          }
        }} 
        {...rest}
      />
      <button
        onClick={() => setOpen(false)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#f0f0f0',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Close
      </button>
    </Modal>
  )
}
