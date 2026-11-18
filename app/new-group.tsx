import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
export default function NewGroup(){
 const [name,setName]=useState("");
 const [about,setAbout]=useState("");
 return <View style={s.page}><View style={s.header}><Pressable onPress={()=>router.back()}><Text style={s.back}>‹</Text></Pressable><Text style={s.title}>New group</Text></View>
 <View style={s.avatar}><Text style={s.avatarText}>👥</Text></View>
 <Text style={s.label}>Group name</Text><TextInput value={name} onChangeText={setName} placeholder="Name your group" placeholderTextColor="#8291A0" style={s.input} maxLength={64}/>
 <Text style={s.label}>Description (optional)</Text><TextInput value={about} onChangeText={setAbout} placeholder="What is this group about?" placeholderTextColor="#8291A0" style={[s.input,s.multiline]} multiline maxLength={255}/>
 <View style={s.info}><Text style={s.infoTitle}>Add members later</Text><Text style={s.infoCopy}>There are no NexGram contacts connected yet. Member invitations and group creation will work after account search and the server are ready.</Text></View>
 <Pressable disabled={!name.trim()} style={[s.button,!name.trim()&&s.disabled]} onPress={()=>router.push("/new-chat")}><Text style={s.buttonText}>Continue to add members</Text></Pressable>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:55,paddingHorizontal:22},header:{height:55,flexDirection:"row",alignItems:"center",gap:16},back:{fontSize:34,color:"#F4F7FB"},title:{fontSize:23,color:"#F4F7FB",fontWeight:"700"},avatar:{width:84,height:84,borderRadius:42,backgroundColor:"#263746",alignSelf:"center",alignItems:"center",justifyContent:"center",marginTop:38,marginBottom:18},avatarText:{fontSize:34},label:{color:"#71C5F2",fontSize:12,marginTop:17,marginBottom:8},input:{backgroundColor:"#263442",borderRadius:12,padding:15,color:"#F4F7FB",fontSize:15},multiline:{height:95,textAlignVertical:"top"},info:{marginTop:24,padding:16,backgroundColor:"#202D3A",borderRadius:14},infoTitle:{fontSize:15,color:"#F4F7FB",fontWeight:"700",marginBottom:7},infoCopy:{fontSize:12,color:"#9AA8B7",lineHeight:18},button:{marginTop:25,backgroundColor:"#229ED9",padding:15,borderRadius:25,alignItems:"center"},disabled:{opacity:.4},buttonText:{color:"white",fontWeight:"700"}});
