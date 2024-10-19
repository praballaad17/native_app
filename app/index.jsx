import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import useUserType from "../context/UserProvider";
import PatientHome from "./patient-tabs/patient-home";
import PatientDocument from "./patient-tabs/documents";
import PatientProfile from "./patient-tabs/patient-profile";
import Consult from "./patient-tabs/consult";
import DoctorProfile from "./doctor-tabs/doctor-profile";
import DoctorHome from "./doctor-tabs/doctor-home";
import ApointmentTab from "./doctor-tabs/apointments";
import PatientTabs from "./doctor-tabs/patient";
import ExecutiveDocument from "./executive-tabs/executive-documents";
import ExecutiveHome from "./executive-tabs/executive-home";
import ExecutiveProfile from "./executive-tabs/profile";
import ExecutivePatientTab from "./executive-tabs/executive-patient";
import { USERS } from "../constants";
import SignIn from "./(auth)/sign-in";

const ExecutiveTab = createBottomTabNavigator();
const PatientTab = createBottomTabNavigator();
const DoctorTab = createBottomTabNavigator();

const RootStack = createStackNavigator();

const PatientTabNavigator = () => (
  <PatientTab.Navigator>
    <PatientTab.Screen
      name="Home"
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name="home" size={24} color={color} focused={focused} />
        ),
      }}
      component={PatientHome}
    />
    <PatientTab.Screen
      name="Consult"
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <FontAwesome6
            name="user-doctor"
            size={24}
            color={color}
            focused={focused}
          />
        ),
      }}
      component={Consult}
    />
    <PatientTab.Screen
      name="Docuement"
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            name="documents"
            size={24}
            color={color}
            focused={focused}
          />
        ),
      }}
      component={PatientDocument}
    />
    <PatientTab.Screen
      name="Profile"
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name="home" size={24} color={color} focused={focused} />
        ),
      }}
      component={PatientProfile}
    />
  </PatientTab.Navigator>
);

const DoctorTabNavigator = () => (
  <DoctorTab.Navigator>
    <DoctorTab.Screen
      name="Home"
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name="home" size={24} color={color} focused={focused} />
        ),
      }}
      component={DoctorHome}
    />

    <DoctorTab.Screen
      name="Appointment"
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons
            name="calendar-month"
            size={24}
            color={color}
            focused={focused}
          />
        ),
      }}
      component={ApointmentTab}
    />
    <DoctorTab.Screen
      name="Patients"
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons
            name="health-and-safety"
            size={24}
            color={color}
            focused={focused}
          />
        ),
      }}
      component={PatientTabs}
    />
    <DoctorTab.Screen
      name="Profile"
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="home" size={24} color={color} />
        ),
      }}
      component={DoctorProfile}
    />
  </DoctorTab.Navigator>
);

const ExecutiveTabNavigator = () => (
  <ExecutiveTab.Navigator>
    <ExecutiveTab.Screen
      name="Home"
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name="home" size={24} color={color} focused={focused} />
        ),
      }}
      component={ExecutiveHome}
    />
    <ExecutiveTab.Screen
      name="Document"
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            name="documents"
            size={24}
            color={color}
            focused={focused}
          />
        ),
      }}
      component={ExecutiveDocument}
    />
    <ExecutiveTab.Screen
      name="Patient"
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons
            name="health-and-safety"
            size={24}
            color={color}
            // focused={focused}
          />
        ),
      }}
      component={ExecutivePatientTab}
    />
    <ExecutiveTab.Screen
      name="Profile"
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="home" size={24} color={color} />
        ),
      }}
      component={ExecutiveProfile}
    />
  </ExecutiveTab.Navigator>
);

const SwitchableNavigator = () => {
  const { userType } = useUserType();

  return (
    <>
      {userType === USERS.DOCTOR ? (
        <DoctorTabNavigator />
      ) : userType === USERS.PATIENT ? (
        <PatientTabNavigator />
      ) : userType === USERS.EXECUTIVE ? (
        <ExecutiveTabNavigator />
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default Index = () => {
  return (
    <NavigationContainer independent={true}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={SwitchableNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
