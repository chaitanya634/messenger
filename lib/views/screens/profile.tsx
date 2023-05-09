import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"
import { Image, StyleSheet, Text, View } from "react-native"
import { ScreenParams, StackParams } from "../../../App"
import CustomButton from "../components/CustomButton"
import { useEffect } from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

const ProfileScreen = () => {
  const route = useRoute<RouteProp<ScreenParams, 'Profile'>>()
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/profile_pic.png')} style={styles.profilePic} />
      <Text style={styles.name}>
        {route.params.showMyProfile ? route.params.myFirstName : route.params.chatFirstName} {route.params.showMyProfile ? route.params.myLastName : route.params.chatLastName}
      </Text>
      <Text style={styles.bio}>
        {route.params.showMyProfile ? route.params.myUserName : route.params.chatUserName}
      </Text>
      {
        route.params.showMyProfile ? null :
        <CustomButton text="Message" onTap={() => {navigation.goBack()}} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  profilePic: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 50,
    marginBottom: 42
  },
})

export default ProfileScreen
