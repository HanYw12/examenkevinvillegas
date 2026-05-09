import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListScreen from "./src/screens/ListScreen";
import FormScreen from "./src/screens/FormScreen";
import DetailScreen from "./src/screens/DetailScreen";

import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={{ title: "Inventario" }}
        />

        <Stack.Screen
          name="FormScreen"
          component={FormScreen}
          options={{ title: "Formulario" }}
        />

        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{ title: "Detalle Gadget" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}