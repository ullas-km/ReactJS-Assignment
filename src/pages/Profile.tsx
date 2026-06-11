import "../assets/css/profile.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-page-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h2>{user.name}</h2>

        <div className="profile-page-info">
          <div className="info-row">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="info-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="info-row">
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>

          {user.role === "student" && (
            <>
              <div className="info-row">
                <span>Admission No</span>
                <strong>{user.admission_no}</strong>
              </div>

              <div className="info-row">
                <span>Class</span>
                <strong>{user.class_name}</strong>
              </div>

              <div className="info-row">
                <span>Section</span>
                <strong>{user.section_name}</strong>
              </div>
            </>
          )}

          {user.role === "teacher" && (
            <>
              <div className="info-row">
                <span>Teacher ID</span>
                <strong>{user.teacher_id}</strong>
              </div>

              <div className="info-row">
                <span>Subject</span>
                <strong>{user.subject_name}</strong>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}