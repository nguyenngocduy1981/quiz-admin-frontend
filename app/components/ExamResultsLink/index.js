import React from 'react';
import { Link } from 'react-router-dom';
import {EXAM_RESULTS} from '../../constants/routers';
import { LINKS } from '../../constants/questions';

const ExamResultsLink = () => (
  <Link className="m-l-10 router-link btn" to={EXAM_RESULTS}>
    {LINKS.exam_result}
  </Link>
);

export default ExamResultsLink;
