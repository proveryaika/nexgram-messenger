import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Profile() {
  const [name,setName]=useState("");
  const [bio,setBio]=useState("");
  const [tab,setTab]=useState("Posts");
  return <View style={s.page}>
    <View style={s.top}><Pressable accessibilityRole="button" onPress={()=>router.back()}><Text style={s.back}>‹</Text></Pressable><Text style={s.title}>Profile</Text><View style={{flex:1}}/><Pressable accessibilityRole="button" onPress={()=>router.push("/settings/account")}><Text style={s.more}>•••</Text></Pressable></View>
    <ScrollView contentContainerStyle={s.content}>
      <View style={s.avatar}><Text style={s.avatarText}>{name.trim()?name.trim().slice(0,1).toUpperCase():"N"}</Text></View>
      <Text style={s.online}>●  Account preview</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor="#8493A2" style={s.field}/>
      <TextInput value={bio} onChangeText={setBio} placeholder="Add a bio" placeholderTextColor="#8493A2" style={s.field}/>
      <View style={s.phone}><Text style={s.phoneText}>Phone number</Text><Text style={s.hint}>A verified number will appear here after sign-in is implemented.</Text></View>
      <View style={s.tabs}>{["Posts","Archive"].map(x=><Pressable key={x} onPress={()=>setTab(x)} style={[s.tab,tab===x&&s.active]}><Text style={[s.tabText,tab===x&&s.activeText]}>{x}</Text></Pressable>)}</View>
      <View style={s.blank}><Text style={s.blankTitle}>{tab==="Posts"?"No posts yet":"Archive is empty"}</Text><Text style={s.hint}>Profile posts and media publishing will be connected in a later stage.</Text></View>
      <Pressable style={s.button} onPress={()=>router.push("/settings/account")}><Text style={s.buttonText}>Edit profile</Text></Pressable>
    </ScrollView>
    <View style={s.nav}>
      <Pressable onPress={()=>router.replace("/")}><Text style={s.navText}>◉{"\n"}Chats</Text></Pressable>
      <Pressable onPress={()=>router.push("/contacts")}><Text style={s.navText}>♙{"\n"}Contacts</Text></Pressable>
      <Pressable onPress={()=>router.push("/settings")}><Text style={s.navText}>⚙{"\n"}Settings</Text></Pressable>
      <Text style={[s.navText,s.selected]}>●{"\n"}Profile</Text>
    </View>
  </View>;
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:48},top:{height:54,flexDirection:"row",alignItems:"center",paddingHorizontal:18,gap:14},back:{fontSize:34,color:"#F4F7FB"},title:{fontSize:23,fontWeight:"800",color:"#F4F7FB"},more:{fontSize:22,color:"#DCE5ED"},content:{padding:20,alignItems:"center",paddingBottom:30},avatar:{width:118,height:118,borderRadius:59,backgroundColor:"#229ED9",alignItems:"center",justifyContent:"center",marginTop:24},avatarText:{fontSize:48,color:"white",fontWeight:"700"},online:{color:"#8796A5",fontSize:12,marginTop:22,marginBottom:22},field:{width:"100%",backgroundColor:"#202D3A",borderRadius:14,color:"#F4F7FB",padding:16,fontSize:15,marginBottom:10},phone:{width:"100%",backgroundColor:"#202D3A",borderRadius:16,padding:16,marginTop:8},phoneText:{color:"#F4F7FB",fontSize:15},hint:{color:"#8796A5",fontSize:12,lineHeight:18,marginTop:6,textAlign:"center"},tabs:{flexDirection:"row",backgroundColor:"#202D3A",borderRadius:24,padding:4,marginTop:22,width:"100%"},tab:{flex:1,padding:11,borderRadius:20,alignItems:"center"},active:{backgroundColor:"#30485D"},tabText:{color:"#8796A5",fontWeight:"600"},activeText:{color:"#71C5F2"},blank:{alignItems:"center",paddingVertical:50},blankTitle:{fontSize:20,color:"#F4F7FB",fontWeight:"700"},button:{backgroundColor:"#229ED9",borderRadius:24,paddingVertical:13,paddingHorizontal:28},buttonText:{color:"white",fontWeight:"700"},nav:{flexDirection:"row",justifyContent:"space-around",paddingVertical:13,borderTopWidth:1,borderTopColor:"#263442"},navText:{color:"#AAB6C3",fontSize:11,textAlign:"center",lineHeight:19},selected:{color:"#229ED9"}});
