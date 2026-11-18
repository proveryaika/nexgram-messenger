import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const rows = [
  { icon: "👤", title: "Account", sub: "Phone number, username and bio", route: "account" },
  { icon: "🔔", title: "Notifications", sub: "Private chats, groups and calls", route: "notifications" },
  { icon: "🔒", title: "Privacy and security", sub: "Last seen, blocked users and passcode", route: "privacy" },
  { icon: "🎨", title: "Chat settings", sub: "Appearance, text size and wallpaper", route: "chats" },
  { icon: "💾", title: "Data and storage", sub: "Media auto-download and storage", route: "storage" },
  { icon: "📱", title: "Devices", sub: "Active sessions and logged-in devices", route: "devices" },
  { icon: "🌐", title: "Language", sub: "App language", route: "language" },
  { icon: "★", title: "NexGram Premium", sub: "Preview of future features", route: "premium" },
  { icon: "ⓘ", title: "About NexGram", sub: "Version and project information", route: "about" },
];
export default function Settings() {
  return <View style={s.page}>
    <View style={s.header}><Pressable accessibilityRole="button" onPress={() => router.back()}><Text style={s.back}>‹</Text></Pressable><Text style={s.title}>Settings</Text><View style={{flex:1}}/><Pressable accessibilityRole="button" onPress={() => router.push("/settings/privacy")}><Text style={s.search}>⌕</Text></Pressable></View>
    <ScrollView contentContainerStyle={{paddingBottom:28}}>
      <Pressable style={s.profile} onPress={() => router.push("/settings/account")}>
        <View style={s.avatar}><Text style={s.initial}>N</Text></View><View><Text style={s.profileName}>NexGram account</Text><Text style={s.muted}>Set up your profile</Text></View><Text style={s.chevron}>›</Text>
      </Pressable>
      {rows.map((row) => <Pressable key={row.route} accessibilityRole="button" onPress={() => router.push({pathname:"/settings/[section]",params:{section:row.route}})} style={s.row}>
        <View style={s.iconBox}><Text style={s.icon}>{row.icon}</Text></View><View style={{flex:1}}><Text style={s.rowTitle}>{row.title}</Text><Text style={s.muted}>{row.sub}</Text></View><Text style={s.chevron}>›</Text>
      </Pressable>)}
      <Text style={s.foot}>Preview build · Settings are stored on this device only where interactive controls are available.</Text>
    </ScrollView>
  </View>;
}
const s=StyleSheet.create({
 page:{flex:1,backgroundColor:"#17212B",paddingTop:54,paddingHorizontal:18},
 header:{height:54,flexDirection:"row",alignItems:"center",gap:15,marginBottom:14},
 back:{fontSize:34,color:"#F4F7FB"},title:{fontSize:24,color:"#F4F7FB",fontWeight:"800"},search:{fontSize:29,color:"#D9E3ED"},
 profile:{flexDirection:"row",alignItems:"center",gap:14,padding:16,backgroundColor:"#202D3A",borderRadius:18,marginBottom:18},
 avatar:{width:58,height:58,borderRadius:29,backgroundColor:"#229ED9",alignItems:"center",justifyContent:"center"},
 initial:{fontSize:27,color:"white",fontWeight:"800"},profileName:{fontSize:16,color:"#F4F7FB",fontWeight:"700"},muted:{color:"#8796A5",fontSize:12,marginTop:4},
 row:{flexDirection:"row",alignItems:"center",gap:13,paddingVertical:14,paddingHorizontal:6,borderBottomWidth:1,borderBottomColor:"#263442"},
 iconBox:{width:38,height:38,borderRadius:12,backgroundColor:"#263746",alignItems:"center",justifyContent:"center"},icon:{fontSize:19},
 rowTitle:{color:"#F2F5F9",fontSize:15,fontWeight:"600"},chevron:{fontSize:25,color:"#748597",marginLeft:6},
 foot:{color:"#718092",fontSize:10,textAlign:"center",padding:20,lineHeight:16}
});