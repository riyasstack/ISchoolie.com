"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import Image from "next/image";
import { Button, Badge } from "../ui";
import {
  initialSubmission,
  submissionReducer,
  validateResource,
  type Resource,
} from "../../../../../packages/contracts/authoring-state";
export function SubmissionWorkbench() {
  const [draft, dispatch] = useReducer(
      submissionReducer,
      undefined,
      initialSubmission,
    ),
    [fileError, setFileError] = useState(""),
    [confirm, setConfirm] = useState<"restore" | "reset" | null>(null);
  const epoch = useRef(0),
    urls = useRef<string[]>([]),
    summary = useRef<HTMLDivElement>(null);
  useEffect(
    () => () => {
      epoch.current++;
      urls.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );
  async function attach(files: FileList | null) {
    const generation = epoch.current;
    setFileError("");
    try {
      for (const file of Array.from(files ?? []).slice(
        0,
        Math.max(0, 10 - draft.resources.length),
      )) {
        const error = validateResource(file);
        if (error) {
          setFileError(error);
          continue;
        }
        const resource: Omit<Resource, "id"> = {
          name: file.name,
          size: file.size,
          type: file.type,
        };
        if (/\.(txt|csv)$/i.test(file.name) && file.size <= 65536)
          resource.text = (await file.text()).slice(0, 5000);
        if (generation !== epoch.current) return;
        if (/^image\/(png|jpeg)$/.test(file.type)) {
          resource.uri = URL.createObjectURL(file);
          urls.current.push(resource.uri);
        }
        dispatch({ type: "attach", resource });
      }
    } catch {
      if (generation === epoch.current)
        setFileError("Could not read this local file. Select it again.");
    }
  }
  function clear() {
    epoch.current++;
    urls.current.forEach((url) => URL.revokeObjectURL(url));
    urls.current = [];
    setFileError("");
    dispatch({ type: "reset" });
  }
  return (
    <section className="panel stack submission-workbench">
      <Badge>LEARNER RESPONSE / LOCAL DRAFT</Badge>
      <h2>
        {draft.reviewed
          ? "Review your example response"
          : "Prepare your observation journal."}
      </h2>
      <p>
        Describe five visible details and connect them to a question. Work stays
        in this task; no academic attempt is created.
      </p>
      {draft.reviewed ? (
        <>
          <section className="submission-review">
            <h3>{draft.title}</h3>
            <p className="preserve-lines">{draft.response}</p>
            <h3>Attachments</h3>
            {draft.description && <p>{draft.description}</p>}
            {draft.resources.length ? (
              <ul>
                {draft.resources.map((r) => (
                  <li key={r.id}>
                    {r.name} · {Math.ceil(r.size / 1024)}KB
                  </li>
                ))}
              </ul>
            ) : (
              <p>No attachments.</p>
            )}
          </section>
          <Button
            type="button"
            className="secondary"
            onClick={() => dispatch({ type: "edit" })}
          >
            Return to editing
          </Button>
        </>
      ) : (
        <form
          className="stack"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: "review" });
            requestAnimationFrame(() => summary.current?.focus());
          }}
        >
          <label>
            Response title
            <input
              value={draft.title}
              maxLength={160}
              onChange={(e) =>
                dispatch({ type: "meta", key: "title", value: e.target.value })
              }
            />
          </label>
          <label>
            Written response
            <textarea
              value={draft.response}
              maxLength={5000}
              onChange={(e) =>
                dispatch({ type: "response", value: e.target.value })
              }
            />
          </label>
          <p className="metadata">
            {draft.response.length}/5000 characters · a response of at least 20
            characters. Attachments are optional.
          </p>
          <label>
            Attach example resources
            <input
              type="file"
              accept=".pdf,.txt,.csv,.png,.jpg,.jpeg"
              multiple
              disabled={draft.resources.length >= 10}
              onChange={(e) => {
                void attach(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          <p className="metadata">
            Up to ten files, 5MB each. Text/CSV preview up to 64KB and 5000
            characters; images preview locally. PDF contents are not rendered.
            No upload or scanning.
          </p>
          {draft.resources.map((r) => (
            <article className="author-resource" key={r.id}>
              <h3>{r.name}</h3>
              <p>
                {Math.ceil(r.size / 1024)}KB · {r.type || "Unknown media type"}
              </p>
              {r.text !== undefined && <pre>{r.text}</pre>}
              {r.uri && (
                <Image
                  unoptimized
                  src={r.uri}
                  width={360}
                  height={220}
                  alt={"Local attachment preview: " + r.name}
                />
              )}
              <Button
                type="button"
                className="secondary"
                onClick={() => dispatch({ type: "remove", id: r.id })}
              >
                Remove {r.name}
              </Button>
            </article>
          ))}
          <label>
            Attachment description (optional)
            <textarea
              value={draft.description}
              maxLength={2000}
              onChange={(e) =>
                dispatch({
                  type: "meta",
                  key: "description",
                  value: e.target.value,
                })
              }
            />
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={draft.confirmed}
              onChange={(e) =>
                dispatch({ type: "confirmed", value: e.target.checked })
              }
            />
            I inspected the example task and response.
          </label>
          <Button type="submit">Review local response</Button>
        </form>
      )}
      <div
        ref={summary}
        tabIndex={-1}
        role={draft.error || fileError ? "alert" : undefined}
      >
        {draft.error || fileError ? (
          <p className="field-error">{draft.error || fileError}</p>
        ) : (
          <p role="status">{draft.notice}</p>
        )}
      </div>
      <div className="row wrap">
        <Button
          type="button"
          className="secondary"
          onClick={() => dispatch({ type: "save" })}
        >
          Keep local snapshot
        </Button>
        <Button
          type="button"
          className="secondary"
          disabled={!draft.snapshot}
          onClick={() => setConfirm("restore")}
        >
          Restore snapshot
        </Button>
        <Button
          type="button"
          className="secondary"
          onClick={() => setConfirm("reset")}
        >
          Discard response
        </Button>
      </div>
      {confirm && (
        <div className="callout">
          <p>
            Replace the current local response
            {confirm === "reset" ? " and attachments" : ""}?
          </p>
          <Button
            type="button"
            onClick={() => {
              if (confirm === "reset") clear();
              else {
                epoch.current++;
                setFileError("");
                dispatch({ type: "restore" });
              }
              setConfirm(null);
            }}
          >
            Confirm {confirm}
          </Button>
          <Button
            type="button"
            className="secondary"
            onClick={() => setConfirm(null)}
          >
            Keep editing
          </Button>
        </div>
      )}
    </section>
  );
}
