export const initialState = {
  guests: [
    {
      id: 0,
      name: 'Vasya',
      withOne: false
    },
    {
      id: 1,
      name: 'Petiya',
      withOne: true
    }]
}

export const guestReducer = (state = initialState, action)=>{
  switch (action.type) {
    default: return state
  }
}
