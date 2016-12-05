/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import SettingsDataDAO from '../dao/SettingsDataDAO';

export function changeColor(color, flag=true) {
    if(flag) {
        let dao = new SettingsDataDAO();
        dao.saveThemeColor(color);
    }

    return {
        type: TYPES.CHANGE_COLOR,
        color: color
    };
}

export function changeShowThumbnail(value, flag=true) {
    if(flag) {
        let dao = new SettingsDataDAO();
        dao.saveShowThumbnail(value);
    }

    if(value) {
        return {
            type: TYPES.OPEN_SHOW_THUMBNAIL
        };
    }else {
        return {
            type: TYPES.CLOSE_SHOW_THUMBNAIL
        };
    }
}

export function changeNightMode(value, flag=true) {
    if(flag){
        let dao = new SettingsDataDAO();
        dao.saveOpenNightMode(value);
    }

    if(value){
        return {
            type: TYPES.OPEN_NIGHT_MODE
        };
    }else{
        return {
            type: TYPES.CLOSE_NIGHT_MODE
        };
    }
}

export function changeDisplayOrder(order, flag=true) {
    if(flag) {
        let dao = new SettingsDataDAO();
        dao.saveDisplayOrder(order);
    }

    return {
        type: TYPES.CHANGE_DISPLAY_ORDER,
        displayOrder: order
    };
}

function fetchShowThumbnailValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getShowThumbnailValue().then((result)=>{
            dispatch(changeShowThumbnail(result, false));
        }, (error)=>{
            dispatch(changeShowThumbnail(error));
        });
    };
}

function fetchOpenNightModelValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getOpenNightModeValue().then((result)=>{
            dispatch(changeNightMode(result, false));
        }, (error)=>{
            dispatch(changeNightMode(error));
        });
    };
}

function fetchThemeColorValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getThemeColorValue().then((result)=>{
            dispatch(changeColor(result, false));
        }, (error)=>{
            dispatch(changeColor(error));
        });
    };
}

function fetchDisplayOrderValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getDisplayOrderValue().then((result)=>{
            dispatch(changeDisplayOrder(result, false));
        }, (error)=>{
            dispatch(changeDisplayOrder(error));
        });
    };
}

export function initialSettingsStateFacade() {
    return (dispatch)=>{
        dispatch(fetchShowThumbnailValue());
        dispatch(fetchThemeColorValue());
        dispatch(fetchDisplayOrderValue());
        dispatch(fetchOpenNightModelValue());
    }
}