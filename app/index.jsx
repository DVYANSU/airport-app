import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Index() {

  const router = useRouter();
  
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/login"); 
    }, 2500);

    return () => clearTimeout(t);
  }, []);

  
  return (
    <View
      style={{ 
        flex:1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     <Image source={require("../assets/images/Airport.png")}

     style={{
      flex:1,
      width: "100%",
      height: "100%"
     }}
     resizeMode="cover"/>
     
    </View>
  );
}
