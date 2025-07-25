import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { log } from 'console';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleAdminClick = () => {
        setShowLoginPopup(true);
    };
console.log(process.env.REACT_APP_USERNAME);

    const handleLogin = (values: { username: string; password: string }) => {
        const adminEmail = process.env.REACT_APP_USERNAME;
        const adminPassword = process.env.REACT_APP_PASSWORD;

        
        if (values.username === adminEmail && values.password === adminPassword) {
            setShowLoginPopup(false);
            navigate('/admin');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <>
            <header className="w-full bg-white sticky top-0 z-50">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center py-5 md:py-6 relative z-40">
                        <div className="flex">
                            <div className="pr-24">
                                <Link to="/">
                                    <img src="/assets/Layer_1.svg" alt="Logo" className="max-w-36 h-10" />
                                </Link>
                            </div>
                            <ul className="hidden lg:flex items-center gap-12 text-base">
                                <li className="hover:text-primary font-medium cursor-pointer"><Link to="/">Home</Link></li>
                                <li className="hover:text-primary font-medium cursor-pointer"><Link to="/blog">Blog</Link></li>
                                <li className="hover:text-primary font-medium cursor-pointer">
                                    <a href="#" onClick={handleAdminClick}>Admin</a>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden lg:flex justify-center items-center gap-12">
                            <a href="#"><img className='cursor-pointer' src="/assets/shop_icon.svg" alt="shop" /></a>
                            <a href="#"><img className='cursor-pointer' src="/assets/proflie_icon.svg" alt="profile" /></a>
                            <div className='w-6 border border-primary rotate-90'></div>
                            <a href="#"><img className='cursor-pointer' src="/assets/menu.svg" alt="menu" /></a>
                        </div>
                        <div className="lg:hidden">
                            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                <img src="/assets/menu.svg" alt="Mobile Menu" className="w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={`fixed top-[70px] left-0 w-full bg-white lg:hidden flex flex-col px-4 py-5 gap-4 text-lg transition-transform duration-300 ease-in-out z-30
        ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                <ul className="flex flex-col gap-6">
                    <li className="hover:text-primary font-medium cursor-pointer"><Link to="/">Home</Link></li>
                    <li className="hover:text-primary font-medium cursor-pointer"><Link to="/blog">Blog</Link></li>
                    <li className="hover:text-primary font-medium cursor-pointer">
                        <a href="#" onClick={handleAdminClick}>Admin</a>
                    </li>
                </ul>
            </div>

            {/* Login Popup */}
            {showLoginPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

                        <Formik
                            initialValues={{ username: '', password: '' }}
                            validationSchema={Yup.object({
                                username: Yup.string().email('Invalid email').required('Email is required'),
                                password: Yup.string().required('Password is required')
                            })}
                            onSubmit={handleLogin}
                        >
                            {() => (
                                <Form>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="block mb-1 font-medium">Email</label>
                                        <Field
                                            name="username"
                                            type="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                                        <Field
                                            name="password"
                                            type="password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setShowLoginPopup(false)}
                                            className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-white bg-orange-500 hover:bg-white hover:text-black rounded-md shadow-md transition"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
