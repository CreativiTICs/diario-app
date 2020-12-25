import React from "react";
import { useDispatch } from "react-redux";

import { starLogout } from "../../actions/auth";
import { JournalEntries } from "./JournalEntries";

export const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(starLogout());
  };

  return (
    <div>
      <aside className="journal__sidebar">
        <div className="journal__sidebar-navbar">
          <h3 className="mt-5">
            <i className="far fa-moon"></i>
            <span> Carlos</span>
          </h3>
          <button className="btn" onClick={handleLogout}>
            Salir
          </button>
        </div>
        <div className="journal__new-entry">
          <i className="far fa-calendar-plus fa-5x"></i>
          <p className="mt-5"> Nueva Entrada</p>
        </div>
        <JournalEntries />
      </aside>
    </div>
  );
};
