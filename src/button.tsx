import React from 'react';
import { LexicalEditor } from 'lexical';
import PanelComponent from './element/panel';
import { FileItem } from './element';
import { INSERT_FILE_COMMAND } from 'plugin';

export type ButtonUpload = {
  multiple: boolean;
  onUpload: (f: File | FileList) => void;
};

export type ButtonProps = React.PropsWithChildren<{
  editor: LexicalEditor;
  files: FileItem[];
  onClose?: () => void;
  onInsert?: (f: FileItem | FileItem[]) => void;
  onDelete?: (f: FileItem) => void;
  multiple?: boolean;
  title?: string;
  upload: ButtonUpload;
}>;

export default class ButtonComponent extends React.Component<
  ButtonProps,
  {
    show: boolean;
  }
> {
  constructor(props: ButtonProps) {
    super(props);

    this.state = {
      show: false,
    };
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <>
        {this.state.show && (
          <PanelComponent
            title={this.props.title}
            files={this.props.files.map((item, index) => ({
              ...item,
              index,
            }))}
            multiple={this.props.multiple}
            upload={this.props.upload}
            onInsert={(f) => {
              if (this.props.onInsert) {
                this.props.onInsert(f);
              } else {
                console.log(f, 'f');
                if (this.props.multiple && Array.isArray(f)) {
                  f.map((item) => {
                    this.props.editor.dispatchCommand(INSERT_FILE_COMMAND, {
                      ...item,
                    });
                  });
                }
                if (!this.props.multiple) {
                  {
                    this.props.editor.dispatchCommand(INSERT_FILE_COMMAND, {
                      ...(f as FileItem),
                    });
                  }
                }
              }
              this.handleClose();
            }}
            onClose={() => {
              this.handleClose();
            }}
            onDelete={this.props.onDelete}
            show={this.state.show}
          />
        )}
        <div
          onClick={() => {
            this.setState({
              show: true,
            });
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}
