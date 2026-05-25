import { useEffect, useState } from "react";
import { getSections } from "../services/SectionApi";

export default function SectionsSummary() {
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const data = await getSections();
      setSections(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="students-page">
      <div className="students-header">
        <h2>Sections Dashboard</h2>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Sections</h3>
          <p>{sections.length}</p>
        </div>

        <div className="card">
          <h3>Active Sections</h3>
          <p>{sections.length}</p> {/* later you can add status logic */}
        </div>
      </div>
    </div>
  );
}