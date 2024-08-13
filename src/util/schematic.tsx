import { Grimoire } from "./grimoire";

export const Schematic = ({ children }: { children?: Grimoire.Element }) => {
    return <div className={"schematic_wrapper"}>{children}</div>;
};
