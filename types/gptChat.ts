
export type Role = 'user' | 'assistant';

export interface Message {
    role: Role;
    content: string;
}

export interface Settings {
    systemMessage: string,
    temperature: number,
    maximumLength: number,
    topP: number,
    frequencyPenalty: number,
    presencePenalty: number
}

export interface GptChatState {
    messages: Message[]
    settings: Settings
}
