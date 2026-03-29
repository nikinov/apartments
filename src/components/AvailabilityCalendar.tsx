"use client";

import { useState, useMemo } from "react";
import { Booking } from "@/lib/types";

interface AvailabilityCalendarDict {
  title: string;
  available: string;
  booked: string;
  today: string;
  monthNames: string[];
  dayNamesShort: string[];
  prevMonth: string;
  nextMonth: string;
}

interface AvailabilityCalendarProps {
  bookings: Booking[];
  dict: AvailabilityCalendarDict;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateBooked(date: Date, bookings: Booking[]) {
  for (const booking of bookings) {
    const start = new Date(booking.startDate + "T00:00:00");
    const end = new Date(booking.endDate + "T00:00:00");
    if (date >= start && date <= end) return true;
  }
  return false;
}

export default function AvailabilityCalendar({
  bookings,
  dict,
}: AvailabilityCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0

    const days: {
      date: Date;
      inMonth: boolean;
      isToday: boolean;
      isBooked: boolean;
      isPast: boolean;
    }[] = [];

    // Previous month fill
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth, -i);
      days.push({
        date: d,
        inMonth: false,
        isToday: false,
        isBooked: false,
        isPast: true,
      });
    }

    // Current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const d = new Date(currentYear, currentMonth, day);
      const isPast = d < today && !isSameDay(d, today);
      days.push({
        date: d,
        inMonth: true,
        isToday: isSameDay(d, today),
        isBooked: isDateBooked(d, bookings),
        isPast,
      });
    }

    // Next month fill to complete the grid (always 6 rows)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(currentYear, currentMonth + 1, i);
      days.push({
        date: d,
        inMonth: false,
        isToday: false,
        isBooked: false,
        isPast: false,
      });
    }

    return days;
  }, [currentMonth, currentYear, bookings, today]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const canGoPrevious =
    currentYear > today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth > today.getMonth());

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="font-bold text-gray-900 mb-4">{dict.title}</h3>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          disabled={!canGoPrevious}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={dict.prevMonth}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-900">
          {dict.monthNames[currentMonth]} {currentYear}
        </span>
        <button
          onClick={goToNextMonth}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={dict.nextMonth}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {dict.dayNamesShort.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-400 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {calendarDays.map((day, i) => {
          let classes =
            "relative flex items-center justify-center h-9 text-xs rounded-md transition-colors ";

          if (!day.inMonth) {
            classes += "text-gray-200";
          } else if (day.isBooked) {
            classes +=
              "bg-red-50 text-red-400 line-through cursor-not-allowed";
          } else if (day.isPast) {
            classes += "text-gray-300";
          } else if (day.isToday) {
            classes += "font-bold ring-2 ring-offset-1 text-gray-900";
          } else {
            classes += "text-gray-700 hover:bg-green-50";
          }

          return (
            <div
              key={i}
              className={classes}
              style={
                day.isToday
                  ? { ["--tw-ring-color" as string]: "var(--color-gold)" }
                  : undefined
              }
              title={
                day.isBooked
                  ? dict.booked
                  : day.isToday
                  ? dict.today
                  : day.inMonth && !day.isPast
                  ? dict.available
                  : undefined
              }
            >
              {day.date.getDate()}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-green-50 border border-green-200" />
          <span className="text-xs text-gray-500">{dict.available}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-red-50 border border-red-200" />
          <span className="text-xs text-gray-500">{dict.booked}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm border-2"
            style={{ borderColor: "var(--color-gold)" }}
          />
          <span className="text-xs text-gray-500">{dict.today}</span>
        </div>
      </div>
    </div>
  );
}
