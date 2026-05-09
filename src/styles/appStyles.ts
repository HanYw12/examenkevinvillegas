// src/styles/appStyles.ts

import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  // GENERAL
  container: {
    flex: 1,
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1E1B4B",
    marginBottom: 24,
  },

  list: {
    paddingBottom: 120,
  },

  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 17,
    color: "#6B7280",
    fontWeight: "500",
  },

  // CARD
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footer: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // TEXTS
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    flex: 1,
  },

  brand: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#312E81",
    marginBottom: 8,
  },

  value: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },

  year: {
    color: "#4B5563",
    fontWeight: "700",
    fontSize: 14,
  },

  category: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
    color: "#059669",
  },

  // CATEGORY
  categoryContainer: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 50,
  },

  // INPUTS
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: "#C7D2FE",
    color: "#111827",
  },

  // BUTTONS
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#4F46E5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },

  editButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 14,
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // FAB
  fab: {
    position: "absolute",
    bottom: 28,
    right: 24,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  fabText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: -2,
  },

  // DETAIL
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
});