"use client";

import { useRef, useState } from "react";
import { uploadMedia } from "@/lib/upload-action";

export default function SingleImage({ name = "coverUrl", initial = "", folder = "writing", label = "Cover image" }) {
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
      fd.append("folder", folder);
      const result = await uploadMedia(fd);
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
    <div className="admin-field">
      <span>{label}</span>
      <input type="hidden" name={name} value={url} />
      {url ? (
        <figure className="admin-thumb">
          <img src={url} alt="" />
          <button type="button" className="admin-mini is-danger" onClick={() => setUrl("")}>Remove</button>
        </figure>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => handleFile(e.target.files?.[0])}
        disabled={busy}
      />
      <small className="admin-hint">{busy ? "Uploading…" : "PNG, JPG or WebP up to 5MB."}</small>
      {error ? <small className="admin-error">{error}</small> : null}
    </div>
  );
}
