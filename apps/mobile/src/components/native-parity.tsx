import { useState } from "react";
import { router } from "expo-router";
import { TextInput, View } from "react-native";
import { ProductText as Text, Card, Copy, NativeButton, nativeStyles as base } from "./native-ui";
import {
  screenSpecs,
  getScreen,
  validateDraft,
  type ScreenSpec,
  type Draft,
} from "../../../../packages/contracts/frontend";
import { practiceQuestions } from "../../../../packages/contracts/practice";
import {
  nativeParityKinds,
  reviewConsent,
} from "../../../../packages/contracts/native-parity-state";
export { nativeParityKinds };

function Input({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={{ gap: 8 }}>
      <Copy>{label}</Copy>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChange}
        style={[
          base.input,
          multiline && { minHeight: 110, textAlignVertical: "top" },
        ]}
        multiline={multiline}
        maxLength={multiline ? 2000 : 500}
      />
    </View>
  );
}
export function NativeParity({ spec }: { spec: ScreenSpec }) {
  switch (spec.kind) {
    case "guardian":
      return <GuardianTask spec={spec} />;
    case "profile":
      return <ProfileTask spec={spec} />;
    case "directory":
      return <DirectoryTask spec={spec} />;
    case "discussion":
      return <DiscussionTask />;
    case "search":
    case "support":
      return <SearchTask help={spec.kind === "support"} />;
    case "consent":
      return <ConsentTask />;
    case "portfolio":
      return <PortfolioTask />;
    case "credentials":
      return <CredentialTask />;
    case "overview":
      return <OverviewTask spec={spec} />;
    case "review":
    case "verification":
      return <EvidenceTask spec={spec} />;
    default:
      throw new Error("Missing native parity renderer: " + spec.kind);
  }
}
function GuardianTask({ spec }: { spec: ScreenSpec }) {
  const [child, setChild] = useState("Aarav"),
    [period, setPeriod] = useState("This term"),
    [open, setOpen] = useState(""),
    [read, setRead] = useState<string[]>([]);
  function choose(value: string) {
    setChild(value);
    setPeriod("This term");
    setOpen("");
    setRead([]);
  }
  return (
    <>
      <Card>
        <Copy heading>Child context</Copy>
        <View style={base.row}>
          {["Aarav", "Diya"].map((c) => (
            <NativeButton
              key={c}
              secondary={child !== c}
              selected={child === c}
              onPress={() => choose(c)}
            >
              {c}
            </NativeButton>
          ))}
        </View>
        <Copy>
          Changing child clears this task’s filters, notes and read markers.
        </Copy>
      </Card>
      {child === "Diya" ? (
        <Card>
          <Copy heading>Awaiting authorization</Copy>
          <Copy>
            No academic details or private messages are loaded for this example
            child.
          </Copy>
        </Card>
      ) : (
        <Card>
          <Text style={base.badge}>AARAV / PERMITTED SYNTHETIC CATEGORIES</Text>
          {spec.id === "PAR-02" ? (
            <>
              <Copy heading>Example relationship information</Copy>
              <Copy>
                Aarav · Grade 10 A · Academic and attendance examples permitted.
                This interface verifies no relationship.
              </Copy>
            </>
          ) : spec.id === "PAR-04" ? (
            <>
              <Copy heading>Attendance summary</Copy>
              <View style={base.row}>
                {["This week", "This term"].map((p) => (
                  <NativeButton
                    key={p}
                    secondary={period !== p}
                    selected={period === p}
                    onPress={() => setPeriod(p)}
                  >
                    {p}
                  </NativeButton>
                ))}
              </View>
              <Copy>
                {period === "This week" ? "5 of 5" : "23 of 25"} example days
                present. No official register is changed.
              </Copy>
              <Copy>Sample exceptions: two absences in the term fixture.</Copy>
            </>
          ) : spec.id === "PAR-08" ? (
            <>
              <Copy heading>Child course progress</Copy>
              {["Visual thinking", "Science inquiry"].map((course, i) => (
                <View key={course} style={{ gap: 8 }}>
                  <Copy heading>
                    {course} · {i ? 40 : 42}% example progress
                  </Copy>
                  <NativeButton
                    secondary
                    onPress={() => setOpen(open === course ? "" : course)}
                  >
                    {open === course ? "Hide" : "Inspect"} lesson outline
                  </NativeButton>
                  {open === course && (
                    <Copy>
                      Curiosity → Observation → Connections. Progress is a
                      fixture, not a completion record.
                    </Copy>
                  )}
                </View>
              ))}
            </>
          ) : spec.id === "PAR-10" ? (
            <>
              <Copy heading>School announcements</Copy>
              {["Observation workshop materials", "Example term calendar"].map(
                (title) => (
                  <View key={title} style={{ gap: 8 }}>
                    <Copy heading>{title}</Copy>
                    <Copy>
                      Fictional school notice. No meeting or deadline is
                      officially scheduled.
                    </Copy>
                    <NativeButton
                      secondary
                      selected={read.includes(title)}
                      onPress={() =>
                        setRead(
                          read.includes(title)
                            ? read.filter((x) => x !== title)
                            : [...read, title],
                        )
                      }
                    >
                      {read.includes(title)
                        ? "Mark unread locally"
                        : "Mark read locally"}
                    </NativeButton>
                  </View>
                ),
              )}
            </>
          ) : (
            <>
              <Copy heading>
                {spec.id === "PAR-03"
                  ? "Academic summary"
                  : "Learning overview"}
              </Copy>
              <Copy>
                Example child · Grade 10 A · Visual thinking and Science
                inquiry.
              </Copy>
              <Copy>
                Learning focus: describe precise observations and form a useful
                next question.
              </Copy>
              <Copy>
                Only permitted example categories are shown. Grades, fees and
                consent have separate task screens.
              </Copy>
            </>
          )}
        </Card>
      )}
    </>
  );
}
function ProfileTask({ spec }: { spec: ScreenSpec }) {
  const [tab, setTab] = useState("Overview"),
    [editing, setEditing] = useState(false),
    [draft, setDraft] = useState<Draft>({}),
    [saved, setSaved] = useState<Draft>({}),
    [errors, setErrors] = useState<Draft>({});
  return (
    <>
      <Card>
        <Text style={base.badge}>UNVERIFIED EXAMPLE PROFILE</Text>
        <Copy heading>
          {saved[spec.fields[0]?.key] || "Example learning profile"}
        </Copy>
        <View style={base.row}>
          {["Overview", "Expertise", "Activity"].map((t) => (
            <NativeButton
              key={t}
              secondary={tab !== t}
              selected={tab === t}
              onPress={() => setTab(t)}
            >
              {t}
            </NativeButton>
          ))}
        </View>
        <Copy>
          {tab === "Overview"
            ? spec.summary
            : tab === "Expertise"
              ? "Observation, inquiry and visual thinking. Qualifications are not verified."
              : "Two fictional learning reflections. No verified activity history."}
        </Copy>
        {Object.entries(saved).map(([key, value]) => (
          <Copy key={key}>
            {spec.fields.find((f) => f.key === key)?.label}: {value}
          </Copy>
        ))}
        <NativeButton
          secondary
          onPress={() => {
            setEditing(!editing);
            setErrors({});
          }}
        >
          {" "}
          {editing ? "Close editor" : "Edit local profile draft"}
        </NativeButton>
      </Card>
      {editing && (
        <Card>
          {spec.fields.map((f) => (
            <View key={f.key} style={{ gap: 8 }}>
              {f.type === "select" ? (
                <>
                  <Copy>{f.label}</Copy>
                  {f.options.map((o) => (
                    <NativeButton
                      secondary={draft[f.key] !== o}
                      selected={draft[f.key] === o}
                      key={o}
                      onPress={() => setDraft({ ...draft, [f.key]: o })}
                    >
                      {o}
                    </NativeButton>
                  ))}
                </>
              ) : (
                <Input
                  label={f.label}
                  value={draft[f.key] ?? ""}
                  multiline={f.type === "textarea"}
                  onChange={(value) => setDraft({ ...draft, [f.key]: value })}
                />
              )}
              {errors[f.key] && (
                <Text accessibilityRole="alert" style={base.error}>
                  {errors[f.key]}
                </Text>
              )}
            </View>
          ))}
          <NativeButton
            onPress={() => {
              const found = validateDraft(spec.fields, draft);
              setErrors(found);
              if (!Object.keys(found).length) {
                setSaved({ ...draft });
                setEditing(false);
              }
            }}
          >
            Review and apply to local profile
          </NativeButton>
          <Copy>No profile is published or verified.</Copy>
        </Card>
      )}
    </>
  );
}
function DirectoryTask({ spec }: { spec: ScreenSpec }) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("All"),
    [open, setOpen] = useState(""),
    [requests, setRequests] = useState<string[]>([]);
  const groups = [...new Set(spec.rows.map((r) => r[1]))],
    rows = spec.rows.filter(
      (r) =>
        r.join(" ").toLowerCase().includes(query.toLowerCase()) &&
        (category === "All" || r[1] === category),
    );
  return (
    <>
      <Card>
        <Input
          label="Search eligible example tutors"
          value={query}
          onChange={setQuery}
        />
        <View style={base.row}>
          {["All", ...groups].map((g) => (
            <NativeButton
              key={g}
              secondary={category !== g}
              selected={category === g}
              onPress={() => setCategory(g)}
            >
              {g}
            </NativeButton>
          ))}
        </View>
        <Copy>
          Fictional public service information only. No private child contact or
          verified credentials.
        </Copy>
      </Card>
      {rows.map((row) => (
        <Card key={row[0]}>
          <Copy heading>{row[0]}</Copy>
          {row.slice(1).map((cell, i) => (
            <Copy key={i}>
              {spec.columns[i + 1]}: {cell}
            </Copy>
          ))}
          <NativeButton
            secondary
            onPress={() => setOpen(open === row[0] ? "" : row[0])}
          >
            {open === row[0] ? "Close" : "Inspect"} public example
          </NativeButton>
          {open === row[0] && (
            <Copy>
              Observation studio · 30-minute example service. Availability and
              credentials are unverified.
            </Copy>
          )}
          <NativeButton
            secondary
            selected={requests.includes(row[0])}
            onPress={() =>
              setRequests(
                requests.includes(row[0])
                  ? requests.filter((x) => x !== row[0])
                  : [...requests, row[0]],
              )
            }
          >
            {requests.includes(row[0])
              ? "Undo local interest"
              : "Draft interest request"}
          </NativeButton>
          <NativeButton
            secondary
            onPress={() =>
              router.push({ pathname: "./screen", params: { id: "STU-22" } })
            }
          >
            Inspect booking draft
          </NativeButton>
        </Card>
      ))}
      {!rows.length && (
        <Card>
          <Copy>No eligible matches.</Copy>
          <NativeButton
            secondary
            onPress={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Clear discovery filters
          </NativeButton>
        </Card>
      )}
    </>
  );
}
function DiscussionTask() {
  const [draft, setDraft] = useState(""),
    [replies, setReplies] = useState([
      "Begin with a describable detail before an explanation.",
    ]),
    [requested, setRequested] = useState(false);
  return (
    <Card>
      <Text style={base.badge}>PUBLIC SAMPLE DISCUSSION</Text>
      <Copy heading>What makes a useful observation?</Copy>
      <Copy>
        Example educator discussion. No private membership or child inbox is
        exposed.
      </Copy>
      <NativeButton
        secondary
        selected={requested}
        onPress={() => setRequested(!requested)}
      >
        {requested ? "Undo local join request" : "Preview join request"}
      </NativeButton>
      {replies.map((reply, i) => (
        <View key={i}>
          <Copy heading>{i ? "Local reply" : "Example educator"}</Copy>
          <Copy>{reply}</Copy>
        </View>
      ))}
      <Input
        label="Local discussion reply"
        multiline
        value={draft}
        onChange={setDraft}
      />
      <NativeButton
        disabled={!draft.trim() || replies.length >= 50}
        onPress={() => {
          setReplies([...replies, draft.trim()]);
          setDraft("");
        }}
      >
        Add local reply
      </NativeButton>
      <Copy>Nothing is delivered or posted to a real community.</Copy>
    </Card>
  );
}
function SearchTask({ help }: { help: boolean }) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("All"),
    [article, setArticle] = useState("");
  const records = screenSpecs.filter(
    (s) =>
      s.native &&
      [
        "profile",
        "directory",
        "catalog",
        "communities",
        "course",
        "support",
      ].includes(s.kind) &&
      !["PAR", "INS", "ADM"].includes(s.family),
  );
  const matches = records.filter(
    (s) =>
      (category === "All" || s.kind === category) &&
      (s.name + " " + s.summary).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <Card>
        <Input
          label={help ? "Search help topics" : "Search public example content"}
          value={query}
          onChange={setQuery}
        />
        <View style={base.row}>
          {["All", ...new Set(records.map((s) => s.kind))].map((c) => (
            <NativeButton
              key={c}
              selected={category === c}
              secondary={category !== c}
              onPress={() => setCategory(c)}
            >
              {c}
            </NativeButton>
          ))}
        </View>
        <Copy>
          Search excludes private child, institution and specialist case
          records.
        </Copy>
      </Card>
      {help &&
        [
          "Local drafts and refresh",
          "Why a task is restricted",
          "Resource selection limits",
        ]
          .filter((t) => t.toLowerCase().includes(query.toLowerCase()))
          .map((title) => (
            <Card key={title}>
              <NativeButton
                secondary
                onPress={() => setArticle(article === title ? "" : title)}
              >
                {title}
              </NativeButton>
              {article === title && (
                <Copy>
                  Drafts are local to the current task. Approved context is
                  required for private data. Files are never uploaded; the
                  native picker can keep copies in app cache.
                </Copy>
              )}
            </Card>
          ))}
      {matches.map((s) => (
        <Card key={s.id}>
          <Copy heading>{s.name}</Copy>
          <Copy>{s.summary}</Copy>
          <NativeButton
            secondary
            onPress={() =>
              router.push({ pathname: "./screen", params: { id: s.id } })
            }
          >
            Explore example
          </NativeButton>
        </Card>
      ))}
      {!matches.length && (
        <Card>
          <Copy>No matching examples.</Copy>
          <NativeButton
            secondary
            onPress={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Clear search filters
          </NativeButton>
        </Card>
      )}
    </>
  );
}
function ConsentTask() {
  const [selected, setSelected] = useState<string[]>([]),
    [purpose, setPurpose] = useState(""),
    [expiry, setExpiry] = useState(""),
    [decision, setDecision] = useState(""),
    [confirmed, setConfirmed] = useState(false),
    [notice, setNotice] = useState("");
  function change() {
    setNotice("");
  }
  return (
    <Card>
      <Copy heading>Guardian approval draft</Copy>
      <Copy>
        Example child Aarav only. No legal consent or actual data access is
        granted.
      </Copy>
      <View style={base.row}>
        {["Academics", "Attendance", "School notices"].map((c) => (
          <NativeButton
            key={c}
            selected={selected.includes(c)}
            secondary={!selected.includes(c)}
            onPress={() => {
              setSelected(
                selected.includes(c)
                  ? selected.filter((x) => x !== c)
                  : [...selected, c],
              );
              change();
            }}
          >
            {c}
          </NativeButton>
        ))}
      </View>
      <Input
        label="Purpose for this draft"
        multiline
        value={purpose}
        onChange={(v) => {
          setPurpose(v);
          change();
        }}
      />
      <Input
        label="Review expiry (YYYY-MM-DD)"
        value={expiry}
        onChange={(v) => {
          setExpiry(v);
          change();
        }}
      />
      <View style={base.row}>
        {["Allow selected categories", "Decline request"].map((d) => (
          <NativeButton
            key={d}
            selected={decision === d}
            secondary={decision !== d}
            onPress={() => {
              setDecision(d);
              change();
            }}
          >
            {d}
          </NativeButton>
        ))}
      </View>
      <NativeButton
        secondary={!confirmed}
        selected={confirmed}
        onPress={() => {
          setConfirmed(!confirmed);
          change();
        }}
      >
        Example relationship evidence inspected: {confirmed ? "Yes" : "No"}
      </NativeButton>
      <NativeButton
        onPress={() =>
          setNotice(
            reviewConsent({ selected, purpose, expiry, decision, confirmed }),
          )
        }
      >
        Review approval draft
      </NativeButton>
      {notice && (
        <Text accessibilityLiveRegion="polite" style={base.status}>
          {notice}
        </Text>
      )}
    </Card>
  );
}
function PortfolioTask() {
  const [title, setTitle] = useState(""),
    [reflection, setReflection] = useState(""),
    [items, setItems] = useState<
      { id: number; title: string; reflection: string }[]
    >([]),
    [next, setNext] = useState(1);
  return (
    <>
      <Card>
        <Copy heading>Learning portfolio draft</Copy>
        <Input label="Work title" value={title} onChange={setTitle} />
        <Input
          label="Reflection and evidence"
          multiline
          value={reflection}
          onChange={setReflection}
        />
        <NativeButton
          disabled={
            !title.trim() || reflection.trim().length < 10 || items.length >= 20
          }
          onPress={() => {
            setItems([
              ...items,
              { id: next, title: title.trim(), reflection: reflection.trim() },
            ]);
            setNext(next + 1);
            setTitle("");
            setReflection("");
          }}
        >
          Add local portfolio piece
        </NativeButton>
        <Copy>No work is published or shared.</Copy>
      </Card>
      {items.map((item) => (
        <Card key={item.id}>
          <Copy heading>{item.title}</Copy>
          <Copy>{item.reflection}</Copy>
          <NativeButton
            secondary
            onPress={() => setItems(items.filter((x) => x.id !== item.id))}
          >
            Remove portfolio draft
          </NativeButton>
        </Card>
      ))}
    </>
  );
}
function CredentialTask() {
  const [reference, setReference] = useState(""),
    [notice, setNotice] = useState("");
  return (
    <Card>
      <Text style={base.badge}>SPECIMEN / NOT ISSUED</Text>
      <Copy heading>Visual thinking pathway</Copy>
      <Copy>
        Example reference EX-CERT-01. This is a specimen layout, not an earned
        qualification or verification service.
      </Copy>
      <Input
        label="Specimen reference"
        value={reference}
        onChange={(v) => {
          setReference(v);
          setNotice("");
        }}
      />
      <NativeButton
        onPress={() =>
          setNotice(
            reference.trim() === "EX-CERT-01"
              ? "The specimen reference matches this local example. No issuer, award or qualification is verified."
              : "No matching local specimen. Try EX-CERT-01.",
          )
        }
      >
        Inspect local reference
      </NativeButton>
      {notice && (
        <Text accessibilityLiveRegion="polite" style={base.status}>
          {notice}
        </Text>
      )}
    </Card>
  );
}
function OverviewTask({ spec }: { spec: ScreenSpec }) {
  const [done, setDone] = useState<string[]>([]);
  return (
    <>
      <Card>
        <Copy heading>Your next example tasks</Copy>
        <Copy>{spec.summary}</Copy>
        {spec.links
          .filter((id) => getScreen(id)?.native)
          .map((id) => (
            <View style={{ gap: 8 }} key={id}>
              <Copy heading>{getScreen(id)!.name}</Copy>
              <NativeButton
                secondary
                selected={done.includes(id)}
                onPress={() =>
                  setDone(
                    done.includes(id)
                      ? done.filter((x) => x !== id)
                      : [...done, id],
                  )
                }
              >
                {done.includes(id)
                  ? "Unmark local checklist"
                  : "Mark local checklist"}
              </NativeButton>
              <NativeButton
                secondary
                onPress={() =>
                  router.push({ pathname: "./screen", params: { id } })
                }
              >
                Open task
              </NativeButton>
            </View>
          ))}
        {!spec.links.length && <Copy>No linked tasks in this example.</Copy>}
        <Copy>
          Checklist marks are personal preview state, not official task
          completion.
        </Copy>
      </Card>
      {spec.sections.map(([title, body]) => (
        <Card key={title}>
          <Copy heading>{title}</Copy>
          <Copy>{body}</Copy>
        </Card>
      ))}
    </>
  );
}
function EvidenceTask({ spec }: { spec: ScreenSpec }) {
  const [checks, setChecks] = useState<string[]>([]),
    [note, setNote] = useState(""),
    [notice, setNotice] = useState("");
  const requirements = [
    "Identity/context evidence",
    "Purpose and category scope",
    "Policy and unresolved restrictions",
  ];
  return (
    <Card>
      <Copy heading>{spec.name} readiness</Copy>
      <Copy>{spec.summary}</Copy>
      {requirements.map((item) => (
        <NativeButton
          key={item}
          secondary={!checks.includes(item)}
          selected={checks.includes(item)}
          onPress={() => {
            setChecks(
              checks.includes(item)
                ? checks.filter((x) => x !== item)
                : [...checks, item],
            );
            setNotice("");
          }}
        >
          {item}
        </NativeButton>
      ))}
      <Input
        label="Evidence review note"
        multiline
        value={note}
        onChange={(v) => {
          setNote(v);
          setNotice("");
        }}
      />
      <NativeButton
        disabled={
          checks.length !== requirements.length || note.trim().length < 10
        }
        onPress={() =>
          setNotice(
            "Evidence inspected locally. No verification, relationship, admission or permission has been approved.",
          )
        }
      >
        Inspect readiness summary
      </NativeButton>
      {notice && (
        <Text accessibilityLiveRegion="polite" style={base.status}>
          {notice}
        </Text>
      )}
    </Card>
  );
}
export function NativeFullPractice() {
  const [index, setIndex] = useState(0),
    [answers, setAnswers] = useState<Record<number, number>>({}),
    [review, setReview] = useState(false);
  const q = practiceQuestions[index];
  return (
    <Card>
      <Text style={base.badge}>PRACTICE / NO OFFICIAL SCORE</Text>
      <View style={base.row}>
        {practiceQuestions.map((p, i) => (
          <NativeButton
            key={p.prompt}
            secondary={index !== i}
            selected={index === i}
            onPress={() => {
              setIndex(i);
              setReview(false);
            }}
          >
            Question {i + 1}
            {answers[i] !== undefined ? " · answered" : ""}
          </NativeButton>
        ))}
      </View>
      {review ? (
        <>
          {practiceQuestions.map((question, i) => (
            <View key={question.prompt}>
              <Copy heading>{question.prompt}</Copy>
              <Copy>
                Your response: {question.options[answers[i]] ?? "Not answered"}
              </Copy>
              <Copy>{question.explanation}</Copy>
            </View>
          ))}
          <NativeButton secondary onPress={() => setReview(false)}>
            Return to questions
          </NativeButton>
          <NativeButton
            secondary
            onPress={() => {
              setAnswers({});
              setIndex(0);
              setReview(false);
            }}
          >
            Clear practice responses
          </NativeButton>
        </>
      ) : (
        <>
          <Copy heading>{q.prompt}</Copy>
          {q.options.map((o, i) => (
            <NativeButton
              key={o}
              secondary={answers[index] !== i}
              selected={answers[index] === i}
              onPress={() => setAnswers({ ...answers, [index]: i })}
            >
              {o}
            </NativeButton>
          ))}
          <View style={base.row}>
            <NativeButton
              secondary
              disabled={!index}
              onPress={() => setIndex(index - 1)}
            >
              Previous
            </NativeButton>
            <NativeButton
              disabled={answers[index] === undefined}
              onPress={() =>
                index === practiceQuestions.length - 1
                  ? setReview(true)
                  : setIndex(index + 1)
              }
            >
              {index === practiceQuestions.length - 1
                ? "Review practice"
                : "Next question"}
            </NativeButton>
          </View>
        </>
      )}
    </Card>
  );
}
export function NativeThreadedMessages() {
  const [thread, setThread] = useState("Teaching practice"),
    [drafts, setDrafts] = useState<Record<string, string>>({}),
    [messages, setMessages] = useState<Record<string, string[]>>({
      "Teaching practice": [
        "What observation prompt helped your example class?",
      ],
      "Institution office": [
        "Use approved school channels for private questions.",
      ],
    });
  return (
    <>
      <Card>
        <Copy heading>Permitted example channels</Copy>
        <Copy>
          Fictional adult/institution conversations only. No private child inbox
          or real delivery.
        </Copy>
        <View style={base.row}>
          {Object.keys(messages).map((t) => (
            <NativeButton
              key={t}
              secondary={thread !== t}
              selected={thread === t}
              onPress={() => setThread(t)}
            >
              {t}
            </NativeButton>
          ))}
        </View>
      </Card>
      <Card>
        <Copy heading>{thread}</Copy>
        {messages[thread].map((message, i) => (
          <View key={i}>
            <Copy heading>{i ? "Local example" : "Example channel"}</Copy>
            <Copy>{message}</Copy>
          </View>
        ))}
        <Input
          label="Local message draft"
          multiline
          value={drafts[thread] ?? ""}
          onChange={(value) => setDrafts({ ...drafts, [thread]: value })}
        />
        <NativeButton
          disabled={!drafts[thread]?.trim() || messages[thread].length >= 100}
          onPress={() => {
            setMessages({
              ...messages,
              [thread]: [...messages[thread], drafts[thread].trim()],
            });
            setDrafts({ ...drafts, [thread]: "" });
          }}
        >
          Add local message
        </NativeButton>
        <Copy>
          Drafts stay separate while switching channels. Nothing is delivered.
        </Copy>
      </Card>
    </>
  );
}
