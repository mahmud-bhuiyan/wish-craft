import { Helmet } from "react-helmet-async";
import FeatureRequestList from "../components/FeatureRequest/FeatureRequestList";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <FeatureRequestList />
    </div>
  );
};

export default Home;
