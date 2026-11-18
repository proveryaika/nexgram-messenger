import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type Message = { id: number; text: string; mine: boolean; time: string };
export default function ConversationScreen() {
  const { name } = useLocalSearchParams<{ id: string; name: string }>();
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages(old => [...old, { id: Date.now(), text, mine: true, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setDraft("");
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()}><Text style={styles.back}>‹</Text></Pressable>
        <View style={styles.person}><Text style={styles.name}>{name ?? "Conversation"}</Text><Text style={styles.status}>NexGram</Text></View>
        <Pressable accessibilityRole="button" accessibilityLabel="More options" onPress={() => {}}><Text style={styles.more}>•••</Text></Pressable>
      </View>
      <ScrollView contentContainerStyle={[styles.body, messages.length === 0 && styles.emptyBody]}>
        {messages.length === 0 ? <Text style={styles.empty}>No messages yet. Say hello to start the conversation.</Text> : <Text style={styles.date}>TODAY</Text>}
        {messages.map(message => <View key={message.id} style={message.mine ? styles.outgoing : styles.incoming}><Text style={styles.message}>{message.text}</Text><Text style={styles.time}>{message.time}{message.mine ? "  ✓" : ""}</Text></View>)}
      </ScrollView>
      <View style={styles.composer}>
        <TextInput value={draft} onChangeText={setDraft} placeholder="Message" placeholderTextColor="#8796A5" style={styles.input} multiline onSubmitEditing={send}/>
        <Pressable accessibilityRole="button" accessibilityLabel="Send message" onPress={send} style={styles.send}><Text style={styles.sendText}>➤</Text></Pressable>
      </View>
      <Text style={styles.notice}>Local preview: messages are not delivered to other accounts yet.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#17212B", paddingTop: 48 },
  header: { height: 64, flexDirection: "row", alignItems: "center", paddingHorizontal: 18, gap: 15, borderBottomWidth: 1, borderBottomColor: "#263442" },
  back: { color: "#F4F7FB", fontSize: 34 },
  person: { flex: 1 },
  name: { color: "#F3F6FA", fontSize: 16, fontWeight: "700" },
  status: { color: "#8796A5", fontSize: 11, marginTop: 3 },
  more: { color: "#D7E0E8", fontSize: 19 },
  body: { flexGrow: 1, padding: 18, justifyContent: "flex-end", gap: 13 },
  emptyBody: { justifyContent: "center", alignItems: "center" },
  empty: { color: "#A9B7C5", fontSize: 13, textAlign: "center", backgroundColor: "#263442", borderRadius: 16, padding: 14, overflow: "hidden" },
  date: { color: "#8796A5", fontSize: 10, textAlign: "center", letterSpacing: 2, marginBottom: 10 },
  incoming: { alignSelf: "flex-start", backgroundColor: "#263442", borderRadius: 16, borderBottomLeftRadius: 5, padding: 12, maxWidth: "82%" },
  outgoing: { alignSelf: "flex-end", backgroundColor: "#2B5278", borderRadius: 16, borderBottomRightRadius: 5, padding: 12, maxWidth: "82%" },
  message: { color: "#F4F6FA", fontSize: 14 },
  time: { color: "#B5C3D0", fontSize: 9, textAlign: "right", marginTop: 6 },
  notice: { color: "#8796A5", fontSize: 10, textAlign: "center", paddingBottom: 7 },
  composer: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderTopWidth: 1, borderTopColor: "#263442" },
  input: { flex: 1, backgroundColor: "#263442", color: "white", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12, maxHeight: 110 },
  send: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#229ED9", alignItems: "center", justifyContent: "center" },
  sendText: { color: "white", fontSize: 19, fontWeight: "700" }
});