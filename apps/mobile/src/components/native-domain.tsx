import { NativeProfileOnboarding } from "./native-profile-onboarding";
import { useState } from "react";
import { router } from "expo-router";
import { TextInput, View, StyleSheet, Share } from "react-native";
import { ProductText as Text,
  Card,
  Copy,
  NativeButton,
  Screen,
  nativeStyles as base,
  palette,
} from "./native-ui";
import {
  getScreen,
  screenSpecs,
  validateDraft,
  scheduleConflicts,
  type Slot,
  type ScreenSpec,
  type Draft,
} from "../../../../packages/contracts/frontend";
import { usePreview } from "./preview-context";
import { NativeCurated, nativeCuratedKinds } from "./native-curated";
import { NativeAuthoring, NativeCaseWorkbench } from "./native-authoring";
import { NativeEvidence, NativeFinanceDraft } from "./native-evidence";
import {
  registerRows,
  registerView,
  selectedRegisterRows,
  exampleRegisterCsv,
} from "../../../../packages/contracts/register-state";
import { NativeAvailability } from "./native-availability";
import { NativeScreenStateBoundary } from "./native-screen-states";
import { nativeScreenPlan } from "../../../../packages/contracts/native-parity-state";
import {
  NativeParity,
  nativeParityKinds,
  NativeFullPractice,
  NativeThreadedMessages,
} from "./native-parity";
import {
  authorKinds,
  caseKind,
} from "../../../../packages/contracts/authoring-state";
import { NativeLesson, NativeLearning } from "./native-screens";
const sets: Record<string, Record<string, string[]>> = {
  Student: {
    home: ["STU-01", "STU-12", "STU-18", "STU-20"],
    network: ["STU-04", "STU-05", "STU-06", "STU-07", "STU-21"],
    learn: [
      "STU-09",
      "STU-10",
      "STU-12",
      "STU-13",
      "STU-14",
      "STU-15",
      "STU-16",
      "STU-17",
    ],
    inbox: ["APP-04", "APP-05", "APP-19"],
    profile: ["STU-02", "STU-03", "STU-24", "APP-18"],
  },
  Educator: {
    home: ["EDU-01", "EDU-05", "EDU-21", "EDU-22"],
    network: ["EDU-11", "EDU-12", "EDU-13", "EDU-20"],
    learn: [
      "EDU-07",
      "EDU-08",
      "EDU-09",
      "EDU-14",
      "EDU-15",
      "EDU-16",
      "EDU-17",
      "EDU-18",
      "EDU-19",
    ],
    inbox: ["APP-05", "APP-19"],
    profile: ["EDU-02", "EDU-23", "AUTH-14"],
  },
  Guardian: {
    home: ["PAR-01", "PAR-02", "PAR-13"],
    network: ["PAR-03", "PAR-04", "PAR-05", "PAR-06", "PAR-07", "PAR-08"],
    learn: ["PAR-09", "PAR-10", "PAR-12", "PAR-13"],
    inbox: ["PAR-11", "APP-19"],
    profile: ["PAR-14", "PAR-15", "APP-18"],
  },
  Tutor: {
    home: ["PRO-01", "PRO-05", "PRO-06"],
    network: ["PRO-04", "PRO-03"],
    learn: ["PRO-07", "PRO-08"],
    inbox: ["PRO-09", "PRO-10", "PRO-11"],
    profile: ["PRO-02", "PRO-03", "APP-18"],
  },
  "Institution staff": {
    home: ["INS-01", "INS-30"],
    network: ["INS-16", "INS-17", "INS-07"],
    learn: ["INS-20", "EDU-20", "INS-19"],
    inbox: ["INS-25", "STU-20", "INS-28"],
    profile: ["INS-04", "APP-17", "APP-19"],
  },
};
export function NativeDomainHub({ tab }: { tab: string }) {
  const { role } = usePreview();
  const ids = sets[role][tab];
  return (
    <Screen
      eyebrow={`${role.toUpperCase()} / ${tab.toUpperCase()}`}
      title={
        role === "Guardian"
          ? "Stay close to the learning journey."
          : role === "Educator"
            ? "Focus on your next teaching step."
            : role === "Tutor"
              ? "Make expertise useful."
              : role === "Institution staff"
                ? "A clear view of your responsibilities."
                : "Follow a meaningful next step."
      }
      description="Role-specific example tasks. No account, membership, or official action is active."
    >
      {ids.map((id) => {
        const spec = getScreen(id)!;
        return (
          <Card key={id}>
            <Text style={base.badge}>{id}</Text>
            <Copy heading>{spec.name}</Copy>
            <Copy>{spec.summary}</Copy>
            <NativeButton
              secondary
              onPress={() =>
                router.push({ pathname: "./screen", params: { id } })
              }
            >
              Open example task
            </NativeButton>
          </Card>
        );
      })}
      <NativeButton secondary onPress={() => router.push("./screen-library")}>
        Explore native screen designs
      </NativeButton>
      <NativeButton secondary onPress={() => router.push("./workflow-library")}>
        Explore native workflow paths
      </NativeButton>
    </Screen>
  );
}
function NativeFields({ spec }: { spec: ScreenSpec }) {
  const [draft, setDraft] = useState<Draft>({}),
    [errors, setErrors] = useState<Draft>({}),
    [reviewed, setReviewed] = useState(false);
  return (
    <Card>
      <Copy heading>Prepare a local draft</Copy>
      {spec.fields.map((f) => (
        <View key={f.key} style={styles.field}>
          <Text style={styles.label}>
            {f.label}
            {f.required ? " · Required" : ""}
          </Text>
          {f.type === "select" ? (
            <View style={base.row}>
              {f.options.map((o) => (
                <NativeButton
                  key={o}
                  secondary={draft[f.key] !== o}
                  selected={draft[f.key] === o}
                  onPress={() => {
                    setDraft({ ...draft, [f.key]: o });
                    setReviewed(false);
                  }}
                >
                  {o}
                </NativeButton>
              ))}
            </View>
          ) : (
            <TextInput
              style={[
                base.input,
                f.type === "textarea" && {
                  minHeight: 120,
                  textAlignVertical: "top",
                },
              ]}
              accessibilityLabel={f.label}
              multiline={f.type === "textarea"}
              maxLength={f.type === "textarea" ? 5000 : 500}
              keyboardType={
                f.type === "email"
                  ? "email-address"
                  : f.type === "number"
                    ? "numeric"
                    : "default"
              }
              autoCapitalize={f.type === "email" ? "none" : "sentences"}
              value={draft[f.key] ?? ""}
              onChangeText={(text) => {
                setDraft({ ...draft, [f.key]: text });
                setReviewed(false);
              }}
              placeholder={
                f.type === "date"
                  ? "YYYY-MM-DD"
                  : f.type === "time"
                    ? "HH:MM"
                    : "Use fictional example information"
              }
            />
          )}{" "}
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
          setReviewed(Object.keys(found).length === 0);
        }}
      >
        Review example draft
      </NativeButton>
      {reviewed && (
        <View style={styles.review}>
          <Text accessibilityLiveRegion="polite" style={base.status}>
            Draft reviewed locally. Nothing was submitted or changed.
          </Text>
          {spec.fields.map((f) => (
            <Copy key={f.key}>
              {f.label}: {draft[f.key] || "Not provided"}
            </Copy>
          ))}
        </View>
      )}
    </Card>
  );
}
function NativeRecordCards({ spec }: { spec: ScreenSpec }) {
  const [query, setQuery] = useState(""),
    [open, setOpen] = useState(""),
    [descending, setDescending] = useState(false),
    [filter, setFilter] = useState("All"),
    [page, setPage] = useState(0),
    [selected, setSelected] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState(0),
    [chooseSort, setChooseSort] = useState(false),
    [notice, setNotice] = useState("");
  const entries = registerRows(spec.rows),
    view = registerView(spec.columns, entries, {
      query,
      status: filter,
      sortColumn,
      descending,
      page,
    }),
    rows = view.matches,
    current = view.page,
    statuses = view.statuses;
  const selectedEntries = selectedRegisterRows(entries, selected);
  async function share(scope: "matching" | "selected") {
    const chosen = scope === "selected" ? selectedEntries : rows;
    if (!chosen.length) return;
    try {
      const result = await Share.share(
        {
          title: "iSchoolie EXAMPLE CSV",
          message: exampleRegisterCsv(spec.columns, chosen),
        },
        { dialogTitle: "Share fictional example CSV text" },
      );
      setNotice(
        result.action === Share.dismissedAction
          ? "Share sheet dismissed."
          : "Share sheet closed. Delivery is not verified.",
      );
    } catch {
      setNotice("Could not open the system share sheet. Try again.");
    }
  }
  return (
    <>
      <TextInput
        accessibilityLabel="Search example records"
        style={base.input}
        value={query}
        onChangeText={(value) => {
          setQuery(value);
          setPage(0);
        }}
        placeholder="Search this example list"
      />
      <View style={base.row}>
        <NativeButton secondary onPress={() => setDescending(!descending)}>
          Sort {descending ? "Z–A" : "A–Z"}
        </NativeButton>
        <NativeButton secondary onPress={() => setSelected([])}>
          Clear selection ({selectedEntries.length})
        </NativeButton>
      </View>
      <NativeButton
        secondary
        expanded={chooseSort}
        onPress={() => setChooseSort(!chooseSort)}
      >
        Sort field: {spec.columns[sortColumn]}
      </NativeButton>
      {chooseSort && (
        <View style={base.row}>
          {spec.columns.map((c, i) => (
            <NativeButton
              key={c}
              secondary={sortColumn !== i}
              selected={sortColumn === i}
              onPress={() => {
                setSortColumn(i);
                setChooseSort(false);
                setPage(0);
              }}
            >
              {c}
            </NativeButton>
          ))}
        </View>
      )}
      <Copy>
        {selectedEntries.length} selected across filters;{" "}
        {
          selectedEntries.filter((r) => rows.some((m) => m.key === r.key))
            .length
        }{" "}
        match this view.
      </Copy>
      <View style={base.row}>
        <NativeButton
          secondary
          disabled={!rows.length}
          onPress={() => void share("matching")}
        >
          Share matching example CSV text
        </NativeButton>
        <NativeButton
          secondary
          disabled={!selectedEntries.length}
          onPress={() => void share("selected")}
        >
          Share selected example CSV text
        </NativeButton>
      </View>
      {notice && (
        <Text accessibilityLiveRegion="polite" style={base.status}>
          {notice}
        </Text>
      )}
      {statuses.length > 0 && (
        <View style={base.row}>
          {["All", ...statuses].map((status) => (
            <NativeButton
              key={status}
              secondary={filter !== status}
              selected={filter === status}
              onPress={() => {
                setFilter(status);
                setPage(0);
              }}
            >
              {status}
            </NativeButton>
          ))}
        </View>
      )}
      {!rows.length && (
        <Card>
          <Copy>No matching records. Clear the search or status filter.</Copy>
          <NativeButton
            secondary
            onPress={() => {
              setQuery("");
              setFilter("All");
            }}
          >
            Clear filters
          </NativeButton>
        </Card>
      )}
      {view.visible.map((entry) => {
        const row = entry.cells;
        return (
          <Card key={entry.key}>
            <Copy heading>{row[0]}</Copy>
            <NativeButton
              secondary={!selected.includes(entry.key)}
              selected={selected.includes(entry.key)}
              onPress={() =>
                setSelected(
                  selected.includes(entry.key)
                    ? selected.filter((id) => id !== entry.key)
                    : [...selected, entry.key],
                )
              }
            >
              {selected.includes(entry.key) ? "Deselect" : "Select"} {row[0]}
            </NativeButton>
            {row.slice(1).map((cell, i) => (
              <Copy key={i}>
                {spec.columns[i + 1]}: {cell}
              </Copy>
            ))}
            <NativeButton
              secondary
              onPress={() => setOpen(open === entry.key ? "" : entry.key)}
            >
              {open === entry.key
                ? "Close example detail"
                : "Inspect example detail"}
            </NativeButton>
            {open === entry.key && (
              <View style={styles.review}>
                <Copy>
                  This is a fictional scoped record. Official history, private
                  evidence, export rights, and mutations remain unavailable.
                </Copy>
              </View>
            )}
          </Card>
        );
      })}
      {view.pages > 1 && (
        <View style={base.row}>
          <NativeButton
            secondary
            disabled={current === 0}
            onPress={() => setPage(current - 1)}
          >
            Previous records
          </NativeButton>
          <Copy>
            Page {current + 1} of {view.pages}
          </Copy>
          <NativeButton
            secondary
            disabled={current + 1 >= view.pages}
            onPress={() => setPage(current + 1)}
          >
            Next records
          </NativeButton>
        </View>
      )}
    </>
  );
}
function NativeAttendance() {
  const [marks, setMarks] = useState<Record<string, string>>({});
  return (
    <>
      {["Example learner A", "Example learner B", "Example learner C"].map(
        (name) => (
          <Card key={name}>
            <Copy heading>{name}</Copy>
            <Text style={base.badge}>{marks[name] || "Unmarked"}</Text>
            <View style={base.row}>
              {["Present", "Absent", "Late"].map((mark) => (
                <NativeButton
                  key={mark}
                  secondary={marks[name] !== mark}
                  onPress={() => setMarks({ ...marks, [name]: mark })}
                >
                  {mark}
                </NativeButton>
              ))}
            </View>
            <Copy>Draft only. No official attendance is finalized.</Copy>
          </Card>
        ),
      )}
    </>
  );
}
function NativeSchedule({ editable = false }: { editable?: boolean }) {
  const [day, setDay] = useState("Monday"),
    [slots, setSlots] = useState<Slot[]>([
      {
        id: "EX-T01",
        day: "Monday",
        period: "09:00",
        teacher: "Ananya Rao",
        room: "Studio A",
        subject: "Visual thinking",
      },
      {
        id: "EX-T02",
        day: "Tuesday",
        period: "10:00",
        teacher: "Kabir Sen",
        room: "Lab B",
        subject: "Science inquiry",
      },
    ]),
    [draft, setDraft] = useState<Draft>({}),
    [error, setError] = useState(""),
    [next, setNext] = useState(3);
  const conflicts = scheduleConflicts(slots);
  return (
    <>
      <View style={base.row}>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
          <NativeButton
            key={d}
            selected={day === d}
            secondary={day !== d}
            onPress={() => setDay(d)}
          >
            {d}
          </NativeButton>
        ))}
      </View>
      <Card>
        <Text style={base.badge}>EXAMPLE WEEK · ASIA/KOLKATA</Text>
        <Copy heading>{day}</Copy>
        {slots
          .filter((s) => s.day === day)
          .map((s) => (
            <View key={s.id} style={{ gap: 8 }}>
              <Copy heading>
                {s.period} · {s.subject}
              </Copy>
              <Copy>
                {s.teacher} · {s.room}
              </Copy>
              {editable && (
                <NativeButton
                  secondary
                  onPress={() =>
                    setSlots(slots.filter((row) => row.id !== s.id))
                  }
                >
                  Remove {s.subject}
                </NativeButton>
              )}
            </View>
          ))}
        {!slots.some((s) => s.day === day) && (
          <Copy>No example sessions for this day.</Copy>
        )}
        <Copy>This local schedule never publishes an official calendar.</Copy>
      </Card>
      {conflicts.length > 0 && (
        <Card>
          {conflicts.map((c) => (
            <Text key={c} accessibilityRole="alert" style={base.error}>
              {c}
            </Text>
          ))}
        </Card>
      )}
      {editable && (
        <Card>
          <Copy heading>Add an example period for {day}</Copy>
          {["period", "teacher", "room", "subject"].map((key) => (
            <View key={key}>
              <Copy>{key === "period" ? "Time (HH:MM)" : key}</Copy>
              <TextInput
                accessibilityLabel={key}
                style={base.input}
                maxLength={100}
                value={draft[key] ?? ""}
                onChangeText={(text) => setDraft({ ...draft, [key]: text })}
              />
            </View>
          ))}
          {error && (
            <Text accessibilityRole="alert" style={base.error}>
              {error}
            </Text>
          )}
          <NativeButton
            disabled={slots.length >= 30}
            onPress={() => {
              if (
                !["teacher", "room", "subject"].every((k) =>
                  draft[k]?.trim(),
                ) ||
                !/^([01]\d|2[0-3]):[0-5]\d$/.test(draft.period ?? "")
              ) {
                setError("Add a valid time, teacher, room and subject.");
                return;
              }
              setSlots([
                ...slots,
                {
                  id: `EX-T${next}`,
                  day,
                  period: draft.period,
                  teacher: draft.teacher.trim(),
                  room: draft.room.trim(),
                  subject: draft.subject.trim(),
                },
              ]);
              setNext(next + 1);
              setDraft({});
              setError("");
            }}
          >
            Add local period
          </NativeButton>
        </Card>
      )}
    </>
  );
}
export function NativeScreenBody({ spec }: { spec: ScreenSpec }) {
  if (["AUTH-07","AUTH-08","AUTH-09"].includes(spec.id)) return <NativeProfileOnboarding />;
  if (spec.id === "PRO-02")
    return <NativeParity spec={{ ...spec, kind: "profile" }} />;
  if (nativeScreenPlan(spec) === "web-only")
    return (
      <Card>
        <Copy>This task is web-only. No scoped data is loaded.</Copy>
      </Card>
    );
  if (nativeParityKinds.has(spec.kind))
    return (
      <>
        <NativeParity spec={spec} />
        {["support", "review", "verification"].includes(spec.kind) &&
          spec.fields.length > 0 && <NativeFields spec={spec} />}
      </>
    );
  if (spec.kind === "player") return <NativeLesson />;
  if (["catalog", "my-learning"].includes(spec.kind)) return <NativeLearning />;
  if (spec.id === "PRO-04") return <NativeAvailability />;
  if (authorKinds.has(spec.kind)) return <NativeAuthoring kind={spec.kind} />;
  if (spec.kind === "finance")
    return <NativeFinanceDraft editable={spec.id === "INS-23"} />;
  if (spec.kind === "grading" || spec.kind === "submission")
    return <NativeEvidence kind={spec.kind} />;
  const lifecycle = caseKind(spec.kind, spec.id);
  if (lifecycle)
    return (
      <>
        <NativeCaseWorkbench kind={lifecycle} />
        {spec.rows.length > 0 && <NativeRecordCards spec={spec} />}
      </>
    );
  return (
    <>
      {nativeCuratedKinds.has(spec.kind) ? (
        <NativeCurated kind={spec.kind} />
      ) : spec.kind === "attendance" ? (
        <NativeAttendance />
      ) : spec.kind === "assessment" ? (
        <NativeFullPractice />
      ) : spec.kind === "messages" ? (
        <NativeThreadedMessages />
      ) : ["timetable", "timetable-builder", "scheduler"].includes(
          spec.kind,
        ) ? (
        <NativeSchedule editable={spec.kind === "timetable-builder"} />
      ) : spec.kind === "live" ? (
        <Card>
          <Copy heading>Live media is unavailable.</Copy>
          <Copy>
            No camera, microphone, or room permission is requested. Use the
            scheduling path to prepare a local session draft.
          </Copy>
        </Card>
      ) : spec.kind === "credentials" ? (
        <Card>
          <Text style={styles.specimen}>SPECIMEN · NOT ISSUED</Text>
          <Copy heading>Visual thinking pathway</Copy>
          <Copy>
            Example certificate layout. No completion, issuer authority, or
            qualification is verified.
          </Copy>
        </Card>
      ) : null}
      {spec.sections.map(([title, body]) => (
        <Card key={title}>
          <Copy heading>{title}</Copy>
          <Copy>{body}</Copy>
        </Card>
      ))}
      {spec.rows.length > 0 && <NativeRecordCards spec={spec} />}{" "}
      {spec.fields.length > 0 && (
        <NativeFields key={spec.id} spec={spec} />
      )}{" "}
    </>
  );
}
export function NativeScreenDetail({ id }: { id: string }) {
  const spec = getScreen(id);
  if (!spec?.native)
    return (
      <Screen
        eyebrow="RESTRICTED DESIGN CONTEXT"
        title="This task belongs on the web."
        description="Public marketing and platform operations are not part of the broad native console."
      >
        <Card>
          <Copy>No specialist records or evidence are loaded.</Copy>
        </Card>
      </Screen>
    );
  return (
    <Screen
      eyebrow={`${spec.family} / ${spec.id}`}
      title={spec.name}
      description={spec.summary}
    >
      <NativeScreenStateBoundary key={id} spec={spec}>
        <NativeScreenBody spec={spec} />
      </NativeScreenStateBoundary>
      <Card>
        <Copy>{spec.policy}</Copy>
      </Card>
      {spec.links
        .filter((link) => getScreen(link)?.native)
        .map((link) => (
          <NativeButton
            key={link}
            secondary
            onPress={() =>
              router.replace({ pathname: "./screen", params: { id: link } })
            }
          >
            {getScreen(link)!.name}
          </NativeButton>
        ))}
    </Screen>
  );
}
export function NativeScreenLibrary() {
  const { role } = usePreview();
  const [query, setQuery] = useState("");
  const family = {
    Student: "STU",
    Educator: "EDU",
    Guardian: "PAR",
    Tutor: "PRO",
    "Institution staff": "INS",
  }[role];
  const matches = screenSpecs.filter(
    (s) =>
      s.native &&
      (s.family === family || s.family === "APP" || s.family === "AUTH") &&
      `${s.id} ${s.name}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Screen
      eyebrow="NATIVE SCREEN DESIGNS"
      title="A considered path for your role."
      description="Native task editors, scoped records, learning evidence and connected local walkthroughs. Platform operations remain web-only."
    >
      <TextInput
        style={base.input}
        accessibilityLabel="Search native designs"
        value={query}
        onChangeText={setQuery}
        placeholder="Search a screen name or ID"
      />
      <NativeButton secondary onPress={() => router.push("./workflow-library")}>
        Open native workflow paths
      </NativeButton>
      {matches.map((spec) => (
        <Card key={spec.id}>
          <Text style={base.badge}>{spec.id}</Text>
          <Copy heading>{spec.name}</Copy>
          <Copy>{spec.summary}</Copy>
          <NativeButton
            secondary
            onPress={() =>
              router.push({ pathname: "./screen", params: { id: spec.id } })
            }
          >
            Open design
          </NativeButton>
        </Card>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({
  field: { gap: 10 },
  label: { fontSize: 13, color: palette.ink, fontWeight: "600" },
  review: {
    backgroundColor: palette.lavender,
    padding: 15,
    borderRadius: 8,
    gap: 10,
  },
  stack: { gap: 20 },
  specimen: { fontSize: 22, color: palette.brand, letterSpacing: 1 },
});
