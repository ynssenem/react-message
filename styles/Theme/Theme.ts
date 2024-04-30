import {
  CreateStyle,
  ThemeComponentBoxInterface,
  ThemeComponentButtonInterface,
  ThemeComponentInputInterface,
  ThemeComponentTextInterface,
  ThemeMainColorInterface,
  ThemeTextColorInterface,
} from "@lextdev/core";

const _LightMainColors: ThemeMainColorInterface = {
  background: "#FFF",
  primary: "#077C34",
  secondary: "#112E1C",
  muted: "#EBEBEB",
};

const _LightTextColors: ThemeTextColorInterface = {
  global: "#000000",
  emphasis: "#BCBCBC",
  inverse: "#FFF",
};

const _Text: ThemeComponentTextInterface = {
  defaultVariant: "default",
  variants: {
    default: {
      fontSize: 14,
      color: "emphasis",
    },
  },
};

const _Button: ThemeComponentButtonInterface = {
  defaultVariant: "default",
  variants: {
    default: {
      box: {
        borderRadius: 5,
        padding: 10,
        height: 50,
        borderColor: "primary",
        borderWidth: 1,
        backgroundColor: "primary",
        alignItems: "center",
        justifyContent: "center",
      },
      label: {
        color: "inverse",
        fontSize: 14,
        textAlign: "center",
      },
    },
  },
};

const _Box: ThemeComponentBoxInterface = {
  defaultVariant: "default",
  variants: {
    default: {
      padding: 15,
    },
    container: {
      paddingHorizontal: 30,
      paddingVertical: 10,
    },
  },
};

const _Input: ThemeComponentInputInterface = {
  defaultVariant: "default",
  variants: {
    default: {
      label: {
        fontSize: 14,
        fontStyle: "italic",
      },
      input: {
        flex: 1,
        fontSize: 14,
      },
      layout: {
        borderWidth: 1,
        borderColor: "muted",
        backgroundColor: undefined,
        paddingHorizontal: 10,
        paddingVertical: 0,
        height: 50,
        borderRadius: 5,
      },
      errorLayout: {
        backgroundColor: "muted",
        borderColor: "primary",
        borderWidth: 1,
      },
      description: {},
      error: {
        color: "global",
        fontSize: 12,
      },
    },
  },
};

const ThemeData = CreateStyle({
  colors: {
    light: {
      main: _LightMainColors,
      text: _LightTextColors,
    },
  },
  components: {
    Box: _Box,
    Text: _Text,
    Button: _Button,
    Input: _Input,
  },
});

export default ThemeData;
