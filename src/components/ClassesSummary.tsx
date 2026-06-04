import { useEffect, useState } from "react";
import { getClassStats } from "../services/ClassesApi";
import withLoading from "../hoc/withLoading";

function ClassesSummary() {
  const [stats, setStats] = useState({
    total: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const data = await getClassStats();
    setStats(data);
  };

  return (
    <div className="students-page">
      <div className="students-header">
        <h2>Classes Dashboard</h2>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Classes</h3>
          <p>{stats.total}</p>
        </div>
      </div>
    </div>
  );
}

export default withLoading(
  ClassesSummary
);