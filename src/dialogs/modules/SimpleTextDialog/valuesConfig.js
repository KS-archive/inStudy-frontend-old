export default {
  title: {
    default: undefined,
    validate: {
      required: true,
    },
  },
  content: {
    default: undefined,
    validate: {
      required: true,
    },
  },
  buttonLabel: {
    default: undefined,
  },
  buttonLink: {
    default: undefined,
    validate: {
      link: true,
    },
  },
  color: {
    default: 2,
  },
};
