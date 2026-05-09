import { useCallback, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import {
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { gadgetService } from "../services/gadgetService";

import { Gadget } from "../types/gadget";

import { RootStackParamList } from "../types/navigation";

type NavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

export default function ListScreen() {
    const navigation =
        useNavigation<NavigationProp>();

    const [gadgets, setGadgets] = useState<
        Gadget[]
    >([]);

    const [loading, setLoading] =
        useState<boolean>(true);

    const loadGadgets = async () => {
        try {
            setLoading(true);

            const data =
                await gadgetService.getAll();

            setGadgets(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadGadgets();
        }, []),
    );

    const renderItem = ({
        item,
    }: {
        item: Gadget;
    }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
                navigation.navigate(
                    "DetailScreen",
                    {
                        id: item.id,
                    },
                )
            }
        >
            <View style={styles.header}>
                <Text style={styles.name}>
                    {item.name}
                </Text>

                <Text style={styles.price}>
                    ${item.price.toFixed(2)}
                </Text>
            </View>

            <Text style={styles.brand}>
                {item.brand}
            </Text>

            <View style={styles.footer}>
                <View
                    style={styles.categoryContainer}
                >
                    <Text style={styles.category}>
                        {item.category}
                    </Text>
                </View>

                <Text style={styles.year}>
                    Año: {item.purchaseYear}
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View
                style={styles.loadingContainer}
            >
                <ActivityIndicator
                    size="large"
                    color="#2563EB"
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Gadget Inventory
            </Text>

            <FlatList
                data={gadgets}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={renderItem}
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.list
                }
                ListEmptyComponent={
                    <View
                        style={styles.emptyContainer}
                    >
                        <Text style={styles.emptyText}>
                            No hay gadgets registrados
                        </Text>
                    </View>
                }
            />

            {/* BOTÓN FLOTANTE */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() =>
                    navigation.navigate(
                        "FormScreen",
                    )
                }
            >
                <Text style={styles.fabText}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
    );
}

import { appStyles as styles } from "../styles/appStyles";