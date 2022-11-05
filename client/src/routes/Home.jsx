import Header from "../components/Header";
import AddRestaurant from "../components/Addrestaurant";
import RestaurantList from "../components/RestaurantList";

const Home = () => {
  return (
    <div>
        <Header />
        <AddRestaurant />
        <RestaurantList />
    </div>
  );
};

export default Home;