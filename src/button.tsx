import React from 'react';
import { LexicalEditor } from 'lexical';
import PanelComponent from './element/panel';
import { File } from './element';

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

  render() {
    return (
      <>
        <PanelComponent
          files={this.props.files}
          onInsert={this.props.onInsert}
          onClose={() => {
            this.setState({
              show: false,
            });
            if (this.props.onClose) {
              this.props.onClose();
            }
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
