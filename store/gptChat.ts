import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {Message, Settings} from "@/types/gptChat";

interface GptChatState {
    messages: Message[]
    settings: Settings
    chatName: string
    actions: {
        setMessages: (messages: Message[]) => void;
        pushMessage: (message: Message) => void;
        setSettings: (settings: Partial<Settings>) => void;
        setChatName: (chatName: string) => void;
    };
}

export const useGptChatStore = create(devtools(
    immer<GptChatState>((set) => ({
        messages: [
            { role: "assistant", content: "Hi there! How can I help?" },
        ],
        settings: {
            systemMessage: "You are a helpful assistant.",
            temperature: 1,
            maximumLength: 256,
            topP: 1,
            frequencyPenalty: 0,
            presencePenalty: 0,
        },
        chatName: "My GPT Chat",

        actions: {
            setMessages: (messages) =>
                set((state) => {
                    state.messages = messages;
                }),

            pushMessage: (message) =>
                set((state) => {
                    state.messages.push(message);
                }),

            setSettings: (settings) =>
                set((state) => {
                    state.settings = { ...state.settings, ...settings };
                }),

            setChatName: (chatName: string) =>
                set((state) => {
                    state.chatName = chatName;
                }),
        }
    }))
));
