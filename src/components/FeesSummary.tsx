import { useEffect, useState } from "react";
import { getFeeStats } from "../services/FeesApi";
import withLoading from "../hoc/withLoading";

import "../assets/css/feesummary.css";

function FeesSummary() {
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    overdue: 0,
  });

  const fetchStats = async () => {
    const data = await getFeeStats();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="students-page">
      <div className="students-header">
        <h2>Fees Dashboard</h2>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Fees</h3>
          <p>{stats.total}</p>
        </div>

        <div className="card">
          <h3>Paid</h3>
          <p>{stats.paid}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>

        <div className="card">
          <h3>Overdue</h3>
          <p>{stats.overdue}</p>
        </div>
      </div>
    </div>
  );
}

export default withLoading(FeesSummary);
