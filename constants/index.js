import icons from "./icons";
import images from "./images";
import URLS from "./url";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const USERS = {
  DOCTOR: "doctor",
  PATIENT: "patient",
  EXECUTIVE: "executive",
};

const PROFILETYPE = {
  DOCTOR: "doctorId",
  PATIENT: "patientId",
  EXECUTIVE: "executiveId",
};

const secondaryTabs = [
  {
    name: "Need help?",
    icon: <MaterialIcons name="help" size={24} color="black" />,
    url: "/need-help",
  },
  {
    name: "Settings",
    icon: <MaterialIcons name="settings" size={24} color="black" />,
    url: "/settings",
  },
  {
    name: "About us",
    icon: <MaterialIcons name="info" size={24} color="black" />,
    url: "/about-us",
  },
];

const CONSULTAREAS = [
  { key: "cardiologist", value: "Cardiologist (Heart)" },
  {
    key: "neurologist",
    value: "Neurologist (Nervous System, Brain, Spinal Cord)",
  },
  { key: "oncologist", value: "Oncologist (Cancerous Tissues and Organs)" },
  { key: "orthopedic", value: "Orthopedic Surgeon (Bones, Joints, Muscles)" },
  {
    key: "gastroenterologist",
    value: "Gastroenterologist (Digestive System: Stomach, Intestines, Liver)",
  },
  { key: "dermatologist", value: "Dermatologist (Skin, Hair, Nails)" },
  {
    key: "endocrinologist",
    value: "Endocrinologist (Hormonal System: Thyroid, Pancreas)",
  },
  { key: "pulmonologist", value: "Pulmonologist (Lungs, Respiratory System)" },
  { key: "nephrologist", value: "Nephrologist (Kidneys)" },
  { key: "rheumatologist", value: "Rheumatologist (Joints, Immune System)" },
  { key: "hematologist", value: "Hematologist (Blood)" },
  { key: "ophthalmologist", value: "Ophthalmologist (Eyes)" },
  {
    key: "urologist",
    value: "Urologist (Urinary Tract, Male Reproductive Organs)",
  },
  {
    key: "infectious",
    value:
      "Infectious Disease Specialist (Infectious Agents: Bacteria, Viruses, Fungi)",
  },
  {
    key: "pediatrician",
    value: "Pediatrician (Infants, Children, Adolescents)",
  },
];

const DATEOPTIONS = { month: "short", day: "numeric", year: "numeric" };

const GENDEROPTIONS = [
  { label: "select", value: "select" },
  { label: "male", value: "male" },
  { label: "female", value: "female" },
  { label: "other", value: "other" },
];

const BLOODGROUPOPTIONS = [
  { label: "select", value: "select" },
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

const EXECUTIVEFIELDS = [
  {
    label: "Name",
    key: "name",
    placeholder: "Enter name",
    type: "text",
  },
  {
    label: "Gender",
    key: "gender",
    placeholder: "Select the gender",
    type: "dropdown",
    options: GENDEROPTIONS,
  },
  {
    label: "Contact",
    key: "contact",
    placeholder: "Enter Contact details",
    type: "text",
  },
  {
    label: "Address",
    key: "address",
    placeholder: "Enter Address",
    type: "text",
  },
  {
    label: "Email",
    key: "email",
    placeholder: "Enter Email",
    type: "text",
  },
  //add date of birth
  {
    label: "Date Of Birth",
    key: "dob",
    placeholder: "Select the date of Birth",
    type: "date",
  }, //education
  {
    label: "Education",
    key: "education",
    placeholder: "Education details",
    type: "education",
  }, //skills
  {
    label: "Skills",
    key: "skills",
    placeholder: "Skills",
    type: "text",
  },
];

const DOCTORFIELDS = [
  {
    label: "Name",
    key: "name",
    placeholder: "Enter name",
    type: "text",
  },
  {
    label: "License",
    key: "license",
    placeholder: "Enter License number",
    type: "text",
  },
  {
    label: "Education",
    key: "education",
    placeholder: "Education details",
    type: "education",
  },
  {
    label: "Contact",
    key: "contact",
    placeholder: "Enter Contact details",
    type: "text",
  },
  {
    label: "Address",
    key: "address",
    placeholder: "Enter Address",
    type: "text",
  },
];

const PATIENTFIELDS = [
  {
    label: "Name",
    key: "name",
    placeholder: "Enter Patient name",
    type: "text",
  },
  {
    label: "Height",
    key: "height",
    placeholder: "Enter Height",
    type: "number",
  },
  {
    label: "Weight",
    key: "weight",
    placeholder: "Enter Weight",
    type: "number",
  },
  {
    label: "Blood Group",
    key: "bloodGrp",
    placeholder: "Enter Blood Group",
    type: "text",
  },
  {
    label: "Gender",
    key: "gender",
    placeholder: "Select the gender",
    type: "dropdown",
    options: GENDEROPTIONS,
  },
  {
    label: "Date Of Birth",
    key: "dob",
    placeholder: "Select the date of Birth",
    type: "date",
  },
  {
    label: "address",
    key: "address",
    placeholder: "Enter Address",
    type: "text",
  },
];

const FILETYPE = {
  MEDICALRECORD: "medical-records",
  PRESCRIPTION: "prescriptions",
  EXECUTIVERESUME: "executive-resume",
  PROFILEPHOTO: "profile-photo",
};

export {
  icons,
  URLS,
  images,
  USERS,
  secondaryTabs,
  CONSULTAREAS,
  DATEOPTIONS,
  GENDEROPTIONS,
  PATIENTFIELDS,
  DOCTORFIELDS,
  EXECUTIVEFIELDS,
  PROFILETYPE,
  FILETYPE,
  BLOODGROUPOPTIONS,
};
