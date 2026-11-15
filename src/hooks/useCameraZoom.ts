import { useCallback, useState } from 'react';
import {
  CAMERA_ZOOM_STEP,
  MAX_CAMERA_ZOOM,
  MIN_CAMERA_ZOOM,
} from '../constants/camera';

export function useCameraZoom() {
  const [zoom, setZoom] = useState(MIN_CAMERA_ZOOM);

  const decreaseZoom = useCallback(() => {
    setZoom((current) =>
      Math.max(MIN_CAMERA_ZOOM, Number((current - CAMERA_ZOOM_STEP).toFixed(2))),
    );
  }, []);

  const increaseZoom = useCallback(() => {
    setZoom((current) =>
      Math.min(MAX_CAMERA_ZOOM, Number((current + CAMERA_ZOOM_STEP).toFixed(2))),
    );
  }, []);

  return {
    zoom,
    decreaseZoom,
    increaseZoom,
    canDecrease: zoom > MIN_CAMERA_ZOOM,
    canIncrease: zoom < MAX_CAMERA_ZOOM,
  };
}
