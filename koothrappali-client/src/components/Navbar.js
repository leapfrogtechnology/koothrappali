import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top m-b-0">
                    <div className="navbar-header">
                        <div className="top-left-part">
                            <a className="logo" href="index.html">
                                <b>
                                    <img src="../plugins/images/admin-logo.png" alt="home" className="dark-logo" />
                                    <img src="../plugins/images/admin-logo-dark.png" alt="home" className="light-logo" />
                                </b>
                                <span className="hidden-xs">
                                    <img src="../plugins/images/admin-text.png" alt="home" className="dark-logo" />
                                    <img src="../plugins/images/admin-text-dark.png" alt="home" className="light-logo" />
                                </span>
                            </a>

                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar;
