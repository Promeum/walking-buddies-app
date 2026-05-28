import React, { Component } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as theme from './theme.ts';

const Card = ({ children, style }:
              {children: Component, style: StyleProp<any>}) => {
  return (
    <View style={[style, theme.inline]}>
      {children}
    </View>
  );
};

const CardHeader = ({ children, style }:
                    {children: Component, style: StyleProp<any>}) => {
  return (
    <View style={style}> {/* styles.cardHeader */}
      {children}
    </View>
  );
};

const CardTitle = ({ children, style }:
                   {children: Component, style: StyleProp<any>}) => {
  return (
    <Text style={style} {...props}> {/* styles.title */}
      {children}
    </Text>
  );
};

const CardDescription = ({ children, style }:
                         {children: Component, style: StyleProp<any>}) => {
  return (
    <Text style={style} {...props}> {/* styles.description */}
      {children}
    </Text>
  );
};

const CardAction = ({ children, style }:
                    {children: Component, style: StyleProp<any>}) => {
  return (
    <TouchableOpacity style={style} onPress={() => props.onPress()}> {/* styles.actionButton */}
      {children}
    </TouchableOpacity>
  );
};

const CardContent = ({ children, style }:
                     {children: Component, style: StyleProp<any>}) => {
  return (
    <View style={style}> {/* styles.content */}
      {children}
    </View>
  );
};

const CardFooter = ({ children, style }:
                    {children: Component, style: StyleProp<any>}) => {
  return (
    <View style={style}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  Card: {
    backgroundColor: theme.colorCard,
    padding: 16,
    borderRadius: theme.radiusMd,
    borderWidth: 1,
    borderColor: theme.colorBorder,
  },
  CardAction: {
    backgroundColor: theme.colorPrimary,
    padding: 8,
    borderRadius: theme.radiusSm,
    borderWidth: 1,
    borderColor: theme.colorBorder,
  },
  CardContent: {
    padding: 16,
  },
  CardDescription: {
    fontSize: theme.fontSizeBase,
    color: theme.colorForeground,
  },
  CardFooter: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colorBorder,
  },
  CardHeader: {
    padding: 16,
  },
  CardTitle: {
    fontSize: theme.fontSizeXl,
    fontWeight: 'bold',
    color: theme.colorForeground,
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

