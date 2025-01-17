import React from "react";
import { Paper } from "@mui/material";
import * as Utils from '../JsHelperScripts/utils.js';

const MistakeCount = ({ mistakeCount, guessStatus }) => {
    return (
        <Paper variant="outline" sx={{
            padding: "0.7rem",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            marginBottom: "0.5rem",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderTop: "none"
        }}>
            <p style={{ margin: 0, fontSize: "20px", color: guessStatus.isScreenGuessed ? Utils.gradientColor(mistakeCount) : "white" }}>Mistakes: {mistakeCount}</p>
        </Paper>
    )
}

export default MistakeCount;