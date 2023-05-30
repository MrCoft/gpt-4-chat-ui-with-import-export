import {downloadFile} from "@/utils/downloadFile";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faFileArrowDown} from "@fortawesome/free-solid-svg-icons";
import {useCopyToClipboard} from "react-use";
import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";
import {GptChatState} from "@/types/gptChat";
import {useCallback, useMemo, useState} from "react";
import {Alert, Snackbar, Tooltip} from "@mui/material";

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

    const [open, setOpen] = useState(false);
    const [alertText, setAlertText] = useState("")

    const onCopyToClipboard = useCallback((value: string) => {
        copyToClipboard(value)
        setAlertText("Copied to clipboard")
        setOpen(true)
    }, [copyToClipboard, setOpen])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Tooltip TransitionProps={{timeout: 50}} title="Copy markdown to clipboard">
                <button className="w-4 m-2" onClick={() => {
                    onCopyToClipboard(stateToMarkdown({
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
            <Snackbar open={open} anchorOrigin={{vertical: "top", horizontal: "center"}} autoHideDuration={2500}
                      onClose={handleClose}>
                <Alert variant="filled" severity="success" sx={{width: '100%'}}>
                    {alertText}
                </Alert>
            </Snackbar>
        </>
    )
}
