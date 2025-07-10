import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from 'lexical';
import React, { JSX, useEffect, useState } from 'react';
import { $createImageNode, ImageNode, ImagePayload } from './node/ImageNode';
import { FileMangaerModal } from 'index';
import type { FileManagerModalConfig } from 'types/FileManagerProps';

export type InsertImagePayload = Readonly<ImagePayload>;

export const INSERT_FILE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand('INSERT_FILE_COMMAND');

export const OPEN_FILE_MANAGER_COMMAND: LexicalCommand<boolean> =
  createCommand('OPEN_FILE_MANAGER_COMMAND');

  export const CONFIG_FILE_MANAGER_COMMAND: LexicalCommand<FileManagerModalConfig> =
  createCommand('CONFIG_FILE_MANAGER_COMMAND');

export default function ImagesPlugin({
  captionsEnabled,
}: {
  captionsEnabled?: boolean;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const [openModal, setOpenModal] = useState(false);
  const [config, setConfig] = useState<FileManagerModalConfig>({
    title: "File Manager",
    files: []
  })
  const files = config.files?? []

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_FILE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand<boolean>(
        OPEN_FILE_MANAGER_COMMAND,
        (value) => {
          setOpenModal(value);
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand<FileManagerModalConfig>(
        CONFIG_FILE_MANAGER_COMMAND,
        (value) => {
          setConfig({
            ...config,
            ...value,
          })
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [captionsEnabled, editor]);

  return <FileMangaerModal open={openModal} setOpen={setOpenModal} files={files} {...config} />;
}
