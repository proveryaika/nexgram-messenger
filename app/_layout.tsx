import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LanguageProvider } from "../lib/i18n";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0B1018" } }} />
    </LanguageProvider>
  );
}