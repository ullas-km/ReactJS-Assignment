import { useEffect, useState } from "react";

import { getSubjects }
from "../services/SubjectApi";

export default function SubjectsSummary() {

  const [subjects, setSubjects] =
    useState<any[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {

    const data = await getSubjects();

    setSubjects(data);
  };

  return (
    <div className="students-page">

      <div className="students-header">
        <h2>Subjects Dashboard</h2>
      </div>

      <div className="dashboard-cards">

        <div className="card">

          <h3>Total Subjects</h3>

          <p>{subjects.length}</p>

        </div>

      </div>

    </div>
  );
}