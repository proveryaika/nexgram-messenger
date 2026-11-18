import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Contacts() {
  const [query, setQuery] = useState("");
  return (
    <View style={s.page}>
      <View style={s.header}>
        <Pressable accessibilityRole="button" onPress={() => router.back()}><Text style={s.back}>‹</Text></Pressable>
        <Text style={s.title}>Contacts</Text>
        <View style={{ flex: 1 }} />
        <Pressable accessibilityRole="button" accessibilityLabel="New message" onPress={() => router.push("/new-chat")}><Text style={s.add}>＋</Text></Pressable>
      </View>
      <View style={s.search}>
        <Text style={s.searchIcon}>⌕</Text>
        <TextInput value={query} onChangeText={setQuery} autoCapitalize="none" placeholder="Search by name or @username" placeholderTextColor="#8291A1" style={s.searchInput} />
      </View>
      <Pressable style={s.invite} onPress={() => router.push("/new-chat")}>
        <Text style={s.inviteIcon}>＋</Text>
        <View style={{ flex: 1 }}>
          <Text style={s.inviteTitle}>New message</Text>
          <Text style={s.inviteSub}>Find a NexGram user by username</Text>
        </View>
        <Text style={s.chevron}>›</Text>
      </Pressable>
      <Text style={s.section}>YOUR CONTACTS</Text>
      <ScrollView contentContainerStyle={s.list}>
        <View style={s.empty}>
          <Text style={s.emptyIcon}>♙</Text>
          <Text style={s.emptyTitle}>{query.trim() ? "No matching contacts" : "No contacts yet"}</Text>
          <Text style={s.emptyCopy}>{query.trim() ? "Contact search will work when account lookup is connected." : "Your real NexGram contacts will appear here after sign-in and contact sync are available."}</Text>
          <Pressable style={s.button} onPress={() => router.push("/new-chat")}><Text style={s.buttonText}>Find people</Text></Pressable>
        </View>
      </ScrollView>
      <Text style={s.note}>No sample profiles are shown as real users. Account discovery and contact synchronization are not connected yet.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#17212B", paddingTop: 52, paddingHorizontal: 18 },
  header: { height: 55, flexDirection: "row", alignItems: "center", gap: 17 },
  back: { fontSize: 35, color: "#F4F7FB" },
  title: { fontSize: 24, color: "#F4F7FB", fontWeight: "800" },
  add: { fontSize: 30, color: "#71C5F2" },
  search: { backgroundColor: "#263442", borderRadius: 13, paddingHorizontal: 13, flexDirection: "row", alignItems: "center", marginTop: 16, marginBottom: 16 },
  searchIcon: { fontSize: 22, color: "#8291A1" },
  searchInput: { height: 50, color: "white", fontSize: 14, flex: 1, paddingLeft: 10, outlineStyle: "none" } as any,
  invite: { minHeight: 66, flexDirection: "row", alignItems: "center", gap: 14, borderBottomWidth: 1, borderColor: "#2B3947" },
  inviteIcon: { width: 46, height: 46, borderRadius: 23, backgroundColor: "#229ED9", color: "white", fontSize: 28, textAlign: "center", textAlignVertical: "center", overflow: "hidden" },
  inviteTitle: { fontSize: 15, color: "#71C5F2", fontWeight: "700" },
  inviteSub: { fontSize: 11, color: "#8291A1", marginTop: 4 },
  chevron: { fontSize: 25, color: "#748597" },
  section: { fontSize: 11, letterSpacing: 1.6, color: "#8291A1", fontWeight: "800", marginTop: 25, marginBottom: 10 },
  list: { flexGrow: 1 },
  empty: { flex: 1, minHeight: 330, alignItems: "center", justifyContent: "center", paddingHorizontal: 25 },
  emptyIcon: { fontSize: 42, color: "#71C5F2", marginBottom: 14 },
  emptyTitle: { fontSize: 19, color: "#F4F7FB", fontWeight: "700", marginBottom: 8 },
  emptyCopy: { fontSize: 13, color: "#9AA8B7", textAlign: "center", lineHeight: 20, maxWidth: 300 },
  button: { marginTop: 22, backgroundColor: "#229ED9", paddingHorizontal: 28, paddingVertical: 12, borderRadius: 22 },
  buttonText: { color: "white", fontWeight: "700" },
  note: { fontSize: 10, lineHeight: 15, color: "#718092", textAlign: "center", paddingVertical: 15 }
});
