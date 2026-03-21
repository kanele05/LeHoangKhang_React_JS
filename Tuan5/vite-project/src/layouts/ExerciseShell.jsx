function ExerciseShell({ title, subtitle, children }) {
  return (
    <div className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">React Router - Buoi 5</p>
          <h1>{title}</h1>
          <p className="lead">{subtitle}</p>
        </div>
      </header>

      <main className="page-content">{children}</main>
    </div>
  )
}

export default ExerciseShell
