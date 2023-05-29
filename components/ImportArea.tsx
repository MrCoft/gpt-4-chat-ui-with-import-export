import {FileUploader} from "react-drag-drop-files";
import React, {useCallback} from "react";
import {GptChatState} from "@/types/gptChat";
import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";
import {parseJsonFile} from "@/utils/parseJsonFile";

export function ImportArea() {
    const { setMessages, setSettings } = useGptChatStore((state) => ({
        setMessages: state.actions.setMessages,
        setSettings: state.actions.setSettings,
    }), shallow);

    const onUpload = useCallback(async (file: File) => {
        const json = await parseJsonFile(file) as GptChatState
        setMessages(json.messages)
        setSettings(json.settings)
    }, [])

    return (
        <>
            <FileUploader handleChange={onUpload} types={["json"]}></FileUploader>
        </>
    )
}
