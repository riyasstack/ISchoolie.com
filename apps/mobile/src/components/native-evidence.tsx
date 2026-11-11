import { useState } from "react";
import { TextInput, View } from "react-native";
import { ProductText as Text, Card, Copy, NativeButton, nativeStyles as base } from "./native-ui";
import { NativeSubmission } from "./native-submission";
import {
  parseMinorUnits,
  reviewGrade,
} from "../../../../packages/contracts/authoring-state";
export function NativeEvidence({ kind }: { kind: string }) {
  const [scores, setScores] = useState(["", ""]),
    [feedback, setFeedback] = useState(""),
    [result, setResult] = useState<{ error: string; total: number | null }>({
      error: "",
      total: null,
    });
  return (
    <>
      <Card>
        <Text style={base.badge}>EXAMPLE LEARNING EVIDENCE / UNOFFICIAL</Text>
        <Copy heading>Observation journal</Copy>
        <Copy>
          Task: describe five visible details before drawing a conclusion.
        </Copy>
        <Copy>
          Sample response: I noticed branching veins, a rough edge, changes in
          color, the direction of the stem and a shadow. How could these details
          help a leaf capture light?
        </Copy>
      </Card>
      {kind === "grading" ? (
        <Card>
          <Copy heading>Rubric feedback draft</Copy>
          {["Precise observation", "Reasoning and next question"].map(
            (label, i) => (
              <View key={label} style={{ gap: 8 }}>
                <Copy>{label} · 0–5 points</Copy>
                <TextInput
                  accessibilityLabel={label}
                  keyboardType="number-pad"
                  style={base.input}
                  maxLength={1}
                  value={scores[i]}
                  onChangeText={(text) => {
                    setScores(scores.map((v, idx) => (idx === i ? text : v)));
                    setResult({ error: "", total: null });
                  }}
                />
              </View>
            ),
          )}
          <Copy>Useful feedback</Copy>
          <TextInput
            accessibilityLabel="Useful feedback"
            multiline
            style={[base.input, { minHeight: 120, textAlignVertical: "top" }]}
            maxLength={2000}
            value={feedback}
            onChangeText={(text) => {
              setFeedback(text);
              setResult({ error: "", total: null });
            }}
          />
          <NativeButton
            onPress={() => setResult(reviewGrade(scores, feedback))}
          >
            Review rubric draft
          </NativeButton>
          {result.error && (
            <Text accessibilityRole="alert" style={base.error}>
              {result.error}
            </Text>
          )}
          {result.total !== null && (
            <Text accessibilityLiveRegion="polite" style={base.status}>
              Local rubric total: {result.total}/10. No grade is released.
            </Text>
          )}
        </Card>
      ) : (
        <NativeSubmission />
      )}
    </>
  );
}
export function NativeFinanceDraft({ editable }: { editable: boolean }) {
  const [charges, setCharges] = useState([
      { id: "EX-F01", label: "Learning resources", minor: 400000 },
      { id: "EX-F02", label: "Academic term", minor: 800000 },
    ]),
    [label, setLabel] = useState(""),
    [amount, setAmount] = useState(""),
    [error, setError] = useState(""),
    [next, setNext] = useState(3);
  const money = (n: number) => "₹" + (n / 100).toFixed(2);
  return (
    <>
      <Card>
        <Text style={base.badge}>UNPOSTED EXAMPLE CHARGES</Text>
        <Copy heading>{money(charges.reduce((n, c) => n + c.minor, 0))}</Copy>
        <Copy>
          Illustrative total only. No real balance, assessment, payment or
          receipt.
        </Copy>
      </Card>
      {charges.map((c) => (
        <Card key={c.id}>
          <Copy heading>{c.label}</Copy>
          <Copy>
            {c.id} · {money(c.minor)} · Unposted
          </Copy>
          {editable && (
            <NativeButton
              secondary
              onPress={() =>
                setCharges(charges.filter((row) => row.id !== c.id))
              }
            >
              Remove draft charge
            </NativeButton>
          )}
        </Card>
      ))}
      {editable && (
        <Card>
          <Copy heading>Prepare an unposted charge</Copy>
          <TextInput
            accessibilityLabel="Charge label"
            style={base.input}
            maxLength={100}
            value={label}
            onChangeText={setLabel}
            placeholder="Charge label"
          />
          <TextInput
            accessibilityLabel="Illustrative INR amount"
            style={base.input}
            keyboardType="decimal-pad"
            value={amount}
            maxLength={10}
            onChangeText={setAmount}
            placeholder="Illustrative INR amount"
          />
          {error && (
            <Text accessibilityRole="alert" style={base.error}>
              {error}
            </Text>
          )}
          <NativeButton
            disabled={charges.length >= 30}
            onPress={() => {
              const minor = parseMinorUnits(amount);
              if (!label.trim() || minor === null) {
                setError(
                  "Add a label and a positive amount up to 100,000 with at most two decimals.",
                );
                return;
              }
              setCharges([
                ...charges,
                { id: `EX-F${next}`, label: label.trim(), minor },
              ]);
              setNext(next + 1);
              setLabel("");
              setAmount("");
              setError("");
            }}
          >
            Add unposted draft charge
          </NativeButton>
        </Card>
      )}
    </>
  );
}
