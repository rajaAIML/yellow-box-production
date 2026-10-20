export interface DeviceProfile {
  isMobile: boolean;
  isLowEnd: boolean;
  particleCount: number;
  floatingPhotoCount: number;
  textureQuality: 'low' | 'medium' | 'high';
}

export function getDeviceProfile(): DeviceProfile {
  const isMobile = window.innerWidth < 768;
  const isLowEnd =
    isMobile ||
    (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4);

  return {
    isMobile,
    isLowEnd,
    particleCount: isMobile ? 30 : isLowEnd ? 60 : 120,
    floatingPhotoCount: isMobile ? 3 : isLowEnd ? 4 : 6,
    textureQuality: isMobile ? 'low' : isLowEnd ? 'medium' : 'high',
  };
}
