import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function LoginScreen() {
  const [dial, setDial] = useState("+49");
  const [phone, setPhone] = useState("");
  const [sync, setSync] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const normalized = phone.replace(/[^0-9]/g, "");
  const fullPhone = dial.trim() + normalized;
  const valid = /^\+[1-9][0-9]{7,14}$/.test(fullPhone);

  const requestCode = async () => {
    if (!supabase) {
      setError("Sign-in is not configured in this build. The Supabase public project settings are missing.");
      return;
    }
    if (!valid) {
      setError("Enter a valid phone number with country code.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { error: requestError } = await supabase.auth.signInWithOtp({
        phone: fullPhone,
        options: { shouldCreateUser: true }
      });
      if (requestError) throw requestError;
      router.push({ pathname: "/login/code", params: { phone: fullPhone, sync: sync ? "1" : "0" } });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not request a verification code. Check phone authentication and SMS provider settings.");
    } finally {
      setBusy(false);
    }
  };

  return <View style={s.page}>
    <Pressable accessibilityRole="button" onPress={() => router.back()}><Text style={s.back}>‹</Text></Pressable>
    <View style={s.center}>
      <View style={s.logo}><Text style={s.logoText}>N</Text></View>
      <Text style={s.title}>Your phone number</Text>
      <Text style={s.subtitle}>Enter your number to sign in or create a NexGram account. A verification code will be sent by SMS.</Text>
      <View style={s.phone}>
        <Text style={s.phoneLabel}>Country calling code</Text>
        <TextInput value={dial} onChangeText={value => setDial(value.startsWith("+") ? value.replace(/[^+0-9]/g, "") : "+" + value.replace(/[^0-9]/g, ""))} keyboardType="phone-pad" style={s.dialInput} maxLength={5}/>
        <View style={s.separator}/>
        <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Phone number" placeholderTextColor="#8291A0" style={s.input}/>
      </View>
      <Pressable style={s.sync} onPress={() => setSync(!sync)}><View style={[s.checkbox, sync && s.checked]}>{sync && <Text style={{color:"white"}}>✓</Text>}</View><Text style={s.syncText}>Sync contacts (optional)</Text></Pressable>
      {error ? <Text accessibilityRole="alert" style={s.error}>{error}</Text> : null}
      <Pressable accessibilityRole="button" disabled={!valid || busy} onPress={requestCode} style={[s.next, (!valid || busy) && s.disabled]}>{busy ? <ActivityIndicator color="white"/> : <Text style={s.nextText}>Continue  →</Text>}</Pressable>
      <Text style={s.note}>SMS delivery depends on phone authentication and an SMS provider being configured in the NexGram Supabase project. Never share your verification code with anyone.</Text>
    </View>
  </View>;
}

const s = StyleSheet.create({
  page:{flex:1,backgroundColor:"#17212B",paddingTop:58,paddingHorizontal:24},
  back:{fontSize:36,color:"#F4F7FB"},
  center:{flex:1,alignItems:"center",justifyContent:"center",paddingBottom:40},
  logo:{width:70,height:70,borderRadius:22,backgroundColor:"#229ED9",alignItems:"center",justifyContent:"center",marginBottom:25},
  logoText:{fontSize:40,color:"white",fontWeight:"900"},
  title:{fontSize:24,color:"#F4F7FB",fontWeight:"700"},
  subtitle:{fontSize:14,color:"#8796A5",textAlign:"center",lineHeight:21,marginTop:12,marginBottom:34,maxWidth:330},
  phone:{width:"100%",borderWidth:1.5,borderColor:"#229ED9",borderRadius:14,padding:13,flexDirection:"row",alignItems:"center",gap:10},
  phoneLabel:{position:"absolute",top:-10,left:12,backgroundColor:"#17212B",paddingHorizontal:5,color:"#71C5F2",fontSize:11},
  dialInput:{color:"#F4F7FB",fontSize:16,minWidth:48,padding:4},
  separator:{height:26,width:1,backgroundColor:"#435364"},
  input:{flex:1,color:"#F4F7FB",fontSize:16,padding:4,outlineStyle:"none"} as any,
  sync:{width:"100%",flexDirection:"row",alignItems:"center",gap:12,marginTop:24},
  checkbox:{width:20,height:20,borderRadius:5,borderWidth:1.5,borderColor:"#718397",alignItems:"center",justifyContent:"center"},
  checked:{backgroundColor:"#229ED9",borderColor:"#229ED9"},
  syncText:{color:"#DCE4EC",fontSize:14},
  next:{alignSelf:"flex-end",backgroundColor:"#229ED9",borderRadius:26,paddingVertical:14,paddingHorizontal:24,marginTop:28,minWidth:130,alignItems:"center"},
  disabled:{opacity:.35},
  nextText:{color:"white",fontSize:15,fontWeight:"700"},
  error:{color:"#FF9C9C",fontSize:12,lineHeight:18,marginTop:15,textAlign:"center"},
  note:{color:"#8291A0",fontSize:11,lineHeight:17,textAlign:"center",marginTop:24}
});
