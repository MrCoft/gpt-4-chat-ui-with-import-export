import {FileUploader} from "react-drag-drop-files";
import React, {useCallback} from "react";
import {GptChatState} from "@/types/gptChat";
import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";
import {parseJsonFile} from "@/utils/parseJsonFile";

export function ImportArea() {
    const { setMessages, setSettings, setChatName } = useGptChatStore((state) => ({
        setMessages: state.actions.setMessages,
        setSettings: state.actions.setSettings,
        setChatName: state.actions.setChatName
    }), shallow);

    const onUpload = useCallback(async (file: File) => {
        const json = await parseJsonFile(file) as GptChatState
        setMessages(json.messages)
        setSettings(json.settings)
        {
            let name = file.name
            // NOTE: remove extension
            name = name.split(".").slice(0, -1).join(".").trim()
            while (true) {
                const msgNumberMatch = name.match(/(.*?)\d+/)
                if (msgNumberMatch != null) {
                    name = msgNumberMatch[1]
                    continue
                }
                const duplicateFileMatch = name.match(/(.*?)\(\d+\)/)
                if (duplicateFileMatch != null) {
                    name = duplicateFileMatch[1]
                    continue
                }
                const suffixMatch = name.match(/(.*?) chat msg/)
                if (suffixMatch != null) {
                    name = suffixMatch[1]
                    continue
                }
                break
            }
            setChatName(name)
        }
    }, [setMessages, setSettings, setChatName])

    return (
        <>
            <FileUploader handleChange={onUpload} types={["json"]}></FileUploader>
        </>
    )
}
