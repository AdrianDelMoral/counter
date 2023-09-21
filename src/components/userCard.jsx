export function UserCard ({ user }) {
  return (
    <div className='listNames'>
      <span>{user.name}</span>
      <span>{user.age}</span>
    </div>
  )
}
