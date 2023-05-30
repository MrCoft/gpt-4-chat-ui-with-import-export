import React, {useState, useRef, useEffect, FormEvent, KeyboardEvent, useCallback} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {Chat} from "@/components/Chat";
import {ImportArea} from "@/components/ImportArea";
import {Footer} from "@/components/Footer";
import {SystemMessage} from "@/components/SystemMessage";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Settings} from "@/components/Settings";
import {Typography} from "@mui/material";
import {ChatName} from "@/components/ChatName";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! How can I help?" },
  ]);

  return (
    <>
      {/*<Head>*/}
      {/*  <title>Chat UI</title>*/}
      {/*  <meta name="description" content="OpenAI interface" />*/}
      {/*  <meta name="viewport" content="width=device-width, initial-scale=1" />*/}
      {/*  <link rel="icon" href="/favicon.ico" />*/}
      {/*</Head>*/}
      {/*<div className={styles.topnav}>*/}
      {/*  <div className={styles.navlogo}>*/}
      {/*    <Link href="/">Chat UI</Link>*/}
      {/*  </div>*/}
      {/*  <div className={styles.navlinks}>*/}
      {/*    <a*/}
      {/*      href="https://platform.openai.com/docs/models/gpt-4"*/}
      {/*      target="_blank"*/}
      {/*    >*/}
      {/*      Docs*/}
      {/*    </a>*/}
      {/*    */}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="flex flex-col h-screen">
        <div className="flex-[1_1_0] flex flex-row gap-8 px-8 pt-8">
          <aside className="flex-[1_1_20%] overflow-auto">
            <ChatName />
            <Typography variant="h5" gutterBottom>
              Import
            </Typography>
            <ImportArea />
          </aside>
          <main className="flex-[1_1_60%]">
            <Chat />
          </main>
          <aside className="flex-[1_1_20%] overflow-auto">
            <SystemMessage />
            <Settings />
          </aside>
        </div>
        <Footer />
      </div>
    </>
  );
}
