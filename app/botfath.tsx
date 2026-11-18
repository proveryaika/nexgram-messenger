import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function BotFath() {
  const [name,setName]=useState("");
  const [username,setUsername]=useState("");
  const [description,setDescription]=useState("");
  const [commands,setCommands]=useState("/start - Start the bot\n/help - Show help");
  const [created,setCreated]=useState(false);
  const cleanUsername=username.replace(/^@/,"").trim();
  const valid=/^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(cleanUsername);
  const commandCount=useMemo(()=>commands.split("\n").filter(x=>x.trim().startsWith("/")).length,[commands]);
  return <View style={s.page}>
    <View style={s.header}><Pressable onPress={()=>router.back()}><Text style={s.back}>‹</Text></Pressable><View style={{flex:1}}><Text style={s.title}>BotFath</Text><Text style={s.sub}>@botfath · NexGram bot builder</Text></View><View style={s.badge}><Text style={s.badgeText}>BETA</Text></View></View>
    <ScrollView contentContainerStyle={s.body}>
      <View style={s.hero}><Text style={s.heroIcon}>⚙</Text><Text style={s.heroTitle}>Create your own bot</Text><Text style={s.copy}>Set up a bot profile and its command list. Secure bot tokens and live automation will be added with the backend.</Text></View>
      <Text style={s.label}>Bot name</Text><TextInput value={name} onChangeText={v=>{setName(v);setCreated(false)}} placeholder="Example: Weather Helper" placeholderTextColor="#8291A0" style={s.input}/>
      <Text style={s.label}>Bot username</Text><TextInput value={username} onChangeText={v=>{setUsername(v);setCreated(false)}} autoCapitalize="none" autoCorrect={false} placeholder="weather_helper_bot" placeholderTextColor="#8291A0" style={s.input}/>
      <Text style={s.hint}>5–32 characters, starts with a letter; letters, numbers and underscores. Availability is not checked in this preview.</Text>
      <Text style={s.label}>Description</Text><TextInput value={description} onChangeText={setDescription} multiline maxLength={200} placeholder="What does your bot do?" placeholderTextColor="#8291A0" style={[s.input,s.multiline]}/>
      <Text style={s.label}>Commands</Text><TextInput value={commands} onChangeText={setCommands} multiline style={[s.input,s.commands]}/>
      <Text style={s.hint}>{commandCount} command(s) detected. Use one command per line.</Text>
      <Pressable style={[s.button,(!name.trim()||!valid)&&s.disabled]} disabled={!name.trim()||!valid} onPress={()=>setCreated(true)}><Text style={s.buttonText}>Create bot preview</Text></Pressable>
      {created&&<View style={s.result}><Text style={s.resultTitle}>Bot draft created</Text><Text style={s.copy}>{name.trim()} · @{cleanUsername}</Text><Text style={s.hint}>This is a local preview only. No live bot or API token has been created.</Text></View>}
      <Text style={s.footer}>Safety: bots will need rate limits, permission scopes, abuse reporting and token revocation before public launch.</Text>
    </ScrollView>
  </View>;
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:48},header:{height:62,flexDirection:"row",alignItems:"center",paddingHorizontal:18,gap:14},back:{fontSize:34,color:"#F4F7FB"},title:{fontSize:22,fontWeight:"800",color:"#F4F7FB"},sub:{fontSize:11,color:"#8A9AAA",marginTop:2},badge:{backgroundColor:"#34495C",paddingHorizontal:10,paddingVertical:5,borderRadius:10},badgeText:{fontSize:10,color:"#71C5F2",fontWeight:"800"},body:{padding:20,paddingBottom:40},hero:{backgroundColor:"#202D3A",borderRadius:18,padding:20,alignItems:"center",marginBottom:22},heroIcon:{fontSize:34,color:"#71C5F2"},heroTitle:{fontSize:20,fontWeight:"800",color:"#F4F7FB",marginTop:8},copy:{fontSize:13,color:"#AAB7C4",lineHeight:20,textAlign:"center",marginTop:8},label:{fontSize:12,color:"#71C5F2",fontWeight:"700",marginBottom:8,marginTop:14},input:{backgroundColor:"#202D3A",color:"#F4F7FB",borderRadius:12,padding:15,fontSize:14},multiline:{minHeight:85,textAlignVertical:"top"},commands:{minHeight:110,textAlignVertical:"top",fontFamily:"monospace"},hint:{fontSize:11,color:"#8291A0",lineHeight:17,marginTop:7},button:{backgroundColor:"#229ED9",borderRadius:14,padding:15,alignItems:"center",marginTop:22},disabled:{opacity:0.45},buttonText:{color:"#FFFFFF",fontWeight:"800"},result:{backgroundColor:"#203A32",borderRadius:14,padding:16,marginTop:18},resultTitle:{color:"#8BD6AC",fontWeight:"800",fontSize:16},footer:{fontSize:11,color:"#778899",lineHeight:17,textAlign:"center",marginTop:26}});
