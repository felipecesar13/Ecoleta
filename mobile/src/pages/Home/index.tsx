import React, { useRef, useState } from "react";
import { Feather as Icon} from "@expo/vector-icons";
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");
  const navigation = useNavigation();
  const [background, setBackground] = useState(true);
  const ufInputRef = useRef(null);
  const cityInputRef = useRef(null);

  const backgroundTransformAnim = useRef(new Animated.Value(0)).current;
  const backgroundOpacityAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(backgroundTransformAnim, { toValue: 0, duration: 1000 }).start();
    Animated.timing(backgroundOpacityAnim, { toValue: 1, duration: 2000 }).start();
  };

  const fadeOut = () => {
    Animated.timing(backgroundOpacityAnim, { toValue: 0, duration: 500 }).start();
    Animated.timing(backgroundTransformAnim, { toValue: -300, duration: 1000 }).start();
  };

  function handleNavigateToPoints(){
    navigation.navigate("Points", {
      uf,
      city
    });
  };

  function changeBackground() {
    if((ufInputRef as any).current.isFocused() == true || (cityInputRef as any).current.isFocused() == true) {
      setBackground(false);
      fadeOut();
    } else {
      setBackground(true)
      fadeIn();
    }
  }

  return(
    <View style={{ flex: 1 }}>
      <ImageBackground 
        source={require("../../assets/home-background.png")} 
        style={styles.container}
        imageStyle={{width: 274, height: 368}}
      >
          <Animated.View 
            style={{ 
              flex: 1,
              justifyContent: 'center',
              transform: [{translateY: backgroundTransformAnim}],
              opacity: backgroundOpacityAnim
            }}>
            <Image source={require("../../assets/logo.png")}/>
            <View>
              <Text style={styles.title}>Seu markteplace de coleta de resíduos.</Text>
              <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
            </View>
          </Animated.View>

          <View style={styles.footer}>
            <TextInput
              ref={ufInputRef}
              style={background ? styles.input : styles.input1} 
              placeholder="Digite a UF"
              maxLength={2}
              autoCapitalize="characters"
              autoCorrect={false}
              value={uf}
              onChangeText={setUf}
              onFocus={changeBackground}
              onEndEditing={changeBackground}
            >

            </TextInput>
        
            <TextInput 
              ref={cityInputRef}
              style={styles.input} 
              placeholder="Digite a cidade"
              autoCorrect={false}
              value={city}
              onChangeText={setCity}
              onFocus={changeBackground}
              onEndEditing={changeBackground}
            >

            </TextInput>
            <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                <View style={styles.buttonIcon}>
                    <Text>
                        <Icon name="arrow-right" color="#fff" size={24} />
                    </Text>
                </View>
                <Text style={styles.buttonText}>Entrar</Text>
            </RectButton>
          </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {}, 

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  input1: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;