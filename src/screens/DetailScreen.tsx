// src/screens/DetailScreen.tsx

import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";

import {
    useNavigation,
    useRoute,
    RouteProp,
} from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { gadgetService } from "../services/gadgetService";
import { Gadget } from "../types/gadget";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type RouteProps = RouteProp<RootStackParamList, "DetailScreen">;

export default function DetailScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProps>();

    const { id } = route.params;

    const [gadget, setGadget] = useState<Gadget | null>(null);
    const [loading, setLoading] = useState(true);

    const loadGadget = async () => {
        try {
            const data = await gadgetService.getById(id);
            setGadget(data);
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "No se pudo cargar el gadget");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGadget();
    }, []);

    const handleDelete = () => {
        Alert.alert(
            "Eliminar",
            "¿Seguro que deseas eliminar este gadget?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        await gadgetService.delete(id);
                        navigation.goBack();
                    },
                },
            ],
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    if (!gadget) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Gadget no encontrado</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.name}>{gadget.name}</Text>
                <Text style={styles.brand}>{gadget.brand}</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Categoría:</Text>
                    <Text style={styles.value}>{gadget.category}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Precio:</Text>
                    <Text style={styles.price}>${gadget.price.toFixed(2)}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Año:</Text>
                    <Text style={styles.value}>{gadget.purchaseYear}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                    navigation.navigate("FormScreen", {
                        id: gadget.id,
                    })
                }
            >
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
            >
                <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );
}

import { appStyles as styles } from "../styles/appStyles";