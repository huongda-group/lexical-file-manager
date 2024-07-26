import React from 'react';
import { LexicalEditor } from 'lexical';
import PanelComponent from './element/panel';
import { File } from './element';
import { INSERT_FILE_COMMAND } from 'plugin';

export type ButtonProps = React.PropsWithChildren<{
  editor: LexicalEditor;
  files: File[];
  onClose?: () => void;
  onInsert?: (f: File | File[]) => void;
  onDelete?: (f: File) => void;
  multiple?: boolean;
  title?: string;
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
                      ...(f as File),
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
