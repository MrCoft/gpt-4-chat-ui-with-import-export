import {Slider, Tooltip, Typography} from "@mui/material";
import {SliderValueLabelProps} from "@mui/material/Slider";
import {useGptChatStore} from "@/store/gptChat";
import {shallow} from "zustand/shallow";
import {useCallback} from "react";

function ValueLabelComponent(props: SliderValueLabelProps) {
    const { children, value } = props;

    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

export function Settings() {
    const { settings, setSettings } = useGptChatStore((state) => ({
        settings: state.settings,
        setSettings: state.actions.setSettings,
    }), shallow);

    const setFrequencyPenalty = useCallback((event:Event, frequencyPenalty: number | number[]) => {
        setSettings({ frequencyPenalty: frequencyPenalty as number })
    }, [setSettings])

    return (
        <div className="w-50">
            <Typography gutterBottom>Top P {settings.frequencyPenalty}</Typography>
            <Slider
                valueLabelDisplay="auto"
                slots={{valueLabel: ValueLabelComponent}}
                value={settings.frequencyPenalty}
                onChange={setFrequencyPenalty}
            />
        </div>
    )
}
