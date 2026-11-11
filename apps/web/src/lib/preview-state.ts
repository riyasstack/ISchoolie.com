import type { Post } from "./preview";
/** Public example data only. Never store child or institution records here. */
export interface PreviewState {
  posts: Post[];
  saved: string[];
}
export type PreviewAction =
  { type: "post-added"; post: Post } | { type: "save-toggled"; id: string };
export function createPreviewState(posts: Post[]): PreviewState {
  return { posts: [...posts], saved: [] };
}
export function previewReducer(
  state: PreviewState,
  action: PreviewAction,
): PreviewState {
  if (action.type === "save-toggled") {
    if (!state.posts.some((post) => post.id === action.id)) return state;
    return {
      ...state,
      saved: state.saved.includes(action.id)
        ? state.saved.filter((id) => id !== action.id)
        : [...state.saved, action.id],
    };
  }
  const body = action.post.body.trim();
  if (
    !body ||
    body.length > 2000 ||
    state.posts.some((post) => post.id === action.post.id)
  )
    return state;
  return { ...state, posts: [{ ...action.post, body }, ...state.posts] };
}
