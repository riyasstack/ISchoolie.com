"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "../ui";
import { profileImageError } from "../../../../../packages/contracts/profile-media";
export function ProfileMedia({ visible }: { visible: boolean }) {
  const [images, setImages] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const owned = useRef(new Set<string>());
  const revision = useRef({value:0});
  const currentImages = useRef<Record<string, string>>({});
  useEffect(() => {
    const urls = owned.current;
    const lifecycle = revision.current;
    return () => {
      lifecycle.value++;
      for (const url of urls) URL.revokeObjectURL(url);
      urls.clear();
    };
  }, []);
  async function select(key: string, file: File | undefined) {
    if (!file) return;
    const current = ++revision.current.value;
    let invalid = profileImageError(file.type, file.size);
    if (!invalid)
      invalid = profileImageError(
        file.type,
        file.size,
        new Uint8Array(await file.slice(0, 8).arrayBuffer()),
      );
    if (current !== revision.current.value) return;
    if (invalid) {
      setError(invalid);
      return;
    }
    const previous = currentImages.current[key];
    if (previous) {
      URL.revokeObjectURL(previous);
      owned.current.delete(previous);
    }
    const url = URL.createObjectURL(file);
    owned.current.add(url);
    currentImages.current[key] = url;
    setImages((previous) => ({ ...previous, [key]: url }));
    setError("");
  }
  return (
    <div className="profile-media-picker" hidden={!visible}>
      <p className="metadata">
        PNG or JPEG, up to 2 MB. Images stay in this page’s memory and are not
        uploaded. Draft snapshots save text only.
      </p>
      {[
        { key: "photo", label: "Profile photo" },
        { key: "cover", label: "Cover image" },
      ].map((item) => (
        <div className="profile-media-field" key={item.key}>
          <label htmlFor={`media-${item.key}`}>
            {item.label}
            <input
              id={`media-${item.key}`}
              type="file"
              accept="image/png,image/jpeg"
              onChange={(event) => {
                void select(item.key, event.target.files?.[0]).catch(() =>
                  setError("The image could not be read."),
                );
                event.target.value = "";
              }}
            />
          </label>
          {images[item.key] && (
            <>
              <Image
                src={images[item.key]}
                alt={`${item.label} local preview`}
                width={item.key === "photo" ? 120 : 640}
                height={item.key === "photo" ? 120 : 180}
                unoptimized
                onError={()=>setError("The selected image could not be displayed. Remove it and choose another image.")}
                className={
                  item.key === "photo"
                    ? "profile-media-photo"
                    : "profile-media-cover"
                }
              />
              <Button
                className="secondary"
                type="button"
                onClick={() => {
                  revision.current.value++;
                  const url = images[item.key];
                  URL.revokeObjectURL(url);
                  owned.current.delete(url);
                  delete currentImages.current[item.key];
                  setImages((previous) => ({ ...previous, [item.key]: "" }));
                }}
              >
                Remove {item.label.toLowerCase()}
              </Button>
            </>
          )}
        </div>
      ))}
      <p role="status">{error}</p>
    </div>
  );
}
