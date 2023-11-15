import "./home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Widget from "../../components/widget/Widget";
import FeatureChart from "../../components/feature/FeatureChart";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="users" />
          <Widget type="product" />
          <Widget type="earnings" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <FeatureChart />
          <Chart title="Last 6 months revenue" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
