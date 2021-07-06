import moment, { Moment } from 'moment'
import GetCalendarUseCase from '../../../domain/usecases/general/calendar'

interface OnSetEvent {
  valueText: String
}

const getNightNumber = (night: number, texts: string, text: string) => {
  if (night === 0) {
    return 1 + ' Day'
  } else if (night === 1) {
    return night + ` ${text}`
  }
  return night + ` ${texts}`
}

let Calendar: any = {
  configDefault: {
    theme: 'windows',
    toText: '',
    buttons: [],
    fromText: '',
    animate: 'pop',
    min: new Date(),
    yearChange: false,
    display: 'inline',
    minRange: 86400000,
    showSelector: true,
    controls: ['calendar'],
    outerMonthChange: false,
    closeOnOverlayTap: false,
    dateFormat: 'yy-mm-dd'
  },
  mobileConfig: {
    months: 1,
    context: 'body',
    layout: 'liquid',
    calendarScroll: 'vertical',
    cssClass: 'calendar-mobile',
    scrollLock: false
  },
  desktopConfig: {
    months: 2,
    calendarScroll: 'horizontal',
    cssClass: 'calendar-desktop',
    context: '.calendar-desktop'
  },
  text: null,
  inventory: [],
  invalidDate: [],
  isSetDate: false,
  disableDate: null,
  isCalledAPI: false,
  calledDate: "",
  monthCalled: [],
  getCurrentMonth: (inst: any) => {
    const totalMonth = inst.markup.querySelectorAll(
      '.mbsc-cal-day-picker .mbsc-cal-table'
    )
    const currentMonths = [totalMonth[1], totalMonth[2]]
    return currentMonths
  },
  getCurrentDays: (inst: any) => {
    const currentMonths = Calendar.getCurrentMonth(inst)
    let currentDays: any = []

    currentMonths.map((item: any) => {
      currentDays = [
        ...currentDays,
        ...item.querySelectorAll(
          '.mbsc-cal-row .mbsc-cal-cell:not(.mbsc-disabled)'
        )
      ]
    })

    return currentDays
  },
  getInvalidDays: (inst: any) => {
    const currentMonths = Calendar.getCurrentMonth(inst)
    let invalidDays: any = []

    currentMonths.map((item: any) => {
      invalidDays = [
        ...invalidDays,
        ...item.querySelectorAll(
          '.mbsc-cal-row .mbsc-cal-day:not(.mystays-selected-date):not(.mbsc-disabled):not(.mystays-custom-invalid):not([aria-hidden="true"]'
        )
      ]
    })

    return invalidDays
  },
  showToolTip: (inst: any, text?: any, endVal?: string) => {
    if (text) {
      Calendar.text = text
    }

    const startDate = inst.startVal
    const endDate = endVal || inst.endVal || startDate
    const totalMonth = inst.markup.querySelectorAll(
      '.mbsc-cal-day-picker .mbsc-cal-table'
    )
    const currentMonths = [totalMonth[1], totalMonth[2]]
    let listDate: any = []
    currentMonths.map((item: any) => {
      listDate = [
        ...listDate,
        ...item.querySelectorAll('.mbsc-cal-row .mbsc-cal-cell')
      ]
    })

    let toolTipContainer: any

    listDate.map((day: HTMLElement) => {
      const tooltip = day.querySelector('.tool-tip')
      const tooltip1 = day.querySelector('.tool-tip-show-bottom')
      if (tooltip1) {
        day.removeChild(tooltip1)
      }
      if (tooltip) {
        day.removeChild(tooltip)
      }

      const date = day.getAttribute('data-full')
        ? moment(day.getAttribute('data-full'))
          .format('YYYY/MM/DD')
          .toString()
        : ''

      const end = moment(endDate)
        .format('YYYY/MM/DD')
        .toString()

      if (date === end) {
        toolTipContainer = day
      }
    })

    const day: any = document.querySelector('.mbsc-cal-days-c')
    const numbetNight = moment(endDate).diff(moment(startDate), 'days')

    if (
      toolTipContainer &&
      day &&
      toolTipContainer.getBoundingClientRect().y -
      day.getBoundingClientRect().y >
      80
    ) {
      const node = document.createElement('span')
      node.className = 'tool-tip'
      if (toolTipContainer.classList.contains('mbsc-cal-day6')) {
        node.classList.add('tool-tip-right')
      } else if (toolTipContainer.classList.contains('mbsc-cal-day0')) {
        node.classList.add('tool-tip-left')
      }
      node.innerHTML = `${getNightNumber(
        numbetNight,
        Calendar.text.nights,
        Calendar.text.night
      )} `
      toolTipContainer.appendChild(node)
    } else {
      const node = document.createElement('div')
      node.className = 'tool-tip-show-bottom'
      if (
        toolTipContainer &&
        toolTipContainer.classList.contains('mbsc-cal-day6')
      ) {
        node.classList.add('tool-tip-right')
      } else if (
        toolTipContainer &&
        toolTipContainer.classList.contains('mbsc-cal-day0')
      ) {
        node.classList.add('tool-tip-left')
      }
      node.innerHTML = `${getNightNumber(
        numbetNight,
        Calendar.text.nights,
        Calendar.text.night
      )}`
      // eslint-disable-next-line no-unused-expressions
      toolTipContainer ? toolTipContainer.appendChild(node) : null
    }
  },
  AddIntermediateHoverLogic: (inst: any, CheckNextDaySetManually: any) => {
    if (Calendar.isSetDate) {
      const dateList: any = Calendar.getInvalidDays(inst)
      for (let f = 0; f < dateList.length; f++) {
        dateList[f].classList.remove('mystays-hover-intermediate')
      }
      for (let i = 0; i < dateList.length; i++) {
        dateList[i].addEventListener('mouseover', function () {
          // Remove class from existing elements
          for (let f = 0; f < dateList.length; f++) {
            dateList[f].classList.remove('mystays-hover-intermediate')
            const endVal = moment(inst.endVal).format('DD-MM-YYYY')
            const date = moment(dateList[f].getAttribute('data-full')).format(
              'DD-MM-YYYY'
            )
            if (endVal === date) {
              dateList[f].classList.remove('mbsc-selected')
              dateList[f].classList.remove('mbsc-cal-day-hl')
              dateList[f].classList.remove('mbsc-cal-sel-end')
            }
          }
          // Adding class from existing elements(rangeObject.endVal === "")
          for (let k = 0; k < dateList.length; k++) {
            const date1 = moment(dateList[k].getAttribute('data-full'))
            const date2 = moment(dateList[i].getAttribute('data-full'))
            const startVal = moment(inst.startVal)
            if (CheckNextDaySetManually && date1 >= startVal && date1 <= date2) {
              dateList[k].classList.add('mystays-hover-intermediate')
              Calendar.showToolTip(inst, null, date2)
            }
          }
        })
      }
    }
  },
  customHTML: (event?: any, langArray?: any) => {
    const calendarContainer = event
      ? event.target.querySelector('.mbsc-fr-w')
      : document.querySelector('.mbsc-fr-w')
    const calendar = event
      ? event.target.querySelector('.mbsc-fr-c')
      : document.querySelector('.mbsc-fr-c')
    const noteContainer = event
      ? event.target.querySelector('.note')
      : document.querySelector('.note')
    if (noteContainer) {
      calendarContainer.removeChild(calendarContainer.lastElementChild)
    }
    calendar.insertAdjacentHTML(
      'afterend',
      `
        <div class="note">
          <span class="selected">${langArray.selected_date}</span>
          <span class="not-available">${langArray.not_available}</span>
          <span class="minimum">${langArray.minimum_stay}</span>
        </div>
      `
    )
  },
  customHeaderCalendar: (event: any, langArray?: any) => {
    if (event.querySelectorAll('.mystays-bookingwidget-header').length > 0) {
      const customSelector = event.getElementsByClassName(
        'mystays-bookingwidget-header'
      )
      while (customSelector[0]) {
        customSelector[0].parentNode.removeChild(customSelector[0])
      }
    }
    for (
      let index = 0;
      index <
      event.querySelectorAll(' .mbsc-cal-day-picker .mbsc-cal-table').length;
      index++
    ) {
      const sectionContainer: any = event.querySelectorAll(
        '.mbsc-cal-day-picker .mbsc-cal-table'
      )[index]
      const sectionStartDate = sectionContainer
        .querySelector('[data-full]')
        .getAttribute('data-full')
      const headerText = moment(sectionStartDate, 'YYYY M D').format('MMM YYYY')

      const sectionheader = document.createElement('div')
      sectionheader.className = 'mystays-bookingwidget-header'
      sectionheader.innerHTML = `
              <div class="calendar__header">
                <span>${headerText}</span>
              </div>
              <div class="days">
                <span>${langArray.su}</span>
                <span>${langArray.M}</span>
                <span>${langArray.T}</span>
                <span>${langArray.W}</span>
                <span>${langArray.TH}</span>
                <span>${langArray.F}</span>
                <span>${langArray.S}</span>
              </div>
            `
      sectionContainer.insertAdjacentHTML(
        'beforebegin',
        sectionheader.outerHTML
      )
    }
  },
  datePicker(_component: any, type: string) {
    const dateContainer: any = document.querySelector(`.mbsc-range-btn-${type}`)
    if (dateContainer) {
      const dateButton: any = dateContainer.querySelector('.mbsc-fr-btn-e')
      if (dateButton) {
        dateButton.click()
      }
    }
  },
  renderInvalidDate: (inst: Object | any) => {
    const currentDays = Calendar.getCurrentDays(inst)

    currentDays.map((day: HTMLElement) => {
      const selectdayStr = day.getAttribute('data-full')
      const selectDate = moment(selectdayStr).format('YYYY-MM-DD')
      Calendar.invalidDate.map((item: any) => {
        const invalidDate = moment(item).format('YYYY-MM-DD')
        if (selectDate === invalidDate) {
          day.classList.add('mystays-custom-invalid')
        }
      })
    })
  },
  renderInventory: (inst: Object | any, date: string) => {
    console.log(Calendar.inventory);

    if (Calendar.calledDate && moment(date) > moment(Calendar.calledDate)) {
      date = moment(date).add('months', 1).format('DD-MM-YYYY').toString();
    }

    const currentDays = Calendar.getCurrentDays(inst)

    const currentMonthInventory = Calendar.inventory[moment(date).format("DD-MM-YYYY")] || []
    const nextMonthInventory = Calendar.inventory[moment(date).add('months', 1).format("DD-MM-YYYY")] || []
    const totalInventory = [...currentMonthInventory, ...nextMonthInventory];

    currentDays.map((day: HTMLElement) => {
      const dayData: any = day.getAttribute('data-full') || ''
      const isValid = day.classList.contains('mbsc-disabled')
      const currentDate = moment(dayData).format('YYYY-MM-DD')

      if (totalInventory.length) {
        totalInventory.map((item: any) => {
          const inventoryDate = moment(item.date).format('YYYY-MM-DD')
          const inventory: any = day.querySelector('.inventory')
          if (dayData && !isValid && inventoryDate === currentDate && !inventory) {
            const ivenHtml: HTMLElement | any = document.createElement('span')
            ivenHtml.classList = 'inventory'
            ivenHtml.textContent = `${item.value}`
            day.appendChild(ivenHtml)
          }
        })
      }
    })
  },
  getAPICalendar: async (payload: any) => {
    const { date, hotelID } = payload;

    if (Calendar.calledDate && moment(date) > moment(Calendar.calledDate)) {
      payload.month = payload.month + 1
      payload.date = moment(date).add('months', 1).format('DD-MM-YYYY').toString();
    }

    const usecase = new GetCalendarUseCase({ ...payload, isCalled: Calendar.isCalledAPI })

    const currentTime = new Date().getTime();
    const lastTime = localStorage.getItem("lastTime");
    const timeToReCallAPI = 5 * 60 * 1000; // Call API affter 5 minutes


    const monthFormat = moment(payload.date).format('DD-MM-YYYY').toString();
    const nextMonthFormat = moment(payload.date).add('months', 1).format('DD-MM-YYYY').toString();

    if (lastTime && currentTime - parseInt(lastTime) > timeToReCallAPI) {
      Calendar.inventory = [];
      localStorage.removeItem("calendarData"); // Save calendar data to localstorage
    } else {
      const inventoryTmp: any = []
      const calendarLocalStr = localStorage.getItem("calendarData") || '';
      const calendarLocalData = calendarLocalStr ? JSON.parse(calendarLocalStr) : {}
      Object.keys(calendarLocalData).map((item: string) => {
        const inventoryItem = calendarLocalData[item].inventory

        const newArr: any = []
        Object.keys(inventoryItem).map((nextItem) => {
          if (inventoryItem[nextItem] <= 5) {
            newArr.push({ date: nextItem, value: inventoryItem[nextItem] })
          }
        })

        inventoryTmp[item] = newArr;
      })

      Calendar.inventory = inventoryTmp;
    }

    if (!Calendar.inventory[monthFormat]) {
      await usecase
        .execute()
        .then((res: any) => {
          localStorage.setItem("lastTime", currentTime.toString()); // Save time to recall API
          localStorage.setItem("lastHotelId", hotelID); // Save hotelId

          Calendar.monthCalled = [...Calendar.monthCalled, monthFormat, nextMonthFormat]
          Calendar.monthCalled = Calendar.monthCalled.filter((item: any, index: number) => Calendar.monthCalled.indexOf(item) === index)

          Calendar.isCalledAPI = true
          Calendar.calledDate = payload.date

          res.map((item: any, index: number) => {
            const { disabled_dates, inventory } = item.data.data
            if (index === 0) {
              Calendar.handleInvalidDate(disabled_dates)
              Calendar.handleInventory({ inventory, date: monthFormat })
            } else {
              Calendar.handleInvalidDate(disabled_dates)
              Calendar.handleInventory({ inventory, date: nextMonthFormat })
            }
          })
        })
        .catch((error: any) => console.log(error))
    } else return
  },
  handleInventory: (data: any) => {
    const inventoryDates: any = []

    Object.keys(data.inventory).map((item) => {
      if (data.inventory[item] <= 5) {
        inventoryDates.push({ date: item, value: data.inventory[item] })
      }
    })

    Calendar.inventory[data.date] = inventoryDates
    const localCalendarStr = localStorage.getItem("calendarData") || '';
    const localCalendarData = localCalendarStr ? JSON.parse(localCalendarStr) : {};
    localCalendarData[data.date] = data
    localStorage.setItem("calendarData", JSON.stringify(localCalendarData)); // Save calendar data to localstorage

  },
  handleInvalidDate: (data: any) => {
    Calendar.invalidDate = data
  },
  onSetDate: (event: OnSetEvent, inst: any) => {
    const dateStr = event.valueText.split(' - ')
    const startDate = moment(dateStr[0])
    const endDate = dateStr[1] ? moment(dateStr[1]) : ''
    Calendar.isSetDate = true

    if (endDate === '' || startDate > endDate) {
      const disableDay = Calendar.enableFirstDisableDate(inst, startDate)
      const nextDay = moment(startDate).add(1, 'days')
      Calendar.disableDate = disableDay

      if (startDate.diff(disableDay, 'days') === 1) {
        inst.setVal([startDate, startDate], true, true, false)
      } else {
        inst.setVal([startDate, nextDay], true, true, false)
      }
      return true
    } else if (
      Calendar.disableDate &&
      endDate.format('YYYY-MM-DD') > Calendar.disableDate.format('YYYY-MM-DD')
    ) {
      const disableDay = Calendar.enableFirstDisableDate(inst, endDate)
      const nextDay = moment(startDate).add(1, 'days')
      Calendar.disableDate = disableDay
      if (endDate.diff(disableDay, 'days') === 1) {
        inst.setVal([endDate, endDate], true, true, false)
      } else {
        inst.setVal([endDate, nextDay], true, true, false)
      }
      inst.setActiveDate('end')
      return true
    } else if (
      Calendar.disableDate &&
      endDate.format('YYYY-MM-DD') === Calendar.disableDate.format('YYYY-MM-DD')
    ) {
      return false
    } else if (endDate && endDate < startDate) {
      const nextDay = moment(startDate).add(1, 'days')
      inst.setVal([endDate, nextDay], true, true, false)

      inst.setActiveDate('end')
      return true
    } else {
      return false
    }
  },
  enableFirstDisableDate: (inst: any, startDate: Moment) => {
    const currentDays: Array<HTMLElement> = Calendar.getCurrentDays(inst)
    Calendar.renderInvalidDate(inst)
    for (const day of currentDays) {
      day.classList.remove('open-invalid')
    }

    for (const day of currentDays) {
      const dayStr = day.getAttribute('data-full')
      const isDisableDate = day.classList.contains('mystays-custom-invalid')
      if (dayStr && isDisableDate && startDate < moment(dayStr)) {
        day.classList.remove('mystays-custom-invalid')
        day.classList.add('open-invalid')
        return moment(dayStr)
      }
    }
  },
  clearCalendar: () => {
    Calendar = {
      ...Calendar,
      text: null,
      inventory: [],
      isSetDate: false,
      invalidDate: [],
      monthCalled: [],
      disableDate: null,
      isCalledAPI: false,
      calledDate: "",
    }
  }
}
export default Calendar
