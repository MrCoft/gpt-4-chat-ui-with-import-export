import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";
import {useCallback} from "react";

export function SystemMessage() {
    const { systemMessage, setSettings } = useGptChatStore((state) => ({
        systemMessage: state.settings.systemMessage,
        setSettings: state.actions.setSettings,
    }), shallow);

    const setSystemMessage = useCallback((systemMessage: string) => {
        setSettings({ systemMessage })
    }, [setSettings])

    return (
        <div className="w-full mb-8 text-left">
            <label htmlFor="chatName" className="text-[1.1rem]">System message:</label>
            <input
                id="chatName"
                placeholder=""
                value={systemMessage}
                onChange={(e) => setSystemMessage(e.target.value)}
                className="text-[1.1rem] ml-3 px-4 py-2 rounded-lg border border-[#30373d] bg-[#0e1524] text-[#ECECF1] outline-none"
            />
        </div>
    )
}
