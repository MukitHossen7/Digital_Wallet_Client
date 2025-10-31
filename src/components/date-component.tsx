import { CalendarIcon } from "lucide-react";
import {
  Button,
  DatePicker,
  Group,
  Label,
  Popover,
  Dialog,
} from "react-aria-components";

import { Calendar } from "@/components/ui/calendar-rac";
import { DateInput } from "@/components/ui/datefield-rac";
import { CalendarDate } from "@internationalized/date";

interface Props {
  label: string;
  value: string; // "YYYY-MM-DD"
  onChange: (val: string) => void;
}

export default function DateComponent({ label, value, onChange }: Props) {
  // Convert "YYYY-MM-DD" -> CalendarDate
  const dateValue: CalendarDate | null = value
    ? new CalendarDate(
        Number(value.split("-")[0]),
        Number(value.split("-")[1]),
        Number(value.split("-")[2])
      )
    : null;

  return (
    <DatePicker
      value={dateValue}
      onChange={(v: CalendarDate | null) => {
        if (v) {
          onChange(
            `${v.year}-${String(v.month).padStart(2, "0")}-${String(
              v.day
            ).padStart(2, "0")}`
          );
        }
      }}
      className="w-full"
    >
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="flex">
        <Group className="w-full">
          <DateInput className="pl-9 rounded-md w-full" />
        </Group>
        <Button className="z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground">
          <CalendarIcon size={16} />
        </Button>
      </div>
      <Popover
        className="z-50 rounded-lg border bg-background text-popover-foreground shadow-lg p-2"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto">
          <Calendar />
        </Dialog>
      </Popover>
    </DatePicker>
  );
}
