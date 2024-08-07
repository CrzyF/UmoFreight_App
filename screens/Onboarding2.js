import * as React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";

const Onboarding2 = ({navigation}) => {
  return (
    <View style={styles.onboarding6}>
      <Text style={styles.trackPackages}>Track Packages</Text>
      <Text style={styles.ourTrackingTool}>
        our tracking tool was created to make it easier than ever before to
        track all of your international packages.
      </Text>
      <Image
        style={styles.onboarding6Child}
        contentFit="cover"
        source={require("../assets/group-2.png")}
      />
      <TouchableOpacity onPress={() => navigation.push('Onboarding3')}style={[styles.next, styles.nextLayout]}>
        <Text style={[styles.next1, styles.next1Typo]}>Next</Text>
        <View style={[styles.nextChild, styles.childLayout]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.push('Login')} style={[styles.skip, styles.nextLayout]}>
        <View style={[styles.skipChild, styles.childLayout]} />
        <Text style={[styles.skip1, styles.next1Typo]}>Skip</Text>
      </TouchableOpacity>
      <Image
        style={styles.wavyBuddiesTrackingPackag}
        contentFit="cover"
        source={require("../assets/wavy-buddies--tracking-package-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nextLayout: {
    height: 30,
    width: 114,
  },
  next1Typo: {
    fontFamily: FontFamily.interRegular,
    textAlign: "center",
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  childLayout: {
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  trackPackages: {
    top: 442,
    left: 76,
    fontSize: 25,
    textTransform: "uppercase",
    fontWeight: "600",
    fontFamily: FontFamily.workSansSemiBold,
    color: Color.colorBlack,
    textAlign: "left",
    position: "absolute",
  },
  ourTrackingTool: {
    top: 490,
    left: 53,
    fontFamily: FontFamily.poppinsRegular,
    color: "#a8a8a8",
    width: 269,
    height: 51,
    textAlign: "center",
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  onboarding6Child: {
    top: 632,
    left: 169,
    width: 36,
    height: 8,
    position: "absolute",
  },
  next1: {
    top: 8,
    left: 44,
    color: Color.colorDarkorange,
  },
  nextChild: {
    top: 0,
    left: 0,
    borderStyle: "solid",
    borderColor: Color.colorDarkorange,
    borderWidth: 1,
    height: 30,
    width: 114,
  },
  next: {
    left: 239,
    top: 719,
    width: 114,
    position: "absolute",
  },
  skipChild: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.colorDarkorange_100,
    width: "100%",
  },
  skip1: {
    top: "26.67%",
    left: "39.47%",
    color: Color.colorWhite,
  },
  skip: {
    left: 23,
    top: 719,
    width: 114,
    position: "absolute",
  },
  wavyBuddiesTrackingPackag: {
    top: 166,
    left: 66,
    width: 242,
    height: 253,
    position: "absolute",
  },
  onboarding6: {
    backgroundColor: Color.colorGray,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default Onboarding2;