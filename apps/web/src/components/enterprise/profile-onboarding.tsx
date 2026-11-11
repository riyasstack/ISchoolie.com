"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, UserRound } from "lucide-react";
import { Breadcrumbs } from "../product-primitives";
import { ProfileMedia } from "./profile-media";
import { Avatar, Badge, Button, Meter } from "../ui";
import {
  profileStages,
  validateProfileStage,
  type ProfileDraft,
} from "../../../../../packages/contracts/profile-onboarding";

export function ProfileOnboarding() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ProfileDraft>({
    cover: "Learning blue",
    visibility: "Only me",
    contact: "Hidden",
  });
  const [saved, setSaved] = useState<ProfileDraft | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const stage = profileStages[step];
  function move(index: number) {
    setStep(index);
    setErrors({});
    setComplete(false);
    requestAnimationFrame(() => heading.current?.focus());
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    if (step === profileStages.length - 1) {
      const first = profileStages.findIndex(
        (_, index) =>
          Object.keys(validateProfileStage(index, draft)).length > 0,
      );
      if (first >= 0) {
        move(first);
        setErrors(validateProfileStage(first, draft));
        setNotice("Complete the required fields before reviewing this draft.");
        return;
      }
    }
    const invalid = validateProfileStage(step, draft);
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      setNotice("Check the highlighted fields.");
      return;
    }
    if (step < profileStages.length - 1) move(step + 1);
    else {
      setSaved({ ...draft });
      setComplete(true);
      setNotice("Profile draft reviewed locally. Nothing was published.");
    }
  }
  return (
    <div className="onboarding-layout">
      <aside>
        <Badge>Local profile preview</Badge>
        <ol className="onboarding-steps" aria-label="Profile steps">
          {profileStages.map((item, index) => (
            <li key={item.id}>
              <button
                disabled={index > step}
                aria-current={index === step ? "step" : undefined}
                onClick={() => move(index)}
              >
                <span>
                  {index < step ? (
                    <Check size={16} />
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>
                {item.title}
              </button>
            </li>
          ))}
        </ol>
        <p className="metadata">
          Drafts remain in this page’s memory and are cleared when you leave or
          reload.
        </p>
      </aside>
      <section className="onboarding-content">
        <Breadcrumbs items={[{label:"Profile",href:"/app/profile"},{label:"Setup preview"}]}/>
        <div className="row between">
          <span className="metadata">
            Step {step + 1} of {profileStages.length}
          </span>
          <UserRound size={20} />
        </div>
        <Meter
          value={((step + 1) / profileStages.length) * 100}
          label="Profile draft progress"
        />
        <h2 ref={heading} tabIndex={-1}>
          {stage.title}
        </h2>
        <p>{stage.description}</p>
        <ProfileMedia visible={step >= 4} />
        {step === 4 && (
          <div
            className={`profile-cover ${draft.cover === "Quiet neutral" ? "neutral" : ""}`}
            aria-label="Selected cover preview"
          />
        )}
        {step === 5 && (
          <div className="profile-review">
            <Avatar name={draft.name || "Your name"} size="large" />
            <h3>{draft.name}</h3>
            <p className="profile-headline">{draft.headline}</p>
            <Badge>Self-described · Not verified</Badge>
            {Object.entries(draft)
              .filter(([, value]) => value.trim())
              .map(([key, value]) => (
                <div className="identity-record" key={key}>
                  <strong>
                    {profileStages
                      .flatMap((item) => [...item.fields])
                      .find((field) => field.key === key)?.label ?? key}
                  </strong>
                  <p style={{ whiteSpace: "pre-wrap" }}>{value}</p>
                </div>
              ))}
          </div>
        )}
        <form onSubmit={submit} noValidate>
          {stage.fields.map((field) => (
            <label key={field.key} htmlFor={`profile-${field.key}`}>
              {field.label}
              {"required" in field && field.required && (
                <span className="field-required">Required</span>
              )}
              {"options" in field ? (
                <select
                  id={`profile-${field.key}`}
                  value={draft[field.key] ?? ""}
                  aria-invalid={!!errors[field.key]}
                  aria-describedby={
                    errors[field.key] ? `profile-error-${field.key}` : undefined
                  }
                  onChange={(event) =>
                    setDraft({ ...draft, [field.key]: event.target.value })
                  }
                >
                  <option value="">Choose an option</option>
                  {field.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : "multiline" in field ? (
                <textarea
                  id={`profile-${field.key}`}
                  value={draft[field.key] ?? ""}
                  maxLength={2000}
                  aria-invalid={!!errors[field.key]}
                  aria-describedby={
                    errors[field.key] ? `profile-error-${field.key}` : undefined
                  }
                  onChange={(event) =>
                    setDraft({ ...draft, [field.key]: event.target.value })
                  }
                />
              ) : (
                <input
                  id={`profile-${field.key}`}
                  value={draft[field.key] ?? ""}
                  maxLength={2000}
                  aria-invalid={!!errors[field.key]}
                  aria-describedby={
                    errors[field.key] ? `profile-error-${field.key}` : undefined
                  }
                  onChange={(event) =>
                    setDraft({ ...draft, [field.key]: event.target.value })
                  }
                />
              )}
              {errors[field.key] && (
                <span className="field-error" id={`profile-error-${field.key}`}>
                  {errors[field.key]}
                </span>
              )}
            </label>
          ))}
          <div className="step-footer">
            <Button
              type="button"
              className="secondary"
              disabled={step === 0}
              onClick={() => move(step - 1)}
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button
              type="button"
              className="subtle"
              onClick={() => {
                setSaved({ ...draft });
                setNotice("Draft snapshot saved in page memory.");
              }}
            >
              Save local draft
            </Button>
            <Button type="submit">
              {step === 5 ? "Review local profile" : "Continue"}
              {complete ? <Check size={16} /> : <ArrowRight size={16} />}
            </Button>
          </div>
          {saved && (
            <Button
              type="button"
              className="secondary"
              onClick={() => {
                setDraft({ ...saved });
                setNotice("Saved local snapshot restored.");
              }}
            >
              Restore saved draft
            </Button>
          )}
        </form>
        <p role="status" className="onboarding-draft-status">
          {notice}
        </p>
      </section>
    </div>
  );
}
