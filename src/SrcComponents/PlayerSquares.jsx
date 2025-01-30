import React from "react";
import { formatTime, countryToContinentMap } from "../JsHelperScripts/utils";
const PlayerSquares = ({ player, dailyPlayer }) => {

    const otherMapsText = (playersMaps) => {
        const maps = [];

        if (playersMaps.newBabe) maps.push("New Babe+");
        if (playersMaps.ghostOfTheBabe) maps.push("Ghost Of The Babe");
        if (playersMaps.other) maps.push("other");

        if (maps.length == 0) maps.push("none");

        return maps.join(", ");
    }

    function rankCheck() {
        const errorRange = Math.abs(player.rank - dailyPlayer.rank);
        const arrow = player.rank < dailyPlayer.rank ? "down" : "up";

        if (errorRange <= 1) {
            return "green";
        } else if (errorRange <= 10) {
            return `orange ${arrow}`;
        } else {
            return `red ${arrow}`;
        }
    }

    function cycleCheck() {
        if (player.pb.cycle != dailyPlayer.pb.cycle) {
            return "red";
        } else {
            return "green";
        }
    }

    function pbDateCheck() {
        const playerDate = new Date(player.pb.date);
        const dailyDate = new Date(dailyPlayer.pb.date);

        const diffInMonths = Math.abs((playerDate.getFullYear() - dailyDate.getFullYear()) * 12 + (playerDate.getMonth() - dailyDate.getMonth()));
        const arrow = playerDate < dailyDate ? "up" : "down";

        if (diffInMonths <= 2) {
            return "green";
        } else if (diffInMonths <= 9) {
            return `orange ${arrow}`;
        } else {
            return `red ${arrow}`;
        }
    }

    function nationCheck() {
        if (player.nationality.code == dailyPlayer.nationality.code) {
            return "green";
        } else if (countryToContinentMap[player.nationality.code?.slice(0, 2)] == countryToContinentMap[dailyPlayer.nationality.code?.slice(0, 2)]) {
            return "orange";
        } else {
            return "red";
        }
    }

    function peakRankCheck() {
        const errorRange = Math.abs(player.peakPlace - dailyPlayer.peakPlace);
        const arrow = player.peakPlace < dailyPlayer.peakPlace ? "down" : "up";

        if (errorRange <= 1) {
            return "green";
        } else if (errorRange <= 10) {
            return `orange ${arrow}`;
        } else {
            return `red ${arrow}`;
        }
    }

    function mapsCheck() {
        const getMaps = (maps) => Object.keys(maps).filter(map => maps[map]);

        const playerMaps = getMaps(player.otherMaps);
        const dailyPlayerMaps = getMaps(dailyPlayer.otherMaps);

        if (playerMaps.toString() === dailyPlayerMaps.toString()) {
            return "green";
        } else if (dailyPlayerMaps.some(map => playerMaps.includes(map))) {
            return "orange";
        } else {
            return "red";
        }
    }

    function firstRunDateCheck() {
        const playerDate = new Date(player.firstRunDate);
        const dailyDate = new Date(dailyPlayer.firstRunDate);

        const diffInMonths = Math.abs((playerDate.getFullYear() - dailyDate.getFullYear()) * 12 + (playerDate.getMonth() - dailyDate.getMonth()));
        const arrow = playerDate < dailyDate ? "up" : "down";

        if (diffInMonths <= 2) {
            return "green";
        } else if (diffInMonths <= 9) {
            return `orange ${arrow}`;
        } else {
            return `red ${arrow}`;
        }
    }

    return (
        <div className="squareContainer">
            <div className="square">{player.name}</div>
            <div className={`square ${rankCheck()}`}>{player.rank} ({formatTime(player.pb.time)})</div>
            <div className={`square ${cycleCheck()}`}>{player.pb.cycle}</div>
            <div className={`square ${pbDateCheck()}`}>{player.pb.date}</div>
            <div className={`square ${nationCheck()}`}>{player.nationality.name ? player.nationality.name : "none"}</div>
            <div className={`square ${peakRankCheck()}`}>{player.peakPlace}</div>
            <div className={`square ${mapsCheck()}`}>{otherMapsText(player.otherMaps)}</div>
            <div className={`square ${firstRunDateCheck()}`}>{player.firstRunDate}</div>
        </div>
    )
}

export default PlayerSquares;