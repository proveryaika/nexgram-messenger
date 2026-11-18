import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
export default function Channels(){
 const [tab,setTab]=useState("Public");
 return <View style={s.page}>
  <View style={s.header}><Pressable onPress={()=>router.back()}><Text style={s.back}>‹</Text></Pressable><Text style={s.title}>Channels</Text><View style={{flex:1}}/><Pressable onPress={()=>router.push("/create-channel")}><Text style={s.add}>＋</Text></Pressable></View>
  <View style={s.tabs}>{["Public","My channels"].map(t=><Pressable key={t} onPress={()=>setTab(t)} style={[s.tab,tab===t&&s.active]}><Text style={[s.tabText,tab===t&&s.activeText]}>{t}</Text></Pressable>)}</View>
  <View style={s.empty}><View style={s.iconCircle}><Text style={s.icon}>◉</Text></View><Text style={s.heading}>{tab==="Public"?"Discover channels":"You have no channels"}</Text><Text style={s.copy}>{tab==="Public"?"Public NexGram channels will appear here when directory search is connected.":"Channels you create or manage will appear here after account sync is available."}</Text><Pressable style={s.button} onPress={()=>router.push("/create-channel")}><Text style={s.buttonText}>Create channel</Text></Pressable></View>
  <Text style={s.note}>Channel discovery, subscriptions and publishing are not connected to a server yet.</Text>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:52,paddingHorizontal:20},header:{height:55,flexDirection:"row",alignItems:"center",gap:18},back:{fontSize:35,color:"#F4F7FB"},title:{fontSize:25,color:"#F4F7FB",fontWeight:"800"},add:{fontSize:30,color:"#71C5F2"},tabs:{flexDirection:"row",gap:8,marginTop:20},tab:{paddingHorizontal:16,paddingVertical:9,borderRadius:20},active:{backgroundColor:"#34495C"},tabText:{fontSize:13,color:"#9AA8B7",fontWeight:"600"},activeText:{color:"#71C5F2"},empty:{flex:1,alignItems:"center",justifyContent:"center",paddingHorizontal:25},iconCircle:{width:88,height:88,borderRadius:44,backgroundColor:"#263746",alignItems:"center",justifyContent:"center",marginBottom:20},icon:{fontSize:38,color:"#71C5F2"},heading:{fontSize:21,color:"#F4F7FB",fontWeight:"700"},copy:{fontSize:13,lineHeight:20,color:"#9AA8B7",textAlign:"center",marginTop:10,maxWidth:300},button:{backgroundColor:"#229ED9",borderRadius:24,paddingHorizontal:25,paddingVertical:13,marginTop:25},buttonText:{fontSize:14,color:"white",fontWeight:"700"},note:{fontSize:10,color:"#718092",textAlign:"center",paddingVertical:15}});
