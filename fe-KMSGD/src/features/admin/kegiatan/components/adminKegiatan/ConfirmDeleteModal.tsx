interface Props {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteModal = ({ open, onCancel, onConfirm }: Props) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-[#0f0f0f] border border-[#b8982a] p-8 w-90">
                <h3 className="text-[#ffd700] m-0 mb-3 text-base font-bold">Hapus Kegiatan</h3>
                <p className="text-[#a89040] text-sm m-0 mb-6">
                    Yakin ingin menghapus kegiatan ini? Tindakan ini tidak bisa dibatalkan.
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="bg-transparent border border-zinc-700 text-zinc-400 py-2 px-5 cursor-pointer text-sm hover:bg-zinc-900 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-[#7a1a1a] border border-[#7a1a1a] text-[#f09595] py-2 px-5 cursor-pointer text-sm font-bold hover:bg-[#962121] transition-colors"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;