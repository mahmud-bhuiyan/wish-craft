import { Helmet } from "react-helmet-async";
import FeatureRequestList from "../components/Feature/FeatureRequestList";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>WishCraft</title>
      </Helmet>

      <div className="max-w-screen-xl mx-auto">
        <FeatureRequestList />
      </div>
    </div>
  );
};

export default Home;
