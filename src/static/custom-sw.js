if ('serviceWorker' in navigator) {
  console.log('Service worker:')
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const worker of registrations) {
      console.log('Service worker:', worker)
    }
  })
}
  