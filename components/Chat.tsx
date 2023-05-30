import CircularProgress from "@mui/material/CircularProgress";
import {FormEvent, useCallback, useState, KeyboardEvent, useRef, useEffect} from "react";
import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";
import {Message} from "@/components/Message";
import {MessageButtons} from "@/components/MessageButtons";
import {Role} from "@/types/gptChat";
import {ChatName} from "@/components/ChatName";
import {TextareaAutosize} from "@mui/material";

export function Chat() {
    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messageListRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const { messages, pushMessage } = useGptChatStore((state) => ({
        messages: state.messages,
        pushMessage: state.actions.pushMessage,
    }), shallow);

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
    const handleError = useCallback(() => {
        pushMessage({
            role: "assistant",
            content: "Oops! There seems to be an error. Please try again.",
        })
        setIsLoading(false);
        setUserInput("");
    }, [pushMessage]);

    // Handle form submission
    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        if (userInput.trim() === "") {
            return;
        }

        setIsLoading(true);
        const message = { role: "user" as Role, content: userInput };
        pushMessage(message);

        // Send chat history to API
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages: [...messages, message] }),
        });

        // Reset user input
        setUserInput("");

        const data = await response.json();

        if (!data) {
            handleError();
            return;
        }

        pushMessage({ role: "assistant", content: data.result.content });
        setIsLoading(false);
    }, [handleError, messages, pushMessage, userInput]);

    // Prevent blank submissions and allow for multiline input
    const handleEnter = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && userInput) {
            if (!e.shiftKey && userInput) {
                handleSubmit(e);
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
        }
    }, [handleSubmit, userInput]);

    return (
        <div className="flex flex-col h-full">
            {/*Chat area*/}
            <div className="w-full flex-[1_0_0] overflow-y-auto bg-[#0e1524] rounded-lg border border-[#30373d] flex justify-center items-center">
                {/*Scroller*/}
                <div ref={messageListRef} className="w-full h-full overflow-y-auto rounded-lg">
                    {messages.map((message, index) =>
                        <Message
                            key={index}
                            role={message.role}
                            messageContent={message.content}
                            isLoading={isLoading && index === messages.length - 1}
                        >
                            {message.role === "assistant" && index > 0 && <MessageButtons messageIndex={index} />}
                        </Message>
                    )}
                </div>
            </div>

            <div className="pt-8">
                <div className="relative mb-[-7px]">
                    <form onSubmit={handleSubmit}>
                        <TextareaAutosize
                            disabled={isLoading}
                            onKeyDown={handleEnter}
                            ref={textAreaRef}
                            autoFocus={false}
                            maxLength={512}
                            placeholder={isLoading ? "Waiting for response..." : "Type your question..."}
                            id="userInput"
                            name="userInput"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="w-full rounded-lg border border-[#30373d] bg-[#0e1524] text-[#ECECF1] outline-none px-8 py-4 text-[1.1rem]"
                            />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="absolute bottom-[1.5rem] right-4 color-[#a5a2a2] bg-transparent p-[0.3rem] border-none flex"
                        >
                            {
                                isLoading ? (
                                    <div className="absolute top-[0.2rem] right-[0.25rem]">
                                        <CircularProgress color="inherit" size={20} />
                                    </div>
                                ) : (
                                    // Send icon SVG in input field
                                    <svg
                                        viewBox="0 0 20 20"
                                        className="rotate-90 w-[1.2rem] h-[1.2rem] fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                )
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
