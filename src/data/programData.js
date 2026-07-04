// Central data store for AS YOLO 2026
export const PROGRAM_DATA = {
  name: "AS YOLO 2026",
  tagline: "After School You Only Live Once",
  theme: "Purpose Before Pressure",
  subTheme: "Don't Just Exist. Discover. Decide. Live on Purpose. Live Bold. Live Purposeful. — Live Once.",
  date: "Saturday, 4th July 2026",
  time: "1:00 PM Prompt",
  venue: "Overcomers Nation Church, Opposite Ayrton Drug, Tesano",
  dressCode: "Smart Casual",
  entry: "Free — Invite a friend",
  targetAudience: ["JHS & SHS Leavers", "Continuing Students", "University Freshers"],
  focusAreas: ["Purpose Discovery", "Career Guidance", "Faith Walk", "Mentorship"],
  featuring: ["Dance", "Drama", "Poetic Expressions", "Praise", "and many more"],
  enquiries: ["0532458862", "0546363957"],
  mc: ["Michael Ameyaw", "Harriet Mensah"],
  org: {
    name: "The Haven - ONCYM",
    fullName: "The Haven - ONCYM (Youth Ministry of Overcomers Nation Church)",
    tagline: "Rooted in Christ, Rising in Purpose",
    partners: ["Overcomers Nation Church", "Extreme Partners"],
  },
};

export const PROGRAM_ACTIVITIES = [
  { id: 1, name: "Prayer Banquet", category: "Worship" },
  { id: 2, name: "Worship & Praise", category: "Worship" },
  { id: 3, name: "Confessions", category: "Worship" },
  { id: 4, name: "Purpose of Gathering", category: "Opening" },
  { id: 5, name: "Opening Dance", category: "Performance" },
  { id: 6, name: "Recorded Testimonies", category: "Inspiration" },
  { id: 7, name: "Talk Show / Interview with Graduates", category: "Talk" },
  { id: 8, name: "Guest Panel Discussion", category: "Talk" },
  { id: 9, name: "Drama", category: "Performance" },
  { id: 10, name: "Song Ministrations", category: "Worship" },
  { id: 11, name: "Combined Q&A with Guest Speakers", category: "Interactive" },
  { id: 12, name: "Hot Praises", category: "Worship" },
  { id: 13, name: "Poetry", category: "Performance" },
  { id: 14, name: "Main Song Ministration", category: "Worship" },
  { id: 15, name: "Dance Ministration", category: "Performance" },
  { id: 16, name: "Papa's Ministration (Word Ministration)", category: "Word" },
  { id: 17, name: "Awarding of Cards", category: "Ceremony" },
  { id: 18, name: "Cake Cutting", category: "Ceremony" },
  { id: 19, name: "Closing Remarks & Offering", category: "Closing" },
];

export const SPEAKERS = [
  {
    id: 1,
    name: "LP Esther Okronipa",
    topic: "Peer Pressure and the Power of Friendship",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
  },
  {
    id: 2,
    name: "Mrs. Abigail Akakpo",
    topic: "Relationships, Boundaries and God's Design",
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/30",
  },
  {
    id: 3,
    name: "Rev. Dr. Ebenezer Okronipa",
    topic: "Purpose Discovery and the Prophetic and Impactation for a Glorious Life",
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-500/30",
  },
  {
    id: 4,
    name: "Ms. Linda Neequaye",
    topic: "Making the Right Career Choice",
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    id: 5,
    name: "Ps. Wisdom Akakpo",
    topic: "Entrepreneurship & Future Readiness",
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
  },
];

export const PERFORMERS = [
  { name: "Spiders Dance Crew", role: "Dance" },
  { name: "Haven Creative Arts Unit", role: "Drama" },
];

export const SOCIAL_LINKS = [
  {
    id: 1,
    platform: "Facebook",
    handle: "The HAVEN ONYM",
    url: "https://www.facebook.com/profile.php?id=100070674480772",
    color: "#1877F2",
    bgClass: "from-blue-600/30 to-blue-800/30",
    borderClass: "border-blue-500/30",
    isLivestream: true,
    description: "Follow us and watch the Live Stream here",
  },
  {
    id: 2,
    platform: "YouTube",
    handle: "@overcomersnationchurch2041",
    url: "https://www.youtube.com/@overcomersnationchurch2041",
    color: "#FF0000",
    bgClass: "from-red-600/30 to-red-800/30",
    borderClass: "border-red-500/30",
    isLivestream: false,
    description: "Subscribe for messages and highlights",
  },
  {
    id: 3,
    platform: "Instagram",
    handle: "@overcomersnation",
    url: "https://www.instagram.com/overcomersnation",
    color: "#E1306C",
    bgClass: "from-pink-600/30 to-purple-700/30",
    borderClass: "border-pink-500/30",
    isLivestream: false,
    description: "Follow Overcomers Nation Church",
  },
  {
    id: 4,
    platform: "Instagram",
    handle: "@thehaven",
    url: "https://www.instagram.com/thehaven",
    color: "#E1306C",
    bgClass: "from-pink-500/30 to-rose-700/30",
    borderClass: "border-rose-500/30",
    isLivestream: false,
    description: "Follow The Haven — Rev. Dr. Ebenezer Okronipa",
  },
];

export const CATEGORIES = ["JHS/SHS Leaver", "Continuing Student", "University Fresher"];

// Google Sheets Apps Script Web App URL
// Paste your Web App URL inside the quotes below (e.g. "https://script.google.com/macros/s/AKfycb.../exec")
export const GOOGLE_SHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzIWObyjegunelplZnBeJLFFyffK9_F6cWzMpDbZs_cknBJn_bNiDcEGz_hyjgqOMzl/exec";

// localStorage helpers
export const STORAGE_KEY = "as_yolo_2026_registrations";

export const getRegistrations = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveRegistration = (reg) => {
  const existing = getRegistrations();
  const newReg = {
    ...reg,
    id: "REG-" + Math.floor(100000 + Math.random() * 900000), // Clean short ID
    registeredAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, newReg]));

  // Sync with Google Sheet in the background if configured
  if (GOOGLE_SHEET_SCRIPT_URL) {
    fetch(GOOGLE_SHEET_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Bypasses browser CORS errors with Google Script redirects
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReg)
    })
    .then(() => console.log('Synced registration with Google Sheet successfully.'))
    .catch(err => console.error('Google Sheet sync failed:', err));
  }

  return newReg;
};

