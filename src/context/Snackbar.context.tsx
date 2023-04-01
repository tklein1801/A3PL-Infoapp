import React from 'react';
import { Snackbar, useTheme } from 'react-native-paper';

export type ShowSnackbarProps = {
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  };
};

export type SnackbarProps = ShowSnackbarProps & {
  key: number;
};

export interface ISnackbarContext {
  showSnackbar: (props: ShowSnackbarProps) => void;
}

export const SnackbarContext = React.createContext({} as ISnackbarContext);

export const SnackbarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const [snackPack, setSnackPack] = React.useState<readonly SnackbarProps[]>([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<SnackbarProps | undefined>(undefined);

  const showSnackbar = (props: ShowSnackbarProps) => {
    setSnackPack((prev) => [...prev, { message: props.message, action: props.action, key: new Date().getTime() }]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    } else if (snackPack.length && messageInfo && !open) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    }
  }, [snackPack, messageInfo, open]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        visible={open}
        onDismiss={handleClose}
        duration={6000}
        theme={{
          colors: {
            inversePrimary: theme.colors.primary,
            inverseOnSurface: theme.colors.onSurface,
            inverseSurface: theme.colors.surface,
          },
        }}
        action={messageInfo ? messageInfo.action : undefined}
      >
        {messageInfo ? messageInfo.message : undefined}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
