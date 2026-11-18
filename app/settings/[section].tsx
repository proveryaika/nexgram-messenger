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
 const [profileName,setProfileName]=useState("");
 const [lastName,setLastName]=useState("");
 const [username,setUsername]=useState("");
 const [bio,setBio]=useState("");
 const [saved,setSaved]=useState(false);
 const items=controls[key]||[];
 return <View style={s.page}>
  <View style={s.header}><Pressable accessibilityRole="button" onPress={()=>router.back()}><Text style={s.back}>‹</Text></Pressable><Text style={s.title}>{info.title}</Text></View>
  <ScrollView contentContainerStyle={s.body}>
   <Text style={s.intro}>{info.intro}</Text>
   {key==="account"&&<View style={s.accountCard}>
    <View style={s.avatar}><Text style={s.avatarText}>{(profileName.trim()||"N").slice(0,1).toUpperCase()}</Text></View>
    <Text style={s.caption}>Avatar upload will be connected when media storage is ready.</Text>
    <Text style={s.label}>First name</Text><TextInput value={profileName} onChangeText={setProfileName} placeholder="Enter first name" placeholderTextColor="#8291A0" style={s.input}/>
    <Text style={s.label}>Last name</Text><TextInput value={lastName} onChangeText={setLastName} placeholder="Enter last name" placeholderTextColor="#8291A0" style={s.input}/>
    <Text style={s.label}>Username</Text><TextInput value={username} onChangeText={setUsername} autoCapitalize="none" autoCorrect={false} placeholder="@username" placeholderTextColor="#8291A0" style={s.input}/>
    <Text style={s.caption}>Use 5–32 characters: letters, numbers, and underscores. Availability will be checked when the database is connected.</Text>
    <Text style={s.label}>About</Text><TextInput value={bio} onChangeText={setBio} multiline maxLength={160} placeholder="Tell people a little about yourself" placeholderTextColor="#8291A0" style={[s.input,s.bioInput]}/>
    <Pressable style={s.saveButton} onPress={()=>setSaved(true)}><Text style={s.saveText}>Save preview</Text></Pressable>
    {saved&&<Text style={s.saved}>Preview updated on this screen. Account sync is not connected yet.</Text>}
   </View>}
   {key==="premium"&&<View style={s.info}><Text style={s.infoTitle}>Coming later</Text><Text style={s.caption}>No payments or Premium entitlements are active in this preview.</Text></View>}
   {key==="devices"&&<View style={s.info}><Text style={s.infoTitle}>No active sessions to display</Text><Text style={s.caption}>Device management becomes available after secure authentication is connected.</Text></View>}
   {key==="about"&&<View style={s.info}><Text style={s.infoTitle}>NexGram Preview</Text><Text style={s.caption}>Independent app · Early web preview</Text></View>}
   {items.map(item=><View key={item} style={s.row}><Text style={s.rowText}>{item}</Text><Switch value={values[item]??(item.startsWith("Show")||item.startsWith("Allow")?false:true)} onValueChange={v=>setValues(old=>({...old,[item]:v}))} trackColor={{false:"#425264",true:"#229ED9"}} thumbColor="#F4F7FB"/></View>)}
   <Text style={s.footer}>These settings are currently local preview preferences. Account-wide privacy and notification settings require backend support.</Text>
  </ScrollView>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:50},header:{height:60,flexDirection:"row",alignItems:"center",paddingHorizontal:18,gap:16},back:{fontSize:34,color:"#F4F7FB"},title:{fontSize:22,color:"#F4F7FB",fontWeight:"800"},body:{padding:20},intro:{fontSize:14,lineHeight:21,color:"#AAB7C4",marginBottom:22},label:{color:"#71C5F2",fontSize:12,marginBottom:8},input:{backgroundColor:"#202D3A",color:"#F4F7FB",padding:15,borderRadius:12,fontSize:15},caption:{color:"#8291A0",fontSize:12,lineHeight:18,marginTop:8},accountCard:{backgroundColor:"#202D3A",borderRadius:16,padding:16},avatar:{width:88,height:88,borderRadius:44,backgroundColor:"#229ED9",alignSelf:"center",alignItems:"center",justifyContent:"center",marginBottom:12},avatarText:{fontSize:36,color:"#FFFFFF",fontWeight:"700"},bioInput:{minHeight:96,textAlignVertical:"top"},saveButton:{backgroundColor:"#229ED9",borderRadius:12,padding:14,alignItems:"center",marginTop:18},saveText:{color:"#FFFFFF",fontWeight:"700"},saved:{color:"#8FCFA9",fontSize:12,marginTop:12,textAlign:"center"},row:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingVertical:16,borderBottomWidth:1,borderBottomColor:"#2B3947",gap:16},rowText:{color:"#F1F5F8",fontSize:14,flex:1},info:{backgroundColor:"#202D3A",borderRadius:15,padding:18,marginTop:8},infoTitle:{fontSize:16,fontWeight:"700",color:"#F4F7FB"},footer:{color:"#748496",fontSize:11,lineHeight:17,marginTop:26}});
