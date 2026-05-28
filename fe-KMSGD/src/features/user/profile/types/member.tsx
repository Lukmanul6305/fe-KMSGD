export type MemberVariant = "ketua" | "anggota" | "demisioner";

export interface Member {
    nama: string;
    jabatan: string;
}

export interface Department {
    nama: string;
    desc: string;
    ketua: Member;
    wakil: Member;
    staff: Member[];
}