import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface GptChat {
  systemMessage: string
  messages: { role: string, content: string }[]
  temperature: number
  maximumLength: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
}

const chatToJson = (chat: GptChat): string => {
  return JSON.stringify(chat, null, 2);
}

const downloadFile = (json: string, fileName: string ) => {
  // create file in browser
  const blob = new Blob([json], { type: "application/json" });
  const href = URL.createObjectURL(blob);

  // create "a" HTLM element with href to file
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! How can I help?" },
  ]);

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);


  // Auto scroll chat to bottom
  useEffect(() => {
    if (messageListRef.current) {
      const messageList = messageListRef.current;
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);

// Focus on input field
useEffect(() => {
  if (textAreaRef.current) {
    textAreaRef.current.focus();
  }
}, []);

  // Handle errors
  const handleError = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: "Oops! There seems to be an error. Please try again.",
      },
    ]);
    setLoading(false);
    setUserInput("");
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      return;
    }

    setLoading(true);
    const context = [...messages, { role: "user", content: userInput }];
    setMessages(context);

    // Send chat history to API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: context }),
    });

    // Reset user input
    setUserInput("");

    const data = await response.json();

    if (!data) {
      handleError();
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: data.result.content },
    ]);
    setLoading(false);
  };

  // Prevent blank submissions and allow for multiline input
  const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && userInput) {
      if (!e.shiftKey && userInput) {
        handleSubmit(e);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const [chatName, setChatName] = useState("My GPT Chat")

  const [systemMessage, setSystemMessage] = useState("You are a helpful assistant.")
  const [temperature, setTemperature] = useState(1)
  const [maximumLength, setMaximumLength] = useState(256)
  const [topP, setTopP] = useState(1)
  const [frequencyPenalty, setFrequencyPenalty] = useState(0)
  const [presencePenalty, setPresencePenalty] = useState(0)

  return (
    <>
      <Head>
        <title>Chat UI</title>
        <meta name="description" content="OpenAI interface" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.topnav}>
        <div className={styles.navlogo}>
          <Link href="/">Chat UI</Link>
        </div>
        <div className={styles.navlinks}>
          <a
            href="https://platform.openai.com/docs/models/gpt-4"
            target="_blank"
          >
            Docs
          </a>
          
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.cloud}>
          <div ref={messageListRef} className={styles.messagelist}>
            {messages.map((message, index) => {
              // The latest message sent by the user will be animated while waiting for a response
              return (
                <React.Fragment key={index}>
                  <div
                    className={
                      message.role === "user" &&
                      loading &&
                      index === messages.length - 1
                        ? styles.usermessagewaiting
                        : message.role === "assistant"
                        ? styles.apimessage
                        : styles.usermessage
                    }
                  >
                    <div className="flex flex-row">
                      {/* Display the correct icon depending on the message type */}
                      {message.role === "assistant" ? (
                        <Image
                          src="/openai.png"
                          alt="AI"
                          width="30"
                          height="30"
                          className={styles.boticon}
                          priority={true}
                        />
                      ) : (
                        <Image
                          src="/usericon.png"
                          alt="Me"
                          width="30"
                          height="30"
                          className={styles.usericon}
                          priority={true}
                        />
                      )}
                      <div>
                        <div className={styles.markdownanswer}>
                          {/* Messages are being rendered in Markdown format */}
                          <ReactMarkdown linkTarget={"_blank"}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="w-4 m-2" title="Download JSON" onClick={() => {
                        downloadFile(chatToJson({
                          systemMessage,
                          messages: messages.slice(0, index + 1),
                          temperature,
                          maximumLength,
                          topP,
                          frequencyPenalty,
                          presencePenalty
                        }), `${chatName}.chat.json`)
                      }}><FontAwesomeIcon icon={faFileArrowDown} size="xl" /></button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.cloudform}>
            <form onSubmit={handleSubmit}>
              <textarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                rows={1}
                maxLength={512}
                
                id="userInput"
                name="userInput"
                placeholder={
                  loading ? "Waiting for response..." : "Type your question..."
                }
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={styles.textarea}
              />
              <button
                type="submit"
                disabled={loading}
                className={styles.generatebutton}
              >
                {loading ? (
                  <div className={styles.loadingwheel}>
                    <CircularProgress color="inherit" size={20} />{" "}
                  </div>
                ) : (
                  // Send icon SVG in input field
                  <svg
                    viewBox="0 0 20 20"
                    className={styles.svgicon}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )}
              </button>
            </form>
          </div>
          <div className={styles.footer}>
            <p>
              Powered by{" "}
              <a href="https://openai.com/" target="_blank">
                OpenAI
              </a>
              . 
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
