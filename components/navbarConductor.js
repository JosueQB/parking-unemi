import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const userImage = session?.user?.image || '/default-avatar.png'; 

  return (
    <nav className="fixed bg-white top-0 w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
      <div className="flex items-center">
          <Image className="navbar-brand" src={'/img/logo-unemi-park.svg'} height={135} width={135} alt='logo' />
        </div>
        <button
          className="block lg:hidden px-3 py-2 border rounded text-black border-gray-400 hover:text-blue-500 hover:border-blue-500"
          type="button"
          onClick={toggleMenu}
        >
          <svg className="fill-current h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="text-sm lg:flex-grow lg:flex lg:justify-end items-center gap-2">
            <li className="nav-item">
              <Link href="/admin" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-500 mr-4">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link href="/parking" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-500 mr-4">Parqueo Disponible</Link>
            </li>
            <li className="nav-item">
              <Link href="/MostrarUsers" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-500 mr-4">Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link href="" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-500">Reportes</Link>
            </li>
            <li className="nav-item relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex items-center focus:outline-none"
              >
                <img
                  src={userImage}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full"
                  width={135}
                  height={135}
                />
              </button>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Perfil</Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Configuración</Link>
                    <button
                      onClick={() => { signOut(); setDropdownOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;