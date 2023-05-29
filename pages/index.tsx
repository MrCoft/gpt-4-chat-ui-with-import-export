import React, {useState, useRef, useEffect, FormEvent, KeyboardEvent, useCallback} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {useCopyToClipboard} from "react-use";
import {Chat} from "@/components/Chat";
import {ImportArea} from "@/components/ImportArea";
import {Footer} from "@/components/Footer";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! How can I help?" },
  ]);

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
        <Chat />
        <Footer />
        <ImportArea />
      </main>
    </>
  );
}
