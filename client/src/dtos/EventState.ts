enum EventState {
  start = 0,
  speak = 1,
  loadingAnwser = 2,
  listen = 3,
  done = 10,
  error = -1,
}

export default EventState;
