import { useCallback, useEffect, useState } from "react";
import { loadUsers } from "./api";
import { Spinner } from "@/shared/components/Spinner";

export function UserList() {
  const [userPage, setUserPage] = useState({
    content: [{ username: "test" }],
    last: false,
    first: false,
    number: 0,
  });
  const [apiProgress, setApiProgress] = useState(false);

  const getUsers = useCallback(async (page) => {
    setApiProgress(true);
    try {
      const response = await loadUsers(page);
      setUserPage(response.data);
    } catch {
    } finally {
      setApiProgress(false)
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="card">
      <div className="card-header text-center fs-4">User List</div>
      <ul className="list-group list-group-flush">
        {userPage.content.map((user) => {
          return (
            <li className="list-group-item list-group-item-action">
              {user.username}
            </li>
          );
        })}
      </ul>
      <div className="card-footer text-center">
        {apiProgress && <Spinner />}
        {!apiProgress && !userPage.first && (
          <button
            className="btn btn-outline-secondary btn-sm float-start"
            onClick={() => getUsers(userPage.number - 1)}
          >
            Previous
          </button>
        )}
        {!apiProgress && !userPage.last && (
          <button
            className="btn btn-outline-secondary btn-sm float-end"
            onClick={() => getUsers(userPage.number + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
