import { FileEarmark as FileEarmarkIcon } from 'react-bootstrap-icons';
import React from 'react';
import { Col } from 'react-bootstrap';
import { FileProps, FileState } from './index';

export default class FileComponent extends React.Component<
  FileProps,
  FileState
> {
  constructor(props: FileProps) {
    super(props);
  }

  render() {
    return (
      <Col
        xs={6}
        md={2}
        lg={1}
        className="px-2"
        onClick={() => {
          this.props.onSelect(this.props.file);
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px 8px',
            color: 'rgba(0, 0, 0, 0.87)',
          }}
          className="border rounded file"
        >
          <FileEarmarkIcon />
          <p className="text-center">{this.props.file.name}</p>
        </div>
      </Col>
    );
  }
}
