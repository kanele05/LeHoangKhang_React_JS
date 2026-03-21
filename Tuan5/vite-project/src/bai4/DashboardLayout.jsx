import { NavLink, Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <section className="panel">
      <p className="eyebrow">Bai 4</p>
      <h2>Dashboard</h2>
      <div className="dashboard-layout">
        <aside className="dashboard-menu">
          <NavLink end to="/dashboard/profile">
            Profile
          </NavLink>
          <NavLink to="/dashboard/orders">Orders</NavLink>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </aside>

        <div className="dashboard-panel">
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default DashboardLayout
