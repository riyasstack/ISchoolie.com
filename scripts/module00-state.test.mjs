import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createPreviewState,
  previewReducer,
} from "../apps/web/src/lib/preview-state.ts";
const fixture = {
  id: "sample-1",
  author: "Example educator",
  role: "Example",
  topic: "Learning",
  body: "An example thought",
  likes: 0,
};
test("preview initialization copies the public list and starts with no saved state", () => {
  const list = [fixture];
  const state = createPreviewState(list);
  assert.notEqual(state.posts, list);
  assert.deepEqual(state.saved, []);
});
test("saving a known public post toggles a unique in-memory collection", () => {
  const initial = createPreviewState([fixture]);
  const saved = previewReducer(initial, {
    type: "save-toggled",
    id: fixture.id,
  });
  assert.deepEqual(saved.saved, [fixture.id]);
  const unsaved = previewReducer(saved, {
    type: "save-toggled",
    id: fixture.id,
  });
  assert.deepEqual(unsaved.saved, []);
  assert.deepEqual(initial.saved, []);
});
test("an arbitrary or private record identifier cannot enter the public saved collection", () => {
  const state = createPreviewState([fixture]);
  assert.equal(
    previewReducer(state, { type: "save-toggled", id: "other-tenant-record" }),
    state,
  );
});
test("adding a local thought preserves existing saved items and prepends the new post", () => {
  const state = previewReducer(createPreviewState([fixture]), {
    type: "save-toggled",
    id: fixture.id,
  });
  const next = previewReducer(state, {
    type: "post-added",
    post: { ...fixture, id: "local-2", body: "  A new question  " },
  });
  assert.equal(next.posts[0].body, "A new question");
  assert.equal(next.posts.length, 2);
  assert.deepEqual(next.saved, [fixture.id]);
  assert.equal(state.posts.length, 1);
});
test("duplicate local identifiers do not duplicate posts", () => {
  const state = createPreviewState([fixture]);
  assert.equal(
    previewReducer(state, { type: "post-added", post: fixture }),
    state,
  );
});
test("whitespace-only content cannot be preview-published", () => {
  const state = createPreviewState([fixture]);
  assert.equal(
    previewReducer(state, {
      type: "post-added",
      post: { ...fixture, id: "blank", body: " \n\t " },
    }),
    state,
  );
});
test("oversized content is rejected at the local state boundary", () => {
  const state = createPreviewState([fixture]);
  assert.equal(
    previewReducer(state, {
      type: "post-added",
      post: { ...fixture, id: "long", body: "a".repeat(2001) },
    }),
    state,
  );
});
test("a fresh preview starts without content or saved state from another preview instance", () => {
  const old = previewReducer(createPreviewState([fixture]), {
    type: "post-added",
    post: { ...fixture, id: "local-2" },
  });
  const next = createPreviewState([fixture]);
  assert.equal(old.posts.length, 2);
  assert.equal(next.posts.length, 1);
  assert.deepEqual(next.saved, []);
});
