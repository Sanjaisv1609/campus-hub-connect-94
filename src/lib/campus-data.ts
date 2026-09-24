import techImage from "@/assets/event-tech.jpg";
import culturalImage from "@/assets/event-cultural.jpg";

export const events = [
  { title: "Robotics Innovation Sprint", category: "Technical", date: "OCT 14", time: "10:30 AM", location: "Innovation Lab", image: techImage },
  { title: "Campus Cultural Night", category: "Cultural", date: "OCT 18", time: "6:30 PM", location: "Central Quad", image: culturalImage },
  { title: "Inter-College Basketball", category: "Sports", date: "OCT 21", time: "4:00 PM", location: "Sports Arena", image: culturalImage },
  { title: "Portfolio & Resume Lab", category: "Workshop", date: "OCT 24", time: "2:00 PM", location: "Library Studio", image: techImage },
];

export const resources = [
  { title: "Data Structures Notes", type: "Notes", meta: "CS · Semester 3", size: "4.8 MB" },
  { title: "Signals & Systems 2025", type: "Question Papers", meta: "ECE · Semester 4", size: "2.1 MB" },
  { title: "Python Lab Manual", type: "Lab Materials", meta: "Common · Semester 2", size: "7.3 MB" },
  { title: "Placement Interview Kit", type: "Placement Resources", meta: "Career Cell · Updated", size: "12 MB" },
];

export const lostItems = [
  { title: "Navy water bottle", status: "Found", place: "Library · Level 2", date: "Today" },
  { title: "Silver headphones", status: "Lost", place: "Engineering Block", date: "Yesterday" },
  { title: "Student ID card", status: "Found", place: "Canteen", date: "Sep 22" },
  { title: "Black sketchbook", status: "Lost", place: "Auditorium", date: "Sep 20" },
];