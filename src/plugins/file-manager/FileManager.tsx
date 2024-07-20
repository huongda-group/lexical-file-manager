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
import { useEffect } from 'react';
import { FileManagerPayload } from './FileManager.d';
import { $createFileManagerNode, FileManagerNode } from './node';

export const INSERT_FILE_COMMAND: LexicalCommand<FileManagerPayload> =
  createCommand('INSERT_FILE_COMMAND');

export function FileManagerPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([FileManagerNode])) {
      throw new Error(
        'FileManagerPlugin: FileManagerNode not registered on editor'
      );
    }

    return mergeRegister(
      editor.registerCommand<FileManagerPayload>(
        INSERT_FILE_COMMAND,
        (payload) => {
          const imageNode = $createFileManagerNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor]);

  return null;
}
