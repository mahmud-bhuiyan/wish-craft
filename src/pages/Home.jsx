import { Helmet } from "react-helmet-async";
import FeatureRequestList from "../components/Feature/FeatureRequestList";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>WishCraft</title>
      </Helmet>

      <FeatureRequestList />
    </div>
  );
};

export default Home;
