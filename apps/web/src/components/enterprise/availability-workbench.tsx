"use client";
import { useState } from "react";
import { Button, Badge } from "../ui";
import {
  weekDays,
  availabilityErrors,
  inspectAvailability,
  validDate,
  type Availability,
} from "../../../../../packages/contracts/authoring-state";
export function AvailabilityWorkbench() {
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
  const errors = availabilityErrors(slots);
  return (
    <section className="panel stack">
      <Badge>LOCAL AVAILABILITY / ASIA/KOLKATA</Badge>
      <h2>Make room for a useful session.</h2>
      <p>
        Recurring weekly windows and excluded dates for a 30-minute example. No
        calendar sync or reservation occurs.
      </p>
      <ul className="task-checks">
        {slots.map((s) => (
          <li key={s.id}>
            <span>
              {s.day} · {s.start}–{s.end}
            </span>
            <Button
              type="button"
              className="secondary"
              onClick={() => {
                setSlots(slots.filter((row) => row.id !== s.id));
                setNotice("");
              }}
            >
              Remove {s.id}
            </Button>
          </li>
        ))}
      </ul>
      {!slots.length && (
        <p>No weekly windows. Add one to inspect an example time.</p>
      )}
      {errors.length > 0 && (
        <ul role="alert" className="field-error">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
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
        <label>
          Weekday
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {weekDays.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label>
          Window starts
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label>
          Window ends
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
        <Button type="submit" disabled={slots.length >= 30}>
          Add weekly window
        </Button>
      </form>
      <div className="form-grid">
        <label>
          Excluded date
          <input
            type="date"
            value={excluded}
            onChange={(e) => setExcluded(e.target.value)}
          />
        </label>
        <Button
          type="button"
          className="secondary"
          disabled={blackouts.length >= 60}
          onClick={() => {
            if (!validDate(excluded)) {
              setNotice("Choose a valid excluded date.");
              return;
            }
            setBlackouts([...new Set([...blackouts, excluded])]);
            setNotice("Date excluded from this local example.");
          }}
        >
          Exclude date
        </Button>
      </div>
      {blackouts.map((d) => (
        <div key={d} className="row">
          <span>{d}</span>
          <Button
            type="button"
            className="secondary"
            onClick={() => {
              setBlackouts(blackouts.filter((x) => x !== d));
              setNotice("");
            }}
          >
            Restore {d}
          </Button>
        </div>
      ))}
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(inspectAvailability(slots, blackouts, date, time));
        }}
      >
        <label>
          Example session date
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setNotice("");
            }}
          />
        </label>
        <label>
          Example session start
          <input
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setNotice("");
            }}
          />
        </label>
        <Button type="submit">Inspect 30-minute fit</Button>
      </form>
      {notice && (
        <p role="status" className="callout">
          {notice}
        </p>
      )}
    </section>
  );
}
