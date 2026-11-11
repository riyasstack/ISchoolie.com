import { Platform, View, ActivityIndicator, Text } from "react-native";
import { useProductFonts } from "@/hooks/use-product-fonts";
import { Tabs } from "expo-router";
import { IdentityProvider } from "@/components/identity-context";
import { NativeIdentityRoute as NativeIdentityAccess } from "@/components/identity-access";
import {
  PreviewProvider,
  roleTabs,
  usePreview,
} from "@/components/preview-context";
function Navigation() {
  const { role } = usePreview();
  const labels = roleTabs[role];
  return (
    <Tabs
      key={role}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0071E3",
        tabBarInactiveTintColor: "#6E6E73",
        tabBarStyle: { backgroundColor: "white" },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: Platform.OS === "ios" ? undefined : "Inter_500Medium",
        },
        tabBarIcon: () => null,
      }}
    >
      {["index", "network", "learn", "inbox", "profile"].map((name, i) => (
        <Tabs.Screen key={name} name={name} options={{ title: labels[i] }} />
      ))}
      <Tabs.Screen name="lesson" options={{ href: null }} />
      <Tabs.Screen name="screen" options={{ href: null }} />
      <Tabs.Screen name="screen-library" options={{ href: null }} />
      <Tabs.Screen name="workflow" options={{ href: null }} />
      <Tabs.Screen name="workflow-library" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="access" options={{ href: null }} />
      <Tabs.Screen name="auth-return" options={{ href: null }} />
    </Tabs>
  );
}
export default function Layout() {
  const [fontsLoaded, fontError] = useProductFonts();
  if (!fontsLoaded && !fontError)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <ActivityIndicator color="#0071E3" />
        <Text>Opening iSchoolie</Text>
      </View>
    );
  return (
    <IdentityProvider>
      <IdentityLayout />
    </IdentityProvider>
  );
}
function IdentityLayout() {
  if (!__DEV__) return <NativeIdentityAccess />;
  return (
    <PreviewProvider>
      <Navigation />
    </PreviewProvider>
  );
}
