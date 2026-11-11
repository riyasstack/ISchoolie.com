import {
  useEffect,
  useReducer,
  useRef,
  useState,
  type ComponentRef,
} from "react";
import { TextInput, View } from "react-native";
import { Image } from "expo-image";
import { chooseExampleResource } from "./native-resource-picker";
import { ProductText as Text, Card, Copy, NativeButton, nativeStyles as base } from "./native-ui";
import {
  authorReducer,
  initialAuthor,
  authorErrors,
  formatSelection,
  inlineParts,
  advanceCase,
  initialCase,
  changeCaseDraft,
  revisitCase,
  caseSteps,
  caseDecisions,
  type AuthorAction,
  type AuthorDocument,
  type CaseKind,
} from "../../../../packages/contracts/authoring-state";

function Input({
  label,
  value,
  onChange,
  multiline = false,
  numeric = false,
  rich = false,
  editable = true,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  multiline?: boolean;
  numeric?: boolean;
  rich?: boolean;
  editable?: boolean;
}) {
  const field = useRef<ComponentRef<typeof TextInput>>(null),
    [selection, setSelection] = useState({ start: 0, end: 0 });
  function apply(mark: "**" | "_") {
    const next = formatSelection(value, selection.start, selection.end, mark);
    if (next.text.length > 5000) return;
    onChange(next.text);
    setSelection({ start: next.start, end: next.end });
    requestAnimationFrame(() => field.current?.focus());
  }
  return (
    <View style={{ gap: 8 }}>
      <Copy>{label}</Copy>
      <TextInput
        editable={editable}
        ref={field}
        selection={rich ? selection : undefined}
        onSelectionChange={
          rich ? (e) => setSelection(e.nativeEvent.selection) : undefined
        }
        style={[
          base.input,
          multiline && { minHeight: 110, textAlignVertical: "top" },
        ]}
        accessibilityLabel={label}
        value={value}
        maxLength={multiline ? 5000 : 160}
        multiline={multiline}
        keyboardType={numeric ? "decimal-pad" : "default"}
        onChangeText={onChange}
      />
      {rich && (
        <View style={base.row}>
          <NativeButton secondary onPress={() => apply("**")}>
            Bold selection
          </NativeButton>
          <NativeButton secondary onPress={() => apply("_")}>
            Emphasize selection
          </NativeButton>
        </View>
      )}
    </View>
  );
}
export function NativeAuthoring({ kind }: { kind: string }) {
  const [state, dispatch] = useReducer(authorReducer, undefined, initialAuthor),
    [preview, setPreview] = useState(false),
    [errors, setErrors] = useState<string[]>([]),
    [pending, setPending] = useState<AuthorAction | null>(null),
    [busy, setBusy] = useState(false);
  const epoch = useRef(0);
  useEffect(
    () => () => {
      epoch.current++;
    },
    [],
  );
  function edit(action: AuthorAction) {
    setErrors([]);
    dispatch(action);
  }
  async function pick() {
    if (busy) return;
    const version = epoch.current;
    setBusy(true);
    try {
      const result = await chooseExampleResource();
      if (version !== epoch.current) return;
      if (result.error) setErrors([result.error]);
      if (result.resource)
        dispatch({ type: "resource-add", resource: result.resource });
    } catch {
      if (version === epoch.current)
        setErrors(["Could not open this document. Try the picker again."]);
    } finally {
      if (version === epoch.current) setBusy(false);
    }
  }
  function order(
    collection: "unit" | "lesson" | "block" | "question" | "rubric",
    id: string,
    label: string,
    i: number,
    total: number,
  ) {
    return (
      <View style={base.row}>
        <NativeButton
          secondary
          disabled={i === 0}
          onPress={() => edit({ type: "move", collection, id, delta: -1 })}
        >
          Move {label} up
        </NativeButton>
        <NativeButton
          secondary
          disabled={i === total - 1}
          onPress={() => edit({ type: "move", collection, id, delta: 1 })}
        >
          Move {label} down
        </NativeButton>
        <NativeButton
          secondary
          onPress={() => setPending({ type: "remove", collection, id })}
        >
          Remove {label}
        </NativeButton>
      </View>
    );
  }
  return (
    <>
      <Card>
        <Copy heading>Learning draft studio</Copy>
        <Copy>
          Same structured draft model as the web. Local review only; no
          publication or assignment.
        </Copy>
        <Text style={base.badge}>
          Revision {state.revision} ·{" "}
          {state.dirty ? "Unsaved" : "Snapshot current"}
        </Text>
        <NativeButton
          secondary
          selected={preview}
          onPress={() => setPreview(!preview)}
        >
          {preview ? "Return to editing" : "Learner preview"}
        </NativeButton>
        <NativeButton
          disabled={state.offline || state.conflict}
          onPress={() => dispatch({ type: "save" })}
        >
          Save local snapshot
        </NativeButton>
        <NativeButton
          onPress={() => {
            const found = authorErrors(state.doc, kind);
            setErrors(found);
            if (!found.length) dispatch({ type: "review", kind });
          }}
        >
          Review readiness
        </NativeButton>
        <NativeButton secondary onPress={() => setPending({ type: "reset" })}>
          Discard and reset
        </NativeButton>
      </Card>
      <Card>
        <Copy heading>Connection and revision QA</Copy>
        <NativeButton
          secondary
          selected={state.offline}
          onPress={() => dispatch({ type: "offline" })}
        >
          {state.offline ? "Restore connection" : "Simulate offline"}
        </NativeButton>
        <NativeButton secondary onPress={() => dispatch({ type: "remote" })}>
          Simulate newer revision
        </NativeButton>
        {state.conflict && (
          <>
            <Copy>
              A simulated newer revision is available. Resolve before saving.
            </Copy>
            <NativeButton onPress={() => dispatch({ type: "resolve-local" })}>
              Keep my edits
            </NativeButton>
            <NativeButton
              secondary
              onPress={() => setPending({ type: "resolve-saved" })}
            >
              Restore snapshot
            </NativeButton>
          </>
        )}
      </Card>
      {pending && (
        <Card>
          <Copy heading>Confirm draft change</Copy>
          <Copy>This removes or replaces the selected unsaved content.</Copy>
          <NativeButton
            onPress={() => {
              if (
                pending.type === "reset" ||
                pending.type === "resolve-saved"
              ) {
                epoch.current++;
                setBusy(false);
              }
              edit(pending);
              setPending(null);
            }}
          >
            Confirm change
          </NativeButton>
          <NativeButton secondary onPress={() => setPending(null)}>
            Keep editing
          </NativeButton>
        </Card>
      )}
      {errors.length > 0 && (
        <Card>
          {errors.map((e) => (
            <Text accessibilityRole="alert" key={e} style={base.error}>
              {e}
            </Text>
          ))}
        </Card>
      )}
      {preview ? (
        <NativeAuthorPreview doc={state.doc} kind={kind} />
      ) : (
        <>
          <Card>
            <Input
              label="Draft title"
              value={state.doc.title}
              onChange={(value) => edit({ type: "meta", key: "title", value })}
            />
            {kind !== "resources" && (
              <Input
                label="Instructions"
                multiline
                value={state.doc.instructions}
                onChange={(value) =>
                  edit({ type: "meta", key: "instructions", value })
                }
              />
            )}
            {kind === "assignment-builder" && (
              <Input
                label="Due date (YYYY-MM-DD)"
                value={state.doc.due}
                onChange={(value) => edit({ type: "meta", key: "due", value })}
              />
            )}
          </Card>
          {kind === "editor" && (
            <>
              <NativeButton
                secondary
                disabled={state.doc.units.length >= 12}
                onPress={() => edit({ type: "unit-add" })}
              >
                Add module
              </NativeButton>
              {state.doc.units.map((u, ui) => (
                <Card key={u.id}>
                  <Input
                    label={`Module ${ui + 1} title`}
                    value={u.title}
                    onChange={(value) =>
                      edit({ type: "unit-title", id: u.id, value })
                    }
                  />
                  {order(
                    "unit",
                    u.id,
                    `module ${ui + 1}`,
                    ui,
                    state.doc.units.length,
                  )}
                  {u.lessons.map((l, li) => (
                    <View
                      key={l.id}
                      style={{
                        gap: 16,
                        borderLeftWidth: 2,
                        borderLeftColor: "#0071E3",
                        paddingLeft: 14,
                      }}
                    >
                      <Input
                        label={`Lesson ${li + 1} title`}
                        value={l.title}
                        onChange={(value) =>
                          edit({ type: "lesson-title", id: l.id, value })
                        }
                      />
                      {order(
                        "lesson",
                        l.id,
                        `lesson ${li + 1}`,
                        li,
                        u.lessons.length,
                      )}
                      {l.blocks.map((b, bi) => (
                        <View style={{ gap: 10 }} key={b.id}>
                          <Input
                            label={`${b.kind} block ${bi + 1}`}
                            multiline
                            value={b.text}
                            rich
                            onChange={(value) =>
                              edit({ type: "block-edit", id: b.id, value })
                            }
                          />
                          {order(
                            "block",
                            b.id,
                            `block ${bi + 1}`,
                            bi,
                            l.blocks.length,
                          )}
                        </View>
                      ))}
                      {(["heading", "paragraph", "list"] as const).map(
                        (block) => (
                          <NativeButton
                            key={block}
                            secondary
                            disabled={l.blocks.length >= 40}
                            onPress={() =>
                              edit({
                                type: "block-add",
                                lesson: l.id,
                                kind: block,
                              })
                            }
                          >
                            Add {block} block
                          </NativeButton>
                        ),
                      )}
                      <Copy>List blocks use one item per line.</Copy>
                    </View>
                  ))}
                  <NativeButton
                    secondary
                    disabled={u.lessons.length >= 30}
                    onPress={() => edit({ type: "lesson-add", unit: u.id })}
                  >
                    Add lesson
                  </NativeButton>
                </Card>
              ))}
            </>
          )}
          {kind === "assessment-builder" && (
            <>
              <Card>
                <Copy heading>
                  Question bank ·{" "}
                  {state.doc.questions.reduce(
                    (n, q) => n + (Number(q.points) || 0),
                    0,
                  )}{" "}
                  points
                </Copy>
                {(["choice", "response"] as const).map((q) => (
                  <NativeButton
                    key={q}
                    secondary
                    disabled={state.doc.questions.length >= 50}
                    onPress={() => edit({ type: "question-add", kind: q })}
                  >
                    Add {q === "choice" ? "choice" : "written"} question
                  </NativeButton>
                ))}
              </Card>
              {state.doc.questions.map((q, qi) => (
                <Card key={q.id}>
                  <Input
                    label={`Question ${qi + 1}`}
                    multiline
                    value={q.prompt}
                    onChange={(prompt) =>
                      edit({
                        type: "question-edit",
                        id: q.id,
                        patch: { prompt },
                      })
                    }
                  />
                  <Input
                    label="Question points (1–99)"
                    numeric
                    value={q.points}
                    onChange={(points) =>
                      edit({
                        type: "question-edit",
                        id: q.id,
                        patch: { points },
                      })
                    }
                  />
                  {q.kind === "choice" && (
                    <>
                      {q.options.map((o, oi) => (
                        <View key={oi} style={{ gap: 8 }}>
                          <Input
                            label={`Option ${oi + 1}`}
                            value={o}
                            onChange={(text) =>
                              edit({
                                type: "question-edit",
                                id: q.id,
                                patch: {
                                  options: q.options.map((v, i) =>
                                    i === oi ? text : v,
                                  ),
                                },
                              })
                            }
                          />
                          <NativeButton
                            secondary={q.correct !== oi}
                            selected={q.correct === oi}
                            onPress={() =>
                              edit({
                                type: "question-edit",
                                id: q.id,
                                patch: { correct: oi },
                              })
                            }
                          >
                            Option {oi + 1} is the answer key
                          </NativeButton>
                        </View>
                      ))}
                      <NativeButton
                        secondary
                        disabled={q.options.length >= 6}
                        onPress={() =>
                          edit({
                            type: "question-edit",
                            id: q.id,
                            patch: { options: [...q.options, ""] },
                          })
                        }
                      >
                        Add option
                      </NativeButton>
                      <NativeButton
                        secondary
                        disabled={q.options.length <= 2}
                        onPress={() =>
                          edit({
                            type: "question-edit",
                            id: q.id,
                            patch: {
                              options: q.options.slice(0, -1),
                              correct: Math.min(
                                q.correct,
                                q.options.length - 2,
                              ),
                            },
                          })
                        }
                      >
                        Remove last option
                      </NativeButton>
                    </>
                  )}
                  <Input
                    label={
                      q.kind === "response"
                        ? "Marking guidance"
                        : "Feedback after review"
                    }
                    multiline
                    value={q.guidance}
                    onChange={(guidance) =>
                      edit({
                        type: "question-edit",
                        id: q.id,
                        patch: { guidance },
                      })
                    }
                  />
                  {order(
                    "question",
                    q.id,
                    `question ${qi + 1}`,
                    qi,
                    state.doc.questions.length,
                  )}
                </Card>
              ))}
            </>
          )}
          {kind === "assignment-builder" && (
            <>
              <NativeButton
                secondary
                disabled={state.doc.rubric.length >= 20}
                onPress={() => edit({ type: "rubric-add" })}
              >
                Add rubric criterion
              </NativeButton>
              {state.doc.rubric.map((r, ri) => (
                <Card key={r.id}>
                  <Input
                    label={`Criterion ${ri + 1}`}
                    value={r.title}
                    onChange={(title) =>
                      edit({ type: "rubric-edit", id: r.id, patch: { title } })
                    }
                  />
                  <Input
                    label="Maximum points (1–99)"
                    numeric
                    value={r.points}
                    onChange={(points) =>
                      edit({ type: "rubric-edit", id: r.id, patch: { points } })
                    }
                  />
                  <Input
                    label="Evidence and marking guidance"
                    multiline
                    value={r.guidance}
                    onChange={(guidance) =>
                      edit({
                        type: "rubric-edit",
                        id: r.id,
                        patch: { guidance },
                      })
                    }
                  />
                  {order(
                    "rubric",
                    r.id,
                    `criterion ${ri + 1}`,
                    ri,
                    state.doc.rubric.length,
                  )}
                </Card>
              ))}
            </>
          )}
          <Card>
            <Copy heading>Resource tray · {state.doc.resources.length}/10</Copy>
            <Copy>
              PDF, TXT, CSV, PNG or JPG up to 5MB. Text/CSV preview up to 64KB,
              first 5000 characters. PDF content is not rendered. Files may be
              copied to the app cache; nothing is uploaded.
            </Copy>
            <NativeButton
              disabled={busy || state.doc.resources.length >= 10}
              onPress={() => void pick()}
            >
              {busy ? "Opening document picker…" : "Choose local resources"}
            </NativeButton>
            {state.doc.resources.map((r) => (
              <View key={r.id} style={{ gap: 10 }}>
                <Copy heading>{r.name}</Copy>
                <Copy>
                  {Math.ceil(r.size / 1024)}KB · {r.type || "Unknown type"}
                </Copy>
                {r.text !== undefined && <Copy>{r.text}</Copy>}
                {r.uri && (
                  <Image
                    source={{ uri: r.uri }}
                    accessibilityLabel={`Local preview of ${r.name}`}
                    style={{ width: "100%", height: 220 }}
                    contentFit="contain"
                  />
                )}
                <NativeButton
                  secondary
                  onPress={() =>
                    edit({ type: "remove", collection: "resource", id: r.id })
                  }
                >
                  Remove {r.name}
                </NativeButton>
              </View>
            ))}
          </Card>
        </>
      )}
      <Text accessibilityLiveRegion="polite" style={base.status}>
        {state.notice ||
          "Draft remains on this screen until you leave or reset."}
      </Text>
      {state.reviewed && (
        <Card>
          <Copy heading>Readiness reviewed locally</Copy>
          <Copy>Nothing was published, assigned or uploaded.</Copy>
        </Card>
      )}
    </>
  );
}
function NativeInline({ text }: { text: string }) {
  return (
    <>
      {inlineParts(text).map((part, i) => (
        <Text
          key={i}
          style={
            part.style === "strong"
              ? { fontWeight: "700" }
              : part.style === "emphasis"
                ? { fontStyle: "italic" }
                : undefined
          }
        >
          {part.text}
        </Text>
      ))}
    </>
  );
}
function NativeAuthorPreview({
  doc,
  kind,
}: {
  doc: AuthorDocument;
  kind: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({}),
    [checked, setChecked] = useState(false);
  return (
    <Card>
      <Text style={base.badge}>LEARNER PREVIEW / NOT ASSIGNED</Text>
      <Copy heading>{doc.title}</Copy>
      <Copy>{doc.instructions}</Copy>
      {kind === "editor" &&
        doc.units.map((u) => (
          <View key={u.id} style={{ gap: 16 }}>
            <Copy heading>{u.title}</Copy>
            {u.lessons.map((l) => (
              <View key={l.id} style={{ gap: 10 }}>
                <Copy heading>{l.title}</Copy>
                {l.blocks.map((b) => (
                  <Copy key={b.id} heading={b.kind === "heading"}>
                    <NativeInline
                      text={
                        b.kind === "list"
                          ? b.text
                              .split("\n")
                              .filter(Boolean)
                              .map((t) => "• " + t)
                              .join("\n")
                          : b.text
                      }
                    />
                  </Copy>
                ))}
              </View>
            ))}
          </View>
        ))}
      {kind === "assessment-builder" && (
        <>
          {doc.questions.map((q, i) => (
            <View key={q.id} style={{ gap: 12 }}>
              <Copy heading>
                {i + 1}. {q.prompt} ({q.points} points)
              </Copy>
              {q.kind === "choice" ? (
                q.options.map((o, oi) => (
                  <NativeButton
                    key={oi}
                    secondary={answers[q.id] !== String(oi)}
                    selected={answers[q.id] === String(oi)}
                    onPress={() => {
                      setAnswers({ ...answers, [q.id]: String(oi) });
                      setChecked(false);
                    }}
                  >
                    {o || "Empty option"}
                  </NativeButton>
                ))
              ) : (
                <Input
                  label="Written response"
                  multiline
                  value={answers[q.id] ?? ""}
                  onChange={(text) => {
                    setAnswers({ ...answers, [q.id]: text });
                    setChecked(false);
                  }}
                />
              )}
              {checked && (
                <Copy>
                  {!answers[q.id]?.trim()
                    ? "No response entered."
                    : q.kind === "choice"
                      ? (Number(answers[q.id]) === q.correct
                          ? "Correct example response. "
                          : "Review the evidence. ") + q.guidance
                      : "Requires educator review; no automatic score."}
                </Copy>
              )}
            </View>
          ))}
          <NativeButton onPress={() => setChecked(true)}>
            Check practice responses
          </NativeButton>
        </>
      )}
      {kind === "assignment-builder" && (
        <>
          <Copy>Due: {doc.due || "Not set"}</Copy>
          {doc.rubric.map((r) => (
            <View key={r.id}>
              <Copy heading>
                {r.title} · {r.points} points
              </Copy>
              <Copy>{r.guidance}</Copy>
            </View>
          ))}
        </>
      )}
      <Copy heading>Resources</Copy>
      {doc.resources.map((r) => (
        <Copy key={r.id}>{r.name}</Copy>
      ))}
    </Card>
  );
}
export function NativeCaseWorkbench({ kind }: { kind: CaseKind }) {
  const [draft, setDraft] = useState(initialCase),
    [offline, setOffline] = useState(false),
    [reset, setReset] = useState(false);
  const update = (patch: Partial<typeof draft>) =>
    setDraft(changeCaseDraft(draft, patch));
  return (
    <Card>
      <Text style={base.badge}>
        LOCAL CASE DESK / STAGE {draft.stage + 1} OF 3
      </Text>
      <Copy heading>{caseSteps[kind][draft.stage]}</Copy>
      {draft.stage > 0 && (
        <Copy>
          Source details are read-only here. Revisit stage one to change
          evidence.
        </Copy>
      )}
      <NativeButton
        secondary
        disabled={draft.stage === 0}
        onPress={() => setDraft(revisitCase(draft, draft.stage - 1))}
      >
        Revisit previous stage
      </NativeButton>
      {draft.outcome && (
        <NativeButton
          secondary
          onPress={() => setDraft(revisitCase(draft, draft.stage))}
        >
          Revise final response
        </NativeButton>
      )}
      <Copy>
        {kind === "reconciliation"
          ? "Example statement: EX-PAY-101 · 1250.00. No settlement occurs."
          : kind === "marks"
            ? "Example learner EX-101 · Science inquiry · maximum 100. No result is released."
            : kind === "bookings"
              ? "Example 30-minute request. Proposed times are not confirmed slots."
              : kind === "admissions"
                ? "Example application: transcript present; guardian consent evidence awaits review. No admission occurs."
                : "Review content, audience and resource rights. Nothing is published."}
      </Copy>
      {!draft.outcome && (
        <>
          <Copy heading>Response draft</Copy>
          {caseDecisions[kind].map((decision) => (
            <NativeButton
              key={decision}
              secondary={draft.decision !== decision}
              selected={draft.decision === decision}
              onPress={() => update({ decision })}
            >
              {decision}
            </NativeButton>
          ))}
          {kind === "marks" && (
            <Input
              label="Draft mark out of 100"
              numeric
              value={draft.value}
              editable={draft.stage === 0}
              onChange={(value) => update({ value })}
            />
          )}
          {kind === "reconciliation" && (
            <>
              <Input
                label="Statement reference"
                value={draft.reference}
                editable={draft.stage === 0}
                onChange={(reference) => update({ reference })}
              />
              <Input
                label="Statement amount"
                numeric
                value={draft.value}
                editable={draft.stage === 0}
                onChange={(value) => update({ value })}
              />
            </>
          )}
          {kind === "bookings" && (
            <>
              <Input
                label="Proposed date (YYYY-MM-DD)"
                value={draft.date}
                editable={draft.stage === 0}
                onChange={(date) => update({ date })}
              />
              <Input
                label="Proposed time (HH:MM)"
                value={draft.time}
                editable={draft.stage === 0}
                onChange={(time) => update({ time })}
              />
            </>
          )}
          <Input
            label="Stage review note"
            multiline
            value={draft.note}
            onChange={(note) => update({ note })}
          />
          <NativeButton
            secondary={!draft.checked}
            selected={draft.checked}
            onPress={() => update({ checked: !draft.checked })}
          >
            Evidence checked for this stage: {draft.checked ? "Yes" : "No"}
          </NativeButton>
          {draft.error && (
            <Text accessibilityRole="alert" style={base.error}>
              {draft.error}
            </Text>
          )}
          <NativeButton
            disabled={offline}
            onPress={() => setDraft(advanceCase(kind, draft))}
          >
            Review stage locally
          </NativeButton>
        </>
      )}
      {draft.outcome && (
        <Text accessibilityLiveRegion="polite" style={base.status}>
          {draft.outcome}
        </Text>
      )}
      {draft.history.map((line, i) => (
        <Copy key={i}>{line}</Copy>
      ))}
      <NativeButton
        secondary
        selected={offline}
        onPress={() => setOffline(!offline)}
      >
        {offline ? "Restore connection" : "Simulate offline"}
      </NativeButton>
      <NativeButton secondary onPress={() => setReset(true)}>
        Start another response draft
      </NativeButton>
      {reset && (
        <>
          <Copy>Discard this response and local history?</Copy>
          <NativeButton
            onPress={() => {
              setDraft(initialCase());
              setReset(false);
            }}
          >
            Discard response
          </NativeButton>
          <NativeButton secondary onPress={() => setReset(false)}>
            Keep draft
          </NativeButton>
        </>
      )}
    </Card>
  );
}
