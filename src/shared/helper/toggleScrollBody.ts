const toggleScrollBody = (addRemoveClass: string, className: string) => {
  const el = document.body
  if (addRemoveClass === 'addClass') {
    el.classList.add(className)
    el.style.overflowY = 'hidden'
  } else {
    el.classList.remove(className)
    el.style.overflowY = 'auto'
  }
}

export default {
  toggleScrollBody
}
