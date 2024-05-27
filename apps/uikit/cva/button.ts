import { cva, type VariantProps } from "class-variance-authority";
export const base = ["btn"];
export const variants = {
  "size": {
    "xxl": ["btn-xxl"],
    "xl": ["btn-xl"],
    "lg": ["btn-lg"],
    "md": ["btn-md"],
    "sm": ["btn-sm"],
    "xs": ["btn-xs"]
  },
  "variant": {
    "fill": ["btn-fill"],
    "primary": ["btn-primary"]
  },
  "color": {
    "primary": ["btn-primary"],
    "secondary": ["btn-secondary"],
    "dark": ["btn-dark"],
    "light": ["btn-tonal"],
    "outline": ["btn-outline"],
    "essential": ["btn-essential"],
    "success": ["btn-outline"]
  }
};
export const compoundVariants = [];
export const defaultVariants = {
  "variant": "fill",
  "color": "primary",
  "size": "md"
};
const index = cva(base, {
  variants: variants,
  // @ts-ignore
  compoundVariants: compoundVariants,
  // @ts-ignore
  defaultVariants: defaultVariants
});
export type Props = VariantProps<typeof index>;
export default index;