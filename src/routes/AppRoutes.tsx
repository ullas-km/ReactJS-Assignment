import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login";
import WelcomePage from "../pages/Dashboard";
import ViewStudents from "../pages/ViewStudents";
import StudentsSummary from "../components/StudentsSummary";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import ViewFees from "../pages/ViewFees";
import ViewClasses from "../pages/ViewClasses";
import ViewSections from "../pages/ViewSections";
import TeachersSummary from "../components/TeachersSummary";
import ViewTeachers from "../pages/ViewTeachers";
import SectionsSummary from "../components/SectionSummary";
import ClassesSummary from "../components/ClassesSummary";
import FeesSummary from "../components/FeesSummary";
import SubjectsSummary from "../components/SubjectsSummary";
import ViewSubjects from "../pages/ViewSubjects";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/welcome/*"
        element={
          <ProtectedRoute>
            <WelcomePage />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />

        <Route path="students" element={<StudentsSummary />} />

        <Route path="students/view" element={<ViewStudents />} />
        <Route path="fees" element={<FeesSummary />} />
<Route path="fees/view" element={<ViewFees />} />
<Route path="classes" element={<ClassesSummary />} />
<Route path="classes/view" element={<ViewClasses />} />
<Route path="teachers" element={<TeachersSummary />} />
<Route path="teachers/view" element={<ViewTeachers />} />
<Route path="sections" element={<SectionsSummary />} />
<Route path="sections/view" element={<ViewSections />} />
<Route
  path="subjects"
  element={<SubjectsSummary />}
/>

<Route
  path="subjects/view"
  element={<ViewSubjects />}
/>

        
      </Route>
      

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
