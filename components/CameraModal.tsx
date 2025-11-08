import { CameraView } from 'expo-camera';
import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { styles } from '../constants/styles';

interface CameraModalProps {
    visible: boolean;
    capturedPhoto: string | null;
    verifying: boolean;
    onClose: () => void;
    onCapture: (uri: string) => void;
    onRetake: () => void;
    onVerify: () => void;
}

export default function CameraModal({
    visible,
    capturedPhoto,
    verifying,
    onClose,
    onCapture,
    onRetake,
    onVerify,
}: CameraModalProps) {
    const cameraRef = useRef<any>(null);
    const [isCapturing, setIsCapturing] = useState(false);

    const takePicture = async () => {
        if (!cameraRef.current || isCapturing) return;

        try {
            setIsCapturing(true);
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                skipProcessing: false,
            });
            onCapture(photo.uri);
        } catch (error: any) {
            console.error('Failed to take picture:', error);
            Alert.alert('Error', 'Failed to take picture. Please try again.');
        } finally {
            setIsCapturing(false);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" statusBarTranslucent>
            <View style={styles.cameraContainer}>
                {!capturedPhoto ? (
                    <>
                        <CameraView style={styles.camera} ref={cameraRef} facing="back">
                            <View style={styles.cameraOverlay}>
                                <View style={styles.cameraHeader}>
                                    <TouchableOpacity
                                        style={styles.cameraClose}
                                        onPress={onClose}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.cameraCloseText}>✕</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.cameraFooter}>
                                    <Text style={styles.cameraHint}>Capture your eco-action</Text>
                                </View>
                            </View>
                        </CameraView>

                        <View style={styles.captureButtonContainer}>
                            <TouchableOpacity style={styles.captureButton} onPress={takePicture} activeOpacity={0.8}>
                                <View style={styles.captureButtonInner} />
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View style={styles.previewContainer}>
                        <Image source={{ uri: capturedPhoto }} style={styles.previewImage} resizeMode="cover" />
                        <View style={styles.previewOverlay}>
                            <TouchableOpacity
                                style={styles.retakeButton}
                                onPress={onRetake}
                                activeOpacity={0.8}
                                disabled={verifying}
                            >
                                <Text style={styles.retakeButtonText}>Retake</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.verifyButton, verifying && { opacity: 0.6 }]}
                                onPress={onVerify}
                                activeOpacity={0.8}
                                disabled={verifying}
                            >
                                {verifying ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.verifyButtonText}>✓ Verify with AI</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    );
}