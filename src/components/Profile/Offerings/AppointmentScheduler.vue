<template>
  <div class="appointment-scheduler-wrapper">
    <div class="appointment-scheduler">
      <unicon name="times" class="close-modal" @click="closeModal"></unicon>
      <span v-if="showSlots" class="show-calendar" @click="showCalendar"
        ><unicon name="angle-left"></unicon>Go Back</span
      >
      <div class="scroll-modal">
        <!--START: Calendar Picker-->
        <div v-if="!showSlots">
          <h3>Select date & time</h3>
          <Datepicker
            placeholder="Select a date"
            class="datepicker"
            :inline="true"
            :monday-first="true"
            :disabled-dates="appointment.disabledDates"
            :highlighted="appointment.availableDays"
            :value="appointment.value"
            @focus="field.hasError = false"
            @selected="dateSelected"
            v-model="appointment.value"
          ></Datepicker>
          <span class="local-time"
            >All times are shown in your local time -
            <b>{{ moment.tz.guess(true) }}</b></span
          >
        </div>
        <!--END: Calendar Picker-->

        <!--START: Time Slots-->
        <div
          v-else
          class="timeslot-wrapper"
          :class="{ 'extend-wrapper': selectedSlotIndex != -1 }"
        >
          <span class="selected-day">{{
            moment(selectedDay).format("dddd, DD MMMM YYYY")
          }}</span>
          <span class="slot-duration"
            >Slot Duration -
            <b>{{ consultationCall.duration }} minutes</b></span
          >
          <div
            class="timeslot"
            :class="{
              selected: index == selectedSlotIndex,
              booked: timeSlot.bookedSlot == true,
            }"
            v-for="(timeSlot, index) in timeSlots"
            :key="index"
            @click="slotSelected(index, timeSlot)"
          >
            {{ timeSlot.slot }}
          </div>
          <span class="local-time"
            >All times are shown in your local time -
            <b>{{ moment.tz.guess(true) }}</b></span
          >
        </div>
        <!--END: Time Slots-->
      </div>
      <button
        v-if="selectedSlotIndex != -1"
        type="button"
        class="btn btn-primary"
        @click="bookSlot"
      >
        Book Slot
      </button>
    </div>

    <div class="bg-overlay show"></div>
  </div>
</template>

<script>
//Import libraries
import _ from "lodash";
import Datepicker from "vuejs-datepicker";

//Importing CoachService
import CoachService from "@/controllers/CoachService";

export default {
  name: "AppointmentScheduler",
  data() {
    return {
      showMenu: false,
      showSlots: false,
      offeringDays: [],
      timeSlots: [],
      bookedSlots: [],
      selectedDay: null,
      selectedSlot: null,
      selectedSlotIndex: -1,
      timeZone: "0000",
      appointment: {
        value: null,
        disabledDates: {
          to: new Date(new Date().setDate(new Date().getDate() - 1)),
          from: new Date(new Date().setDate(new Date().getDate() + 30)),
          days: [],
        },
        availableDays: {
          days: [],
        },
      },
    };
  },
  props: {
    consultationCall: Object,
    coachSlug: String,
  },
  components: {
    Datepicker,
  },
  created() {
    this.initAvailableDays();
  },
  methods: {
    //Set the available days from the offering
    initAvailableDays() {
      this.offeringDays = this.consultationCall.scheduler.days;
      this.timeZone = this.consultationCall.timeZone;

      let enabledDays = [];
      let disabledDays = [];
      this.offeringDays.forEach(function (day, index) {
        //Set condition for Monday being first day
        var dayIndex;
        if (index == 6) dayIndex = 0;
        else dayIndex = index + 1;

        //Populate the disabled and enabled arrays
        if (day.isActive) enabledDays.push(dayIndex);
        else disabledDays.push(dayIndex);
      });
      this.appointment.availableDays.days = enabledDays;
      this.appointment.disabledDates.days = disabledDays;

      this.calculateDateLimits();
      this.getBookedSlots();
    },

    calculateDateLimits() {
      if (
        this.consultationCall.date.startDate != undefined &&
        this.consultationCall.date.startDate != null
      ) {
        let startDate = new Date(
          this.moment(this.consultationCall.date.startDate, "x").format(
            "DD MMM YYYY hh:mm a"
          )
        );
        if (startDate > new Date(new Date().setDate(new Date().getDate() - 1)))
          this.appointment.disabledDates.to = startDate;
      }

      if (
        this.consultationCall.date.endDate != undefined &&
        this.consultationCall.date.endDate != null
      ) {
        let endDate = new Date(
          this.moment(this.consultationCall.date.endDate, "x").format(
            "DD MMM YYYY hh:mm a"
          )
        );
        this.appointment.disabledDates.from = endDate;
      }
    },

    async getBookedSlots() {
      const response = await CoachService.GetBookedSlots({
        coachSlug: this.coachSlug,
      });
      this.bookedSlots = response.data;
    },

    checkBookedSlots() {
      let bookedSlots = this.bookedSlots;
      this.timeSlots.forEach(function (slot) {
        bookedSlots.forEach(function (bookedSlot) {
          let slotStartDate = new Date(slot.startTime.format());
          let slotEndDate = new Date(slot.endTime.format());
          let bookedSlotStartDate = new Date(bookedSlot.startDate);
          let bookedSlotEndDate = new Date(bookedSlot.endDate);

          if (
            (bookedSlotStartDate >= slotStartDate &&
              bookedSlotStartDate < slotEndDate) ||
            (bookedSlotEndDate > slotStartDate &&
              bookedSlotEndDate <= slotEndDate)
          )
            slot.bookedSlot = true;
        });
      });
    },

    //Select Date
    dateSelected(date) {
      this.selectedDay = date;
      var dateObj = new Date(date);

      //Convert date with Monday to 0
      var clickedDay = this.moment(dateObj).day();
      if (clickedDay == 0) clickedDay = 6;
      else clickedDay = clickedDay - 1;

      let selectedDays = [];
      const initalClickedDay = clickedDay;

      //Traverse through previous, current and next day
      for (let i = 0; i < 3; i++) {
        let currentDay = initalClickedDay - 1 + i;
        if (currentDay == -1) currentDay = 6;
        else if (currentDay == 7) currentDay = 0;

        dateObj = new Date(date);
        dateObj = new Date(
          dateObj.setDate(dateObj.getDate() + (i - 1))
        ).setHours(12, 0, 0, 0);
        if (
          this.offeringDays[currentDay].isActive &&
          dateObj >= new Date().setHours(12, 0, 0, 0)
        )
          selectedDays.push({
            day: this.offeringDays[currentDay],
            date: this.moment(dateObj).format("Y-MM-DD"),
          });
      }

      this.constructTimeslots(selectedDays);
      this.checkBookedSlots();
    },

    //Construct time slots
    constructTimeslots(selectedDays) {
      const slotDuration = this.consultationCall.duration;
      const ele = this;

      var overallSlots = [];
      selectedDays.forEach(function (selectedDay) {
        selectedDay.day.timeSlots.forEach(function (timeSlot) {
          let startTime = ele.moment(timeSlot.startTime, "HH:mm A");
          let endTime = ele.moment(timeSlot.endTime, "HH:mm A");

          let timeDiff = ele.moment.duration(endTime.diff(startTime));
          let hours = parseInt(timeDiff.asHours());
          let minutesDiff = hours * 60;

          for (let i = 0; i < minutesDiff; i = i + slotDuration) {
            let slotStartTime = ele.getSlotTime(
              _.cloneDeep(startTime),
              i,
              selectedDay.date
            );
            let slotEndTime = ele.getSlotTime(
              _.cloneDeep(startTime),
              i + slotDuration,
              selectedDay.date
            );

            //Check if the day is the same
            if (slotStartTime.isSame(ele.selectedDay, "date"))
              overallSlots.push({
                slot: `${slotStartTime.format("h:mm A")} - ${slotEndTime.format(
                  "h:mm A"
                )}`,
                startTime: slotStartTime,
                endTime: slotEndTime,
                bookedSlot: false,
              });
          }
        });
      });

      this.timeSlots = overallSlots;
      this.showSlots = true;
    },

    getSlotTime(slotTime, timeDiff, currentDate) {
      let calculatedTime = slotTime.add(timeDiff, "minutes").format("hh:mm A");
      calculatedTime = new Date(
        `${this.moment(currentDate).format("Y-MM-DD")}T${this.convertTime(
          calculatedTime
        )}:00.000${this.moment.tz(currentDate, this.timeZone).format("Z")}`
      );

      return this.moment(calculatedTime);
    },

    slotSelected(index, timeSlot) {
      if (!timeSlot.bookedSlot) {
        this.selectedSlotIndex = index;
        this.selectedSlot = timeSlot;
      }
    },

    bookSlot() {
      this.$emit("slotBooked", {
        date: this.selectedDay,
        slot: this.selectedSlot,
      });
    },

    convertTime(timeStr) {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":");
      if (hours === "12") {
        hours = "00";
      }
      if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
      }
      return `${hours}:${minutes}`;
    },

    showCalendar() {
      this.showSlots = false;
      this.timeSlots = [];
      this.selectedDay = null;
      this.selectedSlot = null;
      this.selectedSlotIndex = -1;
    },

    closeModal() {
      this.showSlots = false;
      this.offeringDays = [];
      this.timeSlots = [];
      this.$emit("closeModal");
    },
  },

  computed: {},
  destroy() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.appointment-scheduler-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}
.appointment-scheduler {
  background-color: $whiteColor;
  position: fixed;
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 0.5rem;
  border-radius: 1rem;
  margin: auto;
  transform: translateY(-50%);
  z-index: 110;

  .scroll-modal {
    overflow-y: scroll;
    max-height: 70vh;
    padding: 1rem;
  }

  h3 {
    font-size: $normalFontSize;
    text-align: center;
    text-transform: capitalize;
  }
}

.btn-primary {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  width: calc(100% - 2rem);
}

.selected-day,
.slot-duration,
.local-time {
  display: block;
  font-size: $smallerFontSize;
  color: $greyColor;
  margin: 1rem 1rem 0;
  text-align: center;
  line-height: 1.3;
}

.selected-day {
  color: $blackColor;
  font-weight: $mediumFontWeight;
  font-size: 1rem;
  margin: 0 0 0rem;
}
.slot-duration {
  margin: 0 0 0.5rem;
}

.timeslot-wrapper {
  position: relative;

  &.extend-wrapper {
    padding-bottom: 4rem;
  }
}

.timeslot {
  color: $greyColor;
  display: block;
  text-align: center;
  border: 1px solid lighten($greyColor, 35%);
  padding: 0.7rem 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.25rem;

  &:hover,
  &.selected {
    background-color: lighten($darkGreenColor, 50%);
    color: darken($darkGreenColor, 20%);
    border: 1px solid darken($darkGreenColor, 15%);
    font-weight: bold;
  }

  &.selected {
    background-color: lighten($darkGreenColor, 40%);
  }

  &.booked {
    font-weight: normal !important;
    background-color: lighten($redColor, 35%);
    color: $redColor;
    border-color: $redColor;
  }
}
.show-calendar {
  position: absolute;
  right: 0.25rem;
  top: -2.25rem;
  cursor: pointer;
  z-index: 10;
  color: $whiteColor;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: $smallerFontSize;

  /deep/ {
    svg {
      fill: $whiteColor;
      height: auto;
      width: 1rem;
    }
  }
}

.close-modal {
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;

  /deep/ svg {
    border-radius: 0.75rem;
    padding: 0.25rem;
    fill: $lightWhiteColor;
    background-color: $blackColor;
  }
}
.datepicker /deep/ {
  .vdp-datepicker input {
    cursor: pointer;
    width: 100%;
  }

  .vdp-datepicker.error input {
    border-color: $redColor !important;
  }

  .vdp-datepicker__calendar {
    border-radius: 0.5rem;
    width: 100% !important;
    padding: 0 0.5rem 0.5rem;
    position: relative !important;
    border: none;
    bottom: 0;
    header span,
    .month__year_btn {
      font-size: $smallerFontSize;
      color: $darkBlueColor;
    }
    .cell.year,
    .cell.month,
    .cell.day {
      color: $greyColor !important;
      font-size: $smallFontSize;
      line-height: 30px !important;
      padding: 0 !important;
      height: 30px !important;
      margin: 2px 0;
      border-radius: 0.3rem;
      &:hover {
        border-color: $purpleColor !important;
      }
    }
    .cell.year.disabled,
    .cell.month.disabled,
    .cell.day.disabled {
      opacity: 0.5;
      border: none;
    }

    .cell.today {
      background-color: #eeeeee;
      color: #888888 !important;
    }
    .cell.selected {
      border-color: transparent !important;
    }
    .cell.day-header,
    .day__month_btn {
      color: $greyColor !important;
      font-weight: $mediumFontWeight;
    }

    .cell.day:not(.highlighted) {
      border-color: transparent !important;
      background-color: transparent !important;
    }

    .cell.day.highlighted {
      position: relative;
      background-color: transparent !important;
      border-color: transparent !important;
      color: darken($darkGreenColor, 20%) !important;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 1px;
        width: calc(100% - 2px);
        height: calc(100% + 3px);
        border-radius: 0.5rem;
        background: #cdffe9;
        z-index: -1;
      }
    }
  }

  .vdp-datepicker.top-fixed {
    .vdp-datepicker__calendar {
      bottom: auto;
      top: 100%;
    }
  }

  .vdp-datepicker__calendar header .prev:not(.disabled):hover,
  .vdp-datepicker__calendar header .next:not(.disabled):hover,
  .vdp-datepicker__calendar header .up:not(.disabled):hover {
    background: #f7f6ff;
  }

  .vdp-datepicker__calendar header .next:after {
    border-left: 10px solid $greyColor !important;
  }

  .vdp-datepicker__calendar header .prev:after {
    border-right: 10px solid $greyColor !important;
  }
}
</style>
