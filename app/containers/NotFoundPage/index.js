import React from 'react';
import './style.scss';
import {Link} from "react-router-dom";
import {ADMIN_HOME} from "../../constants/routers";

export default function NotFound() {
  return (
    <article className={'not-found-page'}>
      <h1>Page not found.</h1>
    </article>
  );
}
