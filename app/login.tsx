import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen(){
 const [country,setCountry]=useState("Netherlands");
 const [dial,setDial]=useState("+31");
 const [phone,setPhone]=useState("");
 const [sync,setSync]=useState(false);
 const valid=phone.replace(/\\D/g,"").length>=6;
 return <View style={s.page}>
  <Pressable accessibilityRole="button" onPress={()=>router.back()}><Text style={s.back}>‹</Text></Pressable>
  <View style={s.center}>
   <View style={s.logo}><Text style={s.logoText}>N</Text></View>
   <Text style={s.title}>Your phone number</Text>
   <Text style={s.subtitle}>Choose your country and enter your phone number to sign in to NexGram.</Text>
   <Pressable style={s.country} onPress={()=>{setCountry(country==="Netherlands"?"United States":"Netherlands");setDial(country==="Netherlands"?"+1":"+31")}}><View><Text style={s.countryName}>{country}</Text><Text style={s.countryHint}>Tap to switch Netherlands / United States</Text></View><Text style={s.code}>{dial}  ›</Text></Pressable>
   <View style={s.phone}><Text style={s.phoneLabel}>Phone number</Text><Text style={s.dial}>{dial}</Text><TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Your phone number" placeholderTextColor="#8291A0" style={s.input}/></View>
   <Pressable style={s.sync} onPress={()=>setSync(!sync)}><View style={[s.checkbox,sync&&s.checked]}>{sync&&<Text style={{color:"white"}}>✓</Text>}</View><Text style={s.syncText}>Sync contacts (optional)</Text></Pressable>
   <Pressable accessibilityRole="button" disabled={!valid} onPress={()=>router.push({pathname:"/login/code",params:{phone:dial+" "+phone}})} style={[s.next,!valid&&s.disabled]}><Text style={s.nextText}>Continue  →</Text></Pressable>
   <Text style={s.note}>Phone verification is not connected yet. This preview will not send an SMS or accept a pretend verification code.</Text>
  </View>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:58,paddingHorizontal:24},back:{fontSize:36,color:"#F4F7FB"},center:{flex:1,alignItems:"center",justifyContent:"center",paddingBottom:40},logo:{width:70,height:70,borderRadius:22,backgroundColor:"#229ED9",alignItems:"center",justifyContent:"center",marginBottom:25},logoText:{fontSize:40,color:"white",fontWeight:"900"},title:{fontSize:24,color:"#F4F7FB",fontWeight:"700"},subtitle:{fontSize:14,color:"#8796A5",textAlign:"center",lineHeight:21,marginTop:12,marginBottom:34,maxWidth:330},country:{width:"100%",backgroundColor:"#202D3A",borderRadius:14,padding:16,flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:14},countryName:{color:"#F4F7FB",fontSize:15},countryHint:{color:"#8291A0",fontSize:10,marginTop:4},code:{color:"#71C5F2",fontSize:15},phone:{width:"100%",borderWidth:1.5,borderColor:"#229ED9",borderRadius:14,padding:13,flexDirection:"row",alignItems:"center",gap:10},phoneLabel:{position:"absolute",top:-10,left:12,backgroundColor:"#17212B",paddingHorizontal:5,color:"#71C5F2",fontSize:11},dial:{color:"#F4F7FB",fontSize:16},input:{flex:1,color:"#F4F7FB",fontSize:16,padding:4},sync:{width:"100%",flexDirection:"row",alignItems:"center",gap:12,marginTop:24},checkbox:{width:20,height:20,borderRadius:5,borderWidth:1.5,borderColor:"#718397",alignItems:"center",justifyContent:"center"},checked:{backgroundColor:"#229ED9",borderColor:"#229ED9"},syncText:{color:"#DCE4EC",fontSize:14},next:{alignSelf:"flex-end",backgroundColor:"#229ED9",borderRadius:26,paddingVertical:14,paddingHorizontal:24,marginTop:35},disabled:{opacity:.35},nextText:{color:"white",fontSize:15,fontWeight:"700"},note:{color:"#8291A0",fontSize:11,lineHeight:17,textAlign:"center",marginTop:28}});
