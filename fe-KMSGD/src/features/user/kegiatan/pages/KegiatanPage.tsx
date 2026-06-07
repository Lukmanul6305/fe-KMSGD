import { usePaginatedFilter } from "../../../../hooks/usePaginatedFilter";
import { kegiatanFilters, kegiatanList, CONTENT_HEADER } from "../services/kegiatanService";
import type { Kegiatan } from "../types/kegiatan.types";
import EventCard from "../components/EventCard";
import SearchBar from "../../../../components/SearchBar";
import { Pagination } from "../../../../components/Pagination";
import Header from "../../../../components/Header";
import UserLayout from "../../../../layouts/UserLayout";

const ITEMS_PER_PAGE = 6;

export default function KegiatanPage() {
    const {
        paginatedList,
        filteredList,
        page,
        totalPages,
        activeFilter,
        searchQuery,
        handleFilterChange,
        handleSearchChange,
        setPage,
    } = usePaginatedFilter<Kegiatan>({
        data: kegiatanList,
        itemsPerPage: ITEMS_PER_PAGE,
        filterFn: (item, filter) => item.category === filter.toUpperCase(),
        searchFn: (item, q) =>
            item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.location.toLowerCase().includes(q),
    });

    return (
        <UserLayout>
            <Header judul={CONTENT_HEADER.judul} judul2={CONTENT_HEADER.judul2} deskripsi={CONTENT_HEADER.deskripsi} />
            <SearchBar
                filters={kegiatanFilters}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
                placeholder="Cari kegiatan..."
            />

            {paginatedList.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {paginatedList.map((ev) => (
                        <EventCard key={ev.id} event={ev} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <p className="text-[#999077] text-lg mb-2">Tidak ada hasil</p>
                    <p className="text-[#555] text-sm">
                        {searchQuery
                            ? `Tidak ditemukan hasil untuk "${searchQuery}".`
                            : `Tidak ada kegiatan untuk kategori "${activeFilter}".`}
                    </p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-10 flex flex-col items-center gap-3">
                    <p className="text-sm text-[#999077]">
                        Menampilkan{" "}
                        <span className="text-[#e5e2e1]">
                            {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filteredList.length)}
                        </span>{" "}
                        dari{" "}
                        <span className="text-[#e5e2e1]">{filteredList.length}</span>{" "}
                        kegiatan
                    </p>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        siblingCount={1}
                    />
                </div>
            )}

        </UserLayout>
    );
}