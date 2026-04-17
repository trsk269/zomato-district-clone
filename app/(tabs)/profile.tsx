import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View as DefaultView,
  Animated,
  Dimensions,
} from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { View, Text, useThemeColor } from "@/components/Themed";
import Svg, { Circle } from "react-native-svg";
import {
  ChevronRight,
  ArrowRight,
  Gift,
  UtensilsCrossed,
  ShoppingBag,
  Ticket,
  Clapperboard,
  Music2,
  Crown,
  LogOut,
  User,
} from "lucide-react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PROFILE_STEPS_DONE = 1;
const PROFILE_STEPS_TOTAL = 4;
const PROGRESS = PROFILE_STEPS_DONE / PROFILE_STEPS_TOTAL;

// ─── Circular Progress Avatar ────────────────────────────────────────────────
const CircularProgressAvatar = ({ progress }: { progress: number }) => {
  const SIZE = 72;
  const STROKE = 3;
  const RADIUS = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <DefaultView style={{ width: SIZE, height: SIZE }}>
      <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
        {/* Track */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={STROKE}
          fill="none"
        />
        {/* Progress */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#7C3AED"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={`${CIRCUMFERENCE}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>
      {/* Avatar inner */}
      <DefaultView style={styles.avatarInner}>
        <User color="#7C3AED" size={26} strokeWidth={1.8} />
      </DefaultView>
    </DefaultView>
  );
};

// ─── Profile Completion Card ─────────────────────────────────────────────────
const ProfileCompletionCard = () => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: PROGRESS,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <DefaultView style={styles.profileCard}>
      {/* Top row */}
      <DefaultView style={styles.profileRow}>
        <CircularProgressAvatar progress={PROGRESS} />
        <DefaultView style={styles.profileMeta}>
          <Text style={styles.profileTitle}>Update your name</Text>
          <Text style={styles.profilePhone}>+91 99498 32634</Text>
          <DefaultView style={styles.stepsBadge}>
            <Text style={styles.stepsText}>
              {PROFILE_STEPS_DONE} / {PROFILE_STEPS_TOTAL} steps done
            </Text>
          </DefaultView>
        </DefaultView>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </DefaultView>

      {/* Progress bar */}
      <DefaultView style={styles.progressTrack}>
        <Animated.View
          style={[styles.progressFill, { width: progressWidth }]}
        />
      </DefaultView>

      {/* Prompt row */}
      <DefaultView style={styles.promptRow}>
        <Text style={styles.promptText}>
          Complete your profile, so we can surprise you on your special days!
        </Text>
        <TouchableOpacity style={styles.promptArrow} activeOpacity={0.7}>
          <ArrowRight color="#7C3AED" size={16} strokeWidth={2} />
        </TouchableOpacity>
      </DefaultView>
    </DefaultView>
  );
};

// ─── Pass Banner ─────────────────────────────────────────────────────────────
const PassBanner = () => (
  <TouchableOpacity style={styles.passBanner} activeOpacity={0.8}>
    <DefaultView style={styles.passLogoBox}>
      <Crown color="#A78BFA" size={18} strokeWidth={1.8} />
    </DefaultView>
    <DefaultView style={styles.passTextBox}>
      <Text style={styles.passTitle}>Become a Pass holder</Text>
      <Text style={styles.passSubtitle}>Unlock unlimited perks at ₹999</Text>
    </DefaultView>
    <ChevronRight color="#7C3AED" size={20} strokeWidth={2} />
  </TouchableOpacity>
);

// ─── Booking Chip ─────────────────────────────────────────────────────────────
interface BookingChipProps {
  icon: React.ElementType;
  label: string;
  iconBg: string;
  iconColor: string;
}

const BookingChip = ({
  icon: Icon,
  label,
  iconBg,
  iconColor,
}: BookingChipProps) => (
  <TouchableOpacity style={styles.bookingChip} activeOpacity={0.7}>
    <DefaultView style={[styles.bookingChipIcon, { backgroundColor: iconBg }]}>
      <Icon color={iconColor} size={22} strokeWidth={1.8} />
    </DefaultView>
    <Text style={styles.bookingChipLabel}>{label}</Text>
  </TouchableOpacity>
);

// ─── List Row ─────────────────────────────────────────────────────────────────
interface ListRowProps {
  icon: React.ElementType;
  label: string;
  iconBg: string;
  iconColor: string;
  isLast?: boolean;
  onPress?: () => void;
}

const ListRow = ({
  icon: Icon,
  label,
  iconBg,
  iconColor,
  isLast = false,
  onPress,
}: ListRowProps) => (
  <>
    <TouchableOpacity
      style={styles.listRow}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <DefaultView style={[styles.listIconBox, { backgroundColor: iconBg }]}>
        <Icon color={iconColor} size={19} strokeWidth={1.8} />
      </DefaultView>
      <Text style={styles.listLabel}>{label}</Text>
      <ChevronRight color="#3D3D4E" size={18} strokeWidth={2} />
    </TouchableOpacity>
    {!isLast && <DefaultView style={styles.listSep} />}
  </>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  return (
    <ScreenContainer title="Profile">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Profile completion */}
        <ProfileCompletionCard />

        {/* Pass banner */}
        <PassBanner />

        {/* All Bookings */}
        <Text style={styles.sectionLabel}>All bookings</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bookingRow}
        >
          <BookingChip
            icon={UtensilsCrossed}
            label="Table bookings"
            iconBg="rgba(124,58,237,0.14)"
            iconColor="#A78BFA"
          />
          <BookingChip
            icon={Clapperboard}
            label="Movie tickets"
            iconBg="rgba(59,130,246,0.14)"
            iconColor="#60A5FA"
          />
          <BookingChip
            icon={Music2}
            label="Events"
            iconBg="rgba(16,185,129,0.14)"
            iconColor="#34D399"
          />
          <BookingChip
            icon={Ticket}
            label="All tickets"
            iconBg="rgba(245,158,11,0.14)"
            iconColor="#FBBF24"
          />
        </ScrollView>

        {/* Vouchers */}
        <Text style={styles.sectionLabel}>Vouchers</Text>
        <DefaultView style={styles.groupCard}>
          <ListRow
            icon={Gift}
            label="Collected vouchers"
            iconBg="rgba(245,158,11,0.14)"
            iconColor="#FBBF24"
            isLast
          />
        </DefaultView>

        {/* Payments */}
        <Text style={styles.sectionLabel}>Payments</Text>
        <DefaultView style={styles.groupCard}>
          <ListRow
            icon={UtensilsCrossed}
            label="Dining transactions"
            iconBg="rgba(16,185,129,0.14)"
            iconColor="#34D399"
          />
          <ListRow
            icon={ShoppingBag}
            label="Store transactions"
            iconBg="rgba(59,130,246,0.14)"
            iconColor="#60A5FA"
            isLast
          />
        </DefaultView>

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <LogOut color="#F43F5E" size={19} strokeWidth={2} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <DefaultView style={{ height: 100 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },

  // Profile card
  profileCard: {
    backgroundColor: "#13121A",
    borderRadius: 22,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    padding: 18,
    marginBottom: 12,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  avatarInner: {
    position: "absolute",
    top: 6,
    left: 6,
    right: 6,
    bottom: 6,
    borderRadius: 100,
    backgroundColor: "#1E1B2E",
    alignItems: "center",
    justifyContent: "center",
  },
  profileMeta: {
    flex: 1,
    gap: 3,
  },
  profileTitle: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#F0EFF8",
  },
  profilePhone: {
    fontSize: 13,
    fontFamily: "SpaceGrotesk_400Regular",
    color: "#6B6A7A",
  },
  stepsBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(124,58,237,0.14)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 4,
  },
  stepsText: {
    fontSize: 12,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#A78BFA",
  },
  editBtn: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(124,58,237,0.4)",
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: "rgba(124,58,237,0.08)",
  },
  editBtnText: {
    fontSize: 13,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#A78BFA",
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginBottom: 14,
    overflow: "hidden",
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
    backgroundColor: "#7C3AED",
  },
  promptRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 14,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.06)",
  },
  promptText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "SpaceGrotesk_400Regular",
    color: "#7A7989",
    lineHeight: 19,
  },
  promptArrow: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(124,58,237,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Pass banner
  passBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#1A1628",
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "rgba(124,58,237,0.25)",
    padding: 16,
    marginBottom: 28,
  },
  passLogoBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "rgba(124,58,237,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  passTextBox: {
    flex: 1,
    gap: 2,
  },
  passTitle: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#E0DAFB",
  },
  passSubtitle: {
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
    color: "#6B5FA8",
  },

  // Section label
  sectionLabel: {
    fontSize: 13,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#4B4A5E",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
    marginLeft: 2,
  },

  // Booking chips
  bookingRow: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 2,
    marginBottom: 28,
  },
  bookingChip: {
    backgroundColor: "#13121A",
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: "center",
    gap: 10,
    minWidth: 100,
  },
  bookingChipIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  bookingChipLabel: {
    fontSize: 12,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#AEADC0",
    textAlign: "center",
  },

  // Group card
  groupCard: {
    backgroundColor: "#13121A",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    overflow: "hidden",
    marginBottom: 24,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  listIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  listLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: "SpaceGrotesk_500Medium",
    color: "#D4D3E0",
  },
  listSep: {
    height: 0.5,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginHorizontal: 16,
  },

  // Logout
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(244,63,94,0.2)",
    backgroundColor: "rgba(244,63,94,0.05)",
    marginTop: 6,
  },
  logoutText: {
    fontSize: 15,
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#F43F5E",
  },
});
