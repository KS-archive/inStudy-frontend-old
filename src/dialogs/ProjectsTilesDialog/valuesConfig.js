export default {
  title: {
    default: undefined,
    validate: {
      required: true,
    },
  },
  content: {
    default: [],
    validate: {
      noEmptyArr: true,
    },
  },
  colors: {
    default: [2, 2, 4, 2, 2],
  },
  type: {
    default: 0,
  },
  startGray: {
    default: false,
  },
  rowsLimit: {
    default: 1,
    validate: {
      required: true,
      naturalNumber: true,
    },
  },
  randomize: {
    default: false,
  },
};
