import "./App.css"
const Footer = () => {
    return (
        <div><div style={{ paddingTop: "35vh", display: "flex", justifyContent: "center" }}><h1 style={{ color: "rgb(241, 14, 109) " }}>About me:</h1></div>
            <div>
                <div style={{ paddingTop: "5vh", display: "flex", justifyContent: "center" }}>
                    <h3 style={{ textAlign: "center" }}>Hi, I am &nbsp;
                        <a className='hov' style={{ color: "orange" }} href="https://www.linkedin.com/in/sattwik-das-90aa75249/" target="_blank" rel="noopener noreferrer">Sattwik Das</a>
                        , a 3rd year student at&nbsp;
                        <a className="hov" style={{ color: "orange" }} href="https://www.heritageit.edu/" target="_blank" rel="noopener noreferrer">HIT Kolkata</a> pursuing B.Tech in Electronics and Communication Engineering.
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Footer