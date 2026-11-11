/** Local design prototype only. No server profile, membership or verification claim. */
export const profileStages = [
  {
    id: "identity",
    title: "Your introduction",
    description: "Start with the person behind the profile.",
    fields: [
      { key: "name", label: "Display name", required: true },
      {
        key: "headline",
        label: "Professional or learning headline",
        required: true,
      },
      {
        key: "status",
        label: "Education or professional status",
        required: true,
      },
      { key: "location", label: "General location (optional)" },
    ],
  },
  {
    id: "story",
    title: "Your story",
    description: "Give people a sense of what interests and motivates you.",
    fields: [
      { key: "about", label: "About you", multiline: true, required: true },
      { key: "skills", label: "Skills and interests", required: true },
    ],
  },
  {
    id: "background",
    title: "Your background",
    description:
      "Share the education and experience relevant to your path. Affiliation is self-described, not verified membership.",
    fields: [
      { key: "institution", label: "Educational institution (self-described)" },
      { key: "education", label: "Education history", multiline: true },
      {
        key: "experience",
        label: "Experience (where applicable)",
        multiline: true,
      },
      {
        key: "certifications",
        label: "Certifications and achievements",
        multiline: true,
      },
    ],
  },
  {
    id: "work",
    title: "What you’re proud of",
    description:
      "A project, a publication or an idea in progress. All sections are optional.",
    fields: [
      {
        key: "projects",
        label: "Featured projects and portfolio",
        multiline: true,
      },
      {
        key: "publications",
        label: "Publications and courses",
        multiline: true,
      },
      { key: "community", label: "Community involvement", multiline: true },
    ],
  },
  {
    id: "appearance",
    title: "Make it yours",
    description:
      "Choose a cover treatment and preview a local photo or cover. Images are not uploaded or published.",
    fields: [
      {
        key: "cover",
        label: "Cover treatment",
        options: ["Learning blue", "Quiet neutral"],
      },
      {
        key: "visibility",
        label: "Discoverability preview",
        options: ["Only me", "Professional network", "Public preview"],
        required: true,
      },
      {
        key: "contact",
        label: "Contact visibility",
        options: ["Hidden", "Connections only"],
        required: true,
      },
    ],
  },
  {
    id: "review",
    title: "Meet your next chapter",
    description:
      "Review your local profile draft. Nothing is published or verified.",
    fields: [],
  },
] as const;
export type ProfileDraft = Record<string, string>;
export function validateProfileStage(index: number, draft: ProfileDraft) {
  const errors: Record<string, string> = {};
  const stage = profileStages[index];
  if (!stage) return { stage: "Choose a valid step" };
  for (const field of stage.fields) {
    const value = draft[field.key] ?? "";
    if ("required" in field && field.required && !value.trim())
      errors[field.key] = `Enter ${field.label.toLowerCase()}`;
    if (value.length > 2000)
      errors[field.key] = "Keep this field below 2,000 characters";
    if (
      "options" in field &&
      value &&
      !(field.options as readonly string[]).includes(value)
    )
      errors[field.key] = "Choose an available option";
  }
  return errors;
}
