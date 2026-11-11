import inventory from "./frontend-screens.json";
import type { ScreenSpec } from "./frontend-state";
export * from "./frontend-state";
export const screenSpecs = inventory as ScreenSpec[];
export const getScreen = (id: string) => screenSpecs.find((s) => s.id === id);
