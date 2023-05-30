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
            {/* 1.1 rem roboto white */}
            {/*<Box*/}
            {/*    component="form"*/}
            {/*    sx={{*/}
            {/*        '& .MuiTextField-root': {m: 1, width: '25ch'},*/}
            {/*    }}*/}
            {/*    noValidate*/}
            {/*    autoComplete="off"*/}
            {/*>*/}
            <TextField
                id="chatName"
                label="Chat file name"
                placeholder="My GPT Chat"
                multiline
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                className="w-full"
            />
            {/*</Box>*/}
            {/*<input*/}
            {/*    // className="text-[1.1rem] font-roboto ml-3 px-4 py-2 rounded-lg border border-[#30373d] bg-[#0e1524] text-[#ECECF1] outline-none"*/}
            {/*/>*/}
        </div>
    )
}
