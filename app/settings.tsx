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
const detail:Record<string,{description:string;items:string[]}> = {
 "Account":{description:"Your public identity and sign-in details.",items:["Phone number: not connected","Username: not set","Two-step verification: not configured"]},
 "Privacy and security":{description:"Choose who can see your information and contact you.",items:["Last seen and online","Profile photo visibility","Phone number visibility","Blocked users","Active sessions","Two-step verification"]},
 "Chat settings":{description:"Personalize the appearance of your conversations.",items:["Dark theme","Text size","Chat wallpaper","Message animations"]},
 "Notifications":{description:"Notification preferences are stored locally in this preview.",items:["Private chat notifications","Group notifications","Channel notifications","In-app sounds","Message previews"]},
 "Data and storage":{description:"Media transfer settings will take effect when storage is connected.",items:["Automatic photo downloads","Automatic video downloads","Automatic file downloads","Storage usage"]},
 "Devices":{description:"Session management requires server-side authentication.",items:["This device · preview session","Other active sessions unavailable","Terminate other sessions unavailable"]},
 "Language":{description:"Language selection preview.",items:["English","Русский","Nederlands","Deutsch"]},
 "NexGram Premium":{description:"Premium is a planned NexGram feature. No purchases are active.",items:["Expanded uploads · planned","Profile customization · planned","Exclusive reactions · planned"]},
 "NexGram Credits":{description:"NexGram Credits are not available in this preview. No real payments are processed.",items:["Balance: unavailable","Transfers: unavailable","Purchase history: unavailable"]},
 "Send a gift":{description:"Gift sending will be considered after account and payment systems are ready.",items:["Gift catalog · coming later"]},
 "About NexGram":{description:"Independent messaging app project.",items:["Version 0.1.0","Not affiliated with Telegram","Own code and visual identity"]},
 "Ask a question":{description:"Support contact will be added before public release.",items:["Support center · coming later"]}
};
export default function Settings(){
 const [selected,setSelected]=useState("");
 const [toggles,setToggles]=useState<Record<string,boolean>>({"In-app sounds":true,"Message previews":true,"Dark theme":true});
 const current=detail[selected];
 return <View style={s.page}>
  <View style={s.header}><Pressable onPress={()=>selected?setSelected(""):router.back()}><Text style={s.back}>‹</Text></Pressable><Text style={s.title}>{selected||"Settings"}</Text><View style={{flex:1}}/><Pressable onPress={()=>setSelected("About NexGram")}><Text style={s.search}>ⓘ</Text></Pressable></View>
  {selected&&current?<ScrollView contentContainerStyle={s.detail}><Text style={s.description}>{current.description}</Text>{current.items.map(item=><View key={item} style={s.detailRow}><Text style={s.detailText}>{item}</Text>{["In-app sounds","Message previews","Dark theme","Private chat notifications","Group notifications","Channel notifications","Automatic photo downloads","Automatic video downloads","Automatic file downloads"].some(k=>item.startsWith(k))&&<Switch value={toggles[item]??false} onValueChange={v=>setToggles(old=>({...old,[item]:v}))} trackColor={{true:"#229ED9",false:"#465767"}}/>}</View>)}{selected==="Privacy and security"&&<Text style={s.warning}>These are interface previews only. Privacy controls do not become security protections until server-side enforcement is implemented.</Text>}{selected==="Devices"&&<Text style={s.warning}>Do not rely on this preview to manage real account sessions.</Text>}</ScrollView>:<ScrollView contentContainerStyle={s.content}>
   <Pressable style={s.profile} onPress={()=>setSelected("Account")}><View style={s.avatar}><Text style={s.initial}>N</Text></View><View style={{flex:1}}><Text style={s.profileName}>NexGram user</Text><Text style={s.muted}>Set name, username and bio</Text></View><Text style={s.chevron}>›</Text></Pressable>
   {groups.map(group=><View key={group.heading} style={s.group}><Text style={s.groupTitle}>{group.heading}</Text>{group.rows.map(([icon,title,sub])=><Pressable key={title} style={s.row} onPress={()=>setSelected(title)}><View style={s.iconBox}><Text style={s.icon}>{icon}</Text></View><View style={{flex:1}}><Text style={s.rowTitle}>{title}</Text><Text style={s.muted}>{sub}</Text></View><Text style={s.chevron}>›</Text></Pressable>)}</View>)}
   <Text style={s.foot}>NexGram preview · Account security, notifications, payments and synchronization require server integration.</Text>
  </ScrollView>}
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:52,paddingHorizontal:18},header:{height:54,flexDirection:"row",alignItems:"center",gap:15,marginBottom:12},back:{fontSize:34,color:"#F4F7FB"},title:{fontSize:22,color:"#F4F7FB",fontWeight:"800"},search:{fontSize:23,color:"#D9E3ED"},content:{paddingBottom:30},profile:{flexDirection:"row",alignItems:"center",gap:14,padding:16,backgroundColor:"#202D3A",borderRadius:18,marginBottom:20},avatar:{width:58,height:58,borderRadius:29,backgroundColor:"#229ED9",alignItems:"center",justifyContent:"center"},initial:{fontSize:27,color:"white",fontWeight:"800"},profileName:{fontSize:17,color:"#F4F7FB",fontWeight:"700"},muted:{color:"#8796A5",fontSize:12,marginTop:4},group:{backgroundColor:"#202D3A",borderRadius:17,paddingHorizontal:13,paddingTop:13,paddingBottom:5,marginBottom:15},groupTitle:{color:"#71C5F2",fontSize:14,fontWeight:"700",paddingHorizontal:6,paddingBottom:5},row:{minHeight:65,flexDirection:"row",alignItems:"center",gap:12,borderBottomWidth:1,borderBottomColor:"#2B3947",paddingVertical:9},iconBox:{width:39,height:39,borderRadius:12,backgroundColor:"#2B3B4B",alignItems:"center",justifyContent:"center"},icon:{fontSize:18},rowTitle:{color:"#F2F5F9",fontSize:15,fontWeight:"600"},chevron:{fontSize:25,color:"#748597",marginLeft:4},foot:{color:"#718092",fontSize:10,textAlign:"center",padding:15,lineHeight:16},detail:{paddingBottom:35},description:{fontSize:14,lineHeight:21,color:"#8796A5",marginBottom:20},detailRow:{minHeight:58,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderBottomWidth:1,borderColor:"#2B3947",gap:12},detailText:{fontSize:14,color:"#F4F7FB",flex:1},warning:{fontSize:12,lineHeight:19,color:"#D6B77A",backgroundColor:"#3A3328",padding:14,borderRadius:12,marginTop:22}});
