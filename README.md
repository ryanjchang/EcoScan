# Mata - Gamified Sustainability 

**Turn green actions into rewards.** Mata is a mobile app that uses AI to verify and reward users for sustainable activities, making environmental responsibility fun and engaging.

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

---

##  **The Problem**

People want to be more sustainable, but lack motivation and a way to track their environmental impact. Traditional sustainability apps are boring, don't provide immediate feedback, and can't verify if users are actually taking eco-friendly actions.

##  **Our Solution**

Mata gamifies sustainability by:
- **AI-Powered Verification** - Take photos of eco-actions, GPT-4 Vision validates them
- **Points & Rewards** - Earn points for verified sustainable activities
-  **Impact Tracking** - See your real CO₂ savings in grams
-  **Leaderboards** - Compete with friends and the community
-  **Persistent Progress** - All data saved to the cloud

---

##  **Features**

### **AI-Powered Action Verification**
- GPT-4 Vision API analyzes photos to verify eco-friendly actions
- Detects: reusable bottles, recycling, biking, composting, and more
- Provides confidence scores and reasoning
- Estimates CO₂ savings for each action

### **Core Functionality**
- **Sign Up/Login** - Email/password authentication via Firebase
- **Camera Integration** - Native camera to capture eco-actions in real-time
- **Points System** - Earn points based on action type and impact
- **Dashboard** - View total points, actions taken, and CO₂ saved
- **Leaderboard** - See how you rank against other users
- **History** - Track all your verified eco-actions with timestamps

###  **Gamification**
- Animated reward popups when actions are verified
- Different point values for different action types
- CO₂ impact calculator (converts savings to km not driven)
- Visual progress tracking

---

##  **Tech Stack**

| Technology | Purpose |
|------------|---------|
| **React Native (Expo)** | Cross-platform mobile framework |
| **TypeScript** | Type-safe development |
| **Firebase Auth** | User authentication |
| **Firestore** | Cloud database for user data persistence |
| **OpenAI GPT-4 Vision** | AI image analysis and verification |
---

##  **How AI Verification Works**

1. **User captures photo** of eco-friendly action
2. **Image converted to base64** for API transmission
3. **Sent to GPT-4 Vision API** with specialized prompt
4. **AI analyzes** and returns JSON:
   ```json
   {
     "isEcoFriendly": true,
     "actionType": "bottle",
     "confidence": 85,
     "reasoning": "Shows a reusable water bottle being refilled",
     "estimatedCO2Saved": 75,
     "impactDescription": "Equal to 0.4km not driven by car"
   }
   ```
5. **Verification logic**:
   - High confidence (60%+) → Auto-approve
   - Low confidence (<60%) → Ask user confirmation
   -  Not eco-friendly → Reject with explanation
6. **Points awarded** and data saved to Firestore

**Cost**: ~$0.001 per verification using `gpt-4o-mini` model

---

## **Design Principles**

- **Green-first color palette** - Emerald and teal gradients
- **Mobile-optimized** - Touch-friendly buttons, proper spacing
- **Instant feedback** - Animations and loading states
- **Clear hierarchy** - Important actions prominently displayed
- **Accessibility** - High contrast, readable fonts

---

##  **Future Enhancements**

- [ ] Social features (share achievements, challenge friends)
- [ ] Daily/weekly challenges
- [ ] Push notifications for reminders
- [ ] Carbon offset partnerships
- [ ] Integration with fitness trackers for bike commutes

---
