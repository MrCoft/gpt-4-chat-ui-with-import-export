import {downloadFile} from "@/utils/downloadFile";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faFileArrowDown} from "@fortawesome/free-solid-svg-icons";
import {useCopyToClipboard} from "react-use";
import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";
import {GptChatState} from "@/types/gptChat";
import {useMemo} from "react";
import {Tooltip} from "@mui/material";

const stateToJson = (state: GptChatState): string => {
    return JSON.stringify(state, null, 2);
}

const stateToMarkdown = (state: GptChatState): string => {
    const blocks = [] as string[]
    blocks.push("System Message")
    blocks.push(`\`\`\`\n${state.settings.systemMessage.trim()}\n\`\`\``)
    state.messages.forEach((message, index) => {
        blocks.push(`${message.role.charAt(0).toUpperCase() + message.role.slice(1)}`)
        blocks.push(`\`\`\`\n${message.content}\n\`\`\``)
    })
    return blocks.join("\n\n")
}

export interface MessageButtonsProps {
    messageIndex: number
}

export function MessageButtons(props: MessageButtonsProps) {
    const {messages, settings, chatName} = useGptChatStore((state) => ({
        messages: state.messages,
        settings: state.settings,
        chatName: state.chatName,
    }), shallow);

    const messagesUpToNow = useMemo(() =>
            messages.slice(0, props.messageIndex + 1),
        [messages, props.messageIndex]
    )

    const [_, copyToClipboard] = useCopyToClipboard();

    return (
        <>
            <Tooltip TransitionProps={{timeout: 50}} title="Copy markdown to clipboard">
                <button className="w-4 m-2" onClick={() => {
                    copyToClipboard(stateToMarkdown({
                        messages: messagesUpToNow,
                        settings,
                    }))
                }}>
                    <FontAwesomeIcon icon={faClipboard} size="xl"/>
                </button>
            </Tooltip>
            <Tooltip TransitionProps={{timeout: 50}} title="Download JSON">
                <button className="w-4 ml-1" onClick={() => {
                    downloadFile(stateToJson({
                        messages: messagesUpToNow,
                        settings,
                    }), `${chatName} chat msg ${props.messageIndex + 1}.json`)
                }}>
                    <FontAwesomeIcon icon={faFileArrowDown} size="xl"/>
                </button>
            </Tooltip>
        </>
    )
}
