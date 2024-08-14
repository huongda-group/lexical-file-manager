import { Mimetype } from 'element';
import React, { ElementType } from 'react';
import { Button } from 'react-bootstrap';
import {
  FileEarmark as FileEarmarkIcon,
  FileEarmarkImage as FileEarmarkImageIcon,
  Eye as EyeIcon,
} from 'react-bootstrap-icons';

export type Props = {
  mimetype: Mimetype;
};

const mimeTypePattern = /^image\/(jpeg|jpg|png|gif|bmp|webp|tiff|svg\+xml)$/;

const Icon = (mimetype: Mimetype) => {
  if (mimeTypePattern.test(mimetype))
    return <FileEarmarkImageIcon className="file-icon" />;
  return <FileEarmarkIcon className="file-icon" />;
};

const IconFile = ({ mimetype }: Props) => {
  return (
    <div className="position-relative">
      <Button className="view-icon">
        <EyeIcon />
      </Button>
      {Icon(mimetype)}
    </div>
  );
};

export default IconFile;
