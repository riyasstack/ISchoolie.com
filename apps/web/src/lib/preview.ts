export interface Course {
  id: string;
  title: string;
  category: string;
  teacher: string;
  description: string;
  lessons: number;
  duration: string;
  color: string;
  mark: string;
  progress: number;
}
export const courses: Course[] = [
  {
    id: "design",
    title: "The art of thinking clearly",
    category: "Design & creativity",
    teacher: "Ananya Rao",
    description:
      "Turn curiosity into a practice. Explore observation, visual thinking, and ideas that make a difference.",
    lessons: 12,
    duration: "2h 40m",
    color: "sage",
    mark: "Aa",
    progress: 42,
  },
  {
    id: "science",
    title: "A world of small wonders",
    category: "Science & discovery",
    teacher: "Kabir Sen",
    description:
      "Look closer at the everyday. Discover the systems, patterns, and experiments all around us.",
    lessons: 16,
    duration: "3h 20m",
    color: "peach",
    mark: "◌",
    progress: 18,
  },
  {
    id: "writing",
    title: "Find your voice in writing",
    category: "Language & expression",
    teacher: "Meera Iyer",
    description:
      "Build a writing habit, find your perspective, and tell stories that connect with people.",
    lessons: 10,
    duration: "2h 10m",
    color: "lavender",
    mark: "“",
    progress: 0,
  },
  {
    id: "math",
    title: "Mathematics, made visible",
    category: "Science & discovery",
    teacher: "Dev Patel",
    description:
      "Understand the ideas behind the equations through visual explanations and practical explorations.",
    lessons: 14,
    duration: "3h 05m",
    color: "sand",
    mark: "∑",
    progress: 0,
  },
];
export const people = [
  {
    name: "Ananya Rao",
    role: "Design educator · Visual thinking",
    subject: "Design",
    bio: "Helping curious minds turn observations into meaningful ideas.",
  },
  {
    name: "Kabir Sen",
    role: "Science educator · Inquiry-based learning",
    subject: "Science",
    bio: "Making room for questions, experiments, and small discoveries.",
  },
  {
    name: "Meera Iyer",
    role: "Writer & language educator",
    subject: "Language",
    bio: "Stories make learning personal. Let’s find yours.",
  },
  {
    name: "Dev Patel",
    role: "Mathematics mentor",
    subject: "Science",
    bio: "Finding the beautiful patterns hiding in everyday mathematics.",
  },
];
export interface Post {
  id: string;
  author: string;
  role: string;
  topic: string;
  body: string;
  likes: number;
  visual?: boolean;
}
export const posts: Post[] = [
  {
    id: "p1",
    author: "Ananya Rao",
    role: "Design educator",
    topic: "Teaching & learning",
    body: "A good question can change the whole classroom. This week, we started with “What do you notice?” instead of “What is the answer?” The conversations took us somewhere unexpected.\n\nWhat question has opened up learning for your students?",
    likes: 24,
    visual: true,
  },
  {
    id: "p2",
    author: "Kabir Sen",
    role: "Science educator",
    topic: "Science & discovery",
    body: "Learning doesn’t stop at the classroom door. A leaf, a shadow, a puddle after the rain — each is an invitation to investigate. Sharing three observation exercises for your next outdoor lesson.",
    likes: 18,
  },
];
export const lessons = [
  "Begin with curiosity",
  "The practice of observation",
  "Looking beyond the obvious",
  "Make connections",
  "Sketch your first idea",
  "Reflection & next steps",
];
export const roster = [
  { id: "EX-001", name: "Aarav Shah", class: "10 A", status: "Active" },
  { id: "EX-002", name: "Diya Menon", class: "10 A", status: "Active" },
  { id: "EX-003", name: "Ishaan Roy", class: "10 B", status: "Pending" },
  { id: "EX-004", name: "Riya Das", class: "10 A", status: "Active" },
  { id: "EX-005", name: "Vihaan Rao", class: "10 B", status: "Active" },
];
export const workspaceLinks = [
  { label: "Education network", href: "/app", role: "APP" },
  { label: "Student", href: "/app/student", role: "STU" },
  { label: "Educator", href: "/app/educator", role: "EDU" },
  { label: "Guardian", href: "/app/guardian", role: "PAR" },
  { label: "Tutor / professional", href: "/app/professional", role: "PRO" },
  { label: "Institution staff", href: "/org/example/students", role: "INS" },
  { label: "Platform operations", href: "/ops", role: "ADM" },
];
