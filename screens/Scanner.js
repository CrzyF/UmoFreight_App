import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Scanner = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [sound, setSound] = useState();
  const [title, setTitle] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const storedTitle = await AsyncStorage.getItem('shipmentStatus');
      if (storedTitle) {
        setTitle(storedTitle);
      }
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      setScanned(true);
      await playSound();
    
      // Split the data by new lines or other delimiters
      const lines = data.split('\n').map(line => line.trim());
      
      // Extract relevant fields
      const extractedData = {};
      lines.forEach(line => {
        const [key, value] = line.split(':').map(part => part.trim());
        if (key && value) {
          extractedData[key] = value;
        }
      });
      
      // Check and parse specific fields
      const PackageID = extractedData['PackageID'] || 'N/A';
      const shipid = extractedData['shipid'] || 'N/A';
      const TotalPackages = extractedData['TotalPackages'] || 'N/A';
      const PackageCount = extractedData['PackageCount'] || 'N/A';
    
      // Ensure all required fields are present
      if (PackageID === 'N/A' || shipid === 'N/A' || TotalPackages === 'N/A' || PackageCount === 'N/A') {
        throw new Error("Invalid data format received");
      }
    
      // Format the data for navigation
      const formattedData = `shipmentStatus: ${title}, PackageID: ${PackageID}, shipid: ${shipid}, TotalPackages: ${TotalPackages}, PackageCount: ${PackageCount}`;
    
      // Navigate to the LiveStream page with the filtered data
      navigation.navigate('LiveStream', { scannedData: formattedData, isCameraReady_: true });
    } catch (error) {
      console.error("Error processing scanned data:", error.message);
    }
  };
    
  
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/beep.mp3')
    );
    setSound(sound);

    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setScanned(false);
      }
    });
  };

  useEffect(() => {
    return sound ? () => {
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.title}
        source={require('../assets/image-1.png')}
      />
      <Text style={styles.paragraph}>Scan Shipping Label QR Code</Text>
      <Text style={styles.status}>Shipment Status: {title}</Text>
      {renderCamera()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    width: 233,
    height: 26,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
});

export default Scanner;
