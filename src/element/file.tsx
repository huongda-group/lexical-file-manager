import {
  FileEarmark as FileEarmarkIcon,
  Trash as TrashIcon,
} from 'react-bootstrap-icons';
import React from 'react';
import { Button, Col } from 'react-bootstrap';
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
        md={3}
        lg={2}
        xl={2}
        xxl={2}
        className="px-2 mt-3 position-relative file"
        onClick={() => {
          this.props.onSelect(this.props.file);
        }}
      >
        <Button
          variant="danger"
          className="position-absolute remove-file"
          style={{ top: '4px', right: '12px', lineHeight: 1, padding: '2px' }}
          onClick={(e) => {
            e.stopPropagation();
            if (this.props.onDelete) this.props.onDelete(this.props.file);
          }}
        >
          <TrashIcon />
        </Button>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px 8px',
            color: 'rgba(0, 0, 0, 0.87)',
          }}
          className="border rounded"
        >
          {this.props.file.thumbnail ? (
            <div
              className="rounded file-icon"
              style={{
                background: `url(${this.props.file.thumbnail}) center center no-repeat`,
                backgroundSize: 'cover',
              }}
            ></div>
          ) : (
            <FileEarmarkIcon className="file-icon" />
          )}
          <p className="text-center">{this.props.file.name}</p>
        </div>
      </Col>
    );
  }
}
