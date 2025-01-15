import { React } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';


const HardModeCheckbox = ({ guessStatus, hardModeState, setHardModeState }) => {

    const CustomTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        '& .MuiTooltip-tooltip': {
            backgroundColor: '#121212',
            fontSize: '15px',
            fontFamily: "JKFontBold"
        },
    });

    return (
        <CustomTooltip title="Random rotation and gray scale" placement="left">
            <FormGroup sx={{
                backgroundColor: "#121212",
                marginBottom: "0.5rem",
                paddingLeft: "0.7rem",
                borderEndEndRadius: "3px",
                borderEndStartRadius: "3px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderTop: "none"
            }}>
                <FormControlLabel control={<Checkbox checked={hardModeState} disabled={!hardModeState || guessStatus.isScreenGuessed} onChange={(e) => { setHardModeState(e.target.checked) }} />} sx={{
                    '& .MuiFormControlLabel-label': {
                        fontFamily: 'JKFontBold',
                        color: "white",
                    },
                }} label="Hard mode" />
            </FormGroup>
        </CustomTooltip >
    )
}

export default HardModeCheckbox;