const breakPoint = {
  xxs: 360,
  xs: 481,
  sm: 768,
  smplus: 769,
  md: 992,
  lg: 1025,
  xl: 1200,
}

export const wait = (time: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(time)
      }, time);
    } catch (error) {
      reject(error)
    }
  })
}

// Sort Ascending Array
export const sortAsc = (a: any, b: any) => {
  return a.distanceToUser - b.distanceToUser
}

// Pagination
export const getWindowInfo = () => {
  let windowInfo = {
    isMobile: false
  };

  const windowWidth = window.innerWidth;
  const { xxs, xs, sm, md, lg, xl } = breakPoint

  if (windowWidth <= xs) {
    windowInfo.isMobile = true;
  } else if (windowWidth > xs && windowWidth <= xl) {
  } else {
    windowInfo.isMobile = false;
  }

  return windowInfo;
}