import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import LoginPage from "../pages/Login";
import TeacherAddMarks from "../pages/TeacherAddMarks";
import TeacherViewAttendance from "../pages/TeacherViewAttendance";
const WelcomePage = lazy(() => import("../pages/Dashboard"));
const ViewStudents = lazy(() => import("../pages/ViewStudents"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ViewFees = lazy(() => import("../pages/ViewFees"));
const ViewClasses = lazy(() => import("../pages/ViewClasses"));
const ViewSections = lazy(() => import("../pages/ViewSections"));
const ViewTeachers = lazy(() => import("../pages/ViewTeachers"));
const ViewSubjects = lazy(() => import("../pages/ViewSubjects"));
const Home = lazy(() => import("../pages/Home"));
const StudentPayments = lazy(() => import("../pages/StudentPayments"));
const StudentMarks = lazy(() => import("../pages/StudentMarks"));
const StudentTimetable = lazy(() => import("../pages/StudentTimetable"));
const TeacherTimetable = lazy(() => import("../pages/TeacherTimetable"));
const Profile = lazy(() => import("../pages/Profile"));
const TeacherStudents = lazy(() => import("../pages/TeacherStudents"));
const TeacherAttendance = lazy(() => import("../pages/TeacherAttendance"));
const LandingPage = lazy(() => import("../pages/Homepage"));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          <Route
            path="/students"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <ViewStudents />
              </RoleRoute>
            }
          />

          <Route
            path="/fees"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <ViewFees />
              </RoleRoute>
            }
          />

          <Route
            path="/classes"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <ViewClasses />
              </RoleRoute>
            }
          />

          <Route
            path="/teachers"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <ViewTeachers />
              </RoleRoute>
            }
          />

          <Route
            path="/sections"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <ViewSections />
              </RoleRoute>
            }
          />

          <Route
            path="/subjects"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <ViewSubjects />
              </RoleRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentPayments />
              </RoleRoute>
            }
          />

          <Route
            path="/marks"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentMarks />
              </RoleRoute>
            }
          />

          <Route
            path="/timetable"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentTimetable />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher-timetable"
            element={
              <RoleRoute allowedRoles={["teacher"]}>
                <TeacherTimetable />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher-marks"
            element={
              <RoleRoute allowedRoles={["teacher"]}>
                <TeacherAddMarks />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher-students"
            element={
              <RoleRoute allowedRoles={["teacher"]}>
                <TeacherStudents />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher-attendance"
            element={
              <RoleRoute allowedRoles={["teacher"]}>
                <TeacherAttendance />
              </RoleRoute>
            }
          />
          <Route
  path="/teacher-view-attendance"
  element={
    <RoleRoute allowedRoles={["teacher"]}>
      <TeacherViewAttendance />
    </RoleRoute>
  }
/>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
