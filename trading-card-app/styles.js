import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FAFAFA",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardContainer: {
    flexDirection: 'row', 
    alignItems: "left",
    marginBottom: 20,
    backgroundColor: "#ffffffff",
    borderRadius: 10,
  },
  cardInfoContainer: {
    flexDirection: 'column', 
    alignItems: "left",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: "AdventPro-Medium",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  cardImage: {
    width: 141,
    height: 200,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
  },
  verticalLine: {
    display: 'inline-block',
    width: 1.5,
    height: '95%',
    backgroundColor: 'black',
    marginTop: "2.5%",
    marginLeft: 15,
  },
  pollContainer: {
    marginTop: 10,
  },
  pollQuestion: {
    fontSize: 16,
    marginBottom: 10,
  },
  pollOption: {
    padding: 10,
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    marginVertical: 5,
  },
  /* Search screen styles */
  searchBar: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  tabButtonActive: {
    backgroundColor: "#f16513ff",
  },
  tabText: {
    color: "#333",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  cardItem: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    marginHorizontal: 6,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    elevation: 1,
  },
  cardThumb: {
    width: 72,
    height: 108,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  /* Home improvements */
  hero: {
    height: 220,
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.32)",
  },
  heroContent: {
    padding: 16,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  heroSubtitle: {
    color: "#fff",
    marginTop: 6,
    fontSize: 13,
  },
  ctaButton: {
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  ctaText: {
    color: "#fff",
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
    marginBottom: 8,
  },
  featuredItem: {
    width: 140,
    marginRight: 12,
  },
  featuredThumb: {
    width: 140,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  featuredMeta: {
    padding: 8,
  },
  featuredTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  featuredSubtitle: {
    color: "#fff",
    fontSize: 11,
    opacity: 0.9,
    marginTop: 4,
  },
  /* Settings screen styles */
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
  },
  profilePicLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#eee",
  },
  section: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 15,
  },
  input: {
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 6,
  },
  saveButton: {
    backgroundColor: "#f16513ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  /* Collection styles */
  collectionFilters: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: '#f2f2f2',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#f16513ff',
  },
  filterText: {
    color: '#333',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  collectionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 1,
  },
  collectionImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#eee',
  },
  collectionInfo: {
    padding: 8,
  },
  collectionName: {
    fontSize: 14,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#eee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '700',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
});
