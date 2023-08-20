import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <>
            {/* <nav>Navbar</nav> */}
            <main>
                <Outlet />
            </main>
            {/* <footer>This is a footer</footer> */}
        </>
    );
};

export default PublicLayout;
