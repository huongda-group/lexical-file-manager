import React from 'react';
import { Button, Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import { File, PanelProps, PanelState } from './index';
import {
  Upload as UploadIcon,
  FileEarmark as FileEarmarkIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from 'react-bootstrap-icons';
import FileComponent from './file';
import ConfirmButton from 'components/button/ConfirmButton';

export default class PanelComponent extends React.Component<
  PanelProps,
  PanelState
> {
  constructor(props: PanelProps) {
    super(props);

    this.state = {
      files: props.files,
      selected: null,
      selectedFile: this.props.multiple ? [] : null,
      showDeleteSelected: false,
      helperText: '',
    };
  }

  componentDidUpdate(prevProps: PanelProps, prevState: PanelState) {
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

  handleSelectedFile = (f: File | null, current: File) => {
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
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="py-0">
            <Container fluid className="h-100">
              <Row className="h-100">
                <Col xs={12} md={8}>
                  <Container fluid className="overflow-hidden py-3">
                    <Row className="gx-3">
                      {this.state.files.map((item: File) => (
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
                  className="border-start py-3 d-flex flex-column justify-content-between"
                >
                  {this.state.selected && (
                    <>
                      <div className="d-flex flex-column">
                        <div className="file-selected d-flex flex-column justify-content-center align-items-center">
                          {Array.isArray(this.state.selectedFile) && (
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
                                background: `url(${this.state.selected.thumbnail}) center center no-repeat`,
                              }}
                            ></div>
                          ) : (
                            <FileEarmarkIcon className="file-icon" />
                          )}
                          <p className="text-center">
                            {this.state.selected.name}
                          </p>
                        </div>
                      </div>
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
                                if (
                                  this.props.onDelete &&
                                  this.state.selected
                                ) {
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
                            className="col-3 col-md-4 col-lg-3 me-2 me-md-0 me-lg-2 mt-2"
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
                            variant="secondary"
                            className="col-3 col-md-4 col-lg-3 mt-2"
                            onClick={() => {
                              this.setState({
                                selected: null,
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        </Row>
                      </Container>
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer className="justify-content-between">
            <div className="d-flex">{this.state.helperText}</div>
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
