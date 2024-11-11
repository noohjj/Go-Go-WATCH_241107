import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Go-Go WATCH</title>
    </Helmet>
  );
};

export default PageTitle;
