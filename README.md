# ⏱ Stopwatch Timer App – React Native (Expo)

A beautiful and functional timer app built using **React Native** and **Expo**. Perfect for tracking tasks like studying, workouts, or short breaks. Set your task name, duration, and category — start the timer and stay focused!

---

## 🚀 How to Run the App

### 1. 📱 Install Expo Go  
Download the **Expo Go** app on your mobile device:  
- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)  
- [iOS](https://apps.apple.com/app/expo-go/id982107779)

### 2. 💻 Setup on Local Machine  
```bash
npm install       # install dependencies
npx expo start    # run the project
```

Then scan the QR code using the **Expo Go** app.

> ✅ To run on Android Emulator:
```bash
npx expo run:android
```

---

## ✨ Features

- 📝 Add a task with name, category, and duration (in seconds)
- ▶️ Start the countdown timer
- ⏸ Pause or 🔄 Reset the timer at any time
- 🔔 Get a halfway alert message
- 🎉 Get a completion alert message
- 📜 View completed tasks in the **History** screen
- 💾 Data is saved locally using AsyncStorage

---

## 📸 Screenshots

| Home Screen | Timer Running | Timer Completed | History |
|-------------|----------------|------------------|---------|
| ![stopWatch1](https://github.com/user-attachments/assets/cb1e8426-23a0-421f-818e-19d7e0ebfc97) | ![StopWatch2](https://github.com/user-attachments/assets/55dc035e-67cb-4139-b0c2-185679ef72e0) | ![StopWatch3](https://github.com/user-attachments/assets/0a13b175-5df6-4896-9fee-068971459ed2) | ![StopWach4](https://github.com/user-attachments/assets/52749ade-1099-4bf2-b996-f047cf7958e0) |

---

## 📖 Example Use Case

Want to study for 30 minutes?

1. Enter:
   - **Name**: "Study Session"
   - **Duration**: 1800
   - **Category**: Study

2. Click **Start**  
3. Get notified halfway through  
4. Celebrate when it completes  
5. Review it in your **history log**

---

## 🛠 Built With

- **React Native**
- **Expo**
- **AsyncStorage**
- **React Navigation**
