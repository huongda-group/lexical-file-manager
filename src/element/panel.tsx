import React from 'react';
import { Button, Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import { FileItem, PanelProps, PanelState } from './index';
import {
  Upload as UploadIcon,
  FileEarmark as FileEarmarkIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Trash as TrashIcon,
  Download as DownloadIcon,
} from 'react-bootstrap-icons';
import FileComponent from './file';
import ConfirmButton from 'components/button/ConfirmButton';
import { isEqual } from 'lodash';

export default class PanelComponent extends React.Component<
  PanelProps,
  PanelState
> {
  initHelperText: { variant: 'info' | 'error'; message: string } = {
    variant: 'info',
    message: `Drop file${
      this.props.upload?.multiple ? '(s)' : ''
    } to panel to upload`,
  };
  constructor(props: PanelProps) {
    super(props);

    this.state = {
      files: props.files,
      selected: null,
      selectedFile: this.props.multiple ? [] : null,
      showDeleteSelected: false,
      helperText: this.initHelperText,
      dragging: false,
    };
  }

  componentDidUpdate(prevProps: PanelProps, prevState: PanelState) {
    if (!isEqual(prevProps.files, this.props.files)) {
      this.setState({
        files: this.props.files,
      });
    }
    if (
      prevState.selected !== this.state.selected ||
      prevState.selected?.id !== this.state.selected?.id
    ) {
      this.setState({
        showDeleteSelected: false,
      });
    }
  }

  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
    this.setState({
      selected: null,
    });
  };

  handleSelectedFile = (f: FileItem | null, current: FileItem) => {
    let temp = this.state.selectedFile;
    if (f === null) {
      if (this.props.multiple && Array.isArray(temp)) {
        temp = temp.filter((item) => item.id !== current.id);
      } else {
        temp = f;
      }
    } else {
      if (this.props.multiple && Array.isArray(temp)) {
        if (temp.filter((item) => item.id === current.id).length > 0) {
          temp = temp.filter((item) => item.id !== current.id);
        } else {
          temp = temp.concat(f);
        }
      } else {
        temp = f;
      }
    }

    return Array.isArray(temp) ? temp.sort((a, b) => a.index - b.index) : temp;
  };

  render() {
    if (this.props.show) {
      return (
        <Modal
          show={true}
          onHide={this.handleClose}
          dialogClassName="panel rounded"
          fullscreen
        >
          <Modal.Header>
            <Modal.Title className="w-100">
              <Container fluid>
                <Row>
                  <Col xs={8}>
                    <p className="text-start">
                      {this.props.title ?? 'File Manager'}
                    </p>
                  </Col>
                  <Col xs={4} className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      className=" d-flex justify-content-between align-items-center"
                    >
                      <UploadIcon className="me-2" />
                      <p className="text-start">Upload</p>
                      <input
                        type="file"
                        style={{
                          opacity: 0,
                          position: 'absolute',
                          width: '100%',
                        }}
                        multiple={this.props.upload?.multiple ?? false}
                        onChange={(e) => {
                          if (e.target.files && this.props.upload) {
                            this.props.upload.onUpload(
                              (this.props.upload.multiple
                                ? e.target.files
                                : e.target.files?.[0]) as FileList
                            );
                          }
                        }}
                      />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="py-0" style={{ position: 'relative' }}>
            <Container fluid className="h-100">
              <Row
                className="h-100"
                onDragEnter={(event) => {
                  event.preventDefault();
                  event.dataTransfer.effectAllowed = 'none';
                  event.dataTransfer.dropEffect = 'none';
                  this.setState({
                    dragging: true,
                  });
                }}
                onDragEnd={(event) => {
                  event.preventDefault();
                  this.setState({
                    dragging: false,
                  });
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  this.setState({
                    dragging: false,
                    helperText: this.initHelperText,
                  });
                  if (this.props.upload && this.props.upload.onUpload) {
                    if (event.dataTransfer.files) {
                      if (this.props.upload.multiple) {
                        this.props.upload.onUpload(event.dataTransfer.files);
                      } else {
                        if (event.dataTransfer.files.length === 1) {
                          this.props.upload.onUpload(
                            event.dataTransfer.files[0] as File | FileList
                          );
                        } else {
                          this.setState({
                            helperText: {
                              variant: 'error',
                              message: 'Allow upload single file',
                            },
                          });
                        }
                      }
                    }
                  }
                }}
                style={{ position: 'relative' }}
              >
                <Col
                  xs={12}
                  md={8}
                  className={`${this.state.dragging ? 'hide-on-drag' : ''}`}
                >
                  <Container fluid className={`overflow-hidden py-3`}>
                    <Row className="gx-3">
                      {this.state.files.map((item: FileItem) => (
                        <FileComponent
                          key={item.id}
                          file={item}
                          selected={this.state.selected}
                          selectedFile={this.state.selectedFile}
                          onDelete={(file) => {
                            if (this.props.onDelete) {
                              this.props.onDelete(file);
                            }
                            this.setState({
                              files: this.state.files.filter(
                                (e) => e.id !== file.id
                              ),
                              selected:
                                file.id === this.state.selected?.id
                                  ? null
                                  : this.state.selected,
                            });
                          }}
                          onSelect={(f) => {
                            this.setState({
                              selected:
                                f === null
                                  ? item.id === this.state.selected?.id
                                    ? null
                                    : this.state.selected
                                  : f,
                              selectedFile: this.handleSelectedFile(f, item),
                            });
                          }}
                        />
                      ))}
                    </Row>
                  </Container>
                </Col>
                <Col
                  xs={12}
                  md={4}
                  className={`border-start py-3 d-flex flex-column justify-content-between ${
                    this.state.dragging ? 'hide-on-drag' : ''
                  }`}
                >
                  <div className="d-flex flex-column">
                    <div className="file-selected d-flex flex-column justify-content-center align-items-center">
                      {this.state.selected && (
                        <>
                          {this.props.multiple &&
                            Array.isArray(this.state.selectedFile) && (
                              <div className="d-flex w-100 align-items-baseline">
                                <Button
                                  variant="primary"
                                  className="me-2"
                                  disabled={
                                    this.state.selectedFile?.indexOf(
                                      this.state.selected
                                    ) === 0
                                  }
                                  onClick={() => {
                                    if (
                                      Array.isArray(this.state.selectedFile) &&
                                      this.state.selected
                                    ) {
                                      this.setState({
                                        selected:
                                          this.state.selectedFile?.[
                                            this.state.selectedFile?.indexOf(
                                              this.state.selected
                                            ) - 1
                                          ],
                                      });
                                    }
                                  }}
                                >
                                  <ChevronLeftIcon />
                                </Button>
                                <Button
                                  variant="primary"
                                  className="me-2"
                                  disabled={
                                    this.state.selectedFile?.indexOf(
                                      this.state.selected
                                    ) ===
                                    this.state.selectedFile.length - 1
                                  }
                                  onClick={() => {
                                    if (
                                      Array.isArray(this.state.selectedFile) &&
                                      this.state.selected
                                    ) {
                                      this.setState({
                                        selected:
                                          this.state.selectedFile?.[
                                            this.state.selectedFile?.indexOf(
                                              this.state.selected
                                            ) + 1
                                          ],
                                      });
                                    }
                                  }}
                                >
                                  <ChevronRightIcon />
                                </Button>
                                <p className="text-start">
                                  {this.state.selectedFile.indexOf(
                                    this.state.selected
                                  ) + 1}{' '}
                                  / {this.state.selectedFile.length} files
                                </p>
                              </div>
                            )}
                          {this.state.selected.thumbnail ? (
                            <div
                              className="rounded file-icon"
                              style={{
                                width: '100px',
                                height: '100px',
                                background: `url(${this.state.selected.thumbnail}) center center no-repeat`,
                                backgroundSize: 'cover',
                              }}
                            ></div>
                          ) : (
                            <FileEarmarkIcon className="file-icon" />
                          )}
                          <p className="text-center">
                            {this.state.selected.name}
                          </p>
                        </>
                      )}
                      {!this.state.selected && (
                        <p className="text-center">
                          Select file(s) to view detail
                        </p>
                      )}
                    </div>
                  </div>
                  {this.state.selected && (
                    <Container>
                      <Row className="justify-content-end gx-3">
                        <ConfirmButton
                          title="Confirm?"
                          show={this.state.showDeleteSelected}
                          content="Delete this file?"
                          confirm={{
                            textConfirm: 'Delete',
                            variantConfirm: 'danger',
                            onConfirm: () => {
                              if (this.props.onDelete && this.state.selected) {
                                this.props.onDelete(this.state.selected);
                              }
                              this.setState({
                                files: this.state.files.filter(
                                  (e) => e.id !== this.state.selected?.id
                                ),
                                selected: null,
                              });
                            },
                          }}
                          className="col-2 me-2 me-md-0 me-lg-2 mt-2 p-0"
                        >
                          <Button
                            variant="danger"
                            className="w-100"
                            onClick={() => {
                              this.setState({
                                showDeleteSelected: true,
                              });
                            }}
                          >
                            Delete
                          </Button>
                        </ConfirmButton>
                        <Button
                          variant="primary"
                          className="col-3 mt-2"
                          href={this.state.selected.url}
                          target="_blank"
                          //@ts-ignore
                          download={this.state.selected.name}
                        >
                          Download
                        </Button>
                      </Row>
                    </Container>
                  )}
                </Col>
                <Container
                  fluid
                  className={`h-100 d-flex justify-content-center align-items-center ${
                    this.state.dragging ? 'show-on-drag' : 'hide-on-drag'
                  }`}
                  style={{ position: 'relative' }}
                >
                  <p
                    className="text-center font-weight-bold"
                    style={{ fontSize: '22px' }}
                  >
                    Drop {this.props.upload.multiple ? 'files' : 'file'} to
                    upload
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      this.setState({
                        dragging: false,
                      });
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                    }}
                  >
                    Cancel
                  </Button>
                </Container>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer className="justify-content-between">
            <div
              className="d-flex"
              style={{
                fontStyle: 'italic',
                color:
                  this.state.helperText.variant === 'error' ? 'red' : 'unset',
              }}
            >
              {this.state.helperText?.message}
            </div>
            <div className="d-flex">
              <Button
                variant="primary"
                className="me-2"
                disabled={
                  this.state.selectedFile === null ||
                  (Array.isArray(this.state.selectedFile) &&
                    this.state.selectedFile.length === 0)
                }
                onClick={() => {
                  if (this.props.onInsert && this.state.selectedFile !== null) {
                    this.props.onInsert(this.state.selectedFile);
                  }
                }}
              >
                Insert
              </Button>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      );
    }

    return <></>;
  }
}
