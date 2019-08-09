import React from 'react';

const Error = ({err}) => (
  <h1>{err ? err : 'Có gì đó sai sai'}</h1>
);

export default Error;
