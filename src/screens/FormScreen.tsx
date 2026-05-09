// src/screens/FormScreen.tsx

import { useEffect, useState } from "react";

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    ActivityIndicator,
} from "react-native";

import {
    useNavigation,
    useRoute,
    RouteProp,
} from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { gadgetService } from "../services/gadgetService";

import { RootStackParamList } from "../types/navigation";

type NavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

type RouteProps = RouteProp<
    RootStackParamList,
    "FormScreen"
>;

export default function FormScreen() {
    const navigation =
        useNavigation<NavigationProp>();

    const route: any = useRoute<RouteProps>();

    const gadgetId = route.params?.id;

    const isEditing = !!gadgetId;

    const [loading, setLoading] =
        useState(false);

    const [name, setName] = useState("");

    const [brand, setBrand] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [purchaseYear, setPurchaseYear] =
        useState("");

    useEffect(() => {
        if (isEditing) {
            loadGadget();
        }
    }, []);
    const validateForm = (): boolean => {
        if (name.trim() === "") {
            Alert.alert("Error", "El nombre no puede estar vacío");
            return false;
        }

        if (brand.trim() === "") {
            Alert.alert("Error", "La marca no puede estar vacía");
            return false;
        }

        if (category.trim() === "") {
            Alert.alert("Error", "La categoría no puede estar vacía");
            return false;
        }

        const priceNumber = Number(price);

        if (Number.isNaN(priceNumber) || priceNumber <= 0) {
            Alert.alert(
                "Error",
                "El precio debe ser un número mayor a 0",
            );
            return false;
        }

        const yearNumber = Number(purchaseYear);

        if (
            Number.isNaN(yearNumber) ||
            yearNumber < 2000 ||
            yearNumber > 2026
        ) {
            Alert.alert(
                "Error",
                "El año de compra debe ser un número entre 2000 y 2026",
            );
            return false;
        }

        return true;
    };
    const loadGadget = async () => {
        try {
            setLoading(true);

            const gadget =
                await gadgetService.getById(
                    gadgetId!,
                );

            if (!gadget) {
                Alert.alert(
                    "Error",
                    "Gadget no encontrado",
                );

                navigation.navigate("ListScreen");

                return;
            }

            setName(gadget.name);

            setBrand(gadget.brand);

            setCategory(gadget.category);

            setPrice(gadget.price.toString());

            setPurchaseYear(
                gadget.purchaseYear.toString(),
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }
        if (
            !name ||
            !brand ||
            !category ||
            !price ||
            !purchaseYear
        ) {
            Alert.alert(
                "Error",
                "Todos los campos son obligatorios",
            );

            return;
        }

        const priceNumber = Number(price);

        const yearNumber = Number(purchaseYear);

        if (priceNumber <= 0) {
            Alert.alert(
                "Error",
                "El precio debe ser mayor a 0",
            );

            return;
        }

        if (
            yearNumber < 2000 ||
            yearNumber > 2026
        ) {
            Alert.alert(
                "Error",
                "El año debe estar entre 2000 y 2026",
            );

            return;
        }

        if (isEditing) {
            Alert.alert(
                "Confirmación",
                "¿Estás seguro de actualizar este gadget?",
                [
                    {
                        text: "Cancelar",
                        style: "cancel",
                    },
                    {
                        text: "Actualizar",
                        onPress: async () => {
                            try {
                                await gadgetService.update(
                                    gadgetId!,
                                    {
                                        name,
                                        brand,
                                        category,
                                        price: priceNumber,
                                        purchaseYear: yearNumber,
                                    },
                                );

                                Alert.alert(
                                    "Éxito",
                                    "Gadget actualizado correctamente",
                                );

                                navigation.navigate("ListScreen");
                            } catch (error) {
                                console.log(error);

                                Alert.alert(
                                    "Error",
                                    "No se pudo actualizar",
                                );
                            }
                        },
                    },
                ],
            );
        } else {
            try {
                await gadgetService.create({
                    name,
                    brand,
                    category,
                    price: priceNumber,
                    purchaseYear: yearNumber,
                });

                Alert.alert(
                    "Éxito",
                    "Gadget registrado correctamente",
                );

                navigation.navigate("ListScreen");
            } catch (error) {
                console.log(error);

                Alert.alert(
                    "Error",
                    "No se pudo guardar",
                );
            }
        }
    };

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
        <ScrollView style={styles.container}>
            <Text style={styles.title}>
                {isEditing
                    ? "Editar Gadget"
                    : "Nuevo Gadget"}
            </Text>

            <Text style={styles.label}>
                Nombre
            </Text>

            <TextInput
                style={styles.input}
                placeholder="MacBook Pro 14"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>
                Marca
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Apple"
                value={brand}
                onChangeText={setBrand}
            />

            <Text style={styles.label}>
                Categoría
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Laptop"
                value={category}
                onChangeText={setCategory}
            />

            <Text style={styles.label}>
                Precio
            </Text>

            <TextInput
                style={styles.input}
                placeholder="1999.99"
                keyboardType="decimal-pad"
                value={price}
                onChangeText={setPrice}
            />

            <Text style={styles.label}>
                Año de compra
            </Text>

            <TextInput
                style={styles.input}
                placeholder="2024"
                keyboardType="numeric"
                value={purchaseYear}
                onChangeText={setPurchaseYear}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleSave}
            >
                <Text style={styles.buttonText}>
                    {isEditing
                        ? "Actualizar"
                        : "Guardar"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

import { appStyles as styles } from "../styles/appStyles";