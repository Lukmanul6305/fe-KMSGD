import { Outlet } from "react-router-dom";
import NavbarKepengurusan from "./components/NavbarKepengurusan";

const Kepengurusan = () => {
    return (
        <main className="flex-1 p-8">
            <div className="mb-6">
                <h1 className="text-white text-2xl font-bold tracking-wide">
                    Kepengurusan
                </h1>
                <p className="text-neutral-400 text-sm mt-1">
                    Kelola data periode kepengurusan, departemen, dan pengurus.
                </p>
            </div>
            
            <NavbarKepengurusan />
            
            <div className="mt-8">
                <Outlet />
            </div>
        </main>
    )
}

export default Kepengurusan;