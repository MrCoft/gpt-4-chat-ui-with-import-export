import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";
import {TextField} from "@mui/material";
import Box from '@mui/material/Box';

export function ChatName() {
    const {chatName, setChatName} = useGptChatStore((state) => ({
        chatName: state.chatName,
        setChatName: state.actions.setChatName,
    }), shallow);

    return (
        <div className="mb-8 text-left">
            <TextField
                id="chatName"
                label="Chat file name"
                placeholder="My GPT Chat"
                multiline
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                className="w-full"
                sx={{
                    '& .MuiInputBase-root': {
                        fontSize: '1.1rem'
                    },
                }}
            />
        </div>
    )
}
