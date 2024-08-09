import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { router } from "expo-router";
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';


const Details = () => {
  const [form, setForm] = useState({
    name: "",
    height: "",
    weight: "",
    bloodGrp: "",
    gender: "",
    dob: "",
    photo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    //
    router.push('/photo-upload')
  }

  return (
    <GestureHandlerRootView>
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className="w-full justify-center h-100 px-4 my-6">

          <Text className="text-2xl text-semibold mt-10 font-psemibold">Just little one more step, for our true warrior</Text>
        <FormField 
          title="Name"
          value={form.name}
          placeholder={"Name"}
          handleChangeText={(e) => setForm({ ...form, 
            name: e })}
            otherStyle="mt-7"
        />

        <FormField 
          title="Height"
          value={form.height}
          placeholder={"height"}
          handleChangeText={(e) => setForm({ ...form, 
            height: e })}
            otherStyle="mt-7"
        />

        <FormField 
          title="Blood Group"
          value={form.bloodGrp}
          placeholder={"blood group"}
          handleChangeText={(e) => setForm({ ...form, 
            bloodGrp: e })}
            otherStyle="mt-7"
        />

        <FormField 
          title="Date of Birth"
          value={form.dob}
          placeholder={"Date of Birth"}
          handleChangeText={(e) => setForm({ ...form, 
            dob: e })}
            otherStyle="mt-7"
        />

<FormField 
          title="Weight"
          value={form.weight}
          placeholder={"Weight"}
          handleChangeText={(e) => setForm({ ...form, 
            weight: e })}
            otherStyle="mt-7"
        />

        <FormField 
          title="Gender"
          value={form.gender}
          placeholder={"Gender"}
          handleChangeText={(e) => setForm({ ...form, 
            gender: e })}
            otherStyle="mt-7"
        />

        <CustomButton 
        title={"Proceed"} handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className=" justify-center pt-5 flex-row gap-2">
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Details