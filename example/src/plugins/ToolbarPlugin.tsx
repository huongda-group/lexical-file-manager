/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {
  FileManager,
  INSERT_FILE_COMMAND,
} from '@huongda-group/lexical-file-manager';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  // const [openFileManager, setOpenFileManager] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <>
      <div className="toolbar" ref={toolbarRef}>
        <button
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          className="toolbar-item spaced"
          aria-label="Undo"
        >
          <i className="format undo" />
        </button>
        <button
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          className="toolbar-item"
          aria-label="Redo"
        >
          <i className="format redo" />
        </button>
        <Divider />
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
          className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
          aria-label="Format Bold"
        >
          <i className="format bold" />
        </button>
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          }}
          className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
          aria-label="Format Italics"
        >
          <i className="format italic" />
        </button>
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          }}
          className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
          aria-label="Format Underline"
        >
          <i className="format underline" />
        </button>
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
          }}
          className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
          aria-label="Format Strikethrough"
        >
          <i className="format strikethrough" />
        </button>
        <Divider />
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
          }}
          className="toolbar-item spaced"
          aria-label="Left Align"
        >
          <i className="format left-align" />
        </button>
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
          }}
          className="toolbar-item spaced"
          aria-label="Center Align"
        >
          <i className="format center-align" />
        </button>
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
          }}
          className="toolbar-item spaced"
          aria-label="Right Align"
        >
          <i className="format right-align" />
        </button>
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
          }}
          className="toolbar-item"
          aria-label="Justify Align"
        >
          <i className="format justify-align" />
        </button>
        <Divider />
        <FileManager
          title="Simple File Manager"
          editor={editor}
          upload={{
            multiple: true,
            onUpload: (f) => {
              console.log(f, 'f');
            },
          }}
          files={[
            {
              id: '1',
              name: 'Image 1',
              url: 'https://placehold.co/600x400/orange/white',
              size: '150x150',
              thumbnail: 'https://placehold.co/600x400/orange/white',
            },
            {
              id: '2',
              name: 'Image 2',
              url: 'https://placehold.co/600x400/black/white',
              size: '150x150',
              thumbnail: 'https://placehold.co/600x400/black/white',
            },
            {
              id: '3',
              name: 'Image 3',
              url: 'https://placehold.co/600x400/green/white',
              size: '150x150',
              thumbnail: 'https://placehold.co/600x400/green/white',
            },
            {
              id: '4',
              name: 'Image 4',
              url: 'https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc',
              size: '150x150',
            },
          ].map((item, index) => ({ ...item, index }))}
          aria-label="File Manager Simple"
        >
          <button className="toolbar-item" aria-label="File Manager">
            <i className="format file-manager" />
          </button>
        </FileManager>
        <FileManager
          title="Multiple Files Manager"
          editor={editor}
          upload={{
            multiple: false,
            onUpload: (f) => {
              console.log(f, 'f');
            },
          }}
          files={[
            {
              id: '1',
              name: 'Image 1',
              url: 'https://placehold.co/600x400/orange/white',
              size: '150x150',
              thumbnail: 'https://placehold.co/600x400/orange/white',
            },
            {
              id: '2',
              name: 'Image 2',
              url: 'https://placehold.co/600x400/black/white',
              size: '150x150',
              thumbnail: 'https://placehold.co/600x400/black/white',
            },
            {
              id: '3',
              name: 'Image 3',
              url: 'https://placehold.co/600x400/green/white',
              size: '150x150',
              thumbnail: 'https://placehold.co/600x400/green/white',
            },
            {
              id: '4',
              name: 'Image 4',
              url: 'https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc',
              size: '150x150',
            },
          ].map((item, index) => ({ ...item, index }))}
          aria-label="File Manager Multiple"
          multiple
        >
          <button className="toolbar-item" aria-label="File Manager">
            <i className="format files-manager" />
          </button>
        </FileManager>
      </div>
    </>
  );
}
