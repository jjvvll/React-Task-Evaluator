export default function UserButton({ user, selectUser }) {
  return (
    <div>
      <li style={{ marginBottom: "8px" }}>{user.email}</li>
      <button onClick={() => selectUser(user.id)}>Switch to this User</button>
    </div>
  );
}
