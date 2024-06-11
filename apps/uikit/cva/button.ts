import { cva, type VariantProps } from "class-variance-authority";
export const base = ["uk-btn"];
export const variants = {
  "size": {
    "xxl": ["uk-btn-xxl"],
    "xl": ["uk-btn-xl"],
    "lg": ["uk-btn-lg"],
    "md": ["uk-btn-md"],
    "sm": ["uk-btn-sm"],
    "xs": ["uk-btn-xs"]
  },
  "color": {
    "primary": ["uk-btn-primary"],
    "secondary": ["uk-btn-secondary"],
    "dark": ["uk-btn-dark"],
    "light": ["uk-btn-light"],
    "essential": ["uk-btn-essential"],
    "success": ["uk-btn-success"],
    "disabled": ["uk-btn-disabled"]
  },
  "variant": {
    "fill": ["uk-btn-fill"],
    "tonal": ["uk-btn-tonal"],
    "outline": ["uk-btn-outline"],
    "text": ["uk-btn-text"],
    "link": ["uk-btn-link"],
    "primary": ["uk-btn-primary"]
  }
};
export const compoundVariants = [];
export const defaultVariants = {
  "variant": "basic",
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