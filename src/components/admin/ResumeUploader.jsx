"use client";

import { useRef, useState } from "react";
import { uploadResume } from "@/lib/upload-action";

export default function ResumeUploader({ name = "resumeUrl", initial = "" }) {
  const [url, setUrl] = useState(initial || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "resume");
      const result = await uploadResume(fd);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setUrl(result.url);
    } catch {
      setError("Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="admin-resume">
      <input type="hidden" name={name} value={url} />
      {url ? (
        <a className="text-link" href={url} target="_blank" rel="noreferrer">Current résumé ↗</a>
      ) : (
        <span className="admin-hint">No résumé uploaded yet.</span>
      )}
      <div className="admin-resume-row">
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => handleFile(e.target.files?.[0])}
          disabled={busy}
        />
        {url ? <button type="button" className="admin-mini is-danger" onClick={() => setUrl("")}>Remove</button> : null}
      </div>
      <small className="admin-hint">{busy ? "Uploading…" : "PDF up to 10MB."}</small>
      {error ? <small className="admin-error">{error}</small> : null}
    </div>
  );
}
