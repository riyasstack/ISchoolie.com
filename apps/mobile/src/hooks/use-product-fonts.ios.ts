/** iOS uses system typography; do not bundle/load Android's Inter assets here. */
export function useProductFonts(): [boolean, Error | null] {
  return [true, null];
}
