import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import * as theme from './theme';

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Card = ({ children, style }: CardProps) => (
  <View style={[styles.Card, style]}>
    {children}
  </View>
);

type CardHeaderProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CardHeader = ({ children, style }: CardHeaderProps) => (
  <View style={[styles.CardHeader, style]}>
    {children}
  </View>
);

type CardTitleProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

const CardTitle = ({ children, style }: CardTitleProps) => (
  <Text style={[styles.CardTitle, style]}>
    {children}
  </Text>
);

type CardDescriptionProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

const CardDescription = ({ children, style }: CardDescriptionProps) => (
  <Text style={[styles.CardDescription, style]}>
    {children}
  </Text>
);

type CardActionProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const CardAction = ({ children, style, onPress }: CardActionProps) => (
  <TouchableOpacity style={[styles.CardAction, style]} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

type CardContentProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CardContent = ({ children, style }: CardContentProps) => (
  <View style={[styles.CardContent, style]}>
    {children}
  </View>
);

type CardFooterProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CardFooter = ({ children, style }: CardFooterProps) => (
  <View style={[styles.CardFooter, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  Card: {
    backgroundColor: theme.inline.card,
    padding: 16,
    borderRadius: theme.inline.radiusMd,
    borderWidth: 1,
    borderColor: theme.inline.border,
  },
  CardAction: {
    backgroundColor: theme.inline.primary,
    padding: 8,
    borderRadius: theme.inline.radiusSm,
    borderWidth: 1,
    borderColor: theme.inline.border,
  },
  CardContent: {
    padding: 16,
  },
  CardDescription: {
    fontSize: theme.inline.textBase,
    color: theme.inline.foreground,
  },
  CardFooter: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: theme.inline.border,
  },
  CardHeader: {
    padding: 16,
  },
  CardTitle: {
    fontSize: theme.inline.textXl,
    fontWeight: 'bold',
    color: theme.inline.foreground,
  }
});

export {
  Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
};

/* OLD VERSION (uses React) */

//   import { cn } from "./utils";

// function Card({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card"
//       className={cn(
//         "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-header"
//       className={cn(
//         "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <h4
//       data-slot="card-title"
//       className={cn("leading-none", className)}
//       {...props}
//     />
//   );
// }

// function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <p
//       data-slot="card-description"
//       className={cn("text-muted-foreground", className)}
//       {...props}
//     />
//   );
// }

// function CardAction({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-action"
//       className={cn(
//         "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function CardContent({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-content"
//       className={cn("px-6 [&:last-child]:pb-6", className)}
//       {...props}
//     />
//   );
// }

// function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-footer"
//       className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
//       {...props}
//     />
//   );
// }

// export {
//   Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
// };

