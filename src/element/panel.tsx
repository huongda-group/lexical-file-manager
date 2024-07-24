import React from 'react';
import { Button, Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import { File, PanelProps, PanelState } from './index';
import {
  Upload as UploadIcon,
  FileEarmark as FileEarmarkIcon,
} from 'react-bootstrap-icons';
import FileComponent from './file';

export default class PanelComponent extends React.Component<
  PanelProps,
  PanelState
> {
  constructor(props: PanelProps) {
    super(props);

    this.state = {
      files: props.files,
      selected: null,
    };
  }

  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
    this.setState({
      selected: null,
    });
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
                    <p className="text-start">File Manager</p>
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
                          onSelect={() => {
                            this.setState({
                              selected: item,
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
                          <FileEarmarkIcon />
                          <p className="text-center">
                            {this.state.selected.name}
                          </p>
                        </div>
                      </div>
                      <Container>
                        <Row className="justify-content-end gx-3">
                          <Button
                            variant="primary"
                            className="col-3 col-md-4 col-lg-3 me-2 mt-2"
                            onClick={() => {
                              if (this.props.onInsert) {
                                this.props.onInsert(
                                  this.state.selected as File
                                );
                              }
                            }}
                          >
                            Insert
                          </Button>
                          <Button
                            variant="danger"
                            className="col-3 col-md-4 col-lg-3 me-2 me-md-0 me-lg-2 mt-2"
                            onClick={() => {
                              if (this.props.onDelete && this.state.selected) {
                                this.props.onDelete(this.state.selected);
                              }
                              this.setState({
                                files: this.state.files.filter(
                                  (e) => e.id !== this.state.selected?.id
                                ),
                                selected: null,
                              });
                            }}
                          >
                            Delete
                          </Button>
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

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }

    return <></>;
  }
}
