import { Mimetype } from 'element';
import React from 'react';
import {
  FileEarmark as FileEarmarkIcon,
  FileEarmarkImage as FileEarmarkImageIcon,
  FileEarmarkMusic as FileEarmarkMusicIcon,
  FileEarmarkPlay as FileEarmarkPlayIcon,
  Eye as EyeIcon,
} from 'react-bootstrap-icons';

const mimeTypePattern = /^image\/(jpeg|jpg|png|gif|bmp|webp|tiff|svg\+xml)$/;
const audioMimeTypeRegex = /^audio\/(?:mpeg|wav|aac|ogg|flac|mp4|webm)$/i;
const videoMimeTypeRegex =
  /^video\/(?:mp4|webm|ogg|quicktime|x-matroska|avi|mpeg|3gpp|3gpp2)$/i;

export const Icon = (mimetype: Mimetype) => {
  let component = <FileEarmarkIcon className="file-icon" />;
  let isOther = true;
  let type: 'image' | 'video' | 'audio' | 'file' = 'file';
  if (mimeTypePattern.test(mimetype)) {
    component = <FileEarmarkImageIcon className="file-icon" />;
    isOther = false;
    type = 'image';
  }
  if (audioMimeTypeRegex.test(mimetype)) {
    component = <FileEarmarkMusicIcon className="file-icon" />;
    isOther = false;
    type = 'audio';
  }
  if (videoMimeTypeRegex.test(mimetype)) {
    component = <FileEarmarkPlayIcon className="file-icon" />;
    isOther = false;
    type = 'video';
  }
  return {
    component,
    isOther,
    type,
  };
};
