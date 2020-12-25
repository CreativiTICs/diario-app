import React from "react";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Algún título asombroso"
          className="notes__title-input"
          autoComplete="off"
        />
        <textarea
          placeholder="¿Qué pasó hoy?"
          className="notes__textarea"
        ></textarea>
        <div className="notes__image">
          <img
            src="https://s3-us-west-2.amazonaws.com/melingoimages/Images/54372.jpg"
            alt="Mujer pintando en Paisaje"
          />
        </div>
      </div>
    </div>
  );
};
