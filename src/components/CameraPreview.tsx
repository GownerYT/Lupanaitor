import { CameraView } from 'expo-camera';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CameraStatus } from '../types/camera';
import { colors } from '../styles/theme';

type CameraPreviewProps = {
  status: CameraStatus;
  zoom: number;
  onCameraReady: () => void;
  onCameraError: () => void;
  onRecover: () => void;
};

export function CameraPreview({ status, zoom, onCameraReady, onCameraError, onRecover }: CameraPreviewProps) {
  return (
    <View style={styles.opening}>
      {status !== 'permission-denied' && status !== 'error' ? (
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          zoom={zoom}
          onCameraReady={onCameraReady}
          onMountError={onCameraError}
        />
      ) : (
        <View style={styles.messageSurface}>
          <Text style={styles.message}>
            {status === 'permission-denied'
              ? 'Permite el acceso a la cámara para usar la lupa.'
              : 'No se pudo iniciar la cámara.'}
          </Text>
          <Pressable accessibilityRole="button" onPress={onRecover} style={styles.recoverButton}>
            <Text style={styles.recoverLabel}>
              {status === 'permission-denied' ? 'Abrir ajustes' : 'Reintentar'}
            </Text>
          </Pressable>
        </View>
      )}
      {status === 'loading' && <View pointerEvents="none" style={styles.loadingSurface} />}
    </View>
  );
}

const styles = StyleSheet.create({
  opening: {
    ...StyleSheet.absoluteFill,
    borderRadius: 9999,
    overflow: 'hidden',
    backgroundColor: colors.lensFallback,
  },
  messageSurface: {
    flex: 1,
    paddingHorizontal: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lensFallback,
  },
  message: {
    maxWidth: 230,
    color: colors.mutedText,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
  },
  recoverButton: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: colors.control,
  },
  recoverLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  loadingSurface: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.lensFallback,
  },
});
