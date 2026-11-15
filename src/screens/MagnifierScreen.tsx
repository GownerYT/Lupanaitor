import { useEffect, useRef, useState } from 'react';
import { useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking, StyleSheet, View, useWindowDimensions } from 'react-native';
import { CameraPreview } from '../components/CameraPreview';
import { ZoomControls } from '../components/ZoomControls';
import { useCameraZoom } from '../hooks/useCameraZoom';
import { colors } from '../styles/theme';
import type { CameraStatus } from '../types/camera';

export function MagnifierScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraFailed, setCameraFailed] = useState(false);
  const permissionRequestStarted = useRef(false);
  const { zoom, increaseZoom, decreaseZoom, canDecrease, canIncrease } = useCameraZoom();
  const { width, height } = useWindowDimensions();
  const lensSize = width;
  const lensTop = height * 0.202;
  const rimWidth = width * 0.096;
  const innerLensSize = lensSize - rimWidth * 2;
  const handleWidth = width * 0.17;
  const handleHeight = height * 0.29;

  useEffect(() => {
    if (permission?.status !== 'undetermined' || permissionRequestStarted.current) return;
    permissionRequestStarted.current = true;
    void requestPermission();
  }, [permission?.granted, permission?.status, requestPermission]);

  const status: CameraStatus = !permission
    ? 'loading'
    : !permission.granted
      ? 'permission-denied'
      : cameraFailed
        ? 'error'
        : cameraReady
          ? 'ready'
          : 'loading';

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={colors.handleGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        pointerEvents="none"
        style={[
          styles.handle,
          {
            width: handleWidth,
            height: handleHeight,
            top: lensTop + lensSize - 1.5,
            borderBottomLeftRadius: handleWidth * 0.46,
            borderBottomRightRadius: handleWidth * 0.46,
          },
        ]}
      />

      <View
        style={[
          styles.lens,
          {
            width: lensSize,
            height: lensSize,
            top: lensTop,
            borderRadius: lensSize / 2,
            borderWidth: 1.5,
            padding: rimWidth,
          },
        ]}
      >
        <View style={{ width: innerLensSize, height: innerLensSize }}>
          <CameraPreview
            status={status}
            zoom={zoom}
            onCameraReady={() => setCameraReady(true)}
            onCameraError={() => setCameraFailed(true)}
            onRecover={() => {
              if (status === 'permission-denied') {
                if (permission?.canAskAgain) {
                  void requestPermission();
                  return;
                }
                void Linking.openSettings();
                return;
              }
              setCameraFailed(false);
              setCameraReady(false);
            }}
          />
        </View>
      </View>

      <ZoomControls
        canDecrease={canDecrease}
        canIncrease={canIncrease}
        onDecrease={decreaseZoom}
        onIncrease={increaseZoom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  handle: {
    position: 'absolute',
    alignSelf: 'center',
  },
  lens: {
    position: 'absolute',
    left: 0,
    backgroundColor: colors.lensRim,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
