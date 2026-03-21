import { useAppContext } from '../context/useAppContext'

function ProfilePage() {
  const { user } = useAppContext()

  return (
    <section className="panel">
      <p className="eyebrow">Bai 6 + Bai 7</p>
      <h2>Profile</h2>
      <p className="lead">Day la protected route. Ban chi vao duoc sau khi login.</p>
      <div className="card">
        <p>Ten: {user.name}</p>
        <p>Vai tro: {user.role}</p>
      </div>
    </section>
  )
}

export default ProfilePage
