import "./UserButton.css";

export default function UserButton({ user, selectUser }) {
  return (
    <div className="user-item">
      <li className="user-email">{user.email}</li>
      <button className="user-button" onClick={() => selectUser(user.id)}>
        Switch to this User
      </button>
    </div>
  );
}
