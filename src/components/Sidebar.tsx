// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../assets/css/sidebar.css"
// interface SidebarProps {
//   role: string;
// }

// export default function Sidebar({ role }: SidebarProps) {
//   const [studentOpen, setStudentOpen] = useState(false);
//   const [feesOpen, setFeesOpen] = useState(false);
//   const [classesOpen, setClassesOpen] = useState(false);
//   const [sectionsOpen, setSectionsOpen] = useState(false);
//   const [teachersOpen, setTeachersOpen] = useState(false);
//   const [subjectsOpen, setSubjectsOpen] =
//   useState(false);

//   const navigate = useNavigate();

//   return (
//     <div className="sidebar">
//       <h2>School app</h2>

//       {/* MENU */}
//       <ul className="menu">
//         {/* HOME */}
//         <li>
//           <Link to="/welcome">Home</Link>
//         </li>

//         {/* STUDENTS */}
//         {role === "admin" && (
//           <li>
//             <button
//               onClick={() => {
//                 setStudentOpen(!studentOpen);
//                 navigate("/welcome/students");
//               }}
//             >
//               Students
//             </button>

//             {studentOpen && (
//               <ul className="dropdown-menu">
//                 <li>
//                   <Link to="/welcome/students/view">View Students</Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//         )}

//         {/* FEES */}
// {role === "admin" && (
//   <li>
//     <button
//       onClick={() => {
//         setFeesOpen(!feesOpen);
//         navigate("/welcome/fees");
//       }}
//     >
//       Fees
//     </button>

//     {feesOpen && (
//       <ul className="dropdown-menu">
//         <li>
//           <Link to="/welcome/fees/view">
//             View Fees
//           </Link>
//         </li>
//       </ul>
//     )}
//   </li>
// )}

//         {/* CLASSES */}
//         {role === "admin" && (
//           <li>
//             <button
//   onClick={() => {
//     setClassesOpen(!classesOpen);
//     navigate("/welcome/classes");
//   }}
// >
//   Classes
// </button>

//             {classesOpen && (
//               <ul className="dropdown-menu">
//                 <li>
//                   <Link to="/welcome/classes/view">View Classes</Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//         )}

//         {/* SECTIONS */}
//         {role === "admin" && (
//           <li>
//             <button
//               onClick={() => {
//                 setSectionsOpen(!sectionsOpen);
//                 navigate("/welcome/sections");
//               }}
//             >
//               Sections
//             </button>

//             {sectionsOpen && (
//               <ul className="dropdown-menu">
//                 <li>
//                   <Link to="/welcome/sections/view">View Sections</Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//         )}

//         {/* TEACHERS */}
//         {role === "admin" && (
//           <li>
//             <button
//               onClick={() => {
//                 setTeachersOpen(!teachersOpen);
//                 navigate("/welcome/teachers");
//               }}
//             >
//               Teachers
//             </button>

//             {teachersOpen && (
//               <ul className="dropdown-menu">
//                 <li>
//                   <Link to="/welcome/teachers/view">View Teachers</Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//         )}
//         {/* SUBJECTS */}
// {role === "admin" && (
//   <li>

//     <button
//       onClick={() => {
//         setSubjectsOpen(!subjectsOpen);
//         navigate("/welcome/subjects");
//       }}
//     >
//       Subjects
//     </button>

//     {subjectsOpen && (
//       <ul className="dropdown-menu">

//         <li>
//           <Link to="/welcome/subjects/view">
//             View Subjects
//           </Link>
//         </li>

//       </ul>
//     )}

//   </li>
// )}
//       </ul>

      

//       {/* LOGOUT */}
//       <div className="logout-section">
//         <button
//           onClick={() => {
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//             window.location.href = "/";
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/sidebar.css";

interface SidebarProps {
  role: string;
}

export default function Sidebar({ role }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [studentOpen, setStudentOpen] = useState(false);
  const [feesOpen, setFeesOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [teachersOpen, setTeachersOpen] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);

  const navigate = useNavigate();

  const closeSidebar = () => setMobileOpen(false);

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="mobile-header">
        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
        <h2>School App</h2>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <h2 className="logo">School app</h2>

        <ul className="menu">
          <li>
            <Link to="/welcome" onClick={closeSidebar}>
              Home
            </Link>
          </li>

          {/* STUDENTS */}
          {role === "admin" && (
            <li>
              <button
                onClick={() => {
                  setStudentOpen(!studentOpen);
                  navigate("/welcome/students");
                }}
              >
                Students
              </button>

              {studentOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/welcome/students/view"
                      onClick={closeSidebar}
                    >
                      View Students
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* FEES */}
          {role === "admin" && (
            <li>
              <button
                onClick={() => {
                  setFeesOpen(!feesOpen);
                  navigate("/welcome/fees");
                }}
              >
                Fees
              </button>

              {feesOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/welcome/fees/view" onClick={closeSidebar}>
                      View Fees
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* CLASSES */}
          {role === "admin" && (
            <li>
              <button
                onClick={() => {
                  setClassesOpen(!classesOpen);
                  navigate("/welcome/classes");
                }}
              >
                Classes
              </button>

              {classesOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/welcome/classes/view" onClick={closeSidebar}>
                      View Classes
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* SECTIONS */}
          {role === "admin" && (
            <li>
              <button
                onClick={() => {
                  setSectionsOpen(!sectionsOpen);
                  navigate("/welcome/sections");
                }}
              >
                Sections
              </button>

              {sectionsOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/welcome/sections/view"
                      onClick={closeSidebar}
                    >
                      View Sections
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* TEACHERS */}
          {role === "admin" && (
            <li>
              <button
                onClick={() => {
                  setTeachersOpen(!teachersOpen);
                  navigate("/welcome/teachers");
                }}
              >
                Teachers
              </button>

              {teachersOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/welcome/teachers/view"
                      onClick={closeSidebar}
                    >
                      View Teachers
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* SUBJECTS */}
          {role === "admin" && (
            <li>
              <button
                onClick={() => {
                  setSubjectsOpen(!subjectsOpen);
                  navigate("/welcome/subjects");
                }}
              >
                Subjects
              </button>

              {subjectsOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/welcome/subjects/view"
                      onClick={closeSidebar}
                    >
                      View Subjects
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>

        {/* LOGOUT */}
        <div className="logout-section">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}