import { NativeProfileMedia } from "./native-profile-media";
import { useState } from "react";
import { TextInput, View } from "react-native";
import {
  ProductText,
  useTaskScrollReset,
  Card,
  Copy,
  NativeButton,
  nativeStyles as base,
} from "./native-ui";
import {
  profileStages,
  validateProfileStage,
  type ProfileDraft,
} from "../../../../packages/contracts/profile-onboarding";
export function NativeProfileOnboarding() {
  const resetScroll=useTaskScrollReset();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ProfileDraft>({
    cover: "Learning blue",
    visibility: "Only me",
    contact: "Hidden",
  });
  const [saved, setSaved] = useState<ProfileDraft | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  function move(index:number){setStep(index);requestAnimationFrame(resetScroll);}
  const stage = profileStages[step];
  return (
    <Card>
      <Copy>
        Local profile preview · Step {step + 1} of {profileStages.length}
      </Copy>
      <Copy heading>{stage.title}</Copy>
      <Copy>{stage.description}</Copy>
      <NativeProfileMedia visible={step >= 4} />
      {stage.fields.map((field) => (
        <View key={field.key} style={{ gap: 8 }}>
          <Copy>{field.label}</Copy>
          {"options" in field ? (
            <View style={base.row}>
              {field.options.map((option) => (
                <NativeButton
                  key={option}
                  secondary={draft[field.key] !== option}
                  selected={draft[field.key] === option}
                  onPress={() => setDraft({ ...draft, [field.key]: option })}
                >
                  {option}
                </NativeButton>
              ))}
            </View>
          ) : (
            <TextInput
              accessibilityLabel={field.label}
              value={draft[field.key] ?? ""}
              onChangeText={(value) =>
                setDraft({ ...draft, [field.key]: value })
              }
              multiline={"multiline" in field}
              maxLength={2000}
              style={[
                base.input,
                "multiline" in field && {
                  minHeight: 112,
                  textAlignVertical: "top",
                },
              ]}
            />
          )}
          {errors[field.key] && (
            <ProductText accessibilityRole="alert" style={{ color: "#A83B3B" }}>
              {errors[field.key]}
            </ProductText>
          )}
        </View>
      ))}
      {step === 5 &&
        Object.entries(draft)
          .filter(([, value]) => value.trim())
          .map(([key, value]) => (
            <View key={key} style={{ gap: 8 }}>
              <Copy heading>
                {profileStages
                  .flatMap((item) => [...item.fields])
                  .find((field) => field.key === key)?.label ?? key}
              </Copy>
              <Copy>{value}</Copy>
            </View>
          ))}
      <View style={base.row}>
        <NativeButton
          secondary
          disabled={step === 0}
          onPress={() => {
            move(step - 1);
            setErrors({});
          }}
        >
          Back
        </NativeButton>
        <NativeButton
          onPress={() => {
            if (step === 5) {
              const first = profileStages.findIndex(
                (_, index) =>
                  Object.keys(validateProfileStage(index, draft)).length > 0,
              );
              if (first >= 0) {
                move(first);
                setErrors(validateProfileStage(first, draft));
                setNotice("Complete the required fields before review.");
                return;
              }
            }
            const invalid = validateProfileStage(step, draft);
            setErrors(invalid);
            if (Object.keys(invalid).length) {
              setNotice("Check the required fields.");
              return;
            }
            if (step < 5) {
              move(step + 1);
              setNotice("");
            } else {
              setSaved({ ...draft });
              setNotice(
                "Profile draft reviewed locally. Nothing published or verified.",
              );
            }
          }}
        >
          {step === 5 ? "Review local profile" : "Continue"}
        </NativeButton>
      </View>
      <NativeButton
        secondary
        onPress={() => {
          setSaved({ ...draft });
          setNotice("Snapshot saved in this screen’s memory.");
        }}
      >
        Save local draft
      </NativeButton>
      {saved && (
        <NativeButton
          secondary
          onPress={() => {
            setDraft({ ...saved });
            setNotice("Saved local snapshot restored.");
          }}
        >
          Restore saved draft
        </NativeButton>
      )}
      <Copy>
        {notice ||
          "Drafts and preview images clear when you leave this screen. Nothing is uploaded."}
      </Copy>
    </Card>
  );
}
