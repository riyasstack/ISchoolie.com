import { useState } from "react";
import { TextInput, View } from "react-native";
import { ProductText as Text, Card, Copy, NativeButton, nativeStyles as base } from "./native-ui";
import {
  weekDays,
  availabilityErrors,
  inspectAvailability,
  validDate,
  type Availability,
} from "../../../../packages/contracts/authoring-state";
export function NativeAvailability() {
  const [slots, setSlots] = useState<Availability[]>([
      { id: "EX-A1", day: "Monday", start: "09:00", end: "12:00" },
    ]),
    [day, setDay] = useState("Monday"),
    [start, setStart] = useState("09:00"),
    [end, setEnd] = useState("10:00"),
    [date, setDate] = useState(""),
    [time, setTime] = useState(""),
    [blackouts, setBlackouts] = useState<string[]>([]),
    [excluded, setExcluded] = useState(""),
    [notice, setNotice] = useState(""),
    [next, setNext] = useState(2);
  function input(label: string, value: string, update: (s: string) => void) {
    return (
      <View style={{ gap: 8 }}>
        <Copy>{label}</Copy>
        <TextInput
          accessibilityLabel={label}
          style={base.input}
          value={value}
          maxLength={10}
          onChangeText={(text) => {
            update(text);
            setNotice("");
          }}
        />
      </View>
    );
  }
  return (
    <>
      <Card>
        <Text style={base.badge}>LOCAL AVAILABILITY / ASIA/KOLKATA</Text>
        <Copy heading>Make room for a useful session.</Copy>
        <Copy>
          Recurring weekly windows and excluded dates. No calendar sync or
          reservation.
        </Copy>
        {slots.map((s) => (
          <View key={s.id} style={{ gap: 8 }}>
            <Copy>
              {s.day} · {s.start}–{s.end}
            </Copy>
            <NativeButton
              secondary
              onPress={() => {
                setSlots(slots.filter((row) => row.id !== s.id));
                setNotice("");
              }}
            >
              Remove {s.id}
            </NativeButton>
          </View>
        ))}
        {!slots.length && <Copy>No weekly windows.</Copy>}
        {availabilityErrors(slots).map((e) => (
          <Text key={e} accessibilityRole="alert" style={base.error}>
            {e}
          </Text>
        ))}
      </Card>
      <Card>
        <Copy heading>Add weekly window</Copy>
        <View style={base.row}>
          {weekDays.map((d) => (
            <NativeButton
              key={d}
              secondary={day !== d}
              selected={day === d}
              onPress={() => setDay(d)}
            >
              {d}
            </NativeButton>
          ))}
        </View>
        {input("Window start (HH:MM)", start, setStart)}
        {input("Window end (HH:MM)", end, setEnd)}
        <NativeButton
          disabled={slots.length >= 30}
          onPress={() => {
            const slot = { id: `EX-A${next}`, day, start, end },
              found = availabilityErrors([slot]);
            if (found.length) {
              setNotice(found[0]);
              return;
            }
            setSlots([...slots, slot]);
            setNext(next + 1);
            setNotice("Weekly window added locally.");
          }}
        >
          Add weekly window
        </NativeButton>
      </Card>
      <Card>
        {input("Excluded date (YYYY-MM-DD)", excluded, setExcluded)}
        <NativeButton
          secondary
          disabled={blackouts.length >= 60}
          onPress={() => {
            if (!validDate(excluded)) {
              setNotice("Choose a valid excluded date.");
              return;
            }
            setBlackouts([...new Set([...blackouts, excluded])]);
            setNotice("Date excluded from local example.");
          }}
        >
          Exclude date
        </NativeButton>
        {blackouts.map((d) => (
          <NativeButton
            key={d}
            secondary
            onPress={() => {
              setBlackouts(blackouts.filter((x) => x !== d));
              setNotice("");
            }}
          >
            Restore {d}
          </NativeButton>
        ))}
      </Card>
      <Card>
        {input("Example session date (YYYY-MM-DD)", date, setDate)}
        {input("Example session start (HH:MM)", time, setTime)}
        <NativeButton
          onPress={() =>
            setNotice(inspectAvailability(slots, blackouts, date, time))
          }
        >
          Inspect 30-minute fit
        </NativeButton>
        {notice && (
          <Text accessibilityLiveRegion="polite" style={base.status}>
            {notice}
          </Text>
        )}
      </Card>
    </>
  );
}
