const toggleScrollBody = {
  disable: () => {
    const el = document.body;
    el.classList.add("no-scroll");
    el.style.overflowY = "hidden";
  },

  enable: () => {
    const el = document.body;
    el.classList.remove("no-scroll");
    el.style.overflowY = "auto";
  }
};

export default ({ app }, inject) => {
  inject("scrollBody", toggleScrollBody);
};
