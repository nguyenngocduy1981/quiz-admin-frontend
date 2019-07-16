import React from 'react';
import './style.scss';
import {Link} from "react-router-dom";

export default function NotFound() {
  return (
    <article className={'not-found-page'}>
      <Link className="router-link" to={'/'}>HOME</Link>
      <h1>Page not found.</h1>
    </article>
  );
}
