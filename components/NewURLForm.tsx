"use client";
import createNewURL from "@/lib/createNewURL";
import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";

export default function NewURLForm() {
  const [alias, setAlias] = useState("");
  const [url, setUrl] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState("");

  return (
    <form
      className="w-96 rounded-xl p-4 bg-sky-300"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        setShortURL("");

        createNewURL(alias, url)
          .then((newURL) => {
            setShortURL(window.location.href + "r/" + newURL.alias); //Had to look this up. This gets the current address window.location.href
          })
          .catch((err) => setError(err.message));

        }}
        >

      <TextField
        variant="filled"
        sx={{ backgroundColor: "white", width: "100%" }}
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <TextField
        sx={{
          padding: "0.5rem",
          height: "100px",
          width: "100%",
          borderRadius: 0,
        }}
        variant="filled"
        label = "Alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
      />
      
      <FormHelperText>Enter URL and Alias</FormHelperText>

      <div className="w-full flex justify-center">
        <Button
          sx={{ width: "80px" }}
          variant="contained"
          type="submit"
          disabled={alias === "" || url === ""}
        >
          Create
        </Button>
        
      </div>


      {error && <p className="text-red-600">{error}</p>}

      {shortURL && (
        <div>
          <p>URL:</p>
          <a href={shortURL}>{shortURL}</a>
        </div>
      )}

    </form>
  );
}