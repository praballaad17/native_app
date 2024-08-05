import {TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { isLoading } from 'expo-font'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    //<GestureHandlerRootView>
        <TouchableOpacity 
          className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
          disabled={isLoading}
          onPress={handlePress}
        >
         <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
          {title}
          </Text>
        </TouchableOpacity>
    //</GestureHandlerRootView>
  )
}

export default CustomButton