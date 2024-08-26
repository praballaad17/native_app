import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import CustomDropdownSelect from "../../components/CustomDropDownSelect";
import DosageTab from "../../components/DosageTab";
import FoodToggleButton from "../../components/FoodToggleButton";

const Prescription = () => {
  const params = useLocalSearchParams();
  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      route: "",
      duration: "",
    },
  ]);
  const [syntoms, setSyntoms] = useState();
  const [review, setReview] = useState();
  const [isAdding, setIsLoading] = useState(false);
  const [Option, setSelectedOption] = useState(null);
  const [isBeforeFood, setIsBeforeFood] = useState(true);
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const handleInputChange = (text, idx, field) => {
    const updatedMedicines = medicines.map((item, index) =>
      index === idx
        ? { ...item, [field]: text } // Update only the field of the object at this index
        : item
    );
    setMedicines(updatedMedicines);
  };

  const addMedecine = () => {
    setMedicines([
      ...medicines,
      {
        name: "",
        dosage: "",
        route: "",
        duration: "",
      },
    ]);
  };

  const removeMedecine = (index) => {
    const newMedicines = medicines;
    console.log(index, newMedicines.length);

    if (index >= 0 && index < newMedicines.length) {
      // Remove the object at the specified index
      newMedicines.splice(index, 1);
    } else {
      console.log("Index out of bounds");
    }

    setMedicines([...newMedicines]);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6 ">
            <Text className="font-bold">Syntom Description:</Text>
            <TextInput
              className="border h-[100px] border-gray-400 px-2"
              placeholder="Type here..."
              value={syntoms}
              multiline={true}
              onChangeText={setSyntoms}
            />
            <Text className="font-bold">Medication:</Text>
            {medicines.map((item, idx) => (
              <View className="bg-white p-4 my-2">
                <Text>Medecine: </Text>
                <TextInput
                  key={idx}
                  className="border border-gray-400 px-2"
                  placeholder="Type here..."
                  value={item.name}
                  onChangeText={(text) => handleInputChange(text, idx, "name")}
                />
                <DosageTab
                  selectedMeals={selectedMeals}
                  setSelectedMeals={setSelectedMeals}
                />

                <View className="items-center flex flex-row">
                  <Text className="font-psemibold">Duration: </Text>
                  <TextInput
                    className="border border-slate-300 my-2 px-3"
                    keyboardType="numeric"
                  />
                  <Text className="ml-2 font-psemibold">Days</Text>
                </View>
                <FoodToggleButton
                  isBeforeFood={isBeforeFood}
                  setIsBeforeFood={setIsBeforeFood}
                />
                <CustomButton
                  title={"Remove"}
                  handlePress={() => removeMedecine(idx)}
                  containerStyles="mt-7 min-h-[40px] bg-white border border-secondary"
                  textStyles="text-secondary"
                  isLoading={isAdding}
                />
              </View>
            ))}
            <CustomButton
              title={"Add Medecine"}
              handlePress={addMedecine}
              containerStyles="mt-7 min-h-[40px] bg-white border border-secondary"
              textStyles="text-secondary"
              isLoading={isAdding}
            />
            <Text className="font-bold">Doctors Remark:</Text>
            <TextInput
              className="border h-[100px] border-gray-400 px-2"
              placeholder="Type here..."
              value={review}
              multiline={true}
              onChangeText={setReview}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Prescription;
