import React from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export interface MessageProps {
    role: 'user' | 'assistant'
    messageContent: string
    isLoading: boolean
    children?: React.ReactNode
}

export function Message(props: MessageProps) {
    return (
        <>
            <div
                className={
                    props.role === "user" &&
                    props.isLoading
                        ? styles.usermessagewaiting
                        : props.role === "assistant"
                            ? styles.apimessage
                            : styles.usermessage
                }
            >
                <div className="flex flex-row">
                    {/* Display the correct icon depending on the message type */}
                    {props.role === "assistant" ? (
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
                                {props.messageContent}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    {props.children}
                </div>
            </div>
        </>
    );
}
