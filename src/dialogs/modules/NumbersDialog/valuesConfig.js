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
};
