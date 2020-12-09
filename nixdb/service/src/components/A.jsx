import React from 'react';

export const A = (props) => {
  let params = {
    href: props.href,
  };

  const remote = props.remote === undefined ? true : props.remote;

  if (remote) {
    params["rel"] = "noopener";
    params["target"] = "_blank";
  }

  return (
    <a {...params}>
      {props.children === undefined ? props.href : props.children}
    </a>
  );
};
