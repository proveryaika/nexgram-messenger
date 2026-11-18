import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const chats = [
  { id: "design", name: "Design team", message: "Maya: The new concept is ready", time: "18:04", unread: 3, color: "#7357D8" },
  { id: "alex", name: "Alex Morgan", message: "Voice message · 0:18", time: "17:42", unread: 1, color: "#287F91" },
  { id: "weekend", name: "Weekend plans", message: "Sam: See you on Saturday!", time: "16:30", unread: 0, color: "#B56A3B" },
  { id: "nexgram", name: "NexGram Updates", message: "Welcome to the NexGram preview", time: "Yesterday", unread: 0, color: "#267A58" }
];

export default function ChatsScreen() {
  const [query, setQuery] = useState("");
  const filteredChats = useMemo(() => chats.filter(chat =>
    (chat.name + " " + chat.message).toLowerCase().includes(query.trim().toLowerCase())
  ), [query]);

  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <View><Text style={styles.kicker}>MESSAGES</Text><Text style={styles.title}>NexGram</Text></View>
        <Pressable accessibilityRole="button" style={styles.newButton} onPress={() => router.push("/channels")}>
          <Text style={styles.newButtonText}>＋</Text>
        </Pressable>
      </View>
      <View style={styles.search}>
        <Text style={styles.searchText}>⌕</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="Search chats and people" placeholderTextColor="#8190A3" style={styles.searchInput}/>
      </View>
      <View style={styles.tabs}><Text style={styles.activeTab}>All chats</Text><Text style={styles.tab}>Personal</Text><Text style={styles.tab}>Groups</Text></View>
      <ScrollView contentContainerStyle={styles.list}>
        {filteredChats.map(chat => (
          <Pressable key={chat.id} style={styles.chat} onPress={() => router.push({ pathname: "/chat/[id]", params: { id: chat.id, name: chat.name } })}>
            <View style={[styles.avatar, { backgroundColor: chat.color }]}><Text style={styles.avatarText}>{chat.name.slice(0, 1)}</Text></View>
            <View style={styles.chatCopy}>
              <View style={styles.chatHeading}><Text style={styles.name}>{chat.name}</Text><Text style={styles.time}>{chat.time}</Text></View>
              <View style={styles.chatHeading}><Text numberOfLines={1} style={styles.message}>{chat.message}</Text>{chat.unread > 0 && <View style={styles.unread}><Text style={styles.unreadText}>{chat.unread}</Text></View>}</View>
            </View>
          </Pressable>
        ))}
        {filteredChats.length === 0 && <Text style={styles.empty}>No matching chats</Text>}
      </ScrollView>
      <View style={styles.bottom}>
        <Text style={styles.bottomActive}>Chats</Text>
        <Pressable onPress={() => router.push("/contacts")}><Text style={styles.bottomItem}>Contacts</Text></Pressable>
        <Pressable onPress={() => router.push("/settings")}><Text style={styles.bottomItem}>Settings</Text></Pressable>
      </View>
      <Text style={styles.footnote}>Preview build · sample conversations only</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0B1018", paddingTop: 62 },
  top: { paddingHorizontal: 22, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  kicker: { color: "#8C9AAC", fontSize: 10, letterSpacing: 2, fontWeight: "700" },
  title: { color: "#F4F7FB", fontSize: 30, fontWeight: "800", marginTop: 3 },
  newButton: { backgroundColor: "#6D5AE6", width: 44, height: 44, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  newButtonText: { color: "white", fontSize: 28, lineHeight: 30 },
  search: { marginHorizontal: 20, marginTop: 24, backgroundColor: "#151E2A", borderRadius: 14, padding: 13, flexDirection: "row", alignItems: "center", gap: 10 },
  searchText: { color: "#8190A3", fontSize: 20 },
  searchInput: { color: "#F4F7FB", fontSize: 14, flex: 1, padding: 0 },
  tabs: { flexDirection: "row", gap: 24, paddingHorizontal: 22, paddingVertical: 22 },
  activeTab: { color: "#A99CFF", fontWeight: "700" },
  tab: { color: "#7D8A9B" },
  list: { paddingHorizontal: 20 },
  chat: { flexDirection: "row", alignItems: "center", paddingVertical: 13, gap: 13 },
  avatar: { width: 54, height: 54, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "white", fontSize: 21, fontWeight: "800" },
  chatCopy: { flex: 1, borderBottomWidth: 1, borderBottomColor: "#1A2430", paddingBottom: 14 },
  chatHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  name: { color: "#F2F5F9", fontSize: 15, fontWeight: "700" },
  time: { color: "#7F8C9D", fontSize: 11 },
  message: { color: "#91A0B2", fontSize: 13, marginTop: 6, flex: 1 },
  unread: { backgroundColor: "#6D5AE6", minWidth: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center", paddingHorizontal: 5 },
  unreadText: { color: "white", fontSize: 11, fontWeight: "700" },
  empty: { color: "#8190A3", textAlign: "center", padding: 30 },
  bottom: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 17, borderTopWidth: 1, borderTopColor: "#1A2430" },
  bottomActive: { color: "#A99CFF", fontWeight: "700" },
  bottomItem: { color: "#778598" },
  footnote: { color: "#586678", textAlign: "center", fontSize: 10, paddingBottom: 9 }
});