import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import LoginPage from "../pages/Login";
const WelcomePage = lazy(() => import("../pages/Dashboard"));
const ViewStudents = lazy(() => import("../pages/ViewStudents"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ViewFees = lazy(() => import("../pages/ViewFees"));
const ViewClasses = lazy(() => import("../pages/ViewClasses"));
const ViewSections = lazy(() => import("../pages/ViewSections"));
const ViewTeachers = lazy(() => import("../pages/ViewTeachers"));
const ViewSubjects = lazy(() => import("../pages/ViewSubjects"));
const Home = lazy(() => import("../pages/Home"));

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
        <Route path="/" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />

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
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
