
const colors = {
  accent: "#F3534A",
  primary: "#d90303",
  secondary: "#f8c102",
  tertiary: "#415ab3",
  success: "#5cb85c",
  black: "#323643",
  white: "#FFFFFF",
  gray: "#808080",
  gray2: "#D8D8D8",
  gray3: "#F0F0F0",
  gray4: "#F7F8FA",
  lightGray: "#808080",
  deepDarkGray: '#222f3e'

};

const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
  small: 8,

};

// const sizes = {
//   // global sizes
//   base: hp('0.02%'),
//   font: 
//   radius: hp('0.0077%'),
//   padding: hp('0.032%'),

//   // font sizes
//   h1: hp('0.0335%'),
//   h2: hp('0.0258%'),
//   h3:  hp('0.023%'),
//   title:  hp('0.023%'),
//   header: hp('0.02%'),
//   body: hp('0.018%'),
//   caption: hp('0.015%'),
// };


const fonts = {
  h1: {
    fontSize: sizes.h1
  },
  h2: {
    fontSize: sizes.h2
  },
  h3: {
    fontSize: sizes.h3
  },
  header: {
    fontSize: sizes.header
  },
  title: {
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  caption: {
    fontSize: sizes.caption
  },
  small: {
    fontSize: sizes.small
  }
};

export { colors, sizes, fonts };