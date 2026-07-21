export type AtlasHeroHudTone =
  | "cyan"
  | "emerald"
  | "violet"
  | "amber"
  | "rose";


export type AtlasHeroHudPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";


export type AtlasHeroHudSignal = {
  label:
    string;

  value:
    string;

  detail:
    string;

  code:
    string;

  tone:
    AtlasHeroHudTone;

  position:
    AtlasHeroHudPosition;

  active?:
    boolean;
};