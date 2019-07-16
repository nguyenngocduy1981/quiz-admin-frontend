import React from 'react';
import {Link} from 'react-router-dom';
import {CATEGORY} from '../../constants/routers';
import {LINKS} from '../../constants/questions';

const CategoryLink = () => (
  <Link className="router-link btn" to={CATEGORY}>{LINKS.category}</Link>
);

export default CategoryLink;
