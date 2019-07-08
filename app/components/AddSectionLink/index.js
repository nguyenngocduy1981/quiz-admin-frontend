import React from 'react';
import {Link} from 'react-router-dom';
import {SECTION_NEW_R} from '../../constants/routers';
import {LINKS} from '../../constants/questions';

const AddSectionLink = () => (
  <Link className="router-link btn" to={SECTION_NEW_R}>{LINKS.them_dm}</Link>
);

export default AddSectionLink;
