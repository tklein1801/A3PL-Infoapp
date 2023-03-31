import React from 'react';
import { Divider, List, Surface, useTheme } from 'react-native-paper';
import type { ListAccordionProps } from 'react-native-paper';

export type AccordionProps = React.PropsWithChildren<{
  id: ListAccordionProps['id'];
  title: ListAccordionProps['title'];
  titleStyles?: ListAccordionProps['titleStyle'];
  titleNumberOfLines?: ListAccordionProps['titleNumberOfLines'];
  isFirst?: boolean;
  isLast?: boolean;
  isExpanded?: boolean;
  divider?: boolean;
}>;

export const Accordion: React.FC<AccordionProps> = ({
  id,
  title,
  titleNumberOfLines,
  titleStyles,
  children,
  isFirst = false,
  isLast = false,
  isExpanded = false,
  divider = false,
}) => {
  const theme = useTheme();
  const accordionStyle = {
    backgroundColor: theme.colors.elevation.level1,
    borderTopLeftRadius: isFirst ? theme.roundness * 3 : 0,
    borderTopRightRadius: isFirst ? theme.roundness * 3 : 0,
    borderBottomLeftRadius: isLast && !isExpanded ? theme.roundness * 3 : 0,
    borderBottomRightRadius: isLast && !isExpanded ? theme.roundness * 3 : 0,
  };
  const surfaceStyle = {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomLeftRadius: isLast && isExpanded ? theme.roundness * 3 : 0,
    borderBottomRightRadius: isLast && isExpanded ? theme.roundness * 3 : 0,
  };
  return (
    <React.Fragment>
      <List.Accordion
        id={id}
        title={title}
        titleNumberOfLines={titleNumberOfLines}
        titleStyle={titleStyles}
        style={accordionStyle}
      >
        <Surface style={surfaceStyle}>{children}</Surface>
      </List.Accordion>
      {!isFirst && divider && <Divider />}
    </React.Fragment>
  );
};
