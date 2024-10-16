import icons from "./icons";
import images from "./images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const USERS = {
  DOCTOR: "doctor",
  PATIENT: "patient",
  EXECUTIVE: "executive",
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
export {
  icons,
  images,
  USERS,
  secondaryTabs,
  CONSULTAREAS,
  DATEOPTIONS,
  GENDEROPTIONS,
};
