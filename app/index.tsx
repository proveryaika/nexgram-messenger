import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";

type Chat = { id: string; name: string; message: string; time: string; unread: number; color: string; online?: boolean; group?: boolean };
type LocalMessage = { id: number; text: string; mine: boolean; time: string };

const initialChats: Chat[] = [
  { id: "design", name: "Design team", message: "Maya: The new concept is ready", time: "18:04", unread: 3, color: "#7357D8", group: true },
  { id: "alex", name: "Alex Morgan", message: "Voice message · 0:18", time: "17:42", unread: 1, color: "#287F91", online: true },
  { id: "weekend", name: "Weekend plans", message: "Sam: See you on Saturday!", time: "16:30", unread: 0, color: "#B56A3B", group: true },
  { id: "nexgram", name: "NexGram Updates", message: "Welcome to the NexGram preview", time: "Yesterday", unread: 0, color: "#267A58" },
  { id: "maya", name: "Maya Kim", message: "Thanks, talk soon!", time: "Yesterday", unread: 0, color: "#A34D75", online: true }
];

const seedMessages: Record<string, LocalMessage[]> = {
  design: [
    { id: 1, text: "Hey team! I have a first look at the new concept.", mine: false, time: "17:58" },
    { id: 2, text: "This is looking great. The navigation feels much clearer.", mine: true, time: "18:01" },
    { id: 3, text: "The new concept is ready ✨", mine: false, time: "18:04" }
  ],
  alex: [
    { id: 1, text: "Hey! Did you get a chance to look at the update?", mine: false, time: "17:38" },
    { id: 2, text: "Yes, just checked it. Looks good!", mine: true, time: "17:40" },
    { id: 3, text: "Voice message · 0:18", mine: false, time: "17:42" }
  ]
};

export default function ChatsScreen() {
  const { width } = useWindowDimensions();
  const desktop = width >= 820;
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");
  const [selectedId, setSelectedId] = useState("design");
  const [draft, setDraft] = useState("");
  const [messagesByChat, setMessagesByChat] = useState(seedMessages);
  const [chats, setChats] = useState(initialChats);
  const filteredChats = useMemo(() => chats.filter(chat => {
    const matches = (chat.name + " " + chat.message).toLowerCase().includes(query.trim().toLowerCase());
    const category = tab === "All" || (tab === "Groups" ? chat.group : !chat.group);
    return matches && category;
  }), [chats, query, tab]);
  const selected = chats.find(chat => chat.id === selectedId) ?? chats[0];
  const selectedMessages = messagesByChat[selected.id] ?? [
    { id: 1, text: "Welcome to NexGram 👋", mine: false, time: "18:02" },
    { id: 2, text: "This is a local conversation preview.", mine: true, time: "18:03" }
  ];

  const openChat = (chat: Chat) => {
    setSelectedId(chat.id);
    if (!desktop) router.push({ pathname: "/chat/[id]", params: { id: chat.id, name: chat.name } });
  };
  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const message = { id: Date.now(), text, mine: true, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessagesByChat(old => ({ ...old, [selected.id]: [...(old[selected.id] ?? selectedMessages), message] }));
    setChats(old => old.map(chat => chat.id === selected.id ? { ...chat, message: text, time: "Now" } : chat));
    setDraft("");
  };

  return (
    <View style={s.screen}>
      <View style={s.sidebar}>
        <View style={s.top}>
          <View style={s.brandLine}><View style={s.logo}><Text style={s.logoText}>N</Text></View><View><Text style={s.kicker}>YOUR SPACE</Text><Text style={s.title}>NexGram</Text></View></View>
          <Pressable accessibilityRole="button" style={s.newButton} onPress={() => router.push("/channels")}><Text style={s.newButtonText}>＋</Text></Pressable>
        </View>
        <View style={s.search}><Text style={s.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Search messages or people" placeholderTextColor="#8190A3" style={s.searchInput}/><Text style={s.shortcut}>⌘ K</Text></View>
        <View style={s.tabs}>{["All", "Personal", "Groups"].map(item => <Pressable key={item} onPress={() => setTab(item)} style={[s.tab, tab === item && s.tabActive]}><Text style={[s.tabText, tab === item && s.tabTextActive]}>{item}</Text></Pressable>)}</View>
        <View style={s.sectionLine}><Text style={s.sectionLabel}>RECENT CHATS</Text><Text style={s.sectionCount}>{filteredChats.length}</Text></View>
        <ScrollView contentContainerStyle={s.list}>
          {filteredChats.map(chat => <Pressable key={chat.id} onPress={() => openChat(chat)} style={[s.chat, desktop && selected.id === chat.id && s.chatSelected]}>
            <View style={[s.avatar, { backgroundColor: chat.color }]}><Text style={s.avatarText}>{chat.name.slice(0, 1)}</Text>{chat.online && <View style={s.onlineDot}/>}</View>
            <View style={s.chatCopy}><View style={s.chatHeading}><Text numberOfLines={1} style={s.name}>{chat.name}</Text><Text style={s.time}>{chat.time}</Text></View><View style={s.chatHeading}><Text numberOfLines={1} style={s.message}>{chat.message}</Text>{chat.unread > 0 && <View style={s.unread}><Text style={s.unreadText}>{chat.unread}</Text></View>}</View></View>
          </Pressable>)}
          {filteredChats.length === 0 && <Text style={s.empty}>No matching chats</Text>}
        </ScrollView>
        <View style={s.bottom}>
          <Pressable style={s.navItem} onPress={() => router.push("/contacts")}><Text style={s.navIcon}>♙</Text><Text style={s.bottomItem}>Contacts</Text></Pressable>
          <Pressable style={s.navItem} onPress={() => router.push("/channels")}><Text style={s.navIcon}>◉</Text><Text style={s.bottomItem}>Channels</Text></Pressable>
          <Pressable style={s.navItem} onPress={() => router.push("/settings")}><Text style={s.navIcon}>⚙</Text><Text style={s.bottomItem}>Settings</Text></Pressable>
        </View>
      </View>
      {desktop ? <View style={s.conversation}>
        {selected ? <>
          <View style={s.conversationHeader}><View style={[s.avatar, { backgroundColor: selected.color, width: 42, height: 42, borderRadius: 15 }]}><Text style={s.avatarText}>{selected.name.slice(0,1)}</Text></View><View style={{flex:1}}><Text style={s.conversationName}>{selected.name}</Text><Text style={s.conversationStatus}>{selected.online ? "online" : selected.group ? "group conversation" : "last seen recently"}</Text></View><Pressable style={s.headerAction}><Text style={s.headerActionText}>⌕</Text></Pressable><Pressable style={s.headerAction}><Text style={s.headerActionText}>•••</Text></Pressable></View>
          <ScrollView contentContainerStyle={s.messageBody}><View style={s.datePill}><Text style={s.dateText}>TODAY</Text></View>{selectedMessages.map(message => <View key={message.id} style={[s.bubble, message.mine ? s.outgoing : s.incoming]}><Text style={s.bubbleText}>{message.text}</Text><Text style={s.bubbleTime}>{message.time}{message.mine ? "  ✓" : ""}</Text></View>)}</ScrollView>
          <View style={s.localNotice}><Text style={s.noticeText}>Preview mode · messages are stored locally in this browser only</Text></View>
          <View style={s.composer}><Pressable style={s.attach}><Text style={s.attachText}>＋</Text></Pressable><TextInput value={draft} onChangeText={setDraft} placeholder="Write a message…" placeholderTextColor="#8190A3" style={s.composerInput} multiline onSubmitEditing={send}/><Pressable onPress={send} style={s.send}><Text style={s.sendText}>↑</Text></Pressable></View>
        </> : <View style={s.welcome}><View style={s.welcomeLogo}><Text style={s.logoText}>N</Text></View><Text style={s.welcomeTitle}>Your conversations, together.</Text><Text style={s.welcomeText}>Choose a chat to start messaging.</Text></View>}
      </View> : null}
      {!desktop && <Text style={s.footnote}>NexGram preview · sample conversations only</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, flexDirection: "row", backgroundColor: "#0B1018", minHeight: "100%" },
  sidebar: { width: "100%", maxWidth: 460, backgroundColor: "#0E1520", borderRightWidth: 1, borderRightColor: "#202B39", paddingTop: 28, flex: 1 },
  top: { paddingHorizontal: 22, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  brandLine: { flexDirection: "row", alignItems: "center", gap: 12 },
  logo: { width: 42, height: 42, borderRadius: 15, backgroundColor: "#6D5AE6", alignItems: "center", justifyContent: "center" },
  logoText: { color: "white", fontSize: 22, fontWeight: "900" },
  kicker: { color: "#8C9AAC", fontSize: 9, letterSpacing: 2, fontWeight: "700" },
  title: { color: "#F4F7FB", fontSize: 25, fontWeight: "800", marginTop: 2 },
  newButton: { backgroundColor: "#6D5AE6", width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  newButtonText: { color: "white", fontSize: 27, lineHeight: 30 },
  search: { marginHorizontal: 18, marginTop: 24, backgroundColor: "#172230", borderRadius: 13, paddingHorizontal: 12, paddingVertical: 11, flexDirection: "row", alignItems: "center", gap: 9 },
  searchIcon: { color: "#8190A3", fontSize: 20 },
  searchInput: { color: "#F4F7FB", fontSize: 13, flex: 1, padding: 0, outlineStyle: "none" } as any,
  shortcut: { color: "#66758A", fontSize: 10, borderWidth: 1, borderColor: "#334153", borderRadius: 5, paddingHorizontal: 5, paddingVertical: 3 },
  tabs: { flexDirection: "row", gap: 8, paddingHorizontal: 18, paddingVertical: 18 },
  tab: { paddingHorizontal: 13, paddingVertical: 7, borderRadius: 9, backgroundColor: "transparent" },
  tabActive: { backgroundColor: "#29254A" },
  tabText: { color: "#8190A3", fontSize: 12, fontWeight: "600" },
  tabTextActive: { color: "#B8AEFF" },
  sectionLine: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 22, paddingBottom: 7 },
  sectionLabel: { color: "#657489", fontSize: 9, letterSpacing: 1.6, fontWeight: "800" },
  sectionCount: { color: "#657489", fontSize: 10 },
  list: { paddingHorizontal: 10, paddingBottom: 12 },
  chat: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 10, gap: 12, borderRadius: 14 },
  chatSelected: { backgroundColor: "#1A2433" },
  avatar: { width: 50, height: 50, borderRadius: 18, alignItems: "center", justifyContent: "center", position: "relative" },
  avatarText: { color: "white", fontSize: 20, fontWeight: "800" },
  onlineDot: { position: "absolute", width: 11, height: 11, borderRadius: 6, backgroundColor: "#35C98A", right: -1, bottom: 0, borderWidth: 2, borderColor: "#0E1520" },
  chatCopy: { flex: 1, borderBottomWidth: 1, borderBottomColor: "#1A2430", paddingBottom: 12 },
  chatHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  name: { color: "#F2F5F9", fontSize: 14, fontWeight: "700", flex: 1 },
  time: { color: "#7F8C9D", fontSize: 10 },
  message: { color: "#91A0B2", fontSize: 12, marginTop: 5, flex: 1 },
  unread: { backgroundColor: "#6D5AE6", minWidth: 19, height: 19, borderRadius: 10, alignItems: "center", justifyContent: "center", paddingHorizontal: 5 },
  unreadText: { color: "white", fontSize: 10, fontWeight: "700" },
  empty: { color: "#8190A3", textAlign: "center", padding: 30 },
  bottom: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 15, borderTopWidth: 1, borderTopColor: "#202B39", marginTop: "auto" },
  navItem: { alignItems: "center", gap: 4 },
  navIcon: { color: "#9B8FFF", fontSize: 17 },
  bottomItem: { color: "#8794A5", fontSize: 10 },
  footnote: { position: "absolute", bottom: 4, alignSelf: "center", color: "#586678", fontSize: 9 },
  conversation: { flex: 2, backgroundColor: "#0B1018", minWidth: 0, display: "flex" },
  conversationHeader: { height: 76, flexDirection: "row", alignItems: "center", paddingHorizontal: 25, gap: 13, borderBottomWidth: 1, borderBottomColor: "#202B39" },
  conversationName: { color: "#F4F7FB", fontSize: 15, fontWeight: "700" },
  conversationStatus: { color: "#8190A3", fontSize: 11, marginTop: 3 },
  headerAction: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#172230", alignItems: "center", justifyContent: "center" },
  headerActionText: { color: "#A99CFF", fontSize: 17 },
  messageBody: { flexGrow: 1, paddingHorizontal: 30, paddingVertical: 25, gap: 12, justifyContent: "flex-end" },
  datePill: { alignSelf: "center", backgroundColor: "#172230", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, marginBottom: 14 },
  dateText: { color: "#8190A3", fontSize: 9, letterSpacing: 1.5 },
  bubble: { padding: 12, borderRadius: 15, maxWidth: "72%" },
  incoming: { alignSelf: "flex-start", backgroundColor: "#192433", borderBottomLeftRadius: 4 },
  outgoing: { alignSelf: "flex-end", backgroundColor: "#5144A7", borderBottomRightRadius: 4 },
  bubbleText: { color: "#F4F6FA", fontSize: 13 },
  bubbleTime: { color: "#AAB3C0", fontSize: 9, textAlign: "right", marginTop: 6 },
  localNotice: { alignItems: "center", paddingVertical: 8 },
  noticeText: { color: "#657386", fontSize: 9 },
  composer: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 22, paddingVertical: 15, borderTopWidth: 1, borderTopColor: "#202B39" },
  attach: { width: 40, height: 40, borderRadius: 13, backgroundColor: "#172230", alignItems: "center", justifyContent: "center" },
  attachText: { color: "#A99CFF", fontSize: 24 },
  composerInput: { flex: 1, backgroundColor: "#172230", color: "white", borderRadius: 14, paddingHorizontal: 15, paddingVertical: 12, maxHeight: 100, outlineStyle: "none" } as any,
  send: { width: 40, height: 40, borderRadius: 13, backgroundColor: "#6D5AE6", alignItems: "center", justifyContent: "center" },
  sendText: { color: "white", fontSize: 23, fontWeight: "700" },
  welcome: { flex: 1, alignItems: "center", justifyContent: "center" },
  welcomeLogo: { width: 76, height: 76, borderRadius: 26, backgroundColor: "#6D5AE6", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  welcomeTitle: { color: "#F4F7FB", fontSize: 21, fontWeight: "800" },
  welcomeText: { color: "#8190A3", fontSize: 13, marginTop: 8 }
});
