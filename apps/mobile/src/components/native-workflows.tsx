import { useReducer, useState } from "react";
import { router } from "expo-router";
import { TextInput, View } from "react-native";
import specs from "../../../../packages/contracts/frontend-workflows.json";
import {
  CSV_DRAFT_KEY,
  DEFAULT_EXAMPLE_CSV,
  flowReducer,
  initialFlow,
  getScreen,
  parsePreviewCsv,
  validateDraft,
  type WorkflowSpec,
  type Draft,
} from "../../../../packages/contracts/frontend";
import { ProductText as Text,
  Card,
  Copy,
  NativeButton,
  Screen,
  nativeStyles as base,
} from "./native-ui";
import { usePreview } from "./preview-context";
export const nativeWorkflows = (specs as WorkflowSpec[]).filter((w) =>
  w.steps.every((s) => getScreen(s.screenId)?.native),
);
export function NativeWorkflowLibrary() {
  const { role } = usePreview(),
    [query, setQuery] = useState("");
  const family = {
    Student: "STU",
    Educator: "EDU",
    Guardian: "PAR",
    Tutor: "PRO",
    "Institution staff": "INS",
  }[role];
  const available = nativeWorkflows.filter(
    (w) =>
      w.steps.some(
        (s) =>
          getScreen(s.screenId)?.family === family ||
          ["APP", "AUTH"].includes(getScreen(s.screenId)?.family ?? ""),
      ) && `${w.id} ${w.name}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Screen
      eyebrow="LOCAL WORKFLOW DESIGNS"
      title="Follow the whole task."
      description="Native-eligible walkthroughs with draft, back, retry and context reset. No official outcomes."
    >
      <TextInput
        accessibilityLabel="Search native workflows"
        style={base.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search name or workflow ID"
      />
      {!available.length && (
        <Card>
          <Copy>No matching native paths. Clear the search to try again.</Copy>
        </Card>
      )}
      {available.map((w) => (
        <Card key={w.id}>
          <Text style={base.badge}>
            {w.id} · {w.steps.length} stages
          </Text>
          <Copy heading>{w.name}</Copy>
          <NativeButton
            secondary
            onPress={() =>
              router.push({ pathname: "./workflow", params: { id: w.id } })
            }
          >
            Open walkthrough
          </NativeButton>
        </Card>
      ))}
    </Screen>
  );
}
export function NativeWorkflow({ id }: { id: string }) {
  const workflow = nativeWorkflows.find((w) => w.id === id);
  const [state, dispatch] = useReducer(flowReducer, initialFlow),
    [errors, setErrors] = useState<Draft>({}),
    [mode, setMode] = useState("Online"),
    [scope, setScope] = useState("A");
  if (!workflow)
    return (
      <Screen
        eyebrow="WEB WORKFLOW"
        title="This path is web-first."
        description="Public marketing and specialist operations are excluded from native review."
      >
        <NativeButton
          secondary
          onPress={() => router.replace("./workflow-library")}
        >
          Native workflows
        </NativeButton>
      </Screen>
    );
  const stage = workflow.steps[state.step],
    draft = state.drafts[state.step] ?? {},
    csv = state.drafts[0]?.[CSV_DRAFT_KEY] ?? DEFAULT_EXAMPLE_CSV;
  const reset = () => {
    dispatch({ type: "reset" });
    setErrors({});
  };
  function next() {
    if (!workflow || mode !== "Online") return;
    const found = validateDraft(stage.fields, draft);
    if (id === "W33" && state.step === 0) {
      const parsed = parsePreviewCsv(csv);
      if (parsed.errors.length || !parsed.rows.length)
        found.csv = parsed.errors.join(" ") || "Add at least one example row.";
    }
    setErrors(found);
    if (!Object.keys(found).length)
      dispatch({ type: "next", steps: workflow.steps.length, draft });
  }
  return (
    <Screen
      eyebrow={`${workflow.id} / NATIVE WALKTHROUGH`}
      title={workflow.name}
      description="Fictional in-memory draft stages. No permission, payment, message, enrollment or official record changes."
    >
      <Card>
        <Copy heading>
          Context {scope} · Stage {state.step + 1}/{workflow.steps.length}
        </Copy>
        <NativeButton
          secondary
          onPress={() => {
            setScope(scope === "A" ? "B" : "A");
            reset();
          }}
        >
          Switch example context and clear draft
        </NativeButton>
        <View style={base.row}>
          {[
            "Online",
            "Offline",
            "Service error",
            "Version conflict",
            "Expired",
          ].map((m) => (
            <NativeButton
              key={m}
              secondary={mode !== m}
              selected={mode === m}
              onPress={() => {
                setMode(m);
                if (m === "Expired") reset();
              }}
            >
              {m}
            </NativeButton>
          ))}
        </View>
        {mode !== "Online" && (
          <>
            <Copy>
              {mode === "Expired"
                ? "Authorization expired; previous content cleared."
                : "Review is paused. The local draft is retained."}
            </Copy>
            <NativeButton secondary onPress={() => setMode("Online")}>
              Retry local example
            </NativeButton>
          </>
        )}
      </Card>
      {mode === "Online" &&
        (state.status === "reviewed" ? (
          <Card>
            <Copy heading>Local walkthrough reviewed</Copy>
            <Copy>No official outcome was created.</Copy>
            {state.events.map((e) => (
              <Copy key={e}>{e}</Copy>
            ))}
            {Object.entries(state.drafts).map(([index, values]) => (
              <View key={index}>
                <Copy heading>{workflow.steps[Number(index)].title}</Copy>
                {Object.entries(values).map(([key, value]) => (
                  <Copy key={key}>
                    {key === CSV_DRAFT_KEY
                      ? "CSV sample"
                      : (workflow.steps[Number(index)].fields.find(
                          (f) => f.key === key,
                        )?.label ?? key)}
                    :{" "}
                    {key === CSV_DRAFT_KEY
                      ? parsePreviewCsv(value).rows.length +
                        " local rows; not imported"
                      : value}
                  </Copy>
                ))}
              </View>
            ))}
            <NativeButton secondary onPress={() => dispatch({ type: "back" })}>
              Revisit final stage
            </NativeButton>
            <NativeButton secondary onPress={reset}>
              Start again and clear draft
            </NativeButton>
          </Card>
        ) : (
          <Card>
            <Text style={base.badge}>{stage.screenId}</Text>
            <Copy heading>{stage.title}</Copy>
            <Copy>{stage.instruction}</Copy>
            {id === "W33" && state.step === 0 && (
              <>
                <Copy>
                  Example CSV: id, name, class headers, up to 50 rows. No import
                  occurs.
                </Copy>
                <TextInput
                  accessibilityLabel="Example CSV rows"
                  style={[
                    base.input,
                    { minHeight: 150, textAlignVertical: "top" },
                  ]}
                  multiline
                  maxLength={50000}
                  value={csv}
                  onChangeText={(value) =>
                    dispatch({
                      type: "draft-changed",
                      draft: { ...draft, [CSV_DRAFT_KEY]: value },
                    })
                  }
                />
              </>
            )}
            {stage.fields.map((f) => (
              <View key={f.key} style={{ gap: 8 }}>
                <Copy>
                  {f.label}
                  {f.required ? " · Required" : ""}
                </Copy>
                {f.type === "select" ? (
                  <View style={base.row}>
                    {f.options.map((o) => (
                      <NativeButton
                        key={o}
                        secondary={draft[f.key] !== o}
                        selected={draft[f.key] === o}
                        onPress={() =>
                          dispatch({
                            type: "draft-changed",
                            draft: { ...draft, [f.key]: o },
                          })
                        }
                      >
                        {o}
                      </NativeButton>
                    ))}
                  </View>
                ) : (
                  <TextInput
                    accessibilityLabel={f.label}
                    style={[
                      base.input,
                      f.type === "textarea" && {
                        minHeight: 110,
                        textAlignVertical: "top",
                      },
                    ]}
                    multiline={f.type === "textarea"}
                    maxLength={f.type === "textarea" ? 5000 : 500}
                    keyboardType={
                      f.type === "email"
                        ? "email-address"
                        : f.type === "number"
                          ? "decimal-pad"
                          : "default"
                    }
                    value={draft[f.key] ?? ""}
                    onChangeText={(value) =>
                      dispatch({
                        type: "draft-changed",
                        draft: { ...draft, [f.key]: value },
                      })
                    }
                  />
                )}
                {errors[f.key] && (
                  <Text accessibilityRole="alert" style={base.error}>
                    {errors[f.key]}
                  </Text>
                )}
              </View>
            ))}
            {errors.csv && (
              <Text accessibilityRole="alert" style={base.error}>
                {errors.csv}
              </Text>
            )}
            {id === "W29" && state.step === 0 && (
              <Copy>
                Fixed assistance example, not generated: describe what you
                observe, then ask a question that can be investigated.
              </Copy>
            )}
            <Copy>{stage.boundary}</Copy>
            <NativeButton onPress={next}>
              {state.step === workflow.steps.length - 1
                ? "Finish local walkthrough"
                : "Review and continue"}
            </NativeButton>
            <NativeButton
              secondary
              disabled={state.step === 0}
              onPress={() => {
                setErrors({});
                dispatch({ type: "back" });
              }}
            >
              Back and retain draft
            </NativeButton>
            <NativeButton
              secondary
              onPress={() =>
                router.push({
                  pathname: "./screen",
                  params: { id: stage.screenId },
                })
              }
            >
              Explore this task’s detailed editor
            </NativeButton>
          </Card>
        ))}
    </Screen>
  );
}
