import React from 'react';

export const A = (props) => (
  <a
    href={props.href}
    rel="noopener"
    target="_blank"
  >
    {props.children === undefined ? props.href : props.children}
  </a>
)
