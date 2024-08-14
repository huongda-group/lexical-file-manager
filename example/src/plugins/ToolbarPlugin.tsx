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
  FileItem,
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
  const [files, setFiles] = useState<FileItem[]>(
    [
      1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59, 60,
    ].map((num) => ({
      id: num.toString(),
      name: 'Image ' + (num + 1).toString(),
      url: 'https://placehold.co/600x400/orange/white',
      size: 10245 * num,
      mimetype: 'image/jpeg',
      index: num,
    }))
  );
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
          onUpload={{
            multiple: true,
            onUpload: (f) => {
              console.log(f, 'f');
            },
          }}
          files={[
            {
              id: '1',
              name: 'Image 1 asdasd asd asd asd asd asd asd asd asd asd asd asd asd asd ads ',
              url: 'https://placehold.co/600x400/orange/white',
              size: 10245,
              mimetype: 'image/jpeg',
            },
            {
              id: '2',
              name: 'Image 2',
              url: 'https://placehold.co/600x400/black/white',
              size: 10245,
              mimetype: 'image/jpeg',
            },
            {
              id: '3',
              name: 'Image 3',
              url: 'https://placehold.co/600x400/green/white',
              size: 10245,
              mimetype: 'image/jpeg',
            },
            {
              id: '4',
              name: 'Image 4',
              url: 'https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc',
              size: 10245,
              mimetype: 'image/jpeg',
            },
          ]}
          onChange={(f) => {
            console.log(f, 'f');
          }}
          aria-label="File Manager Simple"
        >
          <button className="toolbar-item" aria-label="File Manager">
            <i className="format file-manager" />
          </button>
        </FileManager>
        <FileManager
          title="Multiple Files Manager"
          editor={editor}
          onUpload={{
            multiple: false,
            onUpload: (f) => {
              console.log(f, 'f');
              setFiles(
                files.concat({
                  id: '5',
                  name: 'Image 5',
                  url: 'https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc',
                  size: 10244,
                  mimetype: 'image/jpeg',
                  index: 4,
                })
              );
            },
          }}
          files={files}
          onChange={(f) => {
            setFiles(f);
          }}
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
