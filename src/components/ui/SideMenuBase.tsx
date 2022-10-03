import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  SVGAttributes,
} from "react";

type Props<T extends ElementType> = {
  children: ReactNode;
  isActive?: boolean;
  as?: T;
  headIcon: React.FC<SVGAttributes<SVGElement>>;
  tailIcon?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export const SideMenuBase = <T extends ElementType>({
  children,
  isActive = false,
  as = "a" as T,
  headIcon: HeadIcon,
  tailIcon,
  ...props
}: Props<T>) => {
  const baseClass =
    "flex items-center justify-between text-white/90 rounded-md px-4 py-2 hover:text-gray-100 transition-all";
  const activeClass = "bg-red-800";
  const normalClass = "bg-transparent cursor-pointer hover:bg-white/20";

  // Elementとpropsの型が合わないので無理やりanyにした・・・
  const Element: any = as;
  return (
    <Element
      className={`${baseClass} ${isActive ? activeClass : normalClass}`}
      {...props}
    >
      <div className="flex">
        <HeadIcon className="w-5 h-5" />
        <p className="ml-3 select-none">{children}</p>
      </div>
      {tailIcon && <div>{tailIcon}</div>}
    </Element>
  );
};
