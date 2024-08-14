import React, { JSXElementConstructor, ReactElement } from 'react';
import { OverlayTrigger, Tooltip as TooltipBootstrap } from 'react-bootstrap';

const Tooltip = ({
  id,
  children,
  title,
}: {
  id: string;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  title: string;
}) => (
  <OverlayTrigger
    overlay={<TooltipBootstrap id={id}>{title}</TooltipBootstrap>}
  >
    {children}
  </OverlayTrigger>
);

const TitleFile = ({
  title,
  style,
}: {
  title: string;
  style?: React.CSSProperties;
}) => {
  return (
    <Tooltip id={title} title={title}>
      <span
        className="text-center"
        style={{
          width: '100%',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          ...style,
        }}
      >
        {title}
      </span>
    </Tooltip>
  );
};

export default TitleFile;
