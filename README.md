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
| ![stopWatch1](https://github.com/user-attachments/assets/95d97a84-4ec2-46e9-a180-4085d2d11d00)| ![StopWatch2](https://github.com/user-attachments/assets/deff9102-6236-416b-9c8b-77397bba22b0)| ![StopWatch3](https://github.com/user-attachments/assets/ab94df43-7232-4688-b04c-fde26b09d575)| ![StopWach4](https://github.com/user-attachments/assets/e153c02c-5929-4f95-9c3d-de5105f42180)
 |

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
