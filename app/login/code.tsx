import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, Pressable } from "react-native";
export default function CodeScreen(){
 const {phone}=useLocalSearchParams<{phone:string}>();
 return <View style={s.page}>
  <Pressable accessibilityRole="button" onPress={()=>router.back()}><Text style={s.back}>‹</Text></Pressable>
  <View style={s.center}><View style={s.logo}><Text style={s.logoText}>✉</Text></View>
   <Text style={s.title}>Verification code</Text>
   <Text style={s.subtitle}>A code would be sent to {phone||"your phone number"}.</Text>
   <View style={s.info}><Text style={s.infoTitle}>SMS delivery is not configured</Text><Text style={s.copy}>NexGram does not have an SMS provider connected yet. No code has been sent, and this screen will not accept a fake code. Phone sign-in will become available after secure server-side verification is implemented.</Text></View>
   <Pressable style={s.button} onPress={()=>router.replace("/login")}><Text style={s.buttonText}>Change phone number</Text></Pressable>
  </View>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:58,paddingHorizontal:24},back:{fontSize:36,color:"#F4F7FB"},center:{flex:1,alignItems:"center",justifyContent:"center",paddingBottom:50},logo:{width:68,height:68,borderRadius:34,backgroundColor:"#263746",alignItems:"center",justifyContent:"center",marginBottom:24},logoText:{fontSize:30,color:"#71C5F2"},title:{fontSize:24,color:"#F4F7FB",fontWeight:"700"},subtitle:{fontSize:14,color:"#8796A5",textAlign:"center",lineHeight:21,marginTop:12,marginBottom:25},info:{width:"100%",backgroundColor:"#202D3A",borderRadius:16,padding:18},infoTitle:{fontSize:16,color:"#F4F7FB",fontWeight:"700",marginBottom:9},copy:{fontSize:13,color:"#9AA8B7",lineHeight:20},button:{marginTop:24,backgroundColor:"#229ED9",paddingHorizontal:22,paddingVertical:13,borderRadius:24},buttonText:{color:"white",fontWeight:"700"}});
