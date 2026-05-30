import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = width * 1.22;

export interface SpotlightItem {
  id: string;
  title: string;
  genre: string;
  description: string;
  tag: string;
  imageUri: string;
  accentColor?: string;
}

interface SpotlightCarouselProps {
  items: SpotlightItem[];
  onBook?: (item: SpotlightItem) => void;
}

const MAX_SLIDES = 8;

export function SpotlightCarousel({ items, onBook }: SpotlightCarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Pre-create enough Animated.Values for up to MAX_SLIDES (rules of hooks: no loops)
  const dot0 = useRef(new Animated.Value(0.3)).current;
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;
  const dot4 = useRef(new Animated.Value(0.3)).current;
  const dot5 = useRef(new Animated.Value(0.3)).current;
  const dot6 = useRef(new Animated.Value(0.3)).current;
  const dot7 = useRef(new Animated.Value(0.3)).current;
  const allDots = [dot0, dot1, dot2, dot3, dot4, dot5, dot6, dot7];
  const dotOpacities = allDots.slice(0, items.length);

  // Animate active dot
  useEffect(() => {
    dotOpacities.forEach((dot, i) => {
      Animated.timing(dot, {
        toValue: i === activeIndex ? 1 : 0.3,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  }, [activeIndex]);

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (activeIndex + 1) % items.length;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setActiveIndex(next);
    }, 3500);
    return () => clearInterval(timer);
  }, [activeIndex, items.length]);

  const handleScroll = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    if (idx !== activeIndex) setActiveIndex(idx);
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {items.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Image
              source={{ uri: item.imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(9,9,11,0.65)", "#09090B"]}
              locations={[0.35, 0.7, 1]}
              style={StyleSheet.absoluteFill}
            />

            {/* Now Showing badge */}
            <View style={styles.nowBadge}>
              <Text style={styles.nowText}>{item.tag}</Text>
            </View>

            {/* Bottom content */}
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.genrePill}>
                <Text style={styles.genreText}>{item.genre}</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
              <TouchableOpacity
                style={styles.bookBtn}
                activeOpacity={0.85}
                onPress={() => onBook?.(item)}
              >
                <Text style={styles.bookBtnText}>Book tickets</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Dot indicators */}
      <View style={styles.dots}>
        {items.map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              { opacity: dotOpacities[i] },
              i === activeIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    height: CARD_HEIGHT,
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1A24",
  },
  nowBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.2)",
  },
  nowText: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 12,
    color: "#FFFFFF",
  },
  content: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 28,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  genrePill: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.18)",
  },
  genreText: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
  },
  description: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  bookBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    paddingHorizontal: 32,
    paddingVertical: 13,
  },
  bookBtnText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 15,
    color: "#09090B",
  },

  // Dots
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 14,
    marginBottom: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.55)",
  },
  dotActive: {
    width: 20,
    backgroundColor: "#A855F7",
  },
});
