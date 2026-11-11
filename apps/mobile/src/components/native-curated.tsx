import { useState } from "react";
import { router } from "expo-router";
import { TextInput, View } from "react-native";
import { ProductText as Text, Card, Copy, NativeButton, nativeStyles as s } from "./native-ui";
import { usePreview } from "./preview-context";
const publicIdeas = [
  {
    id: "idea-1",
    author: "Ananya Rao",
    body: "What changes when we ask “What do you notice?” before asking for an answer?",
  },
  {
    id: "idea-2",
    author: "Kabir Sen",
    body: "Everyday objects can become a starting point for careful observation.",
  },
];
export const nativeCuratedKinds = new Set([
  "feed",
  "student-feed",
  "saved",
  "network",
  "communities",
  "notifications",
  "settings",
  "roster",
  "course",
]);
export function NativeCurated({ kind }: { kind: string }) {
  switch (kind) {
    case "feed":
    case "student-feed":
    case "saved":
      return <NativeIdeas mode={kind} />;
    case "network":
      return <NativeDirectory />;
    case "communities":
      return <NativeCommunities />;
    case "notifications":
      return <NativeAlerts />;
    case "settings":
      return <NativePreferences />;
    case "roster":
      return <NativeRoster />;
    case "course":
      return (
        <Card>
          <Text style={s.badge}>EXAMPLE COURSE · NO ENROLLMENT</Text>
          <Copy heading>The art of thinking clearly</Copy>
          <Copy>
            Explore observation, visual thinking, and ideas with Ananya Rao.
            Qualifications and learner eligibility are not verified.
          </Copy>
          <Copy>
            Foundations of curiosity → Observation practice → Make connections
          </Copy>
          <NativeButton onPress={() => router.push("./lesson")}>
            Open sample text lesson
          </NativeButton>
        </Card>
      );
    default:
      return null;
  }
}
function NativeIdeas({ mode }: { mode: string }) {
  const { saved, toggleSave } = usePreview();
  const [draft, setDraft] = useState(""),
    [local, setLocal] = useState<string[]>([]),
    [likes, setLikes] = useState<string[]>([]);
  const records =
    mode === "saved"
      ? publicIdeas.filter((p) => saved.includes(p.id))
      : publicIdeas;
  return (
    <>
      {mode === "student-feed" && (
        <Card>
          <Copy>
            Example class updates only. Contact eligibility, public posting, and
            private group membership remain restricted.
          </Copy>
        </Card>
      )}
      {records.map((p) => (
        <Card key={p.id}>
          <Text style={s.badge}>{p.author} · Example educator</Text>
          <Copy heading>A question worth exploring</Copy>
          <Copy>{p.body}</Copy>
          <View style={s.row}>
            <NativeButton
              secondary
              onPress={() =>
                setLikes(
                  likes.includes(p.id)
                    ? likes.filter((id) => id !== p.id)
                    : [...likes, p.id],
                )
              }
            >
              {likes.includes(p.id)
                ? "Appreciated locally"
                : "Appreciate example"}
            </NativeButton>
            <NativeButton secondary onPress={() => toggleSave(p.id)}>
              {saved.includes(p.id) ? "Unsave example" : "Save example"}
            </NativeButton>
          </View>
        </Card>
      ))}
      {mode === "saved" && !records.length && (
        <Card>
          <Copy heading>A space for ideas worth keeping</Copy>
          <Copy>
            Save a sample idea in the education feed to see it here. The
            collection resets when your preview role changes.
          </Copy>
        </Card>
      )}
      {mode !== "saved" && (
        <Card>
          <Copy heading>
            {mode === "student-feed"
              ? "Private reflection draft"
              : "Contribute an example thought"}
          </Copy>
          <TextInput
            accessibilityLabel="Example reflection"
            style={[s.input, { minHeight: 110, textAlignVertical: "top" }]}
            value={draft}
            onChangeText={setDraft}
            multiline
            maxLength={2000}
          />
          <NativeButton
            disabled={!draft.trim()}
            onPress={() => {
              setLocal([...local, draft.trim()]);
              setDraft("");
            }}
          >
            Keep a local reflection
          </NativeButton>
          {local.map((text, i) => (
            <Copy key={i}>{text}</Copy>
          ))}
          <Copy>No content is published or sent.</Copy>
        </Card>
      )}
    </>
  );
}
function NativeDirectory() {
  const [query, setQuery] = useState(""),
    [requested, setRequested] = useState<string[]>([]);
  return (
    <>
      <TextInput
        style={s.input}
        accessibilityLabel="Find example educators"
        placeholder="Search educators or subjects"
        value={query}
        onChangeText={setQuery}
      />
      {[
        { name: "Ananya Rao", subject: "Visual thinking" },
        { name: "Kabir Sen", subject: "Science inquiry" },
        { name: "Meera Iyer", subject: "Language practice" },
      ]
        .filter((p) =>
          `${p.name} ${p.subject}`.toLowerCase().includes(query.toLowerCase()),
        )
        .map((p) => (
          <Card key={p.name}>
            <Copy heading>{p.name}</Copy>
            <Copy>{p.subject} · Unverified example adult professional</Copy>
            <NativeButton
              secondary
              onPress={() =>
                setRequested(
                  requested.includes(p.name)
                    ? requested.filter((n) => n !== p.name)
                    : [...requested, p.name],
                )
              }
            >
              {requested.includes(p.name)
                ? "Request previewed · Undo"
                : "Preview a connection request"}
            </NativeButton>
            <Copy>No contact permission or relationship is created.</Copy>
          </Card>
        ))}
    </>
  );
}
function NativeCommunities() {
  const [requests, setRequests] = useState<string[]>([]);
  return (
    <>
      {["The curious classroom", "Design for learning", "Everyday science"].map(
        (name) => (
          <Card key={name}>
            <Copy heading>{name}</Copy>
            <Copy>
              A fictional community for thoughtful questions and shared
              learning.
            </Copy>
            <NativeButton
              secondary
              onPress={() =>
                setRequests(
                  requests.includes(name)
                    ? requests.filter((n) => n !== name)
                    : [...requests, name],
                )
              }
            >
              {requests.includes(name)
                ? "Request previewed · Undo"
                : "Preview a membership request"}
            </NativeButton>
            <Copy>Private discussions remain unavailable.</Copy>
          </Card>
        ),
      )}
    </>
  );
}
function NativeAlerts() {
  const [read, setRead] = useState<string[]>([]);
  return (
    <>
      {[
        { title: "Continue a sample lesson", id: "STU-10" },
        { title: "Review an example assignment", id: "STU-12" },
      ].map((a) => (
        <Card key={a.id}>
          <Text style={s.badge}>
            {read.includes(a.id) ? "Read locally" : "Example update"}
          </Text>
          <Copy heading>{a.title}</Copy>
          <NativeButton
            secondary
            onPress={() => {
              setRead([...read, a.id]);
              router.push({ pathname: "./screen", params: { id: a.id } });
            }}
          >
            Open example destination
          </NativeButton>
        </Card>
      ))}
    </>
  );
}
function NativePreferences() {
  const [enabled, setEnabled] = useState<string[]>([]);
  return (
    <Card>
      <Copy heading>Make your preferences deliberate.</Copy>
      {[
        "Learning digest",
        "Institution notices",
        "Accessibility reminders",
      ].map((label) => (
        <NativeButton
          key={label}
          secondary={!enabled.includes(label)}
          onPress={() =>
            setEnabled(
              enabled.includes(label)
                ? enabled.filter((x) => x !== label)
                : [...enabled, label],
            )
          }
        >
          {label}: {enabled.includes(label) ? "Example on" : "Example off"}
        </NativeButton>
      ))}
      <Copy>
        No notification subscription, consent record, or public visibility
        setting is changed.
      </Copy>
    </Card>
  );
}
function NativeRoster() {
  const [query, setQuery] = useState(""),
    [detail, setDetail] = useState("");
  return (
    <>
      <TextInput
        style={s.input}
        accessibilityLabel="Search fictional roster"
        value={query}
        onChangeText={setQuery}
        placeholder="Search a learner alias"
      />
      {["Example learner A", "Example learner B", "Example learner C"]
        .filter((n) => n.toLowerCase().includes(query.toLowerCase()))
        .map((name, i) => (
          <Card key={name}>
            <Copy heading>{name}</Copy>
            <Copy>EX-00{i + 1} · Example class 10 A</Copy>
            <NativeButton
              secondary
              onPress={() => setDetail(detail === name ? "" : name)}
            >
              {" "}
              {detail === name ? "Close details" : "Inspect summary"}
            </NativeButton>
            {detail === name && (
              <Copy>
                Example enrollment state: draft context. Private contacts,
                guardian evidence, and official academic history are omitted.
              </Copy>
            )}
          </Card>
        ))}
    </>
  );
}
