import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ConversationScreen() {
  const { name } = useLocalSearchParams<{ id: string; name: string }>();
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>‹</Text></Pressable>
        <View style={styles.person}><Text style={styles.name}>{name ?? "Conversation"}</Text><Text style={styles.status}>sample conversation</Text></View>
        <Text style={styles.more}>•••</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.date}>TODAY</Text>
        <View style={styles.incoming}><Text style={styles.message}>Welcome to NexGram 👋</Text><Text style={styles.time}>18:02</Text></View>
        <View style={styles.outgoing}><Text style={styles.message}>This is the first app preview.</Text><Text style={styles.time}>18:03  ✓✓</Text></View>
        <Text style={styles.notice}>Messages are local demo content and are not sent to anyone.</Text>
      </View>
      <View style={styles.composer}><TextInput placeholder="Message" placeholderTextColor="#778598" style={styles.input} editable={false}/><View style={styles.send}><Text style={styles.sendText}>↑</Text></View></View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0B1018", paddingTop: 54 },
  header: { height: 64, flexDirection: "row", alignItems: "center", paddingHorizontal: 18, gap: 15, borderBottomWidth: 1, borderBottomColor: "#1B2633" },
  back: { color: "#A99CFF", fontSize: 34 },
  person: { flex: 1 },
  name: { color: "#F3F6FA", fontSize: 16, fontWeight: "700" },
  status: { color: "#8492A4", fontSize: 11, marginTop: 3 },
  more: { color: "#AAB5C3", fontSize: 19 },
  body: { flex: 1, padding: 18, justifyContent: "flex-end", gap: 13 },
  date: { color: "#778598", fontSize: 10, textAlign: "center", letterSpacing: 2, marginBottom: 10 },
  incoming: { alignSelf: "flex-start", backgroundColor: "#192433", borderRadius: 16, borderBottomLeftRadius: 5, padding: 12, maxWidth: "82%" },
  outgoing: { alignSelf: "flex-end", backgroundColor: "#5144A7", borderRadius: 16, borderBottomRightRadius: 5, padding: 12, maxWidth: "82%" },
  message: { color: "#F4F6FA", fontSize: 14 },
  time: { color: "#AAB3C0", fontSize: 9, textAlign: "right", marginTop: 6 },
  notice: { color: "#657386", fontSize: 10, textAlign: "center", marginVertical: 12 },
  composer: { flexDirection: "row", alignItems: "center", gap: 10, padding: 15, borderTopWidth: 1, borderTopColor: "#1B2633" },
  input: { flex: 1, backgroundColor: "#172230", color: "white", borderRadius: 18, paddingHorizontal: 16, paddingVertical: 12 },
  send: { width: 42, height: 42, borderRadius: 15, backgroundColor: "#6D5AE6", alignItems: "center", justifyContent: "center" },
  sendText: { color: "white", fontSize: 23, fontWeight: "700" }
});