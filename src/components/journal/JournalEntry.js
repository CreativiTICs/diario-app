import React from "react";

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://iwa-network.org/wp-content/uploads/2019/07/everglades-73423_1920-1024x683.jpg)",
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">Un Nuevo Día</p>
        <p className="journal__entry-content">
          Ex qui et reprehenderit incididunt amet voluptate.
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Lunes</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
