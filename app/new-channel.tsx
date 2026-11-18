import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
export default function NewChannel(){
 const [name,setName]=useState("");
 const [about,setAbout]=useState("");
 const [kind,setKind]=useState<"public"|"private">("public");
 return <View style={s.page}><View style={s.header}><Pressable onPress={()=>router.back()}><Text style={s.back}>‹</Text></Pressable><Text style={s.title}>New channel</Text></View>
 <View style={s.avatar}><Text style={s.avatarText}>📢</Text></View>
 <Text style={s.label}>Channel name</Text><TextInput value={name} onChangeText={setName} placeholder="Channel name" placeholderTextColor="#8291A0" style={s.input} maxLength={64}/>
 <Text style={s.label}>Description</Text><TextInput value={about} onChangeText={setAbout} placeholder="Describe your channel" placeholderTextColor="#8291A0" style={[s.input,s.multiline]} multiline maxLength={255}/>
 <Text style={s.label}>Channel type</Text><View style={s.options}><Pressable onPress={()=>setKind("public")} style={[s.option,kind==="public"&&s.selected]}><Text style={s.optionTitle}>Public</Text><Text style={s.optionCopy}>Discoverable by username</Text></Pressable><Pressable onPress={()=>setKind("private")} style={[s.option,kind==="private"&&s.selected]}><Text style={s.optionTitle}>Private</Text><Text style={s.optionCopy}>Invite link required</Text></Pressable></View>
 <View style={s.info}><Text style={s.infoCopy}>This is a local setup preview. Publishing, usernames, invite links and subscriber management require the NexGram backend.</Text></View>
 <Pressable disabled={!name.trim()} style={[s.button,!name.trim()&&s.disabled]} onPress={()=>router.back()}><Text style={s.buttonText}>Save draft details</Text></Pressable>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:55,paddingHorizontal:22},header:{height:55,flexDirection:"row",alignItems:"center",gap:16},back:{fontSize:34,color:"#F4F7FB"},title:{fontSize:23,color:"#F4F7FB",fontWeight:"700"},avatar:{width:84,height:84,borderRadius:42,backgroundColor:"#263746",alignSelf:"center",alignItems:"center",justifyContent:"center",marginTop:24,marginBottom:8},avatarText:{fontSize:34},label:{color:"#71C5F2",fontSize:12,marginTop:15,marginBottom:8},input:{backgroundColor:"#263442",borderRadius:12,padding:14,color:"#F4F7FB",fontSize:14},multiline:{height:78,textAlignVertical:"top"},options:{flexDirection:"row",gap:10},option:{flex:1,backgroundColor:"#202D3A",padding:13,borderRadius:12,borderWidth:1,borderColor:"#202D3A"},selected:{borderColor:"#229ED9"},optionTitle:{color:"#F4F7FB",fontWeight:"700",fontSize:14},optionCopy:{color:"#9AA8B7",fontSize:10,marginTop:5},info:{marginTop:18,padding:14,backgroundColor:"#202D3A",borderRadius:12},infoCopy:{color:"#9AA8B7",fontSize:11,lineHeight:17},button:{marginTop:20,backgroundColor:"#229ED9",padding:14,borderRadius:24,alignItems:"center"},disabled:{opacity:.4},buttonText:{color:"white",fontWeight:"700"}});
