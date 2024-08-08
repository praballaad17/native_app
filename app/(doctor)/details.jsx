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
    license: "",

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
          title="Resistration Number"
          value={form.number}
          placeholder={"your resistration number"}
          handleChangeText={(e) => setForm({ ...form, 
            number: e })}
            otherStyle="mt-7"
         //   keyboardType="email-address"
        />

        <FormField 
          title="License"
          value={form.password}
          placeholder={"your license number"}
          handleChangeText={(e) => setForm({ ...form, 
            password: e })}
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