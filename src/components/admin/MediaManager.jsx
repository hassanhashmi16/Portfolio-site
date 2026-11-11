"use client";

import { useRef, useState } from "react";
import { uploadMedia } from "@/lib/upload-action";

export default function MediaManager({ initial = [], folder = "projects" }) {
  const [images, setImages] = useState(initial);
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
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      setImages((prev) => [...prev, { kind: "image", src: result.url, alt }]);
    } catch {
      setError("Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="admin-field">
      <span>Images (screenshots)</span>
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      {images.length ? (
        <div className="admin-thumbs">
          {images.map((img, i) => (
            <figure className="admin-thumb" key={img.src + i}>
              <img src={img.src} alt={img.alt || ""} />
              <input
                className="admin-input admin-input-mini"
                value={img.alt || ""}
                placeholder="Alt text"
                aria-label="Alt text"
                onChange={(e) =>
                  setImages((prev) => prev.map((item, j) => (j === i ? { ...item, alt: e.target.value } : item)))
                }
              />
              <button
                type="button"
                className="admin-mini is-danger"
                onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
              >
                Remove
              </button>
            </figure>
          ))}
        </div>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => handleFile(e.target.files?.[0])}
        disabled={busy}
      />
      <small className="admin-hint">{busy ? "Uploading…" : "PNG, JPG or WebP up to 5MB. Images appear before the diagram."}</small>
      {error ? <small className="admin-error">{error}</small> : null}
    </div>
  );
}
