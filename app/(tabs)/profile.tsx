import React from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  View as DefaultView,
} from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { View, Text, useThemeColor } from "@/components/Themed";
import {
  User,
  ChevronRight,
  Crown,
  Lock,
  Smartphone,
  ShieldCheck,
  Settings,
  HelpCircle,
  Info,
  LogOut,
  CreditCard,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SettingsItemProps {
  icon: React.ElementType;
  title: string;
  color: string;
  onPress?: () => void;
}

const SettingsItem = ({
  icon: Icon,
  title,
  color,
  onPress,
}: SettingsItemProps) => {
  const textColor = useThemeColor({}, "text");
  const inactiveColor = useThemeColor({}, "tabIconDefault");

  return (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <DefaultView
        style={[styles.iconWrapper, { backgroundColor: `${color}15` }]}
      >
        <Icon color={color} size={22} />
      </DefaultView>
      <Text style={[styles.settingsTitle, { color: textColor }]}>{title}</Text>
      <ChevronRight color={inactiveColor} size={20} />
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const tintColor = useThemeColor({}, "tint");
  const cardColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");

  return (
    <ScreenContainer title="Profile" hideTitle>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <DefaultView
          style={[
            styles.headerCard,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <DefaultView style={styles.headerInfo}>
            <DefaultView
              style={[styles.avatarWrapper, { borderColor: tintColor }]}
            >
              <Text style={[styles.avatarText, { color: tintColor }]}>EC</Text>
            </DefaultView>
            <DefaultView style={styles.nameWrapper}>
              <Text style={styles.userName}>Ethan Cole</Text>
              <Text style={styles.userEmail}>ethancoleux@gmail.com</Text>
            </DefaultView>
            <TouchableOpacity
              style={[styles.editButton, { borderColor: tintColor }]}
            >
              <Text style={[styles.editButtonText, { color: tintColor }]}>
                Edit
              </Text>
            </TouchableOpacity>
          </DefaultView>
        </DefaultView>

        {/* Premium Banner */}
        <LinearGradient
          colors={["#A855F7", "#6366F1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.premiumBanner}
        >
          <DefaultView style={styles.premiumIconWrapper}>
            <Crown color="#FFF" size={24} />
          </DefaultView>
          <DefaultView style={styles.premiumTextWrapper}>
            <Text style={styles.premiumTitle}>Premium Account</Text>
            <Text style={styles.premiumSubtitle}>
              Enjoy your premium features
            </Text>
          </DefaultView>
          <DefaultView style={styles.sparkles}>
            <Text style={styles.sparkle}>✨</Text>
          </DefaultView>
        </LinearGradient>

        {/* Account Settings */}
        <Text style={styles.sectionLabel}>Account Settings</Text>
        <DefaultView
          style={[
            styles.groupCard,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <SettingsItem
            icon={User}
            title="Account Information"
            color={tintColor}
          />
          <DefaultView
            style={[styles.separator, { backgroundColor: borderColor }]}
          />
          <SettingsItem icon={Lock} title="Change Password" color="#F43F5E" />
          <DefaultView
            style={[styles.separator, { backgroundColor: borderColor }]}
          />
          <SettingsItem icon={Smartphone} title="Device" color="#3B82F6" />
          <DefaultView
            style={[styles.separator, { backgroundColor: borderColor }]}
          />
          <SettingsItem
            icon={CreditCard}
            title="Connect to Banks"
            color="#10B981"
          />
        </DefaultView>

        {/* General Settings */}
        <Text style={styles.sectionLabel}>Settings</Text>
        <DefaultView
          style={[
            styles.groupCard,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <SettingsItem icon={Settings} title="Settings" color={tintColor} />
          <DefaultView
            style={[styles.separator, { backgroundColor: borderColor }]}
          />
          <SettingsItem
            icon={HelpCircle}
            title="Help & Support"
            color="#EAB308"
          />
          <DefaultView
            style={[styles.separator, { backgroundColor: borderColor }]}
          />
          <SettingsItem icon={Info} title="About" color="#6366F1" />
        </DefaultView>

        {/* Log Out */}
        <TouchableOpacity
          style={[styles.logoutButton, { borderColor: "#F43F5E" }]}
        >
          <LogOut color="#F43F5E" size={20} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <DefaultView style={{ height: 100 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  headerCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 20,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  avatarText: {
    fontSize: 22,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  nameWrapper: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  userEmail: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_400Regular",
    opacity: 0.6,
    marginTop: 2,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },
  premiumBanner: {
    padding: 20,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  premiumIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  premiumTextWrapper: {
    flex: 1,
  },
  premiumTitle: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  premiumSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontFamily: "SpaceGrotesk_400Regular",
    marginTop: 2,
  },
  sparkles: {
    position: "absolute",
    right: 20,
    top: 15,
  },
  sparkle: {
    fontSize: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_600SemiBold",
    opacity: 0.5,
    marginBottom: 15,
    marginLeft: 5,
  },
  groupCard: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 25,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  settingsTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: "SpaceGrotesk_500Medium",
  },
  separator: {
    height: 1,
    marginHorizontal: 16,
    opacity: 0.1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: "rgba(244, 63, 94, 0.05)",
  },
  logoutText: {
    color: "#F43F5E",
    fontSize: 16,
    fontFamily: "SpaceGrotesk_700Bold",
    marginLeft: 10,
  },
});
