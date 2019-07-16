import React from 'react';
import './style.scss';
import {Helmet} from 'react-helmet';
import {SECTION_R} from "../../constants/routers";
import {Link} from "react-router-dom";
import {LINKS} from "../../constants/questions";
import ReportLink from "../../components/ReportLink";
import ExamResultsLink from "../../components/ExamResultsLink";
import CategoryLink from "../../components/CategoryLink";

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
            <CategoryLink />
          </section>
          <section>
            <Link className="router-link" to={SECTION_R}>{LINKS.section}</Link>
          </section>
          <section>
            <ReportLink/>
          </section>
          <section>
            <ExamResultsLink/>
          </section>
        </div>
      </article>
    );
  }
}

export default HomePage
