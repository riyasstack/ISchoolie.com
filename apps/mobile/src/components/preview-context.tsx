import { createContext, useContext, useState, type ReactNode } from "react";
export type PreviewRole =
  "Student" | "Educator" | "Guardian" | "Tutor" | "Institution staff";
export const roles: PreviewRole[] = [
  "Student",
  "Educator",
  "Guardian",
  "Tutor",
  "Institution staff",
];
export const roleTabs: Record<PreviewRole, string[]> = {
  Student: ["Home", "Network", "Learn", "Inbox", "Profile"],
  Educator: ["Overview", "Classes", "Tasks", "Messages", "Profile"],
  Guardian: ["Children", "Academics", "School", "Messages", "Account"],
  Tutor: ["Bookings", "Availability", "Session", "Earnings", "Profile"],
  "Institution staff": [
    "Overview",
    "My Classes",
    "Attendance",
    "Alerts",
    "Profile",
  ],
};
const Context = createContext<{
  role: PreviewRole;
  setRole: (role: PreviewRole) => void;
  saved: string[];
  toggleSave: (id: string) => void;
}>({ role: "Student", setRole: () => {}, saved: [], toggleSave: () => {} });
export function PreviewProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<PreviewRole>("Student");
  const [saved, setSaved] = useState<string[]>([]);
  return (
    <Context.Provider
      value={{
        role,
        setRole: (next) => {
          setRole(next);
          setSaved([]);
        },
        saved,
        toggleSave: (id) =>
          setSaved((current) =>
            current.includes(id)
              ? current.filter((x) => x !== id)
              : [...current, id],
          ),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const usePreview = () => useContext(Context);
