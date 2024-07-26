import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
} from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';

const ConfirmButton = ({
  children,
  title,
  content,
  confirm: { textConfirm, variantConfirm = 'primary', onConfirm },
  placement = 'top',
  className,
  style,
  trigger = 'click',
  show: defaultShow,
}: {
  children: any;
  confirm: {
    textConfirm: string;
    variantConfirm?: string;
    onConfirm: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void | Promise<void>;
  };
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  placement?: Placement;
  className?: string;
  style?: React.CSSProperties;
  trigger?: 'hover' | 'click';
  show?: boolean;
}) => {
  const [show, setShow] = useState(defaultShow ?? false);

  useEffect(() => {
    if (defaultShow !== undefined) setShow(defaultShow);
  }, [defaultShow]);

  const popover = (
    <Popover>
      <Popover.Header as="h3">{title}</Popover.Header>
      <Popover.Body>
        <Container>
          <Row>
            <Col xs={12}>{content}</Col>
            <Col xs={12} className="mt-2 p-0">
              <Container>
                <Row className="gx-3 justify-content-end">
                  <Button
                    variant={variantConfirm}
                    className="col-5 me-2"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await onConfirm(e);
                      setShow(false);
                    }}
                  >
                    {textConfirm}
                  </Button>
                  <Button
                    variant="secondary"
                    className="col-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShow(false);
                    }}
                  >
                    Close
                  </Button>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={trigger}
      {...(trigger === 'click' && { show })}
      placement={placement}
      overlay={popover}
    >
      <div
        {...(className && { className })}
        {...(style && { style })}
        onClick={(e) => {
          e.stopPropagation();
          setShow(true);
        }}
      >
        {children}
      </div>
    </OverlayTrigger>
  );
};

export default ConfirmButton;
