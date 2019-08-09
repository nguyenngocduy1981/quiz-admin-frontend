import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../constants/routers';
import {LINKS} from "../../constants/questions";

export default function NoPermissionPage() {
  return (
    <article className={'no-per-page'}>
      <Link className="router-link" to={LOGIN}>{LINKS.login}</Link>
      <h1>Trang không tồn tại</h1>
    </article>
  );
}
