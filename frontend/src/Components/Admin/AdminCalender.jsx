import { useState } from "react";

const AdminCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1));
  const [selectedDate, setSelectedDate] = useState(30);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const days = [];

  // Empty spaces before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div key={`empty-${i}`}></div>
    );
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <button
        key={day}
        onClick={() => setSelectedDate(day)}
        className={`h-10 w-10 rounded-lg flex items-center justify-center
          ${
            selectedDate === day
              ? "bg-purple-600 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }
        `}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-[#111827] text-white p-5 rounded-xl border border-gray-800">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-semibold">
          Calendar
        </h2>

        <div className="flex items-center gap-4">

          <button
            onClick={previousMonth}
            className="text-gray-400 hover:text-white text-xl"
          >
            ‹
          </button>

          <h3 className="font-semibold min-w-[120px] text-center">
            {monthName} {year}
          </h3>

          <button
            onClick={nextMonth}
            className="text-gray-400 hover:text-white text-xl"
          >
            ›
          </button>

        </div>

      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 mb-3">

        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].map((day) => (
          <div
            key={day}
            className="text-center text-sm text-gray-400"
          >
            {day}
          </div>
        ))}

      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-y-2 place-items-center">

        {days}

      </div>

    </div>
  );
};

export default AdminCalendar;