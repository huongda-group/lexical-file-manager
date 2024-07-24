import React from 'react';
import { LexicalEditor } from 'lexical';
import PanelComponent from './element/panel';
import { File } from './element';
import { INSERT_FILE_COMMAND } from 'plugin';

export type ButtonProps = React.PropsWithChildren<{
  editor: LexicalEditor;
  files: File[];
  onClose?: () => void;
  onInsert?: (f: File) => void;
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
        <PanelComponent
          files={this.props.files}
          onInsert={(f) => {
            if (this.props.onInsert) {
              this.props.onInsert(f);
            } else {
              this.props.editor.dispatchCommand(INSERT_FILE_COMMAND, {
                ...f,
              });
            }
            this.handleClose();
          }}
          onClose={() => {
            this.handleClose();
          }}
          show={this.state.show}
        />
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
