import {FileUploader} from "react-drag-drop-files";
import React, {useCallback} from "react";
import {GptChatState} from "@/types/gptChat";
import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";
import {parseJsonFile} from "@/utils/parseJsonFile";
import {Typography} from "@mui/material";

export function ImportArea() {
    const {setMessages, setSettings, setChatName} = useGptChatStore((state) => ({
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
            <Typography gutterBottom variant="h4">Import</Typography>
            <FileUploader handleChange={onUpload} types={["json"]} classes="file-uploader">
                <label
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-900 border-gray-500 hover:bg-gray-800 hover:border-gray-400">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-400"><span
                            className="font-semibold">Click to upload</span> or
                            drag and drop</p>
                        <p className="text-xs text-gray-400">Chat .JSON</p>
                    </div>
                </label>
            </FileUploader>
        </>
    )
}
