import React from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  View as DefaultView,
} from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { View, Text, useThemeColor } from "@/components/Themed";
import {
  Search,
  Bell,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  Truck,
  ChevronRight,
} from "lucide-react-native";

export default function HomeScreen() {
  const tintColor = useThemeColor({}, "tint");
  const cardColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");

  // Cyberpunk colors
  const neonPurple = "#A855F7";
  const neonGreen = "#10B981"; // Income
  const neonPink = "#F43F5E"; // Expense

  return (
    <ScreenContainer title="Home" hideTitle>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View
          style={styles.headerContainer}
          lightColor="transparent"
          darkColor="transparent"
        >
          <View
            style={styles.headerLeft}
            lightColor="transparent"
            darkColor="transparent"
          >
            {/* Avatar placeholder */}
            <DefaultView style={[styles.avatar, { borderColor: tintColor }]}>
              <Text
                style={{ fontFamily: "SpaceGrotesk_700Bold", color: tintColor }}
              >
                A
              </Text>
            </DefaultView>
            <View lightColor="transparent" darkColor="transparent">
              <Text style={styles.greeting}>Hello Alex</Text>
              <Text style={styles.date}>August 2025</Text>
            </View>
          </View>
          <View
            style={styles.headerRight}
            lightColor="transparent"
            darkColor="transparent"
          >
            <TouchableOpacity style={styles.iconButton}>
              <Search color={textColor} size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { marginLeft: 12 }]}>
              <Bell color={textColor} size={22} />
              <DefaultView style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Total Balance Card */}
        <DefaultView
          style={[
            styles.balanceCard,
            {
              backgroundColor: cardColor,
              borderColor,
              shadowColor: neonPurple,
            },
          ]}
        >
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$3,540.60</Text>

          <DefaultView
            style={[styles.trendPill, { backgroundColor: "#A855F720" }]}
          >
            <ArrowUpRight color={neonPurple} size={14} />
            <Text style={[styles.trendText, { color: neonPurple }]}>$230</Text>
          </DefaultView>

          <DefaultView style={styles.cardFooter}>
            <DefaultView style={styles.footerCol}>
              <DefaultView
                style={[styles.iconCircle, { backgroundColor: "#10B98120" }]}
              >
                <ArrowDownLeft color={neonGreen} size={20} />
              </DefaultView>
              <DefaultView>
                <Text style={[styles.footerAmount, { color: neonGreen }]}>
                  +$4,200
                </Text>
                <Text style={styles.footerLabel}>Total Income</Text>
              </DefaultView>
            </DefaultView>

            <DefaultView style={styles.footerCol}>
              <DefaultView
                style={[styles.iconCircle, { backgroundColor: "#F43F5E20" }]}
              >
                <ArrowUpRight color={neonPink} size={20} />
              </DefaultView>
              <DefaultView>
                <Text style={[styles.footerAmount, { color: neonPink }]}>
                  -$1560
                </Text>
                <Text style={styles.footerLabel}>Total Expenses</Text>
              </DefaultView>
            </DefaultView>
          </DefaultView>
        </DefaultView>

        {/* Transactions Section */}
        <View
          style={styles.transactionsHeader}
          lightColor="transparent"
          darkColor="transparent"
        >
          <Text style={styles.sectionTitle}>Transactions</Text>
          <Text style={styles.sectionSubtitle}>$1450.00</Text>
        </View>

        <Text style={styles.dateSeparator}>Today Sep 10</Text>

        {/* Transaction Items */}
        <TouchableOpacity
          style={[styles.transactionItem, { backgroundColor: cardColor }]}
          activeOpacity={0.7}
        >
          <DefaultView
            style={[styles.txIconContainer, { backgroundColor: "#F59E0B20" }]}
          >
            <ShoppingBag color="#F59E0B" size={20} />
          </DefaultView>
          <DefaultView style={styles.txDetails}>
            <Text style={styles.txTitle}>Shop</Text>
            <Text style={styles.txSubtitle}>Shop</Text>
          </DefaultView>
          <DefaultView style={styles.txAmountContainer}>
            <Text style={styles.txAmount}>-$120.00</Text>
            <Text style={styles.txSubtitle}>Tax: $0.00</Text>
          </DefaultView>
          <ChevronRight
            color={useThemeColor({}, "tabIconDefault")}
            size={20}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.transactionItem, { backgroundColor: cardColor }]}
          activeOpacity={0.7}
        >
          <DefaultView
            style={[styles.txIconContainer, { backgroundColor: "#3B82F620" }]}
          >
            <Truck color="#3B82F6" size={20} />
          </DefaultView>
          <DefaultView style={styles.txDetails}>
            <Text style={styles.txTitle}>Uber</Text>
            <Text style={styles.txSubtitle}>Transport</Text>
          </DefaultView>
          <DefaultView style={styles.txAmountContainer}>
            <Text style={styles.txAmount}>-$18.00</Text>
            <Text style={styles.txSubtitle}>Tax: $0.00</Text>
          </DefaultView>
          <ChevronRight
            color={useThemeColor({}, "tabIconDefault")}
            size={20}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>

        {/* Padding at bottom for custom floating tab bar */}
        <DefaultView style={{ height: 100 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  greeting: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  date: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_400Regular",
    opacity: 0.6,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    backgroundColor: "rgba(150, 150, 150, 0.1)",
    borderRadius: 20,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#A855F7",
    borderWidth: 1.5,
    borderColor: "#09090B",
  },
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 30,
    alignItems: "center",
  },
  balanceLabel: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 42,
    marginBottom: 12,
    letterSpacing: -1,
  },
  trendPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
  },
  trendText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 14,
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(150, 150, 150, 0.1)",
  },
  footerCol: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  footerAmount: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 18,
  },
  footerLabel: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 20,
  },
  sectionSubtitle: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 16,
    opacity: 0.8,
  },
  dateSeparator: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 14,
    opacity: 0.5,
    marginBottom: 12,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.05)",
  },
  txIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  txDetails: {
    flex: 1,
  },
  txTitle: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 16,
    marginBottom: 4,
  },
  txSubtitle: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 13,
    opacity: 0.5,
  },
  txAmountContainer: {
    alignItems: "flex-end",
  },
  txAmount: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 16,
    marginBottom: 4,
  },
});
