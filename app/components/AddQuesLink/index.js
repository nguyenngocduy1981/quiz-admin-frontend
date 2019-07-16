import React from 'react';
import { Link } from 'react-router-dom';
import { QUESTIONS_NEW } from '../../constants/routers';
import { LINKS } from '../../constants/questions';

const AddQuesLink = ({ sectionId, catId, childCatId }) => (
  <Link className="m-l-10 router-link btn" to={`${QUESTIONS_NEW}/${sectionId}/${catId}/${childCatId}`}>
    {LINKS.add_q}
  </Link>
);

export default AddQuesLink;
