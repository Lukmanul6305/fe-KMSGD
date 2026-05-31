export type ActionStyle = "gold" | "outline";
export type EventType = "dark" | "green";
export type TagType = "SPESIAL" | "SOSIAL";

export interface Kegiatan {
  id: number;
  date: string;
  tag: TagType;
  title: string;
  desc: string;
  location: string;
  image: string;
  type: EventType;
  action: string;
  actionStyle: ActionStyle;
}

export interface FooterLink {
  [section: string]: string[];
}
