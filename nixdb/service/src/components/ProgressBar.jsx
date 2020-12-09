import React from 'react';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';

export const ProgressBar = (props) => (
  <BootstrapProgressBar
    animated={true}
    label={props.label}
    now={100 * Math.random()}
    variant={props.variant}
    striped={true}
  />
)
