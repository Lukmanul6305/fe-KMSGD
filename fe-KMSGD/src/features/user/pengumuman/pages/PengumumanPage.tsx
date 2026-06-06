import SearchBar from "../../../../components/SearchBar";
import { pengumumanFilters, pengumumanList } from "../services/pengumumanService";
import { Pagination } from "../../../../components/Pagination";
import PengumumanCard from "../../../../components/PengumumanCard";
import { usePaginatedFilter } from "../../../../hooks/usePaginatedFilter";
import UserLayout from "../../../../layouts/UserLayout";

const ITEMS_PER_PAGE = 6;

const PengumumanPage = () => {
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
    } = usePaginatedFilter({
        data: pengumumanList,
        itemsPerPage: ITEMS_PER_PAGE,
        filterFn: (item, filter) => item.category === filter,
        searchFn: (item, q) =>
            item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.author.toLowerCase().includes(q),
    });

    return (
        <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen flex flex-col">
            <UserLayout>

                <header className="mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-4">
                        Pengumuman
                    </h1>
                    <p className="text-[#d0c6ab] text-lg leading-relaxed max-w-2xl">
                        Informasi terbaru, edaran resmi, dan kabar penting seputar kegiatan
                        dan keorganisasian KMSGD Jabodetabek.
                    </p>
                </header>

                <section className="mb-20">
                    <SearchBar
                        filters={pengumumanFilters}
                        activeFilter={activeFilter}
                        onFilterChange={handleFilterChange}
                        onSearchChange={handleSearchChange}
                        placeholder="Cari berita atau pengumuman..."
                    />

                    {paginatedList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedList.map((item) => (
                                <PengumumanCard key={`${item.id}-${item.title}`} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <p className="text-[#999077] text-lg mb-2">Tidak ada hasil</p>
                            <p className="text-[#555] text-sm">
                                {searchQuery
                                    ? `Tidak ditemukan hasil untuk "${searchQuery}".`
                                    : `Tidak ada pengumuman untuk kategori "${activeFilter}".`}
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
                                pengumuman
                            </p>
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                                siblingCount={1}
                            />
                        </div>
                    )}
                </section>

            </UserLayout>
        </div>
    );
};

export default PengumumanPage;