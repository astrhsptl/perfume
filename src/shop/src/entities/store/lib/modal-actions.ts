interface Statement {
  state: boolean;
}

export const modalReducers = {
  open: (state: Statement) => {
    state.state = true;
    let body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  },
  close: (state: Statement) => {
    state.state = false;
    let body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'auto';
  },
  toggle: (state: Statement) => {
    state.state = !state.state;
    let body = document.getElementsByTagName('body')[0];

    if (state.state) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  },
};
