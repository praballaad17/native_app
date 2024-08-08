import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';



const SignUp = () => {
  const [form, setForm] = useState({
    number: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {

  }

  return (
    <GestureHandlerRootView>
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">

          <Image source={images.logo}
            resizeMode='contain' className="w-[115px] h-[35px]" />
            <Text className="text-2xl text-semibold mt-10 font-psemibold">Sign Up</Text>
        <FormField 
          title="Number"
          value={form.number}
          placeholder={"number"}
          handleChangeText={(e) => setForm({ ...form, 
            number: e })}
            otherStyle="mt-7"
         //   keyboardType="email-address"
        />

        {/* <FormField 
          title="Password"
          value={form.password}
          placeholder={"password"}
          handleChangeText={(e) => setForm({ ...form, 
            password: e })}
            otherStyle="mt-7"
         //   keyboardType="email-address"
        /> */}

        <CustomButton 
        title={"Send OTP"} handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className=" justify-center pt-5 flex-row gap-2">
            <Text className="text-lg font-pregular">
              Already User!
            </Text>
            <Link className='text-secondary font-psemibold text-lg' href="/sign-in"> Log In</Link>
          </View>
        </View>
      </ScrollView> 
    </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default SignUp