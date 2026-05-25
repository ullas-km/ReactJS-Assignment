import { useEffect, useState } from "react";
import { getTeacherStats } from "../services/TeacherApi";

export default function TeachersSummary() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const data = await getTeacherStats();
    setStats(data);
  };

  return (
    <div className="students-page">
      <div className="students-header">
        <h2>Teachers Dashboard</h2>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Teachers</h3>
          <p>{stats.total}</p>
        </div>

        <div className="card">
          <h3>Active Teachers</h3>
          <p>{stats.active}</p>
        </div>
      </div>
    </div>
  );
}