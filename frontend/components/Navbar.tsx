"use client";

import Link from "next/link";

import { 
        User,
        LogOut,
        } from "lucide-react"; 
import "./Navbar.css";
import ApiIcon from '@mui/icons-material/Api';


const Navbar: React.FC = () => {




  // Função para logout
  const handleLogout = () => {
    window.location.href = "/";
    localStorage.removeItem('token');
  };

  return (
    <div
      className="d-flex flex-column vh-100 text-white position-fixed overflow-auto"
      style={{ maxHeight: "100vh", width: "250px", backgroundColor: "#152259" }}>

      <div className="text-center my-3">
        <ApiIcon style={{ fontSize: "50px", color: "white" }} />
        <h4 className="mt-2 mb-0 text-center">
          <strong>XYZ ENTERPRISE</strong>
        </h4>
      </div>

      <hr style={{ border: "1px solid white", width: "100%" }} />

      <nav className="flex-grow-1 overflow-auto navbar-scroll">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link href="/home/profile" className="nav-link text-white">
              <div className="link-content d-flex align-items-center">
                <User className="me-1" />
                Perfil
              </div>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/home/CoachingIndividual" className="nav-link text-white">
              <div className="link-content d-flex align-items-center">
                <User className="me-1" />
                coaching individual
              </div>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/home/treinamentos" className="nav-link text-white">
              <div className="link-content d-flex align-items-center">
                <User className="me-1" />
                Treinamentos
              </div>
            </Link>
          </li>


          

        </ul>
      </nav>

      <div className="text-center d-flex justify-content-center mb-3"> 
  <button onClick={handleLogout} className="btn btn-danger d-flex align-items-center">
    <LogOut className="me-0" /> 
  </button>
</div>
    </div>
  );
};

export default Navbar;
