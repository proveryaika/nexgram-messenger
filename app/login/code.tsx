import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function CodeScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const verify = async () => {
    if (!supabase || !phone || token.trim().length < 6) {
      setError(!supabase ? "Sign-in is not configured in this build." : "Enter the verification code from your SMS.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        phone,
        token: token.trim(),
        type: "sms"
      });
      if (verifyError) throw verifyError;
      router.replace("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "The code could not be verified. Request a new code and try again.");
    } finally {
      setBusy(false);
    }
  };

  return <View style={s.page}>
    <Pressable accessibilityRole="button" onPress={() => router.back()}><Text style={s.back}>‹</Text></Pressable>
    <View style={s.center}>
      <View style={s.logo}><Text style={s.logoText}>✉</Text></View>
      <Text style={s.title}>Verification code</Text>
      <Text style={s.subtitle}>Enter the code sent to {phone || "your phone number"}.</Text>
      <TextInput value={token} onChangeText={value => setToken(value.replace(/[^0-9]/g, "").slice(0, 8))} keyboardType="number-pad" textContentType="oneTimeCode" placeholder="SMS code" placeholderTextColor="#8291A0" style={s.input}/>
      {error ? <Text accessibilityRole="alert" style={s.error}>{error}</Text> : null}
      <Pressable accessibilityRole="button" disabled={busy || token.trim().length < 6} style={[s.button,(busy || token.trim().length < 6)&&s.disabled]} onPress={verify}>{busy?<ActivityIndicator color="white"/>:<Text style={s.buttonText}>Verify and continue</Text>}</Pressable>
      <Text style={s.note}>Only enter a code you requested yourself. NexGram support will never ask you to send it to them.</Text>
      <Pressable onPress={() => router.replace("/login")}><Text style={s.change}>Change phone number</Text></Pressable>
    </View>
  </View>;
}

const s=StyleSheet.create({
 page:{flex:1,backgroundColor:"#17212B",paddingTop:58,paddingHorizontal:24},
 back:{fontSize:36,color:"#F4F7FB"},
 center:{flex:1,alignItems:"center",justifyContent:"center",paddingBottom:50},
 logo:{width:68,height:68,borderRadius:34,backgroundColor:"#263746",alignItems:"center",justifyContent:"center",marginBottom:24},
 logoText:{fontSize:30,color:"#71C5F2"},
 title:{fontSize:24,color:"#F4F7FB",fontWeight:"700"},
 subtitle:{fontSize:14,color:"#8796A5",textAlign:"center",lineHeight:21,marginTop:12,marginBottom:25},
 input:{width:"100%",backgroundColor:"#263442",borderRadius:13,padding:16,color:"#F4F7FB",fontSize:22,textAlign:"center",letterSpacing:8},
 button:{marginTop:24,backgroundColor:"#229ED9",paddingHorizontal:22,paddingVertical:14,borderRadius:24,minWidth:190,alignItems:"center"},
 disabled:{opacity:.4},
 buttonText:{color:"white",fontWeight:"700"},
 error:{color:"#FF9C9C",fontSize:12,lineHeight:18,marginTop:15,textAlign:"center"},
 note:{fontSize:11,color:"#8796A5",lineHeight:17,textAlign:"center",marginTop:22},
 change:{color:"#71C5F2",fontSize:13,marginTop:22}
});
