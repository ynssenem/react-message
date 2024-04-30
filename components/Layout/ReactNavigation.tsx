import { useTheme } from "@lextdev/core";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { FC, ReactNode } from "react";

const ReactNavigation: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const lext = useTheme();
  const _theme: Theme = {
    dark: lext.colorScheme === "dark",
    colors: {
      background: lext.getMainColor("background") as string,
      border: lext.getMainColor("secondary") as string,
      card: lext.getMainColor("background") as string,
      notification: lext.getMainColor("primary") as string,
      primary: lext.getTextColor("global") as string,
      text: lext.getTextColor("global") as string,
    },
  };

  return <ThemeProvider value={_theme}>{children}</ThemeProvider>;
};

export default ReactNavigation;
