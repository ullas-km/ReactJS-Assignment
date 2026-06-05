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
import RoleRoute from "./RoleRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
  element={
    <ProtectedRoute>
      <WelcomePage />
    </ProtectedRoute>
  }
>
  <Route path="/home" element={<Home />} />

  <Route path="/students"  element={
    <RoleRoute allowedRoles={["admin"]}>
      <StudentsSummary loading={false} />
    </RoleRoute>
  } />
  <Route path="/students/view" element={
    <RoleRoute allowedRoles={["admin"]}>
      <ViewStudents />
    </RoleRoute>
  } />

  <Route path="/fees" element={
    <RoleRoute allowedRoles={["admin"]}>
      <FeesSummary loading={false} />
    </RoleRoute>
  } />
  <Route path="/fees/view" element={
    <RoleRoute allowedRoles={["admin"]}>
      <ViewFees />
    </RoleRoute>
  } />

  <Route path="/classes" element={
    <RoleRoute allowedRoles={["admin"]}>
      <ClassesSummary loading={false} />
    </RoleRoute>
  } />
  <Route path="/classes/view" element={
    <RoleRoute allowedRoles={["admin"]}>
      <ViewClasses />
    </RoleRoute>
  } />

  <Route path="/teachers" element={
    <RoleRoute allowedRoles={["admin"]}>
      <TeachersSummary loading={false} />
    </RoleRoute>
  } />
  <Route path="/teachers/view" element={
    <RoleRoute allowedRoles={["admin"]}>
      <ViewTeachers />
    </RoleRoute>
  } />

  <Route path="/sections" element={
    <RoleRoute allowedRoles={["admin"]}>
      <SectionsSummary loading={false} />
    </RoleRoute>
  } />
  <Route path="/sections/view" element={
    <RoleRoute allowedRoles={["admin"]}>
      <ViewSections />
    </RoleRoute>
  } />

  <Route path="/subjects" element={
    <RoleRoute allowedRoles={["admin"]}>
      <SubjectsSummary loading={false} />
    </RoleRoute>
  } />
  <Route path="/subjects/view" element={
    <RoleRoute allowedRoles={["admin"]}>
      <ViewSubjects />
    </RoleRoute>
  } />
</Route>
      

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
