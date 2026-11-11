import { useReducer, useState, type ReactNode } from "react";
import { View } from "react-native";
import { ProductText as Text,
  Card,
  Copy,
  NativeButton,
  EmbeddedScreens,
  nativeStyles as base,
} from "./native-ui";
import type { ScreenSpec } from "../../../../packages/contracts/frontend";
import {
  initialScreenReview,
  reviewStates,
  screenStateContract,
  screenReviewReducer,
  reviewContentMounted,
  reviewContentVisible,
} from "../../../../packages/contracts/screen-states";
export function NativeScreenStateBoundary({
  spec,
  children,
}: {
  spec: ScreenSpec;
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
      screenReviewReducer,
      initialScreenReview,
    ),
    contract = screenStateContract(spec),
    copy = contract.states[state.view]!;
  const visible = reviewContentVisible(state);
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Card>
        <Copy>Example state: {state.view}</Copy>
        <NativeButton
          secondary
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide state review controls" : "Review screen states"}
        </NativeButton>
        {expanded && (
          <>
            <View style={base.row}>
              {reviewStates
                .filter((s) => contract.states[s])
                .map((view) => (
                  <NativeButton
                    key={view}
                    secondary={state.view !== view}
                    selected={state.view === view}
                    disabled={
                      (state.scope === "denied" ||
                        state.session === "expired") &&
                      view !== state.view
                    }
                    onPress={() => dispatch({ type: "select", view })}
                  >
                    {view}
                  </NativeButton>
                ))}
            </View>
            {["PAR", "INS"].includes(spec.family) && (
              <View style={base.row}>
                <NativeButton
                  secondary={state.scope !== "permitted"}
                  selected={state.scope === "permitted"}
                  onPress={() =>
                    dispatch({ type: "scope", scope: "permitted" })
                  }
                >
                  Permitted example context
                </NativeButton>
                <NativeButton
                  secondary={state.scope !== "denied"}
                  selected={state.scope === "denied"}
                  onPress={() => dispatch({ type: "scope", scope: "denied" })}
                >
                  Awaiting authorization
                </NativeButton>
              </View>
            )}
          </>
        )}
      </Card>
      {state.view !== "Ready" && (
        <Card>
          <Copy heading>{copy.heading}</Copy>
          <Text accessibilityLiveRegion="polite" style={base.status}>
            {copy.body}
          </Text>
          <NativeButton secondary onPress={() => dispatch({ type: "recover" })}>
            {copy.action}
          </NativeButton>
          {state.view === "Conflict" && (
            <NativeButton
              secondary
              onPress={() => dispatch({ type: "recover", discard: true })}
            >
              Discard local view and reload fixture
            </NativeButton>
          )}
        </Card>
      )}
      {reviewContentMounted(state) && (
        <View
          key={state.epoch}
          style={{ gap: 20, display: visible ? "flex" : "none" }}
          accessibilityElementsHidden={!visible}
          importantForAccessibility={visible ? "auto" : "no-hide-descendants"}
        >
          <EmbeddedScreens>{children}</EmbeddedScreens>
        </View>
      )}
      {Object.keys(contract.notApplicable).length > 0 && (
        <Card>
          <Copy heading>States that do not apply</Copy>
          {Object.entries(contract.notApplicable).map(([name, reason]) => (
            <Copy key={name}>
              {name}: {reason}
            </Copy>
          ))}
        </Card>
      )}
    </>
  );
}
