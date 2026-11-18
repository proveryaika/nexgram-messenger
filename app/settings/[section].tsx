import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";

const descriptions: Record<string,{title:string;intro:string}> = {
 account:{title:"Account",intro:"Profile details for your NexGram account."},
 notifications:{title:"Notifications",intro:"Choose which app alerts are enabled on this device."},
 privacy:{title:"Privacy and security",intro:"Privacy controls will be enforced by the server once accounts are connected."},
 chats:{title:"Chat settings",intro:"Personalize how conversations look."},
 storage:{title:"Data and storage",intro:"Media and storage preferences for this device."},
 devices:{title:"Devices",intro:"Review active sign-in sessions when secure sign-in is available."},
 language:{title:"Language",intro:"Choose the language used in NexGram."},
 premium:{title:"NexGram Premium",intro:"Premium features are not purchasable in this preview."},
 about:{title:"About NexGram",intro:"An independent messaging project."}
};
const controls: Record<string,string[]> = {
 notifications:["Private chat notifications","Group notifications","In-app sounds","Message preview"],
 privacy:["Show last seen","Allow calls from contacts","Sync contacts","Ask before adding me to groups"],
 chats:["Send with Enter","Show message animations","Use compact chat list"],
 storage:["Auto-download photos on Wi-Fi","Auto-download videos on Wi-Fi"],
 devices:[],
 language:["Use system language"]
};
export default function SettingDetail(){
 const {section}=useLocalSearchParams<{section:string}>();
 const key=section||"about"; const info=descriptions[key]||descriptions.about;
 const [values,setValues]=useState<Record<string,boolean>>({});
 const [text,setText]=useState("");
 const items=controls[key]||[];
 return <View style={s.page}>
  <View style={s.header}><Pressable accessibilityRole="button" onPress={()=>router.back()}><Text style={s.back}>‹</Text></Pressable><Text style={s.title}>{info.title}</Text></View>
  <ScrollView contentContainerStyle={s.body}>
   <Text style={s.intro}>{info.intro}</Text>
   {key==="account"&&<><Text style={s.label}>Display name</Text><TextInput value={text} onChangeText={setText} placeholder="Enter your name" placeholderTextColor="#8291A0" style={s.input}/><Text style={s.caption}>Username and verified phone number will be added with account registration.</Text></>}
   {key==="premium"&&<View style={s.info}><Text style={s.infoTitle}>Coming later</Text><Text style={s.caption}>No payments or Premium entitlements are active in this preview.</Text></View>}
   {key==="devices"&&<View style={s.info}><Text style={s.infoTitle}>No active sessions to display</Text><Text style={s.caption}>Device management becomes available after secure authentication is connected.</Text></View>}
   {key==="about"&&<View style={s.info}><Text style={s.infoTitle}>NexGram Preview</Text><Text style={s.caption}>Independent app · Early web preview</Text></View>}
   {items.map(item=><View key={item} style={s.row}><Text style={s.rowText}>{item}</Text><Switch value={values[item]??(item.startsWith("Show")||item.startsWith("Allow")?false:true)} onValueChange={v=>setValues(old=>({...old,[item]:v}))} trackColor={{false:"#425264",true:"#229ED9"}} thumbColor="#F4F7FB"/></View>)}
   <Text style={s.footer}>These settings are currently local preview preferences. Account-wide privacy and notification settings require backend support.</Text>
  </ScrollView>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:50},header:{height:60,flexDirection:"row",alignItems:"center",paddingHorizontal:18,gap:16},back:{fontSize:34,color:"#F4F7FB"},title:{fontSize:22,color:"#F4F7FB",fontWeight:"800"},body:{padding:20},intro:{fontSize:14,lineHeight:21,color:"#AAB7C4",marginBottom:22},label:{color:"#71C5F2",fontSize:12,marginBottom:8},input:{backgroundColor:"#202D3A",color:"#F4F7FB",padding:15,borderRadius:12,fontSize:15},caption:{color:"#8291A0",fontSize:12,lineHeight:18,marginTop:8},row:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingVertical:16,borderBottomWidth:1,borderBottomColor:"#2B3947",gap:16},rowText:{color:"#F1F5F8",fontSize:14,flex:1},info:{backgroundColor:"#202D3A",borderRadius:15,padding:18,marginTop:8},infoTitle:{fontSize:16,fontWeight:"700",color:"#F4F7FB"},footer:{color:"#748496",fontSize:11,lineHeight:17,marginTop:26}});
