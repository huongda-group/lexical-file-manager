import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand
} from 'lexical';
import { useEffect } from 'react';
import Node, { $createNode } from './node';
import { File } from './element';

export const INSERT_FILE_COMMAND: LexicalCommand<File> = createCommand('INSERT_FILE_COMMAND');

export default function Plugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([Node])) {
      throw new Error('FileManagerPlugin: FileManagerNode not registered on editor');
    }

    return mergeRegister(editor.registerCommand<File>(INSERT_FILE_COMMAND, (payload) => {
      const imageNode = $createNode(payload);
      $insertNodes([imageNode]);
      if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
        $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
      }

      return true;
    }, COMMAND_PRIORITY_EDITOR));
  }, [editor]);

  return <></>;
}
