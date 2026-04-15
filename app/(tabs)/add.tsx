import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  View as DefaultView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { View, Text, useThemeColor } from "@/components/Themed";
import {
  X,
  Calendar,
  Clock,
  Tag,
  ShoppingBag,
  Utensils,
  Car,
  Plus,
  Coffee,
  Heart,
  Briefcase,
  Gamepad2,
  ChevronRight,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

const CATEGORIES: Category[] = [
  { id: "1", name: "Food", icon: Utensils, color: "#10B981" },
  { id: "2", name: "Shopping", icon: ShoppingBag, color: "#A855F7" },
  { id: "3", name: "Transport", icon: Car, color: "#3B82F6" },
  { id: "4", name: "Coffee", icon: Coffee, color: "#F59E0B" },
  { id: "5", name: "Work", icon: Briefcase, color: "#6366F1" },
  { id: "6", name: "Health", icon: Heart, color: "#F43F5E" },
  { id: "7", name: "Gaming", icon: Gamepad2, color: "#EAB308" },
  { id: "8", name: "Other", icon: Tag, color: "#6B7280" },
];

export default function AddScreen() {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1");

  const amountRef = useRef<TextInput>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const tintColor = useThemeColor({}, "tint");
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");

  useEffect(() => {
    // Auto-focus amount field
    const timer = setTimeout(() => {
      amountRef.current?.focus();
    }, 500);

    // Pulse animation for Add button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    return () => clearTimeout(timer);
  }, []);

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    setAmount(cleaned);
  };

  return (
    <ScreenContainer title="Add Item" hideTitle>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Structured Segmented Control */}
            <DefaultView
              style={[
                styles.segmentedContainer,
                { backgroundColor: cardColor, borderColor },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.segmentItem,
                  type === "expense" && { backgroundColor: "#F43F5E" },
                ]}
                onPress={() => setType("expense")}
              >
                <Text
                  style={[
                    styles.segmentText,
                    type === "expense"
                      ? { color: "#FFF" }
                      : { color: textColor, opacity: 0.5 },
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentItem,
                  type === "income" && { backgroundColor: "#10B981" },
                ]}
                onPress={() => setType("income")}
              >
                <Text
                  style={[
                    styles.segmentText,
                    type === "income"
                      ? { color: "#FFF" }
                      : { color: textColor, opacity: 0.5 },
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </DefaultView>

            {/* Hero Amount Area */}
            <DefaultView style={styles.heroArea}>
              <LinearGradient
                colors={[`${tintColor}15`, "transparent"]}
                style={styles.heroGlow}
              />
              <DefaultView style={styles.amountFieldWrapper}>
                <Text style={[styles.currency, { color: tintColor }]}>$</Text>
                <TextInput
                  ref={amountRef}
                  style={[styles.amountInput, { color: textColor }]}
                  placeholder="0.00"
                  placeholderTextColor="rgba(255, 255, 255, 0.05)"
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={handleAmountChange}
                  selectionColor={tintColor}
                />
              </DefaultView>
              <DefaultView
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: `${type === "expense" ? "#F43F5E" : "#10B981"}20`,
                  },
                ]}
              >
                <DefaultView
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor:
                        type === "expense" ? "#F43F5E" : "#10B981",
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: type === "expense" ? "#F43F5E" : "#10B981" },
                  ]}
                >
                  Adding {type}
                </Text>
              </DefaultView>
            </DefaultView>

            {/* Card 1: Transaction Details */}
            <DefaultView
              style={[
                styles.infoCard,
                { backgroundColor: cardColor, borderColor },
              ]}
            >
              <DefaultView style={styles.cardHeader}>
                <Text style={styles.cardHeaderTitle}>Transaction Details</Text>
              </DefaultView>

              <DefaultView style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>What is it for?</Text>
                <DefaultView
                  style={[
                    styles.textInputContainer,
                    { borderBottomColor: borderColor },
                  ]}
                >
                  <TextInput
                    style={[styles.titleInput, { color: textColor }]}
                    placeholder="e.g. Cinema Tickets"
                    placeholderTextColor="rgba(255, 255, 255, 0.2)"
                    value={title}
                    onChangeText={setTitle}
                  />
                </DefaultView>
              </DefaultView>

              <DefaultView style={styles.categoryGridSection}>
                <Text style={styles.inputLabel}>Choose Category</Text>
                <DefaultView style={styles.categoryGrid}>
                  {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.gridItem,
                        selectedCategory === cat.id && {
                          borderColor: tintColor,
                          backgroundColor: `${tintColor}10`,
                        },
                      ]}
                      onPress={() => setSelectedCategory(cat.id)}
                    >
                      <DefaultView
                        style={[
                          styles.gridIconWrapper,
                          { backgroundColor: `${cat.color}15` },
                        ]}
                      >
                        <cat.icon size={20} color={cat.color} />
                      </DefaultView>
                      <Text
                        style={[
                          styles.gridItemName,
                          {
                            color: textColor,
                            opacity: selectedCategory === cat.id ? 1 : 0.6,
                          },
                        ]}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </DefaultView>
              </DefaultView>
            </DefaultView>

            {/* Card 2: Schedule */}
            <DefaultView
              style={[
                styles.infoCard,
                { backgroundColor: cardColor, borderColor },
              ]}
            >
              <DefaultView style={styles.cardHeader}>
                <Text style={styles.cardHeaderTitle}>Schedule</Text>
              </DefaultView>
              <DefaultView style={styles.dateTimeRow}>
                <TouchableOpacity style={styles.dateAction}>
                  <DefaultView style={styles.dateIconWrapper}>
                    <Calendar size={18} color={tintColor} />
                  </DefaultView>
                  <DefaultView style={styles.dateTextWrapper}>
                    <Text style={styles.dateValue}>August 15, 2025</Text>
                    <Text style={styles.dateLabel}>Date</Text>
                  </DefaultView>
                  <ChevronRight size={16} color={textColor} opacity={0.3} />
                </TouchableOpacity>

                <DefaultView
                  style={[
                    styles.verticalSeparator,
                    { backgroundColor: borderColor },
                  ]}
                />

                <TouchableOpacity style={styles.dateAction}>
                  <DefaultView style={styles.dateIconWrapper}>
                    <Clock size={18} color={tintColor} />
                  </DefaultView>
                  <DefaultView style={styles.dateTextWrapper}>
                    <Text style={styles.dateValue}>04:30 PM</Text>
                    <Text style={styles.dateLabel}>Time</Text>
                  </DefaultView>
                  <ChevronRight size={16} color={textColor} opacity={0.3} />
                </TouchableOpacity>
              </DefaultView>
            </DefaultView>

            {/* Action Area */}
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: tintColor }]}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.2)", "transparent"]}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <Text style={styles.buttonText}>Confirm Transaction</Text>
                <DefaultView style={styles.plusCircle}>
                  <Plus color="#FFF" size={24} strokeWidth={3} />
                </DefaultView>
              </TouchableOpacity>
            </Animated.View>

            <DefaultView style={{ height: 100 }} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 10,
  },
  segmentedContainer: {
    flexDirection: "row",
    borderRadius: 25,
    padding: 4,
    borderWidth: 1,
    width: "70%",
    alignSelf: "center",
    marginBottom: 30,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentText: {
    fontSize: 13,
    fontFamily: "SpaceGrotesk_700Bold",
    textTransform: "uppercase",
  },
  heroArea: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    marginBottom: 20,
    position: "relative",
  },
  heroGlow: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    top: 0,
  },
  amountFieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    fontSize: 32,
    fontFamily: "SpaceGrotesk_700Bold",
    marginRight: 6,
    marginTop: 10,
  },
  amountInput: {
    fontSize: 72,
    fontFamily: "SpaceGrotesk_700Bold",
    textAlign: "center",
    minWidth: 180,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 15,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "SpaceGrotesk_700Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  infoCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 24,
    marginBottom: 20,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardHeaderTitle: {
    fontSize: 11,
    fontFamily: "SpaceGrotesk_700Bold",
    opacity: 0.3,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  inputWrapper: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_600SemiBold",
    opacity: 0.6,
    marginBottom: 10,
  },
  textInputContainer: {
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  titleInput: {
    fontSize: 18,
    fontFamily: "SpaceGrotesk_500Medium",
  },
  categoryGridSection: {
    marginTop: 10,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  gridItem: {
    width: "46.5%",
    margin: "1.75%",
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "rgba(150, 150, 150, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  gridIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  gridItemName: {
    fontSize: 13,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  dateIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(150,150,150,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  dateTextWrapper: {
    flex: 1,
  },
  dateValue: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  dateLabel: {
    fontSize: 11,
    fontFamily: "SpaceGrotesk_500Medium",
    opacity: 0.4,
    marginTop: 2,
  },
  verticalSeparator: {
    width: 1,
    height: 30,
    marginHorizontal: 15,
    opacity: 0.1,
  },
  primaryButton: {
    height: 72,
    borderRadius: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#A855F7",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontFamily: "SpaceGrotesk_700Bold",
    letterSpacing: 0.5,
  },
  plusCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
});
