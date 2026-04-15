import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View as DefaultView,
  Dimensions,
} from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { View, Text, useThemeColor } from "@/components/Themed";
import {
  ChevronLeft,
  Search,
  Bell,
  Home,
  BookOpen,
  Truck,
  ShoppingBag,
} from "lucide-react-native";
import Svg, { Circle, G, Path, Polyline } from "react-native-svg";

const { width } = Dimensions.get("window");
const DONUT_SIZE = width * 0.7;
const DONUT_RADIUS = DONUT_SIZE / 2;
const STROKE_WIDTH = 12;
const CIRCUMFERENCE = 2 * Math.PI * (DONUT_RADIUS - STROKE_WIDTH);

export default function ChartScreen() {
  const [activeTab, setActiveTab] = useState<"Categories" | "Monthly">(
    "Categories",
  );

  const cardColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");

  // Bot Binder Theme Colors for Categories
  const colors = {
    rent: "#3B82F6", // Blue
    education: "#F43F5E", // Pink
    transport: "#F59E0B", // Orange
    shop: "#EAB308", // Yellow
    neonPurple: "#A855F7",
    neonGreen: "#10B981",
  };

  const renderHeader = () => (
    <View
      style={styles.headerContainer}
      lightColor="transparent"
      darkColor="transparent"
    >
      <TouchableOpacity style={styles.iconButton}>
        <ChevronLeft color={textColor} size={24} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Statistics</Text>
      <DefaultView style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton}>
          <Search color={textColor} size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, { marginLeft: 12 }]}>
          <Bell color={textColor} size={22} />
          <DefaultView style={styles.notificationDot} />
        </TouchableOpacity>
      </DefaultView>
    </View>
  );

  const renderToggle = () => (
    <DefaultView
      style={[
        styles.toggleContainer,
        { backgroundColor: cardColor, borderColor },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.toggleButton,
          activeTab === "Categories" && {
            backgroundColor: "rgba(150, 150, 150, 0.1)",
          },
        ]}
        onPress={() => setActiveTab("Categories")}
      >
        <Text
          style={[
            styles.toggleText,
            activeTab === "Categories" ? styles.activeToggleText : {},
          ]}
        >
          Categories
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          activeTab === "Monthly" && {
            backgroundColor: "rgba(150, 150, 150, 0.1)",
          },
        ]}
        onPress={() => setActiveTab("Monthly")}
      >
        <Text
          style={[
            styles.toggleText,
            activeTab === "Monthly" ? styles.activeToggleText : {},
          ]}
        >
          Monthly Spending
        </Text>
      </TouchableOpacity>
    </DefaultView>
  );

  const renderDonutChart = () => {
    // Proportions approx: Rent 36%, Ed 26%, Trans 22%, Shop 16%
    const p1 = 0.36;
    const p2 = 0.26;
    const p3 = 0.22;
    const p4 = 0.16;

    return (
      <DefaultView style={styles.donutContainer}>
        <Svg
          width={DONUT_SIZE}
          height={DONUT_SIZE}
          viewBox={`0 0 ${DONUT_SIZE} ${DONUT_SIZE}`}
        >
          <G rotation="-90" origin={`${DONUT_RADIUS}, ${DONUT_RADIUS}`}>
            {/* Rent Base */}
            <Circle
              cx={DONUT_RADIUS}
              cy={DONUT_RADIUS}
              r={DONUT_RADIUS - STROKE_WIDTH}
              stroke={colors.rent}
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={`${CIRCUMFERENCE * p1} ${CIRCUMFERENCE}`}
              strokeDashoffset={0}
              strokeLinecap="round"
            />

            {/* Education */}
            <Circle
              cx={DONUT_RADIUS}
              cy={DONUT_RADIUS}
              r={DONUT_RADIUS - STROKE_WIDTH}
              stroke={colors.education}
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={`${CIRCUMFERENCE * p2} ${CIRCUMFERENCE}`}
              strokeDashoffset={-(CIRCUMFERENCE * p1)}
              strokeLinecap="round"
            />

            {/* Transport */}
            <Circle
              cx={DONUT_RADIUS}
              cy={DONUT_RADIUS}
              r={DONUT_RADIUS - STROKE_WIDTH}
              stroke={colors.transport}
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={`${CIRCUMFERENCE * p3} ${CIRCUMFERENCE}`}
              strokeDashoffset={-(CIRCUMFERENCE * (p1 + p2))}
              strokeLinecap="round"
            />

            {/* Shop */}
            <Circle
              cx={DONUT_RADIUS}
              cy={DONUT_RADIUS}
              r={DONUT_RADIUS - STROKE_WIDTH}
              stroke={colors.shop}
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={`${CIRCUMFERENCE * p4} ${CIRCUMFERENCE}`}
              strokeDashoffset={-(CIRCUMFERENCE * (p1 + p2 + p3))}
              strokeLinecap="round"
            />
          </G>
        </Svg>

        <DefaultView style={styles.donutCenterContent}>
          <DefaultView
            style={[
              styles.miniIconWrapper,
              { backgroundColor: `${colors.shop}20` },
            ]}
          >
            <ShoppingBag color={colors.shop} size={20} />
          </DefaultView>
          <Text style={styles.donutTotal}>$1560.00</Text>
          <Text style={styles.donutDate}>August 2025</Text>
        </DefaultView>
      </DefaultView>
    );
  };

  const renderCategoryCards = () => {
    const cards = [
      {
        id: 1,
        title: "Rent",
        tx: 65,
        amount: "-$562.00",
        pct: "+2.00%",
        pctVal: "36%",
        Icon: Home,
        color: colors.rent,
      },
      {
        id: 2,
        title: "Education",
        tx: 14,
        amount: "-$406.00",
        pct: "0.85%",
        pctVal: "26%",
        Icon: BookOpen,
        color: colors.education,
        green: true,
      },
      {
        id: 3,
        title: "Transport",
        tx: 11,
        amount: "-$343.00",
        pct: "1.60%",
        pctVal: "22%",
        Icon: Truck,
        color: colors.transport,
      },
      {
        id: 4,
        title: "Shop",
        tx: 17,
        amount: "-$250.00",
        pct: "0.65%",
        pctVal: "16%",
        Icon: ShoppingBag,
        color: colors.shop,
        green: true,
      },
    ];

    return (
      <DefaultView style={styles.cardsGrid}>
        {cards.map((c) => (
          <DefaultView
            key={c.id}
            style={[
              styles.cardItem,
              { backgroundColor: cardColor, borderColor },
            ]}
          >
            <DefaultView style={styles.cardHeader}>
              <DefaultView
                style={[
                  styles.cardIconWrapper,
                  { backgroundColor: `${c.color}20` },
                ]}
              >
                <c.Icon color={c.color} size={18} />
              </DefaultView>
              <DefaultView style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.cardTitle}>{c.title}</Text>
                <Text style={styles.cardTx}>{c.tx} Transactions</Text>
              </DefaultView>
            </DefaultView>

            <DefaultView style={styles.cardFooterRow}>
              <DefaultView>
                <Text style={styles.cardAmount}>{c.amount}</Text>
                <Text
                  style={[
                    styles.cardPct,
                    { color: c.green ? colors.neonGreen : colors.education },
                  ]}
                >
                  {c.green ? "↗" : "↙"} {c.pct}
                </Text>
              </DefaultView>

              <DefaultView style={styles.miniRingWrapper}>
                <Svg width={40} height={40} viewBox="0 0 40 40">
                  <Circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="rgba(150,150,150,0.2)"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <Circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke={c.color}
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray="100"
                    strokeDashoffset={100 - parseInt(c.pctVal)}
                    strokeLinecap="round"
                    rotation="-90"
                    origin="20, 20"
                  />
                </Svg>
                <Text style={styles.miniRingText}>{c.pctVal}</Text>
              </DefaultView>
            </DefaultView>
          </DefaultView>
        ))}
      </DefaultView>
    );
  };

  const renderLineChart = () => {
    // Purely demonstrational mock SVG path for the line graph
    return (
      <DefaultView
        style={[
          styles.lineChartBase,
          { backgroundColor: cardColor, borderColor },
        ]}
      >
        <Text style={styles.monthlyLabel}>Avg. monthly expenses</Text>
        <Text style={styles.monthlyAmount}>$1560.00</Text>
        <Text style={styles.monthlyTrend}>
          <Text style={{ color: colors.neonGreen }}>↗ $230</Text> than last
          month
        </Text>

        <DefaultView style={styles.chartLegend}>
          <DefaultView style={styles.legendItem}>
            <DefaultView
              style={[styles.legendDot, { borderColor: colors.rent }]}
            />
            <Text style={styles.legendText}>Income</Text>
          </DefaultView>
          <DefaultView style={styles.legendItem}>
            <DefaultView
              style={[styles.legendDot, { borderColor: colors.education }]}
            />
            <Text style={styles.legendText}>Expense</Text>
          </DefaultView>
        </DefaultView>

        <DefaultView style={{ height: 200, width: "100%", marginTop: 20 }}>
          <Svg height="100%" width="100%" viewBox="0 0 300 200">
            {/* Grid lines */}
            {[40, 80, 120, 160].map((y) => (
              <Path
                key={y}
                d={`M 0 ${y} L 300 ${y}`}
                stroke="rgba(150,150,150,0.1)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            ))}

            {/* Income Line Blue */}
            <Polyline
              points="0,150 50,100 100,120 150,100 200,80 250,50 300,30"
              fill="none"
              stroke={colors.rent}
              strokeWidth="3"
            />
            <Circle
              cx="150"
              cy="100"
              r="4"
              fill="#09090B"
              stroke={colors.rent}
              strokeWidth="3"
            />

            {/* Expense Line Pink */}
            <Polyline
              points="0,180 50,170 100,160 150,110 200,130 250,70 300,60"
              fill="none"
              stroke={colors.education}
              strokeWidth="3"
            />
            <Circle
              cx="150"
              cy="110"
              r="4"
              fill="#09090B"
              stroke={colors.education}
              strokeWidth="3"
            />

            {/* Vertical crosshair */}
            <Path
              d="M 150 0 L 150 200"
              stroke={colors.rent}
              strokeWidth="1"
              opacity={0.5}
            />
          </Svg>

          {/* Tooltip mock */}
          <DefaultView style={styles.mockTooltip}>
            <Text style={styles.tooltipText}>Income: $4,200</Text>
            <Text style={styles.tooltipText}>Expenses: $1,560</Text>
          </DefaultView>
        </DefaultView>

        <DefaultView style={styles.chartXAxis}>
          {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].map((m, i) => (
            <Text
              key={m}
              style={[styles.axisText, i === 2 && styles.activeAxisText]}
            >
              {m}
            </Text>
          ))}
        </DefaultView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterPills}
        >
          {["7D", "1M", "3M", "6M", "1Y", "Customize"].map((f, i) => (
            <DefaultView
              key={f}
              style={[
                styles.filterPill,
                i === 3 && { backgroundColor: textColor },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  i === 3 && {
                    color: "#09090B",
                    fontFamily: "SpaceGrotesk_700Bold",
                  },
                ]}
              >
                {f}
              </Text>
            </DefaultView>
          ))}
        </ScrollView>
      </DefaultView>
    );
  };

  const renderInsights = () => (
    <DefaultView style={styles.insightsGrid}>
      <DefaultView
        style={[
          styles.insightCard,
          { backgroundColor: cardColor, borderColor },
        ]}
      >
        <ArrowUpRight
          color={colors.neonGreen}
          size={24}
          style={{ marginBottom: 16 }}
        />
        <Text style={styles.insightText}>
          Your income peaked in August at $4,200
        </Text>
      </DefaultView>
      <DefaultView
        style={[
          styles.insightCard,
          { backgroundColor: cardColor, borderColor },
        ]}
      >
        <DefaultView
          style={[
            styles.insightIconWrapper,
            { backgroundColor: `${colors.shop}20`, marginBottom: 16 },
          ]}
        >
          <ShoppingBag color={colors.shop} size={16} />
        </DefaultView>
        <Text style={styles.insightText}>
          You saved an average of $4,120 per month
        </Text>
      </DefaultView>
    </DefaultView>
  );

  return (
    <ScreenContainer title="" hideTitle>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
        {renderToggle()}

        {activeTab === "Categories" ? (
          <>
            {renderDonutChart()}
            {renderCategoryCards()}
          </>
        ) : (
          <>
            {renderLineChart()}
            {renderInsights()}
          </>
        )}

        <DefaultView style={{ height: 100 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

// Ensure lucide icon for mock
import { ArrowUpRight } from "lucide-react-native";

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 18,
  },
  headerRight: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
    backgroundColor: "rgba(150, 150, 150, 0.1)",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 30,
    padding: 4,
    borderWidth: 1,
    marginBottom: 30,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 26,
    alignItems: "center",
  },
  toggleText: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 14,
    opacity: 0.6,
  },
  activeToggleText: {
    fontFamily: "SpaceGrotesk_700Bold",
    opacity: 1,
  },
  donutContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    position: "relative",
  },
  donutCenterContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  miniIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  donutTotal: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 28,
  },
  donutDate: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardItem: {
    width: "48%",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 14,
  },
  cardTx: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 11,
    opacity: 0.6,
    marginTop: 2,
  },
  cardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardAmount: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 18,
    marginBottom: 4,
  },
  cardPct: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 12,
  },
  miniRingWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  miniRingText: {
    position: "absolute",
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 10,
  },
  lineChartBase: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 16,
  },
  monthlyLabel: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 14,
    opacity: 0.8,
  },
  monthlyAmount: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 32,
    marginTop: 4,
    marginBottom: 8,
  },
  monthlyTrend: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 14,
    opacity: 0.8,
  },
  chartLegend: {
    position: "absolute",
    right: 24,
    top: 50,
    flexDirection: "row",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 3,
    marginRight: 6,
    backgroundColor: "transparent",
  },
  legendText: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 12,
  },
  mockTooltip: {
    position: "absolute",
    top: 60,
    left: 80,
    backgroundColor: "#FAFAFA",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tooltipText: {
    color: "#09090B",
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 12,
    marginBottom: 2,
  },
  chartXAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  axisText: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 12,
    opacity: 0.5,
  },
  activeAxisText: {
    opacity: 1,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  filterPills: {
    flexDirection: "row",
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: "rgba(150, 150, 150, 0.1)",
  },
  filterText: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 13,
  },
  insightsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  insightCard: {
    width: "48%",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  insightIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  insightText: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 13,
    lineHeight: 20,
  },
});
