import Search from "./Search"
import People from "./People"
import Navbar from "./Navbar";

const Sidebar = () => {
    return (
        <>
            <Navbar />
            <Search />
            <People />
        </>
    );
}

export default Sidebar;