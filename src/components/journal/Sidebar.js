import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { starLogout } from "../../actions/auth";
import { starNewNote } from "../../actions/notes";
import { JournalEntries } from "./JournalEntries";

export const Sidebar = () => {
  const dispatch = useDispatch();
  //useSelector se usa para traer propiedades del state
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(starLogout());
  };

  const handleAddNew = () => {
    dispatch(starNewNote());
  }

  return (
    <div>
      <aside className="journal__sidebar">
        <div className="journal__sidebar-navbar">
          <h3 className="mt-5">
            <i className="far fa-moon"></i>
            <span>{name}</span>
          </h3>
          <button className="btn" onClick={handleLogout}>
            Salir
          </button>
        </div>
        <div className="journal__new-entry" onClick={handleAddNew} >
          <i className="far fa-calendar-plus fa-5x"></i>
          <p className="mt-5"> Nueva Entrada</p>
        </div>
        <JournalEntries />
      </aside>
    </div>
  );
};
