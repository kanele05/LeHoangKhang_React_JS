import { Navigate, Route, Routes } from 'react-router-dom'
import ExerciseShell from '../layouts/ExerciseShell'
import DashboardInfo from './DashboardInfo'
import DashboardLayout from './DashboardLayout'

function Bai4() {
  return (
    <ExerciseShell
      subtitle="Bai 4: Nested routes voi dashboard va Outlet."
      title="Bai 4 - Nested Routes"
    >
      <Routes>
        <Route element={<Navigate replace to="/dashboard" />} path="/" />
        <Route element={<DashboardLayout />} path="/dashboard">
          <Route element={<Navigate replace to="profile" />} index />
          <Route
            element={
              <DashboardInfo
                description="Nested route dau tien trong dashboard."
                title="Dashboard Profile"
              />
            }
            path="profile"
          />
          <Route
            element={
              <DashboardInfo
                description="Section nay minh hoa viec route con duoc render qua Outlet."
                title="Dashboard Orders"
              />
            }
            path="orders"
          />
          <Route
            element={
              <DashboardInfo
                description="Settings la route long nhau cuoi cung trong bai 4."
                title="Dashboard Settings"
              />
            }
            path="settings"
          />
        </Route>
      </Routes>
    </ExerciseShell>
  )
}

export default Bai4
