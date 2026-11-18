import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type Message = { id: number; text: string; mine: boolean; time: string };
export default function ConversationScreen() {
  const { name } = useLocalSearchParams<{ id: string; name: string }>();
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome to NexGram 👋", mine: false, time: "18:02" },
    { id: 2, text: "This is the first app preview.", mine: true, time: "18:03" }
  ]);
  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((old) => [...old, { id: Date.now(), text, mine: true, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setDraft("");
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>‹</Text></Pressable>
        <View style={styles.person}><Text style={styles.name}>{name ?? "Conversation"}</Text><Text style={styles.status}>local preview</Text></View>
        <Pressable onPress={() => {}}><Text style={styles.more}>•••</Text></Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.date}>TODAY</Text>
        {messages.map((message) => <View key={message.id} style={message.mine ? styles.outgoing : styles.incoming}><Text style={styles.message}>{message.text}</Text><Text style={styles.time}>{message.time}{message.mine ? "  ✓" : ""}</Text></View>)}
        <Text style={styles.notice}>Preview only: messages stay on this device and are not delivered to other users.</Text>
      </ScrollView>
      <View style={styles.composer}>
        <TextInput value={draft} onChangeText={setDraft} placeholder="Message" placeholderTextColor="#778598" style={styles.input} multiline onSubmitEditing={send}/>
        <Pressable accessibilityRole="button" onPress={send} style={styles.send}><Text style={styles.sendText}>↑</Text></Pressable>
      </View>
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
  body: { flexGrow: 1, padding: 18, justifyContent: "flex-end", gap: 13 },
  date: { color: "#778598", fontSize: 10, textAlign: "center", letterSpacing: 2, marginBottom: 10 },
  incoming: { alignSelf: "flex-start", backgroundColor: "#192433", borderRadius: 16, borderBottomLeftRadius: 5, padding: 12, maxWidth: "82%" },
  outgoing: { alignSelf: "flex-end", backgroundColor: "#5144A7", borderRadius: 16, borderBottomRightRadius: 5, padding: 12, maxWidth: "82%" },
  message: { color: "#F4F6FA", fontSize: 14 },
  time: { color: "#AAB3C0", fontSize: 9, textAlign: "right", marginTop: 6 },
  notice: { color: "#657386", fontSize: 10, textAlign: "center", marginVertical: 12 },
  composer: { flexDirection: "row", alignItems: "center", gap: 10, padding: 15, borderTopWidth: 1, borderTopColor: "#1B2633" },
  input: { flex: 1, backgroundColor: "#172230", color: "white", borderRadius: 18, paddingHorizontal: 16, paddingVertical: 12, maxHeight: 110 },
  send: { width: 42, height: 42, borderRadius: 15, backgroundColor: "#6D5AE6", alignItems: "center", justifyContent: "center" },
  sendText: { color: "white", fontSize: 23, fontWeight: "700" }
});