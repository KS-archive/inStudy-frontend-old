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
  color: {
    default: 2,
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
