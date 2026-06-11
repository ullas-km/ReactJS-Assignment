// import { useState } from "react";
// import { createTimetable } from "../services/timetableApi";

// export default function TeacherTimetable() {
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   const [form, setForm] = useState({
//     class_id: 1,
//     section_id: 1,
//     subject_id: 1,
//     day: "Monday",
//     period: 1,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await createTimetable({
//         ...form,
//         teacher_id: user.teacher_id,
//       });

//       alert("Timetable added successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add timetable");
//     }
//   };

//   return (
//     <div>
//       <h2>Create Timetable</h2>

//       <input name="class_id" placeholder="Class ID" onChange={handleChange} />
//       <input name="section_id" placeholder="Section ID" onChange={handleChange} />
//       <input name="subject_id" placeholder="Subject ID" onChange={handleChange} />

//       <select name="day" onChange={handleChange}>
//         <option>Monday</option>
//         <option>Tuesday</option>
//         <option>Wednesday</option>
//         <option>Thursday</option>
//         <option>Friday</option>
//       </select>

//       <input name="period" placeholder="Period" onChange={handleChange} />

//       <button onClick={handleSubmit}>
//         Add Timetable
//       </button>
//     </div>
//   );
// } 

import { useEffect, useState } from "react";
import { createTimetable } from "../services/timetableApi";
import { getClasses } from "../services/ClassesApi";
import { getSections } from "../services/SectionApi";
import { getSubjects } from "../services/SubjectApi";

type ClassType = { id: number; class_name: string };
type SectionType = { id: number; section_name: string };
type SubjectType = { id: number; subject_name: string };

export default function TeacherTimetable() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [classes, setClasses] = useState<ClassType[]>([]);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);

  const [form, setForm] = useState({
    class_id: "",
    section_id: "",
    subject_id: "",
    day: "Monday",
    period: "1",
  });

  // LOAD MASTER DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        const [c, s, sub] = await Promise.all([
          getClasses(),
          getSections(),
          getSubjects(),
        ]);

        setClasses(c);
        setSections(s);
        setSubjects(sub);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };

    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createTimetable({
        class_id: Number(form.class_id),
        section_id: Number(form.section_id),
        subject_id: Number(form.subject_id),
        teacher_id: user.teacher_id,
        day: form.day,
        period: Number(form.period),
      });

      alert("Timetable added successfully");

      // reset
      setForm({
        class_id: "",
        section_id: "",
        subject_id: "",
        day: "Monday",
        period: "1",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add timetable");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Create Timetable</h2>

      {/* CLASS DROPDOWN */}
      <select name="class_id" onChange={handleChange} value={form.class_id}>
        <option value="">Select Class</option>
        {classes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.class_name}
          </option>
        ))}
      </select>

      {/* SECTION DROPDOWN */}
      <select name="section_id" onChange={handleChange} value={form.section_id}>
        <option value="">Select Section</option>
        {sections.map((s) => (
          <option key={s.id} value={s.id}>
            {s.section_name}
          </option>
        ))}
      </select>

      {/* SUBJECT DROPDOWN */}
      <select name="subject_id" onChange={handleChange} value={form.subject_id}>
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.subject_name}
          </option>
        ))}
      </select>

      {/* DAY */}
      <select name="day" onChange={handleChange} value={form.day}>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
      </select>

      {/* PERIOD */}
      <select name="period" onChange={handleChange} value={form.period}>
        <option value="1">Period 1</option>
        <option value="2">Period 2</option>
        <option value="3">Period 3</option>
        <option value="4">Period 4</option>
        <option value="5">Period 5</option>
      </select>

      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Add Timetable
      </button>
    </div>
  );
}