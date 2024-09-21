import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import the date picker component

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentSkill: "",
    skills: [],
    currentEducation: {
      institute: "",
      grade: "",
      From: new Date(),
      Till: new Date(),
    },
    education: [],
    currentExperience: {
      company: "",
      jobDetail: "",
      From: new Date(),
      Till: new Date(),
      isCurrent: false,
    },
    experience: [],
    showDatePicker: {
      EducationFrom: false,
      EducationTill: false,
      ExperienceFrom: false,
      ExperienceTill: false,
    },
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleNestedInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const addSkill = () => {
    if (formData.currentSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.currentSkill.trim()],
        currentSkill: "",
      });
    }
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, idx) => idx !== index),
    });
  };

  const addEducation = () => {
    const { institute, grade, From, Till } = formData.currentEducation;
    if (institute && grade && From && Till) {
      setFormData({
        ...formData,
        education: [...formData.education, { institute, grade, From, Till }],
        currentEducation: {
          institute: "",
          grade: "",
          From: new Date(),
          Till: new Date(),
        },
      });
    }
  };

  const removeEducation = (index) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, idx) => idx !== index),
    });
  };

  const addExperience = () => {
    const { company, jobDetail, From, Till, isCurrent } =
      formData.currentExperience;
    if (company && jobDetail && From && (Till || isCurrent)) {
      setFormData({
        ...formData,
        experience: [
          ...formData.experience,
          { company, jobDetail, From, Till, isCurrent },
        ],
        currentExperience: {
          company: "",
          jobDetail: "",
          From: new Date(),
          Till: new Date(),
          isCurrent: false,
        },
      });
    }
  };

  const removeExperience = (index) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, idx) => idx !== index),
    });
  };

  // Date pickers
  const showDatePicker = (section, field) => {
    setFormData({
      ...formData,
      showDatePicker: {
        ...formData.showDatePicker,
        [`${section}${field}`]: true,
      },
    });
  };

  const onDateChange = (event, selectedDate, section, field) => {
    const currentSection = "current" + section;
    const currentDate = selectedDate || formData[currentSection][field];
    setFormData({
      ...formData,
      [currentSection]: {
        ...formData[currentSection],
        [field]: currentDate,
      },
      showDatePicker: {
        ...formData.showDatePicker,
        [`${section}${field}`]: false,
      },
    });
  };

  const handleSubmit = () => {
    Alert.alert("Form Submitted", "Your resume details have been submitted!");
    console.log(formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Fill Resume Details</Text>

      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />

      {/* Phone */}
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => handleInputChange("phone", text)}
      />

      {/* Skills */}
      <Text style={styles.label}>Skills</Text>
      <View style={styles.skillsInputWrapper}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Add a skill"
          value={formData.currentSkill}
          onChangeText={(text) => handleInputChange("currentSkill", text)}
        />
        <Button title="Add" onPress={addSkill} />
      </View>
      <View style={styles.skillsContainer}>
        {formData.skills.map((skill, index) => (
          <TouchableOpacity
            key={index}
            style={styles.skillBadge}
            onPress={() => removeSkill(index)}
          >
            <Text style={styles.skillText}>{skill} ✕</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Education */}
      <Text style={styles.label}>Education</Text>
      <TextInput
        style={styles.input}
        placeholder="Institute Name"
        value={formData.currentEducation.institute}
        onChangeText={(text) =>
          handleNestedInputChange("currentEducation", "institute", text)
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Grade"
        value={formData.currentEducation.grade}
        onChangeText={(text) =>
          handleNestedInputChange("currentEducation", "grade", text)
        }
      />
      <Button
        title="From Date"
        onPress={() => showDatePicker("Education", "From")}
      />
      {formData.showDatePicker.EducationFrom && (
        <DateTimePicker
          value={formData.currentEducation.From}
          mode="date"
          display="default"
          onChange={(e, selectedDate) =>
            onDateChange(e, selectedDate, "Education", "From")
          }
        />
      )}
      <Button
        title="Till Date"
        onPress={() => showDatePicker("Education", "Till")}
      />
      {formData.showDatePicker.EducationTill && (
        <DateTimePicker
          value={formData.currentEducation.Till}
          mode="date"
          display="default"
          onChange={(e, selectedDate) =>
            onDateChange(e, selectedDate, "Education", "Till")
          }
        />
      )}
      <Button title="Add Education" onPress={addEducation} />
      <View style={styles.skillsContainer}>
        {formData.education.map((edu, index) => (
          <TouchableOpacity
            key={index}
            style={styles.rectangleBox}
            onPress={() => removeEducation(index)}
          >
            <Text style={styles.rectangleText}>
              {edu.institute} - {edu.grade} ({edu.From.toDateString()} to{" "}
              {edu.Till.toDateString()}) ✕
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Past Experience */}
      <Text style={styles.label}>Past Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={formData.currentExperience.company}
        onChangeText={(text) =>
          handleNestedInputChange("currentExperience", "company", text)
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Job Description"
        value={formData.currentExperience.jobDetail}
        onChangeText={(text) =>
          handleNestedInputChange("currentExperience", "jobDetail", text)
        }
      />
      <Button
        title="From Date"
        onPress={() => showDatePicker("Experience", "From")}
      />
      {formData.showDatePicker.ExperienceFrom && (
        <DateTimePicker
          value={formData.currentExperience.From}
          mode="date"
          display="default"
          onChange={(e, selectedDate) =>
            onDateChange(e, selectedDate, "Experience", "From")
          }
        />
      )}
      <Button
        title="Till Date"
        onPress={() => showDatePicker("Experience", "Till")}
      />
      {formData.showDatePicker.ExperienceTill && (
        <DateTimePicker
          value={formData.currentExperience.Till}
          mode="date"
          display="default"
          onChange={(e, selectedDate) =>
            onDateChange(e, selectedDate, "Experience", "Till")
          }
        />
      )}
      <Button title="Add Experience" onPress={addExperience} />
      <View style={styles.experienceContainer}>
        {formData.experience.map((exp, index) => (
          <TouchableOpacity
            key={index}
            style={styles.experienceBox}
            onPress={() => removeExperience(index)}
          >
            <Text style={styles.experienceText}>
              {exp.company} - {exp.jobDetail} ({exp.From.toDateString()} to{" "}
              {exp.Till ? exp.Till.toDateString() : "Present"}) ✕
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  skillsInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 20,
  },
  skillBadge: {
    backgroundColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  skillText: {
    fontSize: 16,
  },
  rectangleBox: {
    backgroundColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    width: "100%",
  },
  rectangleText: {
    fontSize: 16,
  },
  experienceContainer: {
    marginTop: 10,
  },
  experienceBox: {
    backgroundColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    width: "100%",
  },
  experienceText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ResumeForm;
