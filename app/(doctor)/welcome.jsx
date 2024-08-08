import { View, Text } from 'react-native'
import { router } from "expo-router";
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton'

const Welcome = () => {
    const [isSubmitting,setIsSubmitting] = useState(false);
    const submit = () => {
        // do
    }

  return (
    <GestureHandlerRootView>
        <SafeAreaView className="h-full">
            <ScrollView>
            <View className="w-full justify-center min-h-[60vh] px-4 my-6">
                <Text className="text-2xl text-semibold mt-10 font-psemibold">Hi, Doctor</Text>
                <Text>get instant verification by the ulten team , just in two simple steps </Text>
                <CustomButton 
                    title={"Proceed"} 
                    handlePress={() =>  router.push('/details')} 
                    containerStyles="mt-7" isLoading={isSubmitting} />
            </View>
        </ScrollView>
        </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Welcome