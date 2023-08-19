export function UserListItem({ user }) {
  return (
    <li 
    className="list-group-item list-group-item-action" >
        {user.username}
    </li>
  );
}
