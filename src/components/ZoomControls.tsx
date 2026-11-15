import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/theme';

type ZoomControlsProps = {
  canDecrease: boolean;
  canIncrease: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function ZoomControls({
  canDecrease,
  canIncrease,
  onDecrease,
  onIncrease,
}: ZoomControlsProps) {
  return (
    <View style={styles.row}>
      <ZoomButton label="+" accessibilityLabel="Aumentar zoom" enabled={canIncrease} onPress={onIncrease} />
      <ZoomButton label="−" accessibilityLabel="Reducir zoom" enabled={canDecrease} onPress={onDecrease} />
    </View>
  );
}

type ZoomButtonProps = {
  label: string;
  accessibilityLabel: string;
  enabled: boolean;
  onPress: () => void;
};

function ZoomButton({ label, accessibilityLabel, enabled, onPress }: ZoomButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !enabled }}
      disabled={!enabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        !enabled && styles.disabled,
        pressed && enabled && styles.pressed,
      ]}
    >
      <Text style={styles.symbol}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    position: 'absolute',
    left: '14.8%',
    right: '14.2%',
    bottom: '10.4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: colors.outline,
    backgroundColor: colors.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: colors.controlDisabled,
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.8,
  },
  symbol: {
    color: colors.text,
    fontSize: 43,
    fontWeight: '300',
    lineHeight: 48,
    includeFontPadding: false,
    textAlign: 'center',
  },
});
