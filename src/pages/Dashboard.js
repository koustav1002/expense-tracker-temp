import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Info from "../components/ui/Info";
import Stats from "../components/Stats";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardStats = async () => {
    const URL = null;
    try {
      const { data } = await axios.get(URL);
      setData(data);
      console.log(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Oops!! Seems like there's an error");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDashboardStats();
  }, []);
  return isLoading ? (
    <div className="flex items-center justify-center w-full h-[80vh]">
      <Loader />
    </div>
  ) : (
    <div className="px-0 md:px-5 2xl:px-20">
      <Info title="Dashboard" subtitle="Monitor your financial activities" />
      <Stats />
    </div>
  );
};

export default Dashboard;
