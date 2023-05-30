import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";

export function ChatName() {
    const {chatName, setChatName} = useGptChatStore((state) => ({
        chatName: state.chatName,
        setChatName: state.actions.setChatName,
    }), shallow);

    return (
        <div className="mb-8 text-left">
            <label htmlFor="chatName" className="text-[1.1rem]">Chat file name:</label>
            <input
                id="chatName"
                placeholder="My GPT Chat"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                className="text-[1.1rem] ml-3 px-4 py-2 rounded-lg border border-[#30373d] bg-[#0e1524] text-[#ECECF1] outline-none"
            />
        </div>
    )
}
