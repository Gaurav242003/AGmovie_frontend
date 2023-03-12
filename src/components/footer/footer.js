import React from "react";
import "./footer.css";
import { MdPeople } from "react-icons/md";
import { AiOutlineGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="fotter">
            <hr className="hr" />
            Get in touch with developers <MdPeople />
            <div className="profile">
                <div className="p1"> Gaurav Kumar
                    <p><a href="https://github.com/Gaurav242003" target="_blank"><AiOutlineGithub /> github</a>
                        <a href="https://www.linkedin.com/in/gaurav-kumar-310b38228/" target="_blank"><FaLinkedin /> linkedin</a>
                    </p>


                </div>
                <div className="p2"> Akhand Pratap Mall
                    <p><a href="https://github.com/Akhand8055" target="_blank"><AiOutlineGithub /> github</a>
                        <a href="https://www.linkedin.com/in/akhand-pratap-mall-b9474b229/" target="_blank"><FaLinkedin /> linkedin</a>
                    </p>
                </div>
            </div>


        </div>
    )
}

export default Footer;
