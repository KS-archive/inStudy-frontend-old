export default {
  title: {
    default: undefined,
    validate: {
      required: true,
    },
  },
  content: {
    default: undefined,
  },
  url: {
    default: undefined,
    validate: {
      required: true,
      link: true,
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
