# Web Speech API Demo

This is a React-based application that demonstrates the usage of the Web Speech API for speech recognition.

## Prerequisites

- Node.js (version 14.x or higher) installed on your machine.
- A modern web browser that supports the Web Speech API (e.g., Google Chrome version 25 or later).

## Getting Started

1. **Clone the repository:**

```
git clone https://github.com/f22labs/webspeech-api.git
```

2. **Navigate to the project directory:**

```
cd webspeech-api
```

3. **Install dependencies:**

```
yarn
```

4. **Start the development server:**

```
yarn dev
```

This will start the development server and open the application in your default web browser. The page will automatically reload if you make changes to the code.

## Using the Application

1. **Select a language and dialect:** Use the dropdown menus at the top of the page to select the desired language and dialect for speech recognition.

2. **Start speaking:** Click the "Start" button to begin speech recognition. The button will change to "Stop" while the recognition is in progress.

3. **View the transcription:** The recognized speech will be displayed in the results area below the buttons.

4. **Stop speaking:** Click the "Stop" button to stop the speech recognition.

## Troubleshooting

If you encounter any issues with the application, such as the microphone not working or the Web Speech API not being supported, the application will display the appropriate error message.

Make sure your microphone is properly configured and that you have granted the necessary permissions for the application to access the microphone. If the Web Speech API is not supported, you may need to upgrade to a newer version of your web browser.
