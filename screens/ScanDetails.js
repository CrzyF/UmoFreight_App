import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { FontSize, Color, FontFamily } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScanDetails = ({ navigation, route }) => {
    const [scannedItems, setScannedItems] = useState([]);

    useEffect(() => {
        const loadScannedItems = async () => {
            try {
                const storedScannedItems = await AsyncStorage.getItem('scannedItems');
                if (storedScannedItems) {
                    setScannedItems(JSON.parse(storedScannedItems));
                }
            } catch (error) {
                console.error('Failed to load scanned items from storage:', error);
            }
        };

        loadScannedItems();
    }, []);

    useEffect(() => {
        if (route.params) {
            const { capturedImage, date, time, location, scannedData } = route.params;
            const newScan = { capturedImage, date, time, location, scannedData };
            const updatedScannedItems = [...scannedItems, newScan];
            setScannedItems(updatedScannedItems);

            const saveScannedItems = async () => {
                try {
                    await AsyncStorage.setItem('scannedItems', JSON.stringify(updatedScannedItems));
                } catch (error) {
                    console.error('Failed to save scanned items to storage:', error);
                }
            };

            saveScannedItems();
        }
    }, [route.params]);

    const handleNext = () => {
        navigation.push('Scanner', { scannedItems });
    };

    const handleFinish = () => {
        navigation.push('ShipmentPreview', { scannedItems });
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Image
                style={styles.itemImage}
                source={{ uri: item.capturedImage }}
            />
            <Text style={styles.itemText}>{index + 1} of {scannedItems.length}</Text>
        </View>
    );

    const lastScannedItem = scannedItems.length > 0 ? scannedItems[scannedItems.length - 1] : null;

    return (
        <View style={styles.container}>
            <Image
                style={styles.image1Icon}
                contentFit="cover"
                source={require("../assets/image-1.png")}
            />

            {lastScannedItem && (
                <>
                    <Text style={[styles.march82023, styles.march82023Typo]}>
                        {lastScannedItem.date} {lastScannedItem.time}
                    </Text>
                    <Text style={styles.onyankeleStreet}>{lastScannedItem.location}</Text>
                </>
            )}

            <Text style={styles.of28}>14 of 28</Text>
            <Text style={styles.totalScanned11}>Total Scanned: {scannedItems.length}</Text>

            <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNext}>
                <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.finishButton]} onPress={handleFinish}>
                <Text style={styles.buttonText}>FINISH</Text>
            </TouchableOpacity>

            <FlatList
                data={scannedItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    march82023Typo: {
        textAlign: "left",
        fontSize: FontSize.size_mid_4,
        color: Color.colorDarkslategray_100,
        left: "50%",
    },
    march82023: {
        marginLeft: "-30%",
        top: 121,
        width: 303,
        height: 25,
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        textAlign: "center",
        fontSize: FontSize.size_mid_4,
        position: "absolute",
    },
    onyankeleStreet: {
        marginLeft: -82.5,
        top: 143,
        height: 55,
        width: 165,
        textAlign: "center",
        color: Color.colorDarkslategray_100,
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        fontSize: FontSize.size_mid_4,
        left: "50%",
        position: "absolute",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 150,
        borderRadius: 10,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 30,
    },
    nextButton: {
        left: 20,
        backgroundColor: "#F79520",
    },
    finishButton: {
        right: 20,
        backgroundColor: Color.colorLimegreen,
    },
    buttonText: {
        color: Color.colorWhite,
        fontSize: FontSize.size_mid_4,
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
    },
    image1Icon: {
        width: 233,
        height: 26,
        borderRadius: 8,
        alignSelf: 'center',
        marginVertical: 70,
    },
    of28: {
        fontFamily: FontFamily.interMedium,
        fontWeight: "500",
        fontSize: FontSize.size_mid_4,
        color: Color.colorLimegreen,
        textAlign: "center",
        marginTop: 50,
    },
    totalScanned11: {
        color: Color.colorDarkslategray_100,
        width: '100%',
        textAlign: 'center',
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        fontSize: FontSize.size_mid_4,
        marginVertical: 60,
        marginTop: 150,
    },
    listContainer: {
        paddingVertical: 10,
    },
    itemContainer: {
        alignItems: 'center',
        marginRight: 10,
    },
    itemImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    itemText: {
        marginTop: 5,
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        color: Color.colorDarkgray_100,
        fontSize: FontSize.size_4xs,
    },
});

export default ScanDetails;
