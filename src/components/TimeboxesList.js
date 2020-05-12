import React from "react";
import Timebox from "./Timebox";
export function TimeboxesList({ timeboxes, onTimeboxDelete, onTimeboxEdit, onTimeboxUpdate, onTimeboxEditCancel, onTitleChange, onTotalTimeInMinutesChange }) {
    return (timeboxes.map((timebox) => (<Timebox key={timebox.id} title={timebox.title} totalTimeInMinutes={timebox.totalTimeInMinutes} isEditable={timebox.isEditable} onTitleChange={onTitleChange} onTotalTimeInMinutesChange={onTotalTimeInMinutesChange} onDelete={() => onTimeboxDelete(timebox.id)} onEdit={() => onTimeboxEdit(timebox.id, {
        id: timebox.id,
        title: timebox.title,
        totalTimeInMinutes: timebox.totalTimeInMinutes,
        isEditable: true
    })} onSave={() => onTimeboxUpdate(timebox.id, {
        id: timebox.id,
        title: this.state.title,
        totalTimeInMinutes: this.state.totalTimeInMinutes
    })} onCancel={() => onTimeboxEditCancel(timebox.id, {
        id: timebox.id,
        title: timebox.title,
        totalTimeInMinutes: timebox.totalTimeInMinutes,
        isEditable: false
    })} />)));
}
