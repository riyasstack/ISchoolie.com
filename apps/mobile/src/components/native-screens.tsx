import { useState } from "react";
import { router } from "expo-router";
import { TextInput, View } from "react-native";
import {
  ProductText as Text,
  Card,
  Copy,
  NativeButton,
  Screen,
  nativeStyles as s,
} from "./native-ui";
import { usePreview, roles } from "./preview-context";
const sampleCourses = [
  {
    title: "The art of thinking clearly",
    teacher: "Ananya Rao",
    category: "Design & creativity",
    mark: "Aa",
  },
  {
    title: "A world of small wonders",
    teacher: "Kabir Sen",
    category: "Science & discovery",
    mark: "◌",
  },
];
export function NativeHome() {
  const { role } = usePreview();
  if (role === "Guardian") return <NativeGuardian />;
  if (role === "Tutor") return <NativeBooking />;
  return (
    <Screen
      eyebrow={`${role.toUpperCase()} WORKSPACE`}
      title={
        role === "Student"
          ? "Good things grow together."
          : "Make room for a new idea."
      }
      description="Your example learning world. No account or permissions are active."
    >
      <Card>
        <Text style={s.badge}>YOUR NEXT CHAPTER</Text>
        <Copy heading>The art of thinking clearly.</Copy>
        <View style={s.art}>
          <Text style={s.artText}>Aa</Text>
          <Copy>Curiosity is a practice.</Copy>
        </View>
        <Copy>
          Continue a sample lesson with Ananya Rao. No official progress is
          recorded.
        </Copy>
        <NativeButton onPress={() => router.push("./lesson")}>
          Open sample lesson
        </NativeButton>
      </Card>
      <Card>
        <Copy heading>A question worth exploring</Copy>
        <Copy>
          What changes when we begin with “What do you notice?” instead of “What
          is the answer?”
        </Copy>
        <NativeButton secondary onPress={() => router.push("./network")}>
          {role === "Student"
            ? "Find people to learn with"
            : "Explore your example class"}
        </NativeButton>
      </Card>
    </Screen>
  );
}
function NativeGuardian() {
  const [child, setChild] = useState("Aarav");
  return (
    <Screen
      eyebrow="GUARDIAN WORKSPACE"
      title="Closer to their learning world."
      description="Fictional family details. No relationship has been verified."
    >
      <View style={s.row}>
        {["Aarav", "Diya"].map((c) => (
          <NativeButton
            key={c}
            secondary={child !== c}
            onPress={() => setChild(c)}
          >
            {c}
          </NativeButton>
        ))}
      </View>
      <View key={child}>
        <Card>
          <Copy heading>{child}’s learning world</Copy>
          {child === "Aarav" ? (
            <>
              <Text style={s.badge}>Example authorized context</Text>
              <Copy>Grade 10 · Section A</Copy>
              <Copy>Attendance: 23 of 25 example days present.</Copy>
              <Copy>
                Learning: Visual thinking · Looking beyond the obvious.
              </Copy>
            </>
          ) : (
            <>
              <Text style={s.badge}>Awaiting authorization</Text>
              <Copy>
                Academic information is unavailable for this example child.
                Previous child details have been cleared.
              </Copy>
            </>
          )}
        </Card>
      </View>
      <Card>
        <Copy heading>Thoughtful boundaries</Copy>
        <Copy>
          Private messages, unpublished grades, and staff-only notes remain
          unavailable.
        </Copy>
      </Card>
    </Screen>
  );
}
export function NativeNetwork() {
  const { role } = usePreview();
  const [query, setQuery] = useState(""),
    [requested, setRequested] = useState<string[]>([]);
  const people =
    role === "Student"
      ? [
          "Ananya Rao · Design educator",
          "Kabir Sen · Science educator",
          "Meera Iyer · Language educator",
        ]
      : [
          "Example class 10 A · Visual thinking",
          "Example class 10 B · Science inquiry",
        ];
  return (
    <Screen
      eyebrow={role === "Student" ? "EDUCATION NETWORK" : "YOUR SCOPED CONTEXT"}
      title={
        role === "Student"
          ? "People who open new worlds."
          : "A focused view of learning."
      }
      description="Example directory. Private records and contact eligibility are not granted."
    >
      <TextInput
        style={s.input}
        accessibilityLabel="Search example directory"
        placeholder="Search by name or subject"
        value={query}
        onChangeText={setQuery}
      />
      {people
        .filter((p) => p.toLowerCase().includes(query.toLowerCase()))
        .map((p) => (
          <Card key={p}>
            <Copy heading>{p.split(" · ")[0]}</Copy>
            <Copy>{p.split(" · ")[1]}</Copy>
            <Text style={s.badge}>Example · Not verified</Text>
            <NativeButton
              secondary
              onPress={() =>
                setRequested(
                  requested.includes(p)
                    ? requested.filter((x) => x !== p)
                    : [...requested, p],
                )
              }
            >
              {requested.includes(p)
                ? "Request previewed · Undo"
                : "Preview request"}
            </NativeButton>
          </Card>
        ))}
      {!people.some((p) => p.toLowerCase().includes(query.toLowerCase())) && (
        <Card>
          <Copy heading>No matches</Copy>
          <Copy>Try another search.</Copy>
        </Card>
      )}
    </Screen>
  );
}
export function NativeLearning() {
  const { role } = usePreview();
  const [status, setStatus] = useState<Record<string, string>>({});
  if (role === "Institution staff")
    return (
      <Screen
        eyebrow="ATTENDANCE PREVIEW"
        title="A considered class register."
        description="Draft marks stay in memory. No academic record is submitted."
      >
        {["Aarav Shah", "Diya Menon", "Riya Das"].map((name) => (
          <Card key={name}>
            <Copy heading>{name}</Copy>
            <Text style={s.badge}>{status[name] || "Unmarked"}</Text>
            <View style={s.row}>
              {["Present", "Absent", "Late"].map((mark) => (
                <NativeButton
                  key={mark}
                  secondary={status[name] !== mark}
                  onPress={() => setStatus({ ...status, [name]: mark })}
                >
                  {mark}
                </NativeButton>
              ))}
            </View>
          </Card>
        ))}
      </Screen>
    );
  return (
    <Screen
      eyebrow="LEARNING"
      title="Follow your curiosity."
      description="Purposeful sample learning content. No enrollment or certification is created."
    >
      {sampleCourses.map((c) => (
        <Card key={c.title}>
          <View style={s.art}>
            <Text style={s.artText}>{c.mark}</Text>
          </View>
          <Text style={s.badge}>{c.category}</Text>
          <Copy heading>{c.title}</Copy>
          <Copy>With {c.teacher} · Example educator</Copy>
          <NativeButton onPress={() => router.push("./lesson")}>
            Read a sample lesson
          </NativeButton>
        </Card>
      ))}
    </Screen>
  );
}
export function NativeLesson() {
  const [lesson, setLesson] = useState(0),
    [note, setNote] = useState(""),
    [saved, setSaved] = useState(false);
  const titles = [
    "Begin with curiosity",
    "The practice of observation",
    "Make connections",
  ];
  return (
    <Screen
      eyebrow="SAMPLE TEXT LESSON"
      title={titles[lesson]}
      description={`The art of thinking clearly · Lesson ${lesson + 1} of ${titles.length}`}
    >
      <Card>
        <View style={s.art}>
          <Text style={s.artText}>Aa</Text>
          <Copy heading>What do you notice?</Copy>
        </View>
        <Copy>
          Choose an ordinary object nearby. Spend a minute noticing its edges,
          its texture, and the way light falls across it. Write five
          observations, then one question to explore next.
        </Copy>
        <Text style={s.badge}>Text preview · Video not connected</Text>
      </Card>
      <Card>
        <Copy heading>Your notes</Copy>
        <TextInput
          accessibilityLabel="Lesson notes"
          multiline
          style={[s.input, { minHeight: 130, textAlignVertical: "top" }]}
          value={note}
          onChangeText={(text) => {
            setNote(text);
            setSaved(false);
          }}
          placeholder="What did you notice?"
        />
        <NativeButton secondary onPress={() => setSaved(true)}>
          Keep in this page preview
        </NativeButton>
        {saved && (
          <Text accessibilityLiveRegion="polite" style={s.status}>
            Notes kept locally until you leave. No academic progress was saved.
          </Text>
        )}
      </Card>
      <View style={s.row}>
        <NativeButton
          secondary
          disabled={lesson === 0}
          onPress={() => setLesson(lesson - 1)}
        >
          Previous
        </NativeButton>
        <NativeButton
          disabled={lesson === titles.length - 1}
          onPress={() => setLesson(lesson + 1)}
        >
          Next lesson
        </NativeButton>
      </View>
    </Screen>
  );
}
export function NativeInbox() {
  return (
    <Screen
      eyebrow="AUTHORIZED COMMUNICATION"
      title="Room for a conversation."
      description="Contact and account verification are not active in this preview."
    >
      <Card>
        <Copy heading>Messages remain restricted.</Copy>
        <Copy>
          Age, consent, relationships, and blocking policies must be approved
          before conversations are enabled. This preview loads no private
          messages or financial data.
        </Copy>
      </Card>
    </Screen>
  );
}
export function NativeProfile() {
  const { role, setRole } = usePreview();
  const [switching, setSwitching] = useState(false);
  return (
    <Screen
      eyebrow="Your education identity"
      title="Alex Morgan"
      description="Learner · Exploring ideas at the intersection of design and education. Example profile, not verified."
    >
      <View
        style={{
          backgroundColor: "#E8F2FC",
          borderRadius: 16,
          minHeight: 128,
          padding: 24,
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Text style={{ fontSize: 36, fontWeight: "600", color: "#0071E3" }}>
          AM
        </Text>
        <Copy>A little curiosity goes a long way.</Copy>
      </View>
      <Card>
        <Copy heading>Your next chapter, introduced.</Copy>
        <Copy>
          No institution affiliation or verification is claimed. General
          location and contact details are not shared.
        </Copy>
        <NativeButton
          onPress={() =>
            router.push({ pathname: "/screen", params: { id: "AUTH-07" } })
          }
        >
          Build your local profile
        </NativeButton>
        <NativeButton
          secondary
          onPress={() =>
            router.push({ pathname: "/screen", params: { id: "APP-16" } })
          }
        >
          Explore a professional profile
        </NativeButton>
      </Card>
      <Card>
        <Copy heading>About</Copy>
        <Copy>
          I’m interested in how people learn, how ideas connect and what a
          thoughtful question can uncover. This is example biography content.
        </Copy>
        <Copy heading>Learning & interests</Copy>
        <View style={s.row}>
          {["Visual thinking", "Writing", "Science", "Learning design"].map(
            (value) => (
              <Text style={s.badge} key={value}>
                {value}
              </Text>
            ),
          )}
        </View>
      </Card>
      <Card>
        <Copy heading>Featured learning</Copy>
        <Copy>
          The art of thinking clearly · Example learning journey. No certificate
          or achievement is claimed.
        </Copy>
        <NativeButton secondary onPress={() => router.push("/learn")}>
          Explore learning
        </NativeButton>
      </Card>
      <Card>
        <NativeButton onPress={() => router.push("/access")}>
          Open secure account settings
        </NativeButton>
        <NativeButton
          secondary
          expanded={switching}
          onPress={() => setSwitching(!switching)}
        >
          {switching
            ? "Close workspace selection"
            : "Explore another design context"}
        </NativeButton>
        {switching &&
          roles.map((value) => (
            <NativeButton
              key={value}
              secondary={role !== value}
              onPress={() => {
                setRole(value);
                router.replace("/");
              }}
            >
              {value}
            </NativeButton>
          ))}
        <Copy>
          Role switching is a local preview. It never grants access. Platform
          operations remain web-only.
        </Copy>
      </Card>
    </Screen>
  );
}
export function NativeBooking() {
  const [slot, setSlot] = useState(""),
    [review, setReview] = useState(false);
  return (
    <Screen
      eyebrow="TUTOR / PROFESSIONAL"
      title="Make time for possibility."
      description="Example mathematics mentoring · 45 minutes · Asia/Kolkata"
    >
      <Card>
        <Copy heading>
          {review ? "Review the example" : "10 November 2026"}
        </Copy>
        {review ? (
          <>
            <Copy>{slot} · 45 minutes · UTC+05:30</Copy>
            <Copy>
              No slot is reserved. No payment or contact permission is created.
            </Copy>
            <NativeButton secondary onPress={() => setReview(false)}>
              Change time
            </NativeButton>
          </>
        ) : (
          <>
            <View style={s.row}>
              {["09:00", "10:30", "14:00"].map((t) => (
                <NativeButton
                  key={t}
                  secondary={slot !== t}
                  onPress={() => setSlot(t)}
                >
                  {t}
                </NativeButton>
              ))}
            </View>
            <NativeButton disabled={!slot} onPress={() => setReview(true)}>
              Review example session
            </NativeButton>
          </>
        )}
      </Card>
      <Card>
        <Copy heading>Eligibility comes first.</Copy>
        <Copy>
          Tutor qualifications, learner relationships, and schedule conflicts
          require authoritative checks before any booking can be enabled.
        </Copy>
      </Card>
    </Screen>
  );
}
