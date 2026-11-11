import { createContext, useContext, useRef, useCallback, type ComponentRef, type ReactNode } from "react";
import { router, usePathname } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text as RNText,
  type TextProps,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import tokens from "../../../../packages/design-tokens/tokens.json";
export const palette = tokens.color;
export const nativeFont =
  Platform.OS === "ios" ? undefined : "Inter_400Regular";
export function ProductText(props: TextProps) {
  const flattened = StyleSheet.flatten(props.style);
  const weight = String(flattened?.fontWeight ?? "400");
  const family =
    Number(weight) >= 700 || weight === "bold"
      ? "Inter_700Bold"
      : Number(weight) >= 600
        ? "Inter_600SemiBold"
        : Number(weight) >= 500
          ? "Inter_500Medium"
          : "Inter_400Regular";
  return (
    <RNText
      {...props}
      style={[
        {
          fontSize: 16,
          lineHeight: Math.round((flattened?.fontSize ?? 16) * 1.5),
          color: palette.ink,
          fontFamily: Platform.OS === "ios" ? undefined : family,
        },
        props.style,
        Platform.OS === "android" && {
          fontFamily: family,
          fontWeight: "normal",
        },
      ]}
    />
  );
}
const Text = ProductText;

const EmbeddedContext = createContext(false);
const TaskScrollContext=createContext(()=>{});
export const useTaskScrollReset=()=>useContext(TaskScrollContext);
export function EmbeddedScreens({ children }: { children: ReactNode }) {
  return <EmbeddedContext.Provider value>{children}</EmbeddedContext.Provider>;
}
export function Screen({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const path = usePathname();
  const scrollRef=useRef<ComponentRef<typeof ScrollView>>(null);
  const resetScroll=useCallback(()=>scrollRef.current?.scrollTo({y:0,animated:false}),[]);
  const embedded = useContext(EmbeddedContext);
  if (embedded)
    return (
      <View style={{ gap: 20 }}>
        <Text accessibilityRole="header" style={styles.heading}>
          {title}
        </Text>
        <Text style={styles.copy}>{description}</Text>
        {children}
      </View>
    );
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {[
          "/screen",
          "/screen-library",
          "/lesson",
          "/workflow",
          "/workflow-library",
        ].includes(path) && (
          <NativeButton
            secondary
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.replace("/");
            }}
          >
            Back to workspace
          </NativeButton>
        )}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.screen}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.preview}>UI PREVIEW / EXAMPLE DATA</Text>
          <Text style={styles.brand}>iSchoolie.</Text>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text accessibilityRole="header" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.description}>{description}</Text>
          <TaskScrollContext.Provider value={resetScroll}>{children}</TaskScrollContext.Provider>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export function Card({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}
export function Copy({
  children,
  heading = false,
}: {
  children: ReactNode;
  heading?: boolean;
}) {
  return (
    <Text
      accessibilityRole={heading ? "header" : undefined}
      style={heading ? styles.heading : styles.copy}
    >
      {children}
    </Text>
  );
}
export function NativeButton({
  children,
  onPress,
  secondary = false,
  disabled = false,
  selected,
  expanded,
}: {
  children: ReactNode;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  selected?: boolean;
  expanded?: boolean;
}) {
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));
  return (
    <Animated.View style={animated}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled, selected, expanded }}
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => {
          scale.set(
            withTiming(tokens.motion.pressScale, {
              duration: tokens.motion.micro,
              reduceMotion: ReduceMotion.System,
            }),
          );
        }}
        onPressOut={() => {
          scale.set(
            withTiming(1, {
              duration: tokens.motion.micro,
              reduceMotion: ReduceMotion.System,
            }),
          );
        }}
        style={[
          styles.button,
          secondary && styles.secondary,
          disabled && { opacity: 0.45 },
        ]}
      >
        <Text
          style={[styles.buttonText, secondary && { color: palette.brand }]}
        >
          {children}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
export const nativeStyles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  input: {
    fontFamily: nativeFont,
    borderWidth: 1,
    borderColor: "#D7D8DD",
    borderRadius: 10,
    minHeight: 48,
    padding: 13,
    fontSize: 15,
    color: palette.ink,
    backgroundColor: "white",
  },
  art: {
    backgroundColor: palette.sage,
    borderRadius: 12,
    padding: 28,
    alignItems: "center",
    gap: 15,
  },
  artText: { fontSize: 72, color: palette.brand },
  badge: {
    fontSize: 11,
    color: palette.brand,
    backgroundColor: palette.lavender,
    padding: 8,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  status: { fontSize: 13, color: palette.success, lineHeight: 20 },
  label: { fontSize: 14, color: palette.muted },
  error: { fontSize: 13, color: palette.danger },
});
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  screen: {
    padding: 24,
    gap: 20,
    paddingBottom: 45,
    maxWidth: 760,
    width: "100%",
    alignSelf: "center",
  },
  preview: { fontSize: 12, color: palette.brand, letterSpacing: 1.2 },
  brand: {
    fontSize: 27,
    fontWeight: "700",
    color: palette.logo,
    letterSpacing: -1,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 0,
    color: palette.muted,
    marginTop: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: palette.ink,
    letterSpacing: -1.2,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: palette.muted,
    lineHeight: 23,
    marginBottom: 6,
  },
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: tokens.radius.card,
    padding: 20,
    gap: 16,
  },
  heading: {
    fontSize: 21,
    fontWeight: "600",
    color: palette.ink,
    lineHeight: 28,
  },
  copy: { fontSize: 16, color: palette.muted, lineHeight: 24 },
  button: {
    minHeight: 48,
    backgroundColor: palette.brand,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: {
    backgroundColor: "white",
    borderColor: "#D7D5E1",
    borderWidth: 1,
  },
  buttonText: { fontSize: 14, fontWeight: "600", color: "white" },
});
