import { View, Text, TextProps } from "tamagui";
import { interpolate } from "react-native-reanimated";
import { MotiView } from "moti";

type TickerListProps = {
  number: number;
  fontSize: number;
  index: number;
};

const numberToNice = [...Array(10).keys()];
const _stagger = 50;

const Tick = ({ children, style, ...rest }: TextProps) => {
  return (
    <View>
      <Text style={style} {...rest}>
        {children}
      </Text>
    </View>
  );
};

const TickerList = ({ number, fontSize, index }: TickerListProps) => {
  const slotHeight = fontSize * 1.1;
  return (
    <View style={{ width: fontSize, height: slotHeight, overflow: "hidden" }}>
      <MotiView
        style={{ height: slotHeight * numberToNice.length}}
        animate={{ translateY: -slotHeight * number }}
        transition={{
          
         delay: index * _stagger,
         damping: 90,
         stiffness: 200,
        }}>
        {numberToNice.map((number: number) => {
          return (
            <Tick
              key={number}
              style={{
                fontSize: slotHeight,
                lineHeight: slotHeight,
                fontVariant: "tabular-nums",
                textAlign: "center",
              }}
            >
              {number}
            </Tick>
          );
        })}
      </MotiView>
    </View>
  );
};

type TickerProps = {
  value?: number;
  fontSize?: 50;
};

export const Ticker = ({ value = 343324, fontSize = 50 }: TickerProps) => {
  const splitValue = value.toString().split("");
  return (
    <View f={1} jc="center" ai="center">
      <View flexDirection="row" gap={10} flexWrap="wrap">
        {splitValue.map((number: string, index: number) => {
          return (
            <TickerList
              fontSize={fontSize}
              key={index}
              index={index}
              number={parseInt(number)}
            />
          );
        })}
      </View>
    </View>
  );
};
