"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export function DatePicker({
    value,
    onChange,
    placeholder,
    disabled,
    className,
    ariaInvalid,
    ...props
}: {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    ariaInvalid?: boolean;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    id="date-picker-simple"
                    className="justify-start font-normal"
                    aria-invalid={ariaInvalid}
                >
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => onChange(date)}
                />
            </PopoverContent>
        </Popover>
    );
}
