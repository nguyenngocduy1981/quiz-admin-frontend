import React from 'react';
import {Link} from 'react-router-dom';
import {SECTION_R} from '../../constants/routers';
import {LINKS} from '../../constants/questions';

const ViewSectionLink = ({catId}) => (
  <Link className="router-link btn" to={`${SECTION_R}/${catId}`}>{LINKS.dm}</Link>
);

export default ViewSectionLink;
