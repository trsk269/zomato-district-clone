import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  View as DefaultView,
  SectionList,
} from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { View, Text, useThemeColor } from "@/components/Themed";
import {
  ChevronLeft,
  Search,
  Filter,
  IceCream,
  Utensils,
  BusFront,
  Coffee,
  ShoppingBag,
  CreditCard,
  ArrowRightLeft,
  ChevronRight,
} from "lucide-react-native";

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
  type: "income" | "expense";
}

interface TransactionSection {
  title: string;
  data: Transaction[];
}

const MOCK_SECTIONS: TransactionSection[] = [
  {
    title: "Today",
    data: [
      {
        id: "1",
        title: "Gelato Stop",
        category: "Dessert",
        amount: "-$12.50",
        time: "03:45 PM",
        icon: IceCream,
        iconColor: "#A855F7",
        type: "expense",
      },
      {
        id: "2",
        title: "Main Street Bus",
        category: "Transport",
        amount: "-$2.50",
        time: "02:20 PM",
        icon: BusFront,
        iconColor: "#3B82F6",
        type: "expense",
      },
      {
        id: "3",
        title: "Starbucks Coffee",
        category: "Drinks",
        amount: "-$5.75",
        time: "09:15 AM",
        icon: Coffee,
        iconColor: "#F59E0B",
        type: "expense",
      },
    ],
  },
  {
    title: "Yesterday",
    data: [
      {
        id: "4",
        title: "Sushi House",
        category: "Food",
        amount: "-$42.00",
        time: "07:30 PM",
        icon: Utensils,
        iconColor: "#10B981",
        type: "expense",
      },
      {
        id: "5",
        title: "Monthly Salary",
        category: "Income",
        amount: "+$4,500.00",
        time: "09:00 AM",
        icon: CreditCard,
        iconColor: "#10B981",
        type: "income",
      },
      {
        id: "6",
        title: "Grocery Mart",
        category: "Shopping",
        amount: "-$85.20",
        time: "04:45 PM",
        icon: ShoppingBag,
        iconColor: "#6366F1",
        type: "expense",
      },
    ],
  },
  {
    title: "Sept 12, 2025",
    data: [
      {
        id: "7",
        title: "App Store",
        category: "Entertainment",
        amount: "-$9.99",
        time: "01:15 PM",
        icon: ArrowRightLeft,
        iconColor: "#F43F5E",
        type: "expense",
      },
    ],
  },
];

const FilterPill = ({ title, active }: { title: string; active?: boolean }) => {
  const tintColor = useThemeColor({}, "tint");
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");

  return (
    <TouchableOpacity
      style={[
        styles.filterPill,
        {
          backgroundColor: active ? tintColor : cardColor,
          borderColor: active ? tintColor : "transparent",
        },
      ]}
    >
      <Text
        style={[
          styles.filterText,
          { color: active ? "#FFF" : textColor, opacity: active ? 1 : 0.6 },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const TransactionRow = ({ item }: { item: Transaction }) => {
  const textColor = useThemeColor({}, "text");
  const cardColor = useThemeColor({}, "card");
  const isIncome = item.type === "income";

  return (
    <TouchableOpacity
      style={[styles.transactionItem, { backgroundColor: cardColor }]}
    >
      <DefaultView
        style={[
          styles.iconContainer,
          { backgroundColor: `${item.iconColor}15` },
        ]}
      >
        <item.icon color={item.iconColor} size={22} />
      </DefaultView>
      <DefaultView style={styles.detailsContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>
          {item.category} • {item.time}
        </Text>
      </DefaultView>
      <DefaultView style={styles.amountContainer}>
        <Text
          style={[
            styles.amountText,
            { color: isIncome ? "#10B981" : "#F43F5E" },
          ]}
        >
          {item.amount}
        </Text>
        <ChevronRight
          color={textColor}
          size={16}
          style={{ opacity: 0.2, marginLeft: 8 }}
        />
      </DefaultView>
    </TouchableOpacity>
  );
};

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const textColor = useThemeColor({}, "text");
  const cardColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");

  return (
    <ScreenContainer title="History" hideTitle>
      {/* Header Area */}
      <DefaultView style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color={textColor} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color={textColor} size={20} />
        </TouchableOpacity>
      </DefaultView>

      {/* Search Bar */}
      <DefaultView
        style={[
          styles.searchContainer,
          { backgroundColor: cardColor, borderColor },
        ]}
      >
        <Search color={textColor} size={20} style={{ opacity: 0.4 }} />
        <TextInput
          style={[styles.searchInput, { color: textColor }]}
          placeholder="Search transactions..."
          placeholderTextColor="rgba(255, 255, 255, 0.3)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </DefaultView>

      {/* Filter Options */}
      {/* <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        <FilterPill title="All" active />
        <FilterPill title="Food" />
        <FilterPill title="Transport" />
        <FilterPill title="Income" />
        <FilterPill title="Shopping" />
        <FilterPill title="Dessert" />
      </ScrollView> */}

      {/* History List */}
      <SectionList
        sections={MOCK_SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionRow item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <DefaultView style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </DefaultView>
        )}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<DefaultView style={{ height: 100 }} />}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(150, 150, 150, 0.1)",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  filterButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(150, 150, 150, 0.1)",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 15,
  },
  filtersScroll: {
    maxHeight: 45,
    marginBottom: 20,
  },
  filtersContent: {
    paddingRight: 20,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  filterText: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    paddingBottom: 12,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_700Bold",
    opacity: 0.4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },
  itemSubtitle: {
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
    opacity: 0.5,
    marginTop: 2,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountText: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_700Bold",
  },
});
