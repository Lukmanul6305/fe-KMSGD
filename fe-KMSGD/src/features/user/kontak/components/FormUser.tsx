import { useState } from "react";

export default function FormUser() {
    const [form, setForm] = useState({
        nama: "",
        email: "",
        subjek: "",
        pesan: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        // Logika submit
    };

    return (
        <section className="lg:col-span-5 bg-[#20201f] border border-[#ffd700] p-8 sticky top-24 transform transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]">
            <h2 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-6 flex items-center gap-2">
                Kirim Pesan
            </h2>
            <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-2 group">
                    <label className="text-[#d0c6ab] text-xs font-semibold tracking-wide transition-colors group-focus-within:text-[#ffd700]">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        name="nama"
                        placeholder="Masukkan nama Anda"
                        value={form.nama}
                        onChange={handleChange}
                        className="bg-[#131313] border border-[#e5e2e1] text-[#e5e2e1] text-sm p-3 outline-none placeholder:text-[#4d4732] transition-all duration-300 ease-out hover:border-[#d0c6ab] focus:border-[#ffd700] focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#ffd700]"
                    />
                </div>

                <div className="flex flex-col gap-2 group">
                    <label className="text-[#d0c6ab] text-xs font-semibold tracking-wide transition-colors group-focus-within:text-[#ffd700]">
                        Alamat Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="contoh@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="bg-[#131313] border border-[#e5e2e1] text-[#e5e2e1] text-sm p-3 outline-none placeholder:text-[#4d4732] transition-all duration-300 ease-out hover:border-[#d0c6ab] focus:border-[#ffd700] focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#ffd700]"
                    />
                </div>

                <div className="flex flex-col gap-2 group">
                    <label className="text-[#d0c6ab] text-xs font-semibold tracking-wide transition-colors group-focus-within:text-[#ffd700]">
                        Subjek
                    </label>
                    <input
                        type="text"
                        name="subjek"
                        placeholder="Tujuan pesan"
                        value={form.subjek}
                        onChange={handleChange}
                        className="bg-[#131313] border border-[#e5e2e1] text-[#e5e2e1] text-sm p-3 outline-none placeholder:text-[#4d4732] transition-all duration-300 ease-out hover:border-[#d0c6ab] focus:border-[#ffd700] focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#ffd700]"
                    />
                </div>

                <div className="flex flex-col gap-2 group">
                    <label className="text-[#d0c6ab] text-xs font-semibold tracking-wide transition-colors group-focus-within:text-[#ffd700]">
                        Pesan
                    </label>
                    <textarea
                        name="pesan"
                        placeholder="Tuliskan pesan Anda di sini..."
                        value={form.pesan}
                        onChange={handleChange}
                        rows={5}
                        className="bg-[#131313] border border-[#e5e2e1] text-[#e5e2e1] text-sm p-3 outline-none resize-none placeholder:text-[#4d4732] transition-all duration-300 ease-out hover:border-[#d0c6ab] focus:border-[#ffd700] focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#ffd700]"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-[#ffd700] text-[#131313] font-bold text-lg py-4 px-6 flex items-center justify-center gap-2 outline-none transition-all duration-300 ease-out hover:bg-[#e9c400] hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#e5e2e1] active:translate-y-0 active:shadow-none"
                >
                    Kirim Pesan <span className="transition-transform duration-300 group-hover:translate-x-1">➤</span>
                </button>
            </div>
        </section>
    );
}