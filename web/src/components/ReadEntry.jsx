import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EntryDisplay from "./EntryDisplay";
import { ApiRoutes } from "../config";

function ReadEntry() {
  const { id } = useParams();
  const [initialEntry, setInitialEntry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(ApiRoutes.entry + "/" + id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((fetchedEntry) => setInitialEntry(fetchedEntry))
      .catch((error) => {
        console.error("Error fetching entry", error);
        alert("Entry not found");
        navigate("/");
      });
  }, [id, navigate]);

  return (
    <div>
      <h1>Journal Entry</h1>
      {initialEntry ? (
        <EntryDisplay initialEntry={initialEntry} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ReadEntry;
