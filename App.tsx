import React, { useMemo, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, FlatList, Pressable } from "react-native";

type Chat = { id: string; name: string; message: string; time: string; unread?: number; color: string; initials: string };
const CHATS: Chat[] = [
  { id: "1", name: "NexGram News", message: "Добро пожаловать в NexGram!", time: "12:40", unread: 2, color: "#6957D8", initials: "N" },
  { id: "2", name: "Команда", message: "Давайте обсудим обновление", time: "11:18", color: "#238B82", initials: "К" },
  { id: "3", name: "Алексей", message: "Отправил тебе файл", time: "Вчера", color: "#C07845", initials: "А" },
  { id: "4", name: "Друзья", message: "Кто сегодня свободен?", time: "Вчера", unread: 4, color: "#3977B8", initials: "Д" }
];

export default function App() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Чаты");
  const filteredChats = useMemo(() => CHATS.filter(chat => chat.name.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#101522" />
      <View style={styles.header}>
        <View><Text style={styles.brand}>NexGram</Text><Text style={styles.subtitle}>Всегда на связи</Text></View>
        <Pressable accessibilityRole="button" style={styles.headerButton}><Text style={styles.headerButtonText}>＋</Text></Pressable>
      </View>
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="Поиск чатов" placeholderTextColor="#8992A5" style={styles.search} returnKeyType="search" />
      </View>
      <View style={styles.sectionRow}><Text style={styles.sectionTitle}>{tab}</Text><Text style={styles.sectionHint}>{filteredChats.length} диалога</Text></View>
      <FlatList data={filteredChats} keyExtractor={item => item.id} contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Ничего не найдено</Text>}
        renderItem={({ item }) => (
          <Pressable style={styles.chatRow} accessibilityRole="button">
            <View style={[styles.avatar, { backgroundColor: item.color }]}><Text style={styles.avatarText}>{item.initials}</Text></View>
            <View style={styles.chatBody}>
              <View style={styles.chatTop}><Text style={styles.chatName}>{item.name}</Text><Text style={styles.time}>{item.time}</Text></View>
              <View style={styles.chatBottom}><Text style={styles.message} numberOfLines={1}>{item.message}</Text>
                {item.unread ? <View style={styles.unread}><Text style={styles.unreadText}>{item.unread}</Text></View> : null}
              </View>
            </View>
          </Pressable>
        )} />
      <View style={styles.tabBar}>
        {["Контакты", "Звонки", "Чаты", "Настройки"].map(name => (
          <Pressable key={name} style={styles.tab} onPress={() => setTab(name)}><Text style={[styles.tabText, tab === name && styles.tabActive]}>{name}</Text></Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#101522" },
  header: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { color: "#F5F7FC", fontSize: 29, fontWeight: "800", letterSpacing: -0.8 },
  subtitle: { color: "#929DB2", fontSize: 13, marginTop: 3 },
  headerButton: { width: 42, height: 42, borderRadius: 15, backgroundColor: "#29334A", alignItems: "center", justifyContent: "center" },
  headerButtonText: { color: "#FFFFFF", fontSize: 27, lineHeight: 30 },
  searchWrap: { marginHorizontal: 18, height: 48, borderRadius: 15, backgroundColor: "#202A3D", flexDirection: "row", alignItems: "center", paddingHorizontal: 14 },
  searchIcon: { color: "#A8B2C5", fontSize: 25, marginRight: 9 },
  search: { flex: 1, color: "#F5F7FC", fontSize: 15 },
  sectionRow: { paddingHorizontal: 22, paddingTop: 27, paddingBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { color: "#F5F7FC", fontSize: 19, fontWeight: "700" },
  sectionHint: { color: "#8992A5", fontSize: 12 },
  list: { paddingHorizontal: 18, paddingBottom: 16 },
  chatRow: { flexDirection: "row", alignItems: "center", paddingVertical: 13 },
  avatar: { width: 54, height: 54, borderRadius: 19, alignItems: "center", justifyContent: "center", marginRight: 13 },
  avatarText: { color: "#FFFFFF", fontSize: 21, fontWeight: "700" },
  chatBody: { flex: 1, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#2A3448", paddingBottom: 13 },
  chatTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  chatName: { color: "#F3F5FA", fontSize: 15, fontWeight: "700" },
  time: { color: "#8792A7", fontSize: 11 },
  chatBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  message: { color: "#9DA8BC", fontSize: 13, flex: 1, marginRight: 8 },
  unread: { minWidth: 20, height: 20, paddingHorizontal: 6, borderRadius: 10, backgroundColor: "#7564E8", alignItems: "center", justifyContent: "center" },
  unreadText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  empty: { color: "#929DB2", textAlign: "center", padding: 35 },
  tabBar: { borderTopWidth: 1, borderTopColor: "#293247", paddingVertical: 15, paddingHorizontal: 8, flexDirection: "row", justifyContent: "space-around" },
  tab: { paddingHorizontal: 5, paddingVertical: 4 },
  tabText: { color: "#8992A5", fontSize: 11, fontWeight: "600" },
  tabActive: { color: "#A99DFF" }
});