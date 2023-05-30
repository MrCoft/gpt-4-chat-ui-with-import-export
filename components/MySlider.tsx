import {Grid, Input, Slider, Tooltip, Typography} from "@mui/material";
import {useCallback} from "react";
import {SliderValueLabelProps} from "@mui/material/Slider";

export interface MySliderProps {
    label: string
    value: number
    onChange: (value: number) => void;
    min: number
    max: number
    step: number
}

export function MySlider(props: MySliderProps) {
    const handleSliderChange = useCallback((event: Event, value: number | number[]) => {
        props.onChange(value as number)
    }, [props.onChange])

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value === '' ? 0 : Number(event.target.value));
    }, [props.onChange]);

    const handleBlur = useCallback(() => {
        if (props.value < props.min) {
            props.onChange(props.min);
        } else if (props.value > props.max) {
            props.onChange(props.max);
        }
    }, [props.value, props.onChange, props.min, props.max]);

    return (
        <>
            <Typography gutterBottom>{props.label}</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={props.value}
                        onChange={handleSliderChange}
                        min={props.min}
                        max={props.max}
                        step={props.step}
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={props.value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: props.step,
                            min: props.min,
                            max: props.max,
                            type: 'number',
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}
