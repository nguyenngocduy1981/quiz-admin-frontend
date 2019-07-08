import React from 'react';
import { Link } from 'react-router-dom';
import {REPORT} from '../../constants/routers';
import { LINKS } from '../../constants/questions';

const ReportLink = () => (
  <Link className="m-l-10 router-link btn" to={REPORT}>
    {LINKS.report}
  </Link>
);

export default ReportLink;
