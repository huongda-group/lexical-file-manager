import { Mimetype } from 'element';
import React, { ElementType, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Icon } from 'utils';
import { Eye as EyeIcon } from 'react-bootstrap-icons';

export type Props = {
  mimetype: Mimetype;
  title: string;
  url: string;
};

const IconFile = ({ mimetype, title, url }: Props) => {
  const [openPreview, setOpenPreview] = useState(false);
  return (
    <div className="position-relative p-2 border rounded">
      {!Icon(mimetype).isOther && (
        <Button
          className="view-icon d-flex align-items-center justify-content-center"
          onClick={() => {
            setOpenPreview(true);
          }}
        >
          <EyeIcon />
        </Button>
      )}
      {Icon(mimetype).component}
      <Modal
        show={openPreview}
        onHide={() => {
          setOpenPreview(false);
        }}
        dialogClassName="panel rounded"
        centered
      >
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center w-100">
            {Icon(mimetype).type === 'image' && (
              <img src={url} className="w-100 h-100" />
            )}
            {Icon(mimetype).type === 'audio' && (
              <audio controls>
                <source src={url} type={mimetype} />
              </audio>
            )}
            {Icon(mimetype).type === 'video' && (
              <video className="w-100 h-100" controls>
                <source src={url} type={mimetype} />
              </video>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default IconFile;
