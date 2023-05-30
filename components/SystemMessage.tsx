import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";
import {useCallback} from "react";
import {TextField} from "@mui/material";

export function SystemMessage() {
    const {systemMessage, setSettings} = useGptChatStore((state) => ({
        systemMessage: state.settings.systemMessage,
        setSettings: state.actions.setSettings,
    }), shallow);

    const setSystemMessage = useCallback((systemMessage: string) => {
        setSettings({systemMessage})
    }, [setSettings])

    return (
        <div className="w-full h-[20rem] mb-8 text-left">
            <TextField
                id="systemMessage"
                name="systemMessage"
                label="System message"
                placeholder={"You are a helpful assistant."}
                multiline
                minRows={4}
                maxRows={12}
                value={systemMessage}
                onChange={(e) => setSystemMessage(e.target.value)}
                className="w-full"
            />
            {/*// className="text-[1.1rem] ml-3 px-4 py-2 rounded-lg border border-[#30373d] bg-[#0e1524] text-[#ECECF1]*/}
            {/*outline-none"*/}
        </div>
    )
}
