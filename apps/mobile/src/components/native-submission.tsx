import { useEffect, useReducer, useRef, useState } from "react";
import { TextInput, View, AccessibilityInfo } from "react-native";
import { Image } from "expo-image";
import { ProductText as Text, Card, Copy, NativeButton, nativeStyles as base } from "./native-ui";
import { chooseExampleResource } from "./native-resource-picker";
import {
  initialSubmission,
  submissionReducer,
  submissionErrors,
} from "../../../../packages/contracts/authoring-state";
export function NativeSubmission() {
  const [draft, dispatch] = useReducer(
      submissionReducer,
      undefined,
      initialSubmission,
    ),
    [busy, setBusy] = useState(false),
    [fileError, setFileError] = useState(""),
    [confirm, setConfirm] = useState<"restore" | "reset" | null>(null),
    epoch = useRef(0);
  useEffect(
    () => () => {
      epoch.current++;
    },
    [],
  );
  async function attach() {
    if (busy) return;
    const generation = epoch.current;
    setBusy(true);
    setFileError("");
    try {
      const result = await chooseExampleResource();
      if (generation !== epoch.current) return;
      if (result.error) setFileError(result.error);
      if (result.resource)
        dispatch({ type: "attach", resource: result.resource });
    } catch {
      if (generation === epoch.current)
        setFileError("Could not open this document. Try again.");
    } finally {
      if (generation === epoch.current) setBusy(false);
    }
  }
  function review() {
    const errors = submissionErrors(draft);
    dispatch({ type: "review" });
    AccessibilityInfo.announceForAccessibility(
      errors.join(" ") ||
        "Local response reviewed. No academic submission was created.",
    );
  }
  return (
    <>
      <Card>
        <Text style={base.badge}>LEARNER RESPONSE / LOCAL DRAFT</Text>
        <Copy heading>
          {draft.reviewed
            ? "Review your example response"
            : "Prepare your observation journal."}
        </Copy>
        <Copy>
          Describe five visible details and connect them to a question. No
          academic attempt is created.
        </Copy>
        {draft.reviewed ? (
          <>
            <Copy heading>{draft.title}</Copy>
            <Copy>{draft.response}</Copy>
            {draft.description && <Copy>{draft.description}</Copy>}
            {draft.resources.map((r) => (
              <Copy key={r.id}>
                {r.name} · {Math.ceil(r.size / 1024)}KB
              </Copy>
            ))}
            <NativeButton secondary onPress={() => dispatch({ type: "edit" })}>
              Return to editing
            </NativeButton>
          </>
        ) : (
          <>
            <Copy>Response title · Required</Copy>
            <TextInput
              accessibilityLabel="Response title"
              style={base.input}
              value={draft.title}
              maxLength={160}
              onChangeText={(value) =>
                dispatch({ type: "meta", key: "title", value })
              }
            />
            <Copy>Written response</Copy>
            <TextInput
              accessibilityLabel="Written response"
              style={[base.input, { minHeight: 160, textAlignVertical: "top" }]}
              multiline
              maxLength={5000}
              value={draft.response}
              onChangeText={(value) => dispatch({ type: "response", value })}
            />
            <Copy>
              {draft.response.length}/5000 characters. Write at least 20
              characters. Attachments are optional.
            </Copy>
            <NativeButton
              secondary
              disabled={busy || draft.resources.length >= 10}
              onPress={() => void attach()}
            >
              {busy ? "Opening document picker…" : "Attach example resource"}
            </NativeButton>
            <Copy>
              Up to ten files, 5MB each. Text/CSV preview ≤64KB, first 5000
              characters; images preview locally. No PDF page renderer or
              upload. Picker copies may remain in app cache.
            </Copy>
            {draft.resources.map((r) => (
              <View key={r.id} style={{ gap: 10 }}>
                <Copy heading>{r.name}</Copy>
                <Copy>
                  {Math.ceil(r.size / 1024)}KB · {r.type || "Unknown type"}
                </Copy>
                {r.text !== undefined && <Copy>{r.text}</Copy>}
                {r.uri && (
                  <Image
                    source={{ uri: r.uri }}
                    style={{ width: "100%", height: 220 }}
                    contentFit="contain"
                    accessibilityLabel={"Local attachment preview: " + r.name}
                  />
                )}
                <NativeButton
                  secondary
                  onPress={() => dispatch({ type: "remove", id: r.id })}
                >
                  Remove {r.name}
                </NativeButton>
              </View>
            ))}
            <Copy>Attachment description (optional)</Copy>
            <TextInput
              accessibilityLabel="Attachment description (optional)"
              style={[base.input, { minHeight: 100, textAlignVertical: "top" }]}
              multiline
              maxLength={2000}
              value={draft.description}
              onChangeText={(value) =>
                dispatch({ type: "meta", key: "description", value })
              }
            />
            <NativeButton
              secondary={!draft.confirmed}
              selected={draft.confirmed}
              onPress={() =>
                dispatch({ type: "confirmed", value: !draft.confirmed })
              }
            >
              Task and response inspected: {draft.confirmed ? "Yes" : "No"}
            </NativeButton>
            <NativeButton onPress={review}>Review local response</NativeButton>
          </>
        )}
        {(draft.error || fileError) && (
          <Text accessibilityRole="alert" style={base.error}>
            {draft.error || fileError}
          </Text>
        )}
        <Text accessibilityLiveRegion="polite" style={base.status}>
          {draft.notice}
        </Text>
        <NativeButton secondary onPress={() => dispatch({ type: "save" })}>
          Keep local snapshot
        </NativeButton>
        <NativeButton
          secondary
          disabled={!draft.snapshot}
          onPress={() => setConfirm("restore")}
        >
          Restore snapshot
        </NativeButton>
        <NativeButton secondary onPress={() => setConfirm("reset")}>
          Discard response
        </NativeButton>
        {confirm && (
          <>
            <Copy>
              Replace this local response
              {confirm === "reset" ? " and attachments" : ""}?
            </Copy>
            <NativeButton
              onPress={() => {
                epoch.current++;
                setBusy(false);
                setFileError("");
                dispatch({ type: confirm });
                setConfirm(null);
              }}
            >
              Confirm {confirm}
            </NativeButton>
            <NativeButton secondary onPress={() => setConfirm(null)}>
              Keep editing
            </NativeButton>
          </>
        )}
      </Card>
    </>
  );
}
