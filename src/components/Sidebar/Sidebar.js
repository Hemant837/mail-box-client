import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const startComposing = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <div className="mt-2 w-64 h-max border">
      {/* Compose Button */}
      <button
        className="mt-2 mx-auto border rounded-md block font-semibold p-3 text-black hover:shadow-md"
        onClick={startComposing}
      >
        Compose
      </button>
      <nav className="font-semibold">
        <ul>
          <li className="hover:shadow-md rounded">
            <NavLink to="/dashboard/inbox" className="text-center block p-3">
              Inbox
            </NavLink>
          </li>
          <li className="hover:shadow-md rounded">
            <NavLink to="/dashboard/starred" className="text-center block p-3">
              Starred
            </NavLink>
          </li>
          <li className="hover:shadow-md rounded">
            <NavLink to="/dashboard/sent" className="text-center block p-3">
              Sent
            </NavLink>
          </li>
          <li className="hover:shadow-md rounded">
            <NavLink
              to="/dashboard/important"
              className="text-center block p-3"
            >
              Important
            </NavLink>
          </li>
          <li className="hover:shadow-md rounded">
            <NavLink to="/dashboard/trash" className="text-center block p-3">
              Trash
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
