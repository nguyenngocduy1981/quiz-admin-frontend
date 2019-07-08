import React from 'react';
import './style.scss';
import {Helmet} from 'react-helmet';
import { SECTION_R} from "../../constants/routers";
import {Link} from "react-router-dom";
import {LINKS} from "../../constants/questions";
import AddSectionLink from "../../components/AddSectionLink";
import ReportLink from "../../components/ReportLink";

class HomePage extends React.PureComponent {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <article>
        <Helmet>
          <title>Home page</title>
        </Helmet>
        <div className="home-page">
          <section>
            <Link className="router-link" to={SECTION_R}>{LINKS.dm}</Link>
          </section>
          <section>
            <AddSectionLink />
          </section><section>
            <ReportLink />
          </section>
        </div>
      </article>
    );
  }
}

export default HomePage
