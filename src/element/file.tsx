import {
  FileEarmark as FileEarmarkIcon,
  Trash as TrashIcon,
} from 'react-bootstrap-icons';
import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { FileProps, FileState } from './index';
import ConfirmButton from 'components/ConfirmButton';
import TitleFile from 'components/TitleFile';
import { Icon } from 'utils';

export default class FileComponent extends React.Component<
  FileProps,
  FileState
> {
  constructor(props: FileProps) {
    super(props);
    this.state = {
      showDelete: false,
    };
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
          this.props.onSelect(
            Array.isArray(this.props.selectedFile)
              ? this.props.selectedFile.filter(
                  (e) => e.id === this.props.file.id
                ).length > 0
                ? null
                : this.props.file
              : // If not multiple
              this.props.file.id === this.props.selected?.id
              ? null
              : this.props.file
          );
        }}
        onMouseEnter={() => {
          this.setState({
            showDelete: true,
          });
        }}
        onMouseLeave={() => {
          this.setState({
            showDelete: false,
          });
        }}
      >
        {this.state.showDelete && (
          <ConfirmButton
            title="Confirm?"
            content="Delete this file?"
            confirm={{
              textConfirm: 'Delete',
              variantConfirm: 'danger',
              onConfirm: (e) => {
                if (this.props.onDelete) this.props.onDelete(this.props.file);
              },
            }}
            className="position-absolute remove-file"
            style={{ top: '4px', right: '12px' }}
          >
            <Button
              variant="danger"
              className="w-100"
              style={{ lineHeight: 1, padding: '2px' }}
            >
              <TrashIcon />
            </Button>
          </ConfirmButton>
        )}
        {(Array.isArray(this.props.selectedFile)
          ? this.props.selectedFile.filter((e) => e.id === this.props.file.id)
              .length > 0
          : this.props.file.id === this.props.selected?.id) && (
          <Form.Check
            type="checkbox"
            defaultChecked
            className="position-absolute"
            style={{ top: '4px', left: '16px' }}
          />
        )}
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
          {Icon(this.props.file.mimetype).component}
          <TitleFile title={this.props.file.name} />
        </div>
      </Col>
    );
  }
}
