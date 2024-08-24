import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import CustomDropdownSelect from "../../components/CustomDropDownSelect";

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

  const handleInputChange = (text, idx, field) => {
    const updatedMedicines = medicines.map((item, index) =>
      index === idx
        ? { ...item, [field]: text } // Update only the field of the object at this index
        : item
    );
    setMedicines(updatedMedicines);
  };

  const addMedecine = () => {
    //
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

  const dropdownOptions = [
    { label: "Select Any Option", value: "select" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
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
              <>
                <TextInput
                  key={idx}
                  className="border border-gray-400 px-2"
                  placeholder="Type here..."
                  value={item.name}
                  onChangeText={(text) => handleInputChange(text, idx, "name")}
                />

                <CustomDropdownSelect
                  options={dropdownOptions}
                  onSelect={handleSelect}
                />
              </>
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
