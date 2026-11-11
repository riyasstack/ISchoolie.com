import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { profileStages, validateProfileStage } from "../packages/contracts/profile-onboarding.ts";
const tokens = JSON.parse(readFileSync(new URL("../packages/design-tokens/tokens.json", import.meta.url), "utf8"));
function luminance(hex) {
  const c=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
  return c[0]*.2126+c[1]*.7152+c[2]*.0722;
}
function contrast(a,b) {const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
test("V3 brand palette is exact and small readable text uses accessible roles",()=>{
  assert.deepEqual([tokens.color.white,tokens.color.primary,tokens.color.surface,tokens.color.ink,tokens.color.subtle,tokens.color.blueSoft],["#FFFFFF","#0071E3","#F5F5F7","#1D1D1F","#86868B","#E8F2FC"]);
  assert.ok(contrast(tokens.color.muted,tokens.color.white)>=4.5);
  assert.ok(contrast(tokens.color.primary,tokens.color.white)>=4.5);
  assert.ok(contrast(tokens.color.ink,tokens.color.surface)>=4.5);
  assert.ok(contrast(tokens.color.subtle,tokens.color.white)<4.5,"The supplied subtle grey must not be used as normal readable body text");
  assert.equal(tokens.color.logo,"#2D2B55");
});
test("profile onboarding refuses required blanks and invalid visibility while optional background stays optional",()=>{
  assert.deepEqual(Object.keys(validateProfileStage(0,{})),["name","headline","status"]);
  assert.deepEqual(validateProfileStage(2,{}),{});
  assert.ok(validateProfileStage(4,{visibility:"Everyone including minors",contact:"Hidden"}).visibility);
  assert.deepEqual(validateProfileStage(4,{visibility:"Only me",contact:"Hidden",cover:"Learning blue"}),{});
});
test("profile drafts preserve international text and reject oversized content before review",()=>{
  const draft={name:"अनन्या",headline:"Design educator",status:"Educator",about:"Teaching through inquiry",skills:"Observation"};
  assert.deepEqual(validateProfileStage(0,draft),{});
  assert.deepEqual(validateProfileStage(1,draft),{});
  assert.ok(validateProfileStage(1,{...draft,about:"x".repeat(2001)}).about);
  assert.deepEqual(draft,{name:"अनन्या",headline:"Design educator",status:"Educator",about:"Teaching through inquiry",skills:"Observation"});
  assert.ok(validateProfileStage(-1,draft).stage);
});

import { profileImageError, profileImageLimit } from "../packages/contracts/profile-media.ts";
test("local profile media rejects oversized, disguised or active content",()=>{
 assert.ok(profileImageError("image/svg+xml",100));
 assert.ok(profileImageError("image/png",profileImageLimit+1));
 assert.ok(profileImageError("image/png",0));
 assert.ok(profileImageError("image/png",100,new TextEncoder().encode("<svg></svg>")));
 assert.equal(profileImageError("image/png",100,new Uint8Array([137,80,78,71,13,10,26,10])),"");
 assert.equal(profileImageError("image/jpeg",100,new Uint8Array([255,216,255,224])),"");
});
