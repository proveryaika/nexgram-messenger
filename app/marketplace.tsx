import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type Gift={id:number;name:string;rarity:string;price:number;serial:string};
const supply=5000;
const catalog:Gift[]=[
 {id:1,name:"Plush Pepe",rarity:"Common",price:2000,serial:"001–2500"},
 {id:2,name:"Plush Pepe",rarity:"Rare",price:4200,serial:"2501–4000"},
 {id:3,name:"Plush Pepe",rarity:"Epic",price:9000,serial:"4001–4750"},
 {id:4,name:"Plush Pepe",rarity:"Legendary",price:25000,serial:"4751–5000"}
];
export default function Marketplace(){
 const [tab,setTab]=useState("Gifts");
 const [owned,setOwned]=useState(0);
 const [balance,setBalance]=useState(10000);
 const [upgrades,setUpgrades]=useState(0);
 const [username,setUsername]=useState("");
 const [asking,setAsking]=useState("2000");
 const [listed,setListed]=useState(false);
 const [query,setQuery]=useState("");
 const remaining=supply-owned;
 const rarityColor=(r:string)=>r==="Legendary"?"#E9B65E":r==="Epic"?"#C59AF5":r==="Rare"?"#71C5F2":"#AAB7C4";
 const filtered=useMemo(()=>catalog.filter(x=>x.rarity.toLowerCase().includes(query.toLowerCase())||x.name.toLowerCase().includes(query.toLowerCase())),[query]);
 const buy=(price:number)=>{if(balance>=price&&remaining>0){setBalance(v=>v-price);setOwned(v=>v+1)}};
 return <View style={s.page}>
  <View style={s.header}><Pressable onPress={()=>router.back()}><Text style={s.back}>‹</Text></Pressable><View style={{flex:1}}><Text style={s.title}>Collectibles</Text><Text style={s.sub}>NexGram demo marketplace</Text></View><Text style={s.balance}>◇ {balance.toLocaleString("en-US")}</Text></View>
  <View style={s.tabs}>{["Gifts","Fragment","My items"].map(t=><Pressable key={t} onPress={()=>setTab(t)} style={[s.tab,tab===t&&s.active]}><Text style={[s.tabText,tab===t&&s.activeText]}>{t}</Text></Pressable>)}</View>
  {tab==="Gifts"&&<ScrollView contentContainerStyle={s.body}>
    <View style={s.hero}><Text style={s.emoji}>🧸</Text><Text style={s.heroTitle}>Plush Pepe</Text><Text style={s.copy}>Limited collection · {supply.toLocaleString("en-US")} editions total</Text><View style={s.progress}><View style={[s.progressFill,{width:(owned/supply*100)+"%"}]}/></View><Text style={s.hint}>{remaining.toLocaleString("en-US")} demo editions remaining · {owned} in your preview collection</Text></View>
    {filtered.map(item=><View key={item.id} style={s.card}><View style={s.giftIcon}><Text style={s.giftEmoji}>🐸</Text></View><View style={{flex:1}}><Text style={s.cardTitle}>{item.name}</Text><Text style={{color:rarityColor(item.rarity),fontSize:12,fontWeight:"800"}}>{item.rarity}</Text><Text style={s.hint}>Edition range {item.serial}</Text></View><View style={s.priceBox}><Text style={s.price}>◇ {item.price.toLocaleString("en-US")}</Text><Pressable style={s.smallButton} onPress={()=>buy(item.price)}><Text style={s.smallButtonText}>Buy demo</Text></Pressable></View></View>)}
    <Text style={s.note}>All prices and purchases are simulated with demo credits. No real payment, crypto, NFT minting or ownership transfer occurs.</Text>
    <View style={s.card}><View style={{flex:1}}><Text style={s.cardTitle}>Upgrade a Plush Pepe</Text><Text style={s.hint}>Demo upgrade counter: {upgrades}. A real upgrade system needs published rules and verifiable scarcity.</Text></View><Pressable style={s.smallButton} onPress={()=>{if(owned>=2){setOwned(v=>v-1);setUpgrades(v=>v+1)}}}><Text style={s.smallButtonText}>Use 2 items</Text></Pressable></View>
  </ScrollView>}
  {tab==="Fragment"&&<ScrollView contentContainerStyle={s.body}>
    <View style={s.hero}><Text style={s.heroTitle}>Fragment</Text><Text style={s.copy}>Tradeable usernames and collectible listings — demo interface.</Text></View>
    <Text style={s.label}>Username to list</Text><TextInput value={username} onChangeText={v=>{setUsername(v);setListed(false)}} autoCapitalize="none" placeholder="@yourname" placeholderTextColor="#8291A0" style={s.input}/>
    <Text style={s.label}>Asking price · demo credits</Text><TextInput value={asking} onChangeText={setAsking} keyboardType="number-pad" placeholder="2000" placeholderTextColor="#8291A0" style={s.input}/>
    <Pressable style={[s.button,(!username.trim()||!/^\d+$/.test(asking)||Number(asking)<=0)&&s.disabled]} disabled={!username.trim()||!/^\d+$/.test(asking)||Number(asking)<=0} onPress={()=>setListed(true)}><Text style={s.buttonText}>Create demo listing</Text></Pressable>
    {listed&&<View style={s.result}><Text style={s.resultTitle}>Demo listing created</Text><Text style={s.copy}>{username.startsWith("@")?username:"@"+username} · ◇ {Number(asking).toLocaleString("en-US")}</Text><Text style={s.hint}>Preview only. Username ownership is not checked or transferred.</Text></View>}
    <Text style={s.label}>Demo listings from other users</Text>
    <View style={s.card}><View style={{flex:1}}><Text style={s.cardTitle}>@pixelfox</Text><Text style={s.hint}>Unique username · sample seller</Text></View><View style={s.priceBox}><Text style={s.price}>◇ 3,500</Text><Pressable style={s.smallButton} onPress={()=>{if(balance>=3500)setBalance(v=>v-3500)}}><Text style={s.smallButtonText}>Buy demo</Text></Pressable></View></View>
    <View style={s.card}><View style={{flex:1}}><Text style={s.cardTitle}>Plush Pepe #0142</Text><Text style={s.hint}>Rare collectible · sample seller</Text></View><View style={s.priceBox}><Text style={s.price}>◇ 4,200</Text><Pressable style={s.smallButton} onPress={()=>{if(balance>=4200)setBalance(v=>v-4200)}}><Text style={s.smallButtonText}>Buy demo</Text></Pressable></View></View>
    <Text style={s.note}>Sample listings are fictional and purchases only reduce the on-screen demo balance. No seller receives funds and no ownership is transferred.</Text>
  </ScrollView>}
  {tab==="My items"&&<ScrollView contentContainerStyle={s.body}><View style={s.hero}><Text style={s.heroTitle}>Your collection</Text><Text style={s.copy}>{owned} Plush Pepe demo item(s) · {upgrades} upgrades</Text></View><Text style={s.note}>Demo inventory is stored only in this screen and resets when it reloads.</Text></ScrollView>}
 </View>;
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:"#17212B",paddingTop:48},header:{height:62,flexDirection:"row",alignItems:"center",paddingHorizontal:18,gap:14},back:{fontSize:34,color:"#F4F7FB"},title:{fontSize:22,fontWeight:"800",color:"#F4F7FB"},sub:{fontSize:11,color:"#8A9AAA",marginTop:2},balance:{color:"#E9C77B",fontWeight:"800",fontSize:13},tabs:{flexDirection:"row",paddingHorizontal:16,gap:8,paddingVertical:12},tab:{paddingVertical:9,paddingHorizontal:15,borderRadius:18},active:{backgroundColor:"#34495C"},tabText:{color:"#9AA8B7",fontWeight:"600"},activeText:{color:"#71C5F2"},body:{padding:18,paddingBottom:40},hero:{backgroundColor:"#202D3A",borderRadius:18,padding:20,alignItems:"center",marginBottom:18},emoji:{fontSize:54},heroTitle:{fontSize:22,color:"#F4F7FB",fontWeight:"800",marginTop:6},copy:{fontSize:13,color:"#AAB7C4",lineHeight:20,textAlign:"center",marginTop:6},progress:{height:8,width:"100%",backgroundColor:"#34495C",borderRadius:8,marginTop:18,overflow:"hidden"},progressFill:{height:8,backgroundColor:"#229ED9"},hint:{fontSize:11,color:"#8291A0",lineHeight:17,marginTop:6},card:{backgroundColor:"#202D3A",borderRadius:15,padding:14,marginBottom:11,flexDirection:"row",alignItems:"center",gap:12},giftIcon:{width:54,height:54,borderRadius:14,backgroundColor:"#34495C",alignItems:"center",justifyContent:"center"},giftEmoji:{fontSize:30},cardTitle:{color:"#F4F7FB",fontSize:15,fontWeight:"800"},priceBox:{alignItems:"flex-end",gap:7},price:{color:"#E9C77B",fontWeight:"800",fontSize:13},smallButton:{backgroundColor:"#229ED9",paddingHorizontal:12,paddingVertical:8,borderRadius:10},smallButtonText:{color:"#FFFFFF",fontWeight:"800",fontSize:11},note:{fontSize:11,color:"#8291A0",lineHeight:18,textAlign:"center",marginVertical:14},label:{color:"#71C5F2",fontSize:12,fontWeight:"700",marginTop:12,marginBottom:8},input:{backgroundColor:"#202D3A",color:"#F4F7FB",borderRadius:12,padding:15,fontSize:14},button:{backgroundColor:"#229ED9",borderRadius:14,padding:15,alignItems:"center",marginTop:20},disabled:{opacity:0.45},buttonText:{color:"#FFFFFF",fontWeight:"800"},result:{backgroundColor:"#203A32",borderRadius:14,padding:16,marginTop:18},resultTitle:{color:"#8BD6AC",fontWeight:"800",fontSize:16}});
