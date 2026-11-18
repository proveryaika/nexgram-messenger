import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
const groups=[
 {heading:"Account",rows:[["👤","Account","Phone number, username and bio"],["🔒","Privacy and security","Last seen, blocked users and access"]]},
 {heading:"Preferences",rows:[["💬","Chat settings","Theme, text size and wallpaper"],["🔔","Notifications","Sounds, previews and message alerts"],["💾","Data and storage","Media downloads and storage usage"],["▦","Chat folders","Organize conversations"]]},
 {heading:"Devices",rows:[["📱","Devices","Manage active sessions"]]},
 {heading:"Appearance",rows:[["🌐","Language","English"]]},
 {heading:"NexGram services",rows:[["★","NexGram Premium","Planned account features"],["✦","NexGram Credits","Unavailable in preview"],["🎁","Send a gift","Coming later"]]},
 {heading:"Help",rows:[["？","Ask a question","Support center"],["ⓘ","About NexGram","Version and project information"]]}
];
export default function Settings(){
 const [expanded,setExpanded]=useState("Account");
 const [toggles,setToggles]=useState<Record<string,boolean>>({"Message previews":true,"In-app sounds":true});
 const routes:Record<string,string>={"Account":"account","Privacy and security":"privacy","Chat settings":"chats","Notifications":"notifications","Data and storage":"storage","Devices":"devices","Language":"language","NexGram Premium":"premium","About NexGram":"about"};
 return <View style={s.page}>
  <View style={s.header}><Pressable onPress={()=>router.back()}><Text style={s.back}>‹</Text></Pressable><Text style={s.title}>Settings</Text><View style={{flex:1}}/><Pressable onPress={()=>setExpanded("Help")}><Text style={s.search}>⌕</Text></Pressable></View>
  <ScrollView contentContainerStyle={s.content}>
   <Pressable style={s.profile} onPress={()=>setExpanded(expanded==="Account"?"": "Account")}><View style={s.avatar}><Text style={s.initial}>N</Text></View><View style={{flex:1}}><Text style={s.profileName}>NexGram user</Text><Text style={s.muted}>Set name, username and bio</Text></View><Text style={s.chevron}>›</Text></Pressable>
   {groups.map(group=><View key={group.heading} style={s.group}><Text style={s.groupTitle}>{group.heading}</Text>{group.rows.map(([icon,title,sub])=><Pressable key={title} style={s.row} onPress={()=>{const route=routes[title];if(route)router.push({pathname:"/settings/[section]",params:{section:route}});else setExpanded(expanded===title?"":title)}}><View style={s.iconBox}><Text style={s.icon}>{icon}</Text></View><View style={{flex:1}}><Text style={s.rowTitle}>{title}</Text><Text style={s.muted}>{sub}</Text></View><Text style={s.chevron}>›</Text></Pressable>)}</View>)}
   <Text style={s.foot}>NexGram preview · Some controls are local demonstrations. Account security, notifications, payments and synchronization require server integration.</Text>
  </ScrollView>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:52,paddingHorizontal:18},header:{height:54,flexDirection:"row",alignItems:"center",gap:15,marginBottom:12},back:{fontSize:34,color:"#F4F7FB"},title:{fontSize:24,color:"#F4F7FB",fontWeight:"800"},search:{fontSize:29,color:"#D9E3ED"},content:{paddingBottom:30},profile:{flexDirection:"row",alignItems:"center",gap:14,padding:16,backgroundColor:"#202D3A",borderRadius:18,marginBottom:20},avatar:{width:58,height:58,borderRadius:29,backgroundColor:"#229ED9",alignItems:"center",justifyContent:"center"},initial:{fontSize:27,color:"white",fontWeight:"800"},profileName:{fontSize:17,color:"#F4F7FB",fontWeight:"700"},muted:{color:"#8796A5",fontSize:12,marginTop:4},group:{backgroundColor:"#202D3A",borderRadius:17,paddingHorizontal:13,paddingTop:13,paddingBottom:5,marginBottom:15},groupTitle:{color:"#71C5F2",fontSize:14,fontWeight:"700",paddingHorizontal:6,paddingBottom:5},row:{minHeight:65,flexDirection:"row",alignItems:"center",gap:12,borderBottomWidth:1,borderBottomColor:"#2B3947",paddingVertical:9},iconBox:{width:39,height:39,borderRadius:12,backgroundColor:"#2B3B4B",alignItems:"center",justifyContent:"center"},icon:{fontSize:18},rowTitle:{color:"#F2F5F9",fontSize:15,fontWeight:"600"},chevron:{fontSize:25,color:"#748597",marginLeft:4},foot:{color:"#718092",fontSize:10,textAlign:"center",padding:15,lineHeight:16}});
