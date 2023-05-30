import {Typography, Box} from "@mui/material";
import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";
import {useCallback} from "react";
import {MySlider} from "@/components/MySlider";

export function Settings() {
    const {settings, setSettings} = useGptChatStore((state) => ({
        settings: state.settings,
        setSettings: state.actions.setSettings,
    }), shallow);

    const setTemperature = useCallback((temperature: number) => {
        setSettings({temperature})
    }, [setSettings])

    const setMaximumLength = useCallback((maximumLength: number) => {
        setSettings({maximumLength})
    }, [setSettings])

    const setTopP = useCallback((topP: number) => {
        setSettings({topP})
    }, [setSettings])

    const setFrequencyPenalty = useCallback((frequencyPenalty: number) => {
        setSettings({frequencyPenalty})
    }, [setSettings])

    const setPresencePenalty = useCallback((presencePenalty: number) => {
        setSettings({presencePenalty})
    }, [setSettings])

    return (
        <>
            <Typography gutterBottom variant="h4">Settings</Typography>
            {/*<Divider variant="middle" className="mb-4"/>*/}
            <Box>
                <MySlider
                    label="Temperature"
                    value={settings.temperature}
                    onChange={setTemperature}
                    min={0}
                    max={2}
                    step={0.01}
                />
                <MySlider
                    label="Maximum length"
                    value={settings.maximumLength}
                    onChange={setMaximumLength}
                    min={1}
                    max={2048}
                    step={1}
                />
                <MySlider
                    label="Top P"
                    value={settings.topP}
                    onChange={setTopP}
                    min={0}
                    max={1}
                    step={0.01}
                />
                <MySlider
                    label="Frequency penalty"
                    value={settings.frequencyPenalty}
                    onChange={setFrequencyPenalty}
                    min={0}
                    max={2}
                    step={0.01}
                />
                <MySlider
                    label="Presence penalty"
                    value={settings.presencePenalty}
                    onChange={setPresencePenalty}
                    min={0}
                    max={2}
                    step={0.01}
                />
            </Box>
        </>
    )
}
