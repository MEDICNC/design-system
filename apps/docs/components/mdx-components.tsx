import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Preview } from "./preview";
import { Button } from "react-uikit/button";
import CodeTabs from "@/components/CodeTabs";
import { Confirm, Alert } from "@/components/dialog";
import { ScriptCode } from "@/components/script-code";
import { TabsContent } from "react-uikit/tabs";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Button,
  Preview,
  CodeTabs,
  TabsContent,
  Confirm,
  Alert,
  ScriptCode,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
