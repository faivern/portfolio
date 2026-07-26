import { useId } from "react";
import {
  techStackIconSvgs,
  type TechStackIconName,
} from "./tech-stack-icons.generated";

export type { TechStackIconName } from "./tech-stack-icons.generated";

type TechStackIconProps = {
  className?: string;
  name: TechStackIconName;
};

function namespaceSvgIds(svg: string, namespace: string) {
  const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);

  return ids.reduce(
    (result, id) =>
      result
        .replaceAll(`id="${id}"`, `id="${namespace}-${id}"`)
        .replaceAll(`url(#${id})`, `url(#${namespace}-${id})`)
        .replaceAll(`href="#${id}"`, `href="#${namespace}-${id}"`),
    svg,
  );
}

export function TechStackIcon({ className, name }: TechStackIconProps) {
  const id = useId().replaceAll(":", "");
  const svg = namespaceSvgIds(techStackIconSvgs[name], id).replace(
    /<svg([^>]*)>/,
    '<svg$1 style="width:100%;height:100%;display:block">',
  );

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ display: "inline-block", lineHeight: 0 }}
    />
  );
}
