import React from 'react';
import { Divider, List, Surface, SurfaceProps, useTheme } from 'react-native-paper';
import type { ListAccordionProps } from 'react-native-paper';

export type AccordionProps = React.PropsWithChildren<
  {
    accordionStyle?: ListAccordionProps['style'];
    surfaceStyle?: SurfaceProps['style'];
    isFirst?: boolean;
    isLast?: boolean;
    isExpanded?: boolean;
    divider?: boolean;
  } & Pick<
    ListAccordionProps,
    | 'id'
    | 'title'
    | 'titleNumberOfLines'
    | 'titleStyle'
    | 'description'
    | 'descriptionNumberOfLines'
    | 'descriptionStyle'
  >
>;

export const Accordion: React.FC<AccordionProps> = ({
  id,
  title,
  titleNumberOfLines,
  titleStyle,
  description,
  descriptionNumberOfLines,
  descriptionStyle,
  children,
  accordionStyle,
  surfaceStyle,
  isFirst = false,
  isLast = false,
  isExpanded = false,
  divider = false,
}) => {
  const theme = useTheme();
  const mergedAccordionStyle = [
    {
      backgroundColor: theme.colors.elevation.level1,
      borderTopLeftRadius: isFirst ? theme.roundness * 3 : 0,
      borderTopRightRadius: isFirst ? theme.roundness * 3 : 0,
      borderBottomLeftRadius: isLast && !isExpanded ? theme.roundness * 3 : 0,
      borderBottomRightRadius: isLast && !isExpanded ? theme.roundness * 3 : 0,
    },
    accordionStyle,
  ];
  const mergedSurfaceStyle = [
    {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomLeftRadius: isLast && isExpanded ? theme.roundness * 3 : 0,
      borderBottomRightRadius: isLast && isExpanded ? theme.roundness * 3 : 0,
    },
    surfaceStyle,
  ];
  return (
    <React.Fragment>
      <List.Accordion
        id={id}
        title={title}
        description={description}
        descriptionNumberOfLines={descriptionNumberOfLines}
        descriptionStyle={descriptionStyle}
        titleNumberOfLines={titleNumberOfLines}
        titleStyle={titleStyle}
        style={mergedAccordionStyle}
      >
        <Divider />
        <Surface style={mergedSurfaceStyle}>{children}</Surface>
        {!isLast && <Divider />}
      </List.Accordion>
      {!isLast && divider && <Divider />}
    </React.Fragment>
  );
};
