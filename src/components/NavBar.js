import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { ConnectButton } from "@web3uikit/web3";
export const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    // const {
    //     enableWeb3,
    //     account,
    //     isWeb3Enabled,
    //     Moralis,
    //     deactivateWeb3,
    //     isWeb3EnableLoading,
    // } = useMoralis();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenuOnMobile = () => {
        if (window.innerWidth <= 1000) {
            setShowMenu(false);
        }
    };

    // useEffect(() => {
    //     if (isWeb3Enabled) return;
    //     if (window.localStorage.getItem("connected")) {
    //         enableWeb3();
    //     }
    // }, [isWeb3Enabled]);

    // useEffect(() => {
    //     Moralis.onAccountChanged((account) => {
    //         if (!account) {
    //             window.localStorage.removeItem("connected");
    //             deactivateWeb3();
    //         }
    //     });
    // });
    return (
        <header className="header">
            <nav className="nav-container">
                <NavLink to="/" className="nav-logo">
                    Lottery Smart Contract
                </NavLink>

                <div
                    className={`nav-menu ${showMenu ? "show-menu" : ""}`}
                    id="nav-menu"
                >
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className="nav-link"
                                onClick={closeMenuOnMobile}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                className="nav-link"
                                onClick={closeMenuOnMobile}
                            >
                                About Us
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <ConnectButton
                                // to="/about"
                                className="nav-link"

                                // onClick={closeMenuOnMobile}
                            />
                        </li>
                        {/* <li
                            className="nav-item"
                            onClick={async () => {
                                await enableWeb3();

                                window.localStorage.setItem(
                                    "connected",
                                    "injected"
                                );
                            }}
                        >
                            {account ? (
                                <NavLink
                                    // to="/about-us"
                                    className="nav-link"
                                >
                                    Connected to {account.slice(0, 6)}...
                                    {account.slice(account.length - 4)}
                                </NavLink>
                            ) : isWeb3EnableLoading ? (
                                <NavLink
                                    // to="/about-us"
                                    className="nav-link nav-cta"
                                >
                                    connecting to wallet...
                                </NavLink>
                            ) : (
                                <NavLink
                                    // to="/about-us"
                                    className="nav-link nav-cta"
                                >
                                    Connect Wallet
                                </NavLink>
                            )}
                        </li> */}
                    </ul>

                    <div
                        className="nav-close"
                        id="nav-close"
                        onClick={toggleMenu}
                    >
                        <IoClose />
                    </div>
                </div>

                <div
                    className="nav-toggle"
                    id="nav-toggle"
                    onClick={toggleMenu}
                >
                    <IoMenu />
                </div>
            </nav>
        </header>
    );
};
