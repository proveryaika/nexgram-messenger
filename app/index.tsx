import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";

type Chat = { id: string; name: string; message: string; time: string; unread: number; color: string; online?: boolean; kind: "personal" | "group" | "channel" | "bot" };

const filters = [
  { id: "All", label: "All chats" },
  { id: "personal", label: "Personal" },
  { id: "group", label: "Groups" },
  { id: "channel", label: "Channels" },
  { id: "bot", label: "Bots" },
] as const;

export default function ChatsScreen() {
  const { width } = useWindowDimensions();
  const desktop = width >= 820;
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<string>("All");
  // A new account starts empty. Conversations will appear here after backend sync.
  const [chats] = useState<Chat[]>([]);
  const filteredChats = useMemo(() => chats.filter(chat => {
    const matches = (chat.name + " " + chat.message).toLowerCase().includes(query.trim().toLowerCase());
    return matches && (tab === "All" || chat.kind === tab);
  }), [chats, query, tab]);

  return (
    <View style={s.screen}>
      <View style={s.sidebar}>
        <View style={s.top}>
          <Pressable accessibilityRole="button" accessibilityLabel="Open settings" style={s.menuButton} onPress={() => router.push("/settings")}><Text style={s.menuText}>☰</Text></Pressable>
          <View style={s.brandLine}><View style={s.logo}><Text style={s.logoText}>N</Text></View><View><Text style={s.kicker}>MESSENGER</Text><Text style={s.title}>NexGram</Text></View></View>
          <Pressable accessibilityRole="button" accessibilityLabel="Create a new chat" style={s.newButton} onPress={() => router.push("/new-chat")}><Text style={s.newButtonText}>＋</Text></Pressable>
        </View>
        <View style={s.search}><Text style={s.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Search" placeholderTextColor="#8190A3" style={s.searchInput}/><Text style={s.searchHint}>⌘ K</Text></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tabs}>
          {filters.map(item => <Pressable key={item.id} onPress={() => setTab(item.id)} style={[s.tab, tab === item.id && s.tabActive]}><Text style={[s.tabText, tab === item.id && s.tabTextActive]}>{item.label}</Text></Pressable>)}
        </ScrollView>
        <View style={s.sectionLine}><Text style={s.sectionLabel}>{tab === "All" ? "ALL CHATS" : filters.find(item => item.id === tab)?.label.toUpperCase()}</Text><Text style={s.sectionCount}>{filteredChats.length}</Text></View>
        <ScrollView contentContainerStyle={s.list}>
          {filteredChats.map(chat => <Pressable key={chat.id} onPress={() => router.push({ pathname: "/chat/[id]", params: { id: chat.id, name: chat.name } })} style={s.chat}>
            <View style={[s.avatar, { backgroundColor: chat.color }]}><Text style={s.avatarText}>{chat.name.slice(0, 1)}</Text>{chat.online && <View style={s.onlineDot}/>}</View>
            <View style={s.chatCopy}><View style={s.chatHeading}><Text numberOfLines={1} style={s.name}>{chat.name}</Text><Text style={s.time}>{chat.time}</Text></View><View style={s.chatHeading}><Text numberOfLines={1} style={s.message}>{chat.message}</Text>{chat.unread > 0 && <View style={s.unread}><Text style={s.unreadText}>{chat.unread}</Text></View>}</View></View>
          </Pressable>)}
          {filteredChats.length === 0 && <View style={s.emptyWrap}><View style={s.emptyIcon}><Text style={s.emptyIconText}>✉</Text></View><Text style={s.emptyTitle}>{query.trim() ? "No results" : tab === "All" ? "No chats yet" : "Nothing here yet"}</Text><Text style={s.emptyText}>{query.trim() ? "Try another name or message." : "Start a conversation and it will appear here. Your chats stay synced here once account sync is connected."}</Text><Pressable accessibilityRole="button" style={s.startButton} onPress={() => router.push("/new-chat")}><Text style={s.startButtonText}>New message</Text></Pressable></View>}
        </ScrollView>
        <View style={s.bottom}>
          <Pressable style={s.navItem} onPress={() => router.replace("/")}><Text style={s.navIcon}>◉</Text><Text style={s.bottomItemActive}>Chats</Text></Pressable>
          <Pressable style={s.navItem} onPress={() => router.push("/contacts")}><Text style={s.navIcon}>♙</Text><Text style={s.bottomItem}>Contacts</Text></Pressable>
          <Pressable style={s.navItem} onPress={() => router.push("/channels")}><Text style={s.navIcon}>▤</Text><Text style={s.bottomItem}>Channels</Text></Pressable>
          <Pressable style={s.navItem} onPress={() => router.push("/settings")}><Text style={s.navIcon}>⚙</Text><Text style={s.bottomItem}>Settings</Text></Pressable>
        </View>
      </View>
      {desktop && <View style={s.conversation}><View style={s.welcome}><View style={s.welcomeLogo}><Text style={s.logoText}>N</Text></View><Text style={s.welcomeTitle}>NexGram</Text><Text style={s.welcomeText}>Choose a conversation from the list or start a new message.</Text><Pressable style={s.desktopButton} onPress={() => router.push("/new-chat")}><Text style={s.startButtonText}>＋  New message</Text></Pressable></View><Text style={s.desktopFoot}>Private conversations belong only to their participants.</Text></View>}
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, flexDirection: "row", backgroundColor: "#0B1018", minHeight: "100%" },
  sidebar: { width: "100%", maxWidth: 460, backgroundColor: "#1C2733", borderRightWidth: 1, borderRightColor: "#263443", paddingTop: 28, flex: 1 },
  top: { paddingHorizontal: 17, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  menuButton: { width: 34, height: 42, alignItems: "center", justifyContent: "center" },
  menuText: { color: "#AAB8C6", fontSize: 22 },
  brandLine: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  logo: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#229ED9", alignItems: "center", justifyContent: "center" },
  logoText: { color: "white", fontSize: 22, fontWeight: "900" },
  kicker: { color: "#8C9AAC", fontSize: 9, letterSpacing: 2, fontWeight: "700" },
  title: { color: "#F4F7FB", fontSize: 23, fontWeight: "800", marginTop: 2 },
  newButton: { backgroundColor: "#229ED9", width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center" },
  newButtonText: { color: "white", fontSize: 27, lineHeight: 30 },
  search: { marginHorizontal: 17, marginTop: 22, backgroundColor: "#263442", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, flexDirection: "row", alignItems: "center", gap: 9 },
  searchIcon: { color: "#8190A3", fontSize: 20 },
  searchInput: { color: "#F4F7FB", fontSize: 14, flex: 1, padding: 0, outlineStyle: "none" } as any,
  searchHint: { color: "#738497", fontSize: 10, borderWidth: 1, borderColor: "#435364", borderRadius: 5, paddingHorizontal: 5, paddingVertical: 3 },
  tabs: { flexDirection: "row", gap: 6, paddingHorizontal: 17, paddingVertical: 15 },
  tab: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18, backgroundColor: "#263442" },
  tabActive: { backgroundColor: "#2B83B5" },
  tabText: { color: "#A5B2C0", fontSize: 12, fontWeight: "600" },
  tabTextActive: { color: "#FFFFFF" },
  sectionLine: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 22, paddingBottom: 7 },
  sectionLabel: { color: "#8190A3", fontSize: 10, letterSpacing: 1.6, fontWeight: "800" },
  sectionCount: { color: "#8190A3", fontSize: 11 },
  list: { flexGrow: 1, paddingHorizontal: 10, paddingBottom: 12 },
  chat: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 10, gap: 12, borderRadius: 14 },
  avatar: { width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center", position: "relative" },
  avatarText: { color: "white", fontSize: 20, fontWeight: "800" },
  onlineDot: { position: "absolute", width: 11, height: 11, borderRadius: 6, backgroundColor: "#35C98A", right: -1, bottom: 0, borderWidth: 2, borderColor: "#1C2733" },
  chatCopy: { flex: 1, borderBottomWidth: 1, borderBottomColor: "#2A3745", paddingBottom: 12 },
  chatHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  name: { color: "#F2F5F9", fontSize: 14, fontWeight: "700", flex: 1 },
  time: { color: "#7F8C9D", fontSize: 10 },
  message: { color: "#91A0B2", fontSize: 12, marginTop: 5, flex: 1 },
  unread: { backgroundColor: "#229ED9", minWidth: 19, height: 19, borderRadius: 10, alignItems: "center", justifyContent: "center", paddingHorizontal: 5 },
  unreadText: { color: "white", fontSize: 10, fontWeight: "700" },
  emptyWrap: { flex: 1, minHeight: 330, alignItems: "center", justifyContent: "center", paddingHorizontal: 28 },
  emptyIcon: { width: 76, height: 76, borderRadius: 38, backgroundColor: "#263746", alignItems: "center", justifyContent: "center", marginBottom: 18 },
  emptyIconText: { color: "#71C5F2", fontSize: 34 },
  emptyTitle: { color: "#F4F7FB", fontSize: 21, fontWeight: "700", marginBottom: 8 },
  emptyText: { color: "#9AA8B7", fontSize: 13, lineHeight: 20, textAlign: "center", maxWidth: 290 },
  startButton: { marginTop: 22, backgroundColor: "#229ED9", borderRadius: 22, paddingHorizontal: 24, paddingVertical: 12 },
  startButtonText: { color: "white", fontSize: 14, fontWeight: "700" },
  bottom: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 15, borderTopWidth: 1, borderTopColor: "#2A3745", marginTop: "auto" },
  navItem: { alignItems: "center", gap: 4 },
  navIcon: { color: "#71C5F2", fontSize: 19 },
  bottomItem: { color: "#B0BBC7", fontSize: 11 },
  bottomItemActive: { color: "#71C5F2", fontSize: 11, fontWeight: "700" },
  conversation: { flex: 2, backgroundColor: "#17212B", minWidth: 0, alignItems: "center", justifyContent: "center" },
  welcome: { alignItems: "center", padding: 30 },
  welcomeLogo: { width: 70, height: 70, borderRadius: 35, backgroundColor: "#229ED9", alignItems: "center", justifyContent: "center", marginBottom: 18 },
  welcomeTitle: { color: "#F4F7FB", fontSize: 22, fontWeight: "800" },
  welcomeText: { color: "#9AA8B7", fontSize: 13, marginTop: 8, textAlign: "center", maxWidth: 300 },
  desktopButton: { marginTop: 20, backgroundColor: "#229ED9", borderRadius: 22, paddingHorizontal: 20, paddingVertical: 11 },
  desktopFoot: { position: "absolute", bottom: 18, color: "#718092", fontSize: 11 }
});
