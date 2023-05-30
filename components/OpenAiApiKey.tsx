import {Alert, AlertTitle, Button, Typography} from "@mui/material";

export interface OpenAiApiKeyProps {
    className?: string
}

export function OpenAiApiKey(props: OpenAiApiKeyProps) {
    return (
        <div className={props.className || ""}>
            <Typography gutterBottom variant="h4">OpenAI API Key</Typography>
            <Alert severity="info">
                {/*<AlertTitle>Info</AlertTitle>*/}
                API key has been set.
                {/*This is an info alert — <strong>check it out!</strong>*/}
            </Alert>
            <Alert severity="error">
                <AlertTitle>Info</AlertTitle>
                This is an info alert — <strong>check it out!</strong>
            </Alert>
            <Button color="error">
                Error
            </Button>
        </div>
    )
}
