import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <>
            {/* <nav>Navbar</nav> */}
            <main className="container">
                <Outlet />
            </main>
            {/* <footer>This is a footer</footer> */}
        </>
    );
};

export default PublicLayout;
