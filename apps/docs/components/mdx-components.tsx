import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Preview } from "./preview";
import {Button} from "react-uikit/button";
import CodeTabs from "@/components/CodeTabs";
import {TabsContent} from "react-uikit/tabs";


const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Button,
  Preview,
  CodeTabs,
    TabsContent
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
