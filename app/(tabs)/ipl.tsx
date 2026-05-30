import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryPageHeader } from "@/components/CategoryPageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { LinearGradient } from "expo-linear-gradient";
import {
  MapPin,
  Calendar,
  Star,
  Trophy,
  ChevronRight,
} from "lucide-react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// ─── Data ─────────────────────────────────────────────────────────────────────
const TEAMS = [
  {
    id: "1",
    short: "MI",
    name: "Mumbai Indians",
    color: "#004BA0",
    img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=200&q=80",
  },
  {
    id: "2",
    short: "CSK",
    name: "Chennai Super Kings",
    color: "#F9A825",
    img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&q=80",
  },
  {
    id: "3",
    short: "RCB",
    name: "Royal Challengers",
    color: "#CC0000",
    img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200&q=80",
  },
  {
    id: "4",
    short: "KKR",
    name: "Kolkata Knight Riders",
    color: "#3A225D",
    img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=200&q=80",
  },
  {
    id: "5",
    short: "SRH",
    name: "Sunrisers Hyderabad",
    color: "#E35200",
    img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&q=80",
  },
  {
    id: "6",
    short: "DC",
    name: "Delhi Capitals",
    color: "#0078BC",
    img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200&q=80",
  },
];

interface Match {
  id: string;
  team1: string;
  team1Short: string;
  team1Color: string;
  team2: string;
  team2Short: string;
  team2Color: string;
  date: string;
  venue: string;
  price: string;
  isLive?: boolean;
}

const MATCHES: Match[] = [
  {
    id: "1",
    team1: "Sunrisers Hyderabad",
    team1Short: "SRH",
    team1Color: "#E35200",
    team2: "Delhi Capitals",
    team2Short: "DC",
    team2Color: "#0078BC",
    date: "Tue, Jun 3 · 7:30 PM",
    venue: "Rajiv Gandhi Intl. Stadium, HYD",
    price: "₹2,550",
    isLive: true,
  },
  {
    id: "2",
    team1: "Mumbai Indians",
    team1Short: "MI",
    team1Color: "#004BA0",
    team2: "Chennai Super Kings",
    team2Short: "CSK",
    team2Color: "#F9A825",
    date: "Thu, Jun 5 · 7:30 PM",
    venue: "Wankhede Stadium, Mumbai",
    price: "₹1,800",
  },
  {
    id: "3",
    team1: "RCB",
    team1Short: "RCB",
    team1Color: "#CC0000",
    team2: "Kolkata Knight Riders",
    team2Short: "KKR",
    team2Color: "#3A225D",
    date: "Sat, Jun 7 · 3:30 PM",
    venue: "Chinnaswamy Stadium, BLR",
    price: "₹1,500",
  },
];

// ─── Live Match Banner ────────────────────────────────────────────────────────
function LiveBanner({ match }: { match: Match }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.liveBanner}
      activeOpacity={0.88}
      onPress={() => router.push("/(tabs)/event")}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
        }}
        style={StyleSheet.absoluteFillObject as any}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["rgba(9,9,11,0.3)", "rgba(9,9,11,0.85)"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.liveBadge}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>LIVE</Text>
      </View>
      <View style={styles.teamsRow}>
        <Text style={[styles.teamName, { color: match.team1Color }]}>
          {match.team1Short}
        </Text>
        <View style={styles.vsCircle}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        <Text style={[styles.teamName, { color: match.team2Color }]}>
          {match.team2Short}
        </Text>
      </View>
      <Text style={styles.liveVenue}>{match.venue}</Text>
      <TouchableOpacity style={styles.watchBtn} activeOpacity={0.85}>
        <Text style={styles.watchBtnText}>Book now · {match.price}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

// ─── Match card ───────────────────────────────────────────────────────────────
function MatchCard({ match }: { match: Match }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.matchCard}
      activeOpacity={0.85}
      onPress={() => router.push("/(tabs)/event")}
    >
      <View style={styles.matchTeams}>
        <View style={styles.matchTeam}>
          <View
            style={[
              styles.teamBadge,
              { backgroundColor: match.team1Color + "22" },
            ]}
          >
            <Text style={[styles.teamBadgeText, { color: match.team1Color }]}>
              {match.team1Short}
            </Text>
          </View>
          <Text style={styles.matchTeamName} numberOfLines={1}>
            {match.team1}
          </Text>
        </View>
        <Text style={styles.matchVs}>vs</Text>
        <View style={[styles.matchTeam, { alignItems: "flex-end" }]}>
          <View
            style={[
              styles.teamBadge,
              { backgroundColor: match.team2Color + "22" },
            ]}
          >
            <Text style={[styles.teamBadgeText, { color: match.team2Color }]}>
              {match.team2Short}
            </Text>
          </View>
          <Text style={styles.matchTeamName} numberOfLines={1}>
            {match.team2}
          </Text>
        </View>
      </View>
      <View style={styles.matchMeta}>
        <View style={styles.metaRow}>
          <Calendar size={12} color="rgba(255,255,255,0.4)" />
          <Text style={styles.metaText}>{match.date}</Text>
        </View>
        <View style={styles.metaRow}>
          <MapPin size={12} color="rgba(255,255,255,0.4)" />
          <Text style={styles.metaText}>{match.venue}</Text>
        </View>
      </View>
      <View style={styles.matchFooter}>
        <Text style={styles.matchPrice}>{match.price} onwards</Text>
        <ChevronRight size={16} color="#A855F7" />
      </View>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function IPLScreen() {
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <CategoryPageHeader
        activeTab="ipl"
        searchPlaceholder="Search IPL teams & matches"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Live match banner */}
        <View style={styles.section}>
          <LiveBanner match={MATCHES[0]} />
        </View>

        {/* Teams */}
        <View style={[styles.section, { marginTop: 24 }]}>
          <SectionTitle title="Teams" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.teamsScroll}
          >
            {TEAMS.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={styles.teamCard}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.teamCircle,
                    {
                      backgroundColor: t.color + "22",
                      borderColor: t.color + "55",
                    },
                  ]}
                >
                  <Text style={[styles.teamCircleText, { color: t.color }]}>
                    {t.short}
                  </Text>
                </View>
                <Text style={styles.teamCardName} numberOfLines={1}>
                  {t.short}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming matches */}
        <View style={[styles.section, { marginTop: 24 }]}>
          <SectionTitle title="Upcoming Matches" onSeeAll={() => {}} />
          {MATCHES.slice(1).map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#09090B" },
  scroll: { paddingBottom: 20 },
  section: { paddingHorizontal: 16, marginTop: 16 },

  // Live banner
  liveBanner: {
    borderRadius: 22,
    overflow: "hidden",
    height: 220,
    justifyContent: "flex-end",
    padding: 20,
  },
  liveBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(239,68,68,0.2)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  liveText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 11,
    color: "#EF4444",
    letterSpacing: 1,
  },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 8,
  },
  teamName: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 32,
    letterSpacing: -1,
  },
  vsCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  vsText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
  },
  liveVenue: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 16,
  },
  watchBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#A855F7",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  watchBtnText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },

  // Teams
  teamsScroll: { gap: 12, paddingRight: 4, paddingBottom: 4 },
  teamCard: { alignItems: "center", gap: 8, width: 68 },
  teamCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  teamCircleText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
  },
  teamCardName: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
  },

  // Match card
  matchCard: {
    backgroundColor: "#13121A",
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  matchTeams: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  matchTeam: {
    flex: 1,
    alignItems: "flex-start",
    gap: 6,
  },
  teamBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  teamBadgeText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 14,
  },
  matchTeamName: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    maxWidth: 110,
  },
  matchVs: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    color: "rgba(255,255,255,0.3)",
    marginHorizontal: 10,
  },
  matchMeta: { gap: 4 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.38)",
  },
  matchFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.06)",
  },
  matchPrice: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 15,
    color: "#F0EFF8",
  },
});
