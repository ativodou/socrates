# 🦉 SOCRATES

**School Management System**  
*Vers la lumière*

A modern, full-featured school management platform for tracking students, grades, and payments.

## Features

### MVP Features (Current)
- ✅ School registration & login (Firebase Auth)
- ✅ Student management (CRUD)
- ✅ Class/Subject management
- ✅ Grading periods configuration
- ✅ Grade entry & tracking
- ✅ Payment recording & tracking
- ✅ PDF Report Cards generation
- ✅ PDF Payment Receipts
- ✅ Parent Portal (view grades & payments)
- ✅ Balance tracking per student
- ✅ Dashboard with statistics

### Coming Soon
- 📱 SMS notifications (Twilio)
- 💳 Stripe subscription billing
- 👨‍🏫 Teacher accounts
- 📅 Attendance tracking
- 🎨 Custom school branding
- 📊 Advanced analytics
- 📤 Data export (Excel/CSV)

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Database:** Firebase Firestore
- **Auth:** Firebase Authentication
- **Storage:** Firebase Storage
- **Hosting:** Vercel (recommended)

## Getting Started

### 1. Clone & Install

```bash
cd socrates
npm install
```

### 2. Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password)
3. Enable **Firestore Database**
4. Get your config from Project Settings > General > Your Apps
5. Update `src/firebase.js` with your config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Firestore Rules

In Firebase Console > Firestore > Rules, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /schools/{schoolId} {
      allow read, write: if request.auth != null && request.auth.uid == schoolId;
      
      match /{subcollection}/{docId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 5. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Data Structure

```
schools/{schoolId}
├── students/{studentId}
│   ├── firstName, lastName
│   ├── gradeLevel
│   ├── enrolledClasses[]
│   ├── tuitionAmount
│   ├── parentEmail, parentPhone, parentPin
│
├── classes/{classId}
│   ├── name, teacher, room
│
├── gradingPeriods/{periodId}
│   ├── name, startDate, endDate
│
├── grades/{gradeId}
│   ├── studentId, classId, periodId, score
│
├── payments/{paymentId}
│   ├── studentId, amount, date, method, description
```

## Parent Portal Access

Parents can access their child's information using:
1. Email or Phone (registered with student)
2. 6-digit PIN (set by school admin)

They can view:
- Grades by subject
- Payment history
- Current balance
- Download report cards & receipts

## License

© 2024 SOCRATES. All rights reserved.

---

Built with ❤️ for education.
