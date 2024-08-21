import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  return (
    <div className="browser-landing" id="main">
      <SpeechDemo />
    </div>
  );
}

const langs = [
  ["Afrikaans", ["af-ZA"]],
  ["አማርኛ", ["am-ET"]],
  ["Azərbaycanca", ["az-AZ"]],
  ["বাংলা", ["bn-BD", "বাংলাদেশ"], ["bn-IN", "ভারত"]],
  ["Bahasa Indonesia", ["id-ID"]],
  ["Bahasa Melayu", ["ms-MY"]],
  ["Català", ["ca-ES"]],
  ["Čeština", ["cs-CZ"]],
  ["Dansk", ["da-DK"]],
  ["Deutsch", ["de-DE"]],
  [
    "English",
    ["en-AU", "Australia"],
    ["en-CA", "Canada"],
    ["en-IN", "India"],
    ["en-KE", "Kenya"],
    ["en-TZ", "Tanzania"],
    ["en-GH", "Ghana"],
    ["en-NZ", "New Zealand"],
    ["en-NG", "Nigeria"],
    ["en-ZA", "South Africa"],
    ["en-PH", "Philippines"],
    ["en-GB", "United Kingdom"],
    ["en-US", "United States"],
  ],
  [
    "Español",
    ["es-AR", "Argentina"],
    ["es-BO", "Bolivia"],
    ["es-CL", "Chile"],
    ["es-CO", "Colombia"],
    ["es-CR", "Costa Rica"],
    ["es-EC", "Ecuador"],
    ["es-SV", "El Salvador"],
    ["es-ES", "España"],
    ["es-US", "Estados Unidos"],
    ["es-GT", "Guatemala"],
    ["es-HN", "Honduras"],
    ["es-MX", "México"],
    ["es-NI", "Nicaragua"],
    ["es-PA", "Panamá"],
    ["es-PY", "Paraguay"],
    ["es-PE", "Perú"],
    ["es-PR", "Puerto Rico"],
    ["es-DO", "República Dominicana"],
    ["es-UY", "Uruguay"],
    ["es-VE", "Venezuela"],
  ],
  ["Euskara", ["eu-ES"]],
  ["Filipino", ["fil-PH"]],
  ["Français", ["fr-FR"]],
  ["Basa Jawa", ["jv-ID"]],
  ["Galego", ["gl-ES"]],
  ["ગુજરાતી", ["gu-IN"]],
  ["Hrvatski", ["hr-HR"]],
  ["IsiZulu", ["zu-ZA"]],
  ["Íslenska", ["is-IS"]],
  ["Italiano", ["it-IT", "Italia"], ["it-CH", "Svizzera"]],
  ["ಕನ್ನಡ", ["kn-IN"]],
  ["ភាសាខ្មែរ", ["km-KH"]],
  ["Latviešu", ["lv-LV"]],
  ["Lietuvių", ["lt-LT"]],
  ["മലയാളം", ["ml-IN"]],
  ["मराठी", ["mr-IN"]],
  ["Magyar", ["hu-HU"]],
  ["ລາວ", ["lo-LA"]],
  ["Nederlands", ["nl-NL"]],
  ["नेपाली भाषा", ["ne-NP"]],
  ["Norsk bokmål", ["nb-NO"]],
  ["Polski", ["pl-PL"]],
  ["Português", ["pt-BR", "Brasil"], ["pt-PT", "Portugal"]],
  ["Română", ["ro-RO"]],
  ["සිංහල", ["si-LK"]],
  ["Slovenščina", ["sl-SI"]],
  ["Basa Sunda", ["su-ID"]],
  ["Slovenčina", ["sk-SK"]],
  ["Suomi", ["fi-FI"]],
  ["Svenska", ["sv-SE"]],
  ["Kiswahili", ["sw-TZ", "Tanzania"], ["sw-KE", "Kenya"]],
  ["ქართული", ["ka-GE"]],
  ["Հայերեն", ["hy-AM"]],
  [
    "தமிழ்",
    ["ta-IN", "இந்தியா"],
    ["ta-SG", "சிங்கப்பூர்"],
    ["ta-LK", "இலங்கை"],
    ["ta-MY", "மலேசியா"],
  ],
  ["తెలుగు", ["te-IN"]],
  ["Tiếng Việt", ["vi-VN"]],
  ["Türkçe", ["tr-TR"]],
  ["اُردُو", ["ur-PK", "پاکستان"], ["ur-IN", "بھارت"]],
  ["Ελληνικά", ["el-GR"]],
  ["български", ["bg-BG"]],
  ["Русский", ["ru-RU"]],
  ["Српски", ["sr-RS"]],
  ["Українська", ["uk-UA"]],
  ["한국어", ["ko-KR"]],
  [
    "中文",
    ["cmn-Hans-CN", "普通话 (中国大陆)"],
    ["cmn-Hans-HK", "普通话 (香港)"],
    ["cmn-Hant-TW", "中文 (台灣)"],
    ["yue-Hant-HK", "粵語 (香港)"],
  ],
  ["日本語", ["ja-JP"]],
  ["हिन्दी", ["hi-IN"]],
  ["ภาษาไทย", ["th-TH"]],
];

const SpeechDemo = () => {
  const [final_transcript, setFinalTranscript] = useState("");
  const [interim_transcript, setInterimTranscript] = useState("");
  const [recognizing, setRecognizing] = useState(false);
  const [start_timestamp, setStartTimestamp] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(10);
  const [selectedDialect, setSelectedDialect] = useState(11);
  const [showInfo, setShowInfo] = useState("info_start");
  const [buttonText, setButtonText] = useState("Start");
  const recognition = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onstart = () => {
        setRecognizing(true);
        setShowInfo("info_speak_now");
        setButtonText("Stop");
      };

      recognition.current.onerror = (event) => {
        if (event.error === "no-speech") {
          setShowInfo("info_no_speech");
        } else if (event.error === "audio-capture") {
          setShowInfo("info_no_microphone");
        } else if (event.error === "not-allowed") {
          if (event.timeStamp - start_timestamp < 100) {
            setShowInfo("info_blocked");
          } else {
            setShowInfo("info_denied");
          }
        }
      };

      recognition.current.onend = () => {
        setRecognizing(false);
        setButtonText("Start");
        if (!final_transcript) {
          setShowInfo("info_start");
          return;
        }
        setShowInfo("");
      };

      recognition.current.onresult = (event) => {
        let interim_transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setFinalTranscript(
              (prevTranscript) =>
                prevTranscript + event.results[i][0].transcript
            );
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        setInterimTranscript(interim_transcript);
        if (final_transcript || interim_transcript) {
          setShowInfo("");
        }
      };
    } else {
      setShowInfo("info_upgrade");
    }
  }, []);

  const startButton = (event) => {
    if (recognizing) {
      recognition.current.stop();
      return;
    }
    setFinalTranscript("");
    recognition.current.lang = langs[selectedLanguage][selectedDialect][0];
    recognition.current.start();
    setShowInfo("info_allow");
    setStartTimestamp(event.timeStamp);
  };

  return (
    <>
      <div>
        <h1>Web Speech API</h1>
        <div className="compact marquee" id="div_language">
          <select
            id="select_language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {langs.map((lang, i) => (
              <option key={i} value={i}>
                {lang[0]}
              </option>
            ))}
          </select>
          <select
            id="select_dialect"
            value={selectedDialect}
            onChange={(e) => setSelectedDialect(e.target.value)}
            style={{
              visibility:
                langs[selectedLanguage].length === 2 ? "hidden" : "visible",
            }}
          >
            {langs[selectedLanguage].slice(1).map((dialect, i) => (
              <option key={i} value={i}>
                {dialect[1]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p
            id="info_start"
            style={{ display: showInfo === "info_start" ? "block" : "none" }}
          >
            Click on the microphone icon and begin speaking for as long as you
            like.
          </p>
          <p
            id="info_speak_now"
            style={{
              display: showInfo === "info_speak_now" ? "block" : "none",
            }}
          >
            Speak now.
          </p>
        </div>
        <div id="results">
          <span className="final">{final_transcript}</span>
          <span className="interim">{interim_transcript}</span>
        </div>
      </div>
      <div id="start_stop_button">
        <button onClick={startButton}>{buttonText}</button>
      </div>
    </>
  );
};
export default App;
