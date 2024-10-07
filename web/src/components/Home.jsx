import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("/secure/entries")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((fetchedEntries) => {
        setEntries(fetchedEntries);
      })
      .catch((error) => {
        console.error("Error fetching entries", error);
        alert("Unable to load entries");
      });
  }, []);

  return (
    <div>
      <h1>Journal Entries</h1>
      <Link to="/new" className="btn btn-primary mb-3">
        New Entry
      </Link>
      <ul className="list-group">
        {entries.map((entry) => (
          <li key={entry._id} className="list-group-item">
            <Link to={`/read/${entry._id}`} className="h5 text-decoration-none">
              {entry.title}
            </Link>
            <p>{entry.body.substring(0, 100)}...</p>
            <small>Created on: {entry.createdDate}</small>
            <Link to={`/edit/${entry._id}`} className="btn btn-link">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
