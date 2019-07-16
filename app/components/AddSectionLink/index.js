import React from 'react';
import {Link} from 'react-router-dom';
import {SECTION_NEW_R} from '../../constants/routers';
import {LINKS} from '../../constants/questions';

const AddSectionLink = ({catId, childCatId}) => (
  <Link className="router-link btn" to={`${SECTION_NEW_R}/${catId}/${childCatId}`}>{LINKS.them_sec}</Link>
);

export default AddSectionLink;
