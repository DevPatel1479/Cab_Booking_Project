import React from 'react';

const AboutUs = () => {
    return (
        <div style={styles.body}>
            <header style={styles.mainHeader}>
                <div style={styles.container}>
                    <h1 style={styles.headerH1}>About Us</h1>
                </div>
            </header>

            <div style={styles.container}>
                <section style={styles.section}>
                    <h2 style={styles.sectionH2}>Welcome to GoRide </h2>
                    <p style={styles.sectionP}>At GoRide, our mission is to provide safe, reliable, and convenient cab services to our customers. Our vision is to revolutionize urban transportation with our innovative and customer-centric approach.</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionH2}>Our Journey</h2>
                    <p style={styles.sectionP}>GoRide  started with a single goal: to make city travel hassle-free. Over the years, we have achieved numerous milestones, including expanding our fleet and introducing advanced technology to enhance our services.</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionH2}>What We Offer</h2>
                    <p style={styles.sectionP}>We offer a variety of cab services to cater to different needs, including daily commuting, airport transfers, long-distance travel, and corporate bookings. Our user-friendly app allows you to book rides easily and track your cab in real-time.</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionH2}>Commitment to Safety</h2>
                    <p style={styles.sectionP}>Your safety is our priority. All our drivers undergo rigorous background checks and regular training. Our vehicles are maintained to the highest standards to ensure a safe and comfortable ride.</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionH2}>Innovative Technology</h2>
                    <p style={styles.sectionP}>Our app features real-time tracking, easy payment options, and 24/7 customer support. We constantly update our technology to provide you with the best possible experience.</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionH2}>What Our Customers Say</h2>
                    <p style={styles.sectionP}>"GoRide  has transformed my daily commute. The service is reliable and the drivers are always professional." - Sarah L.</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionH2}>Giving Back</h2>
                    <p style={styles.sectionP}>We believe in giving back to the community. We regularly participate in local events and support various charitable causes.</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionH2}>Sustainability</h2>
                    <p style={styles.sectionP}>We are committed to reducing our carbon footprint. Our fleet includes eco-friendly vehicles, and we constantly seek ways to make our operations more sustainable.</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionH2}>Get in Touch</h2>
                    <p style={styles.sectionP}>If you have any questions or need assistance, please contact us at support@yourcompany.com or call us at (123) 456-7890. Follow us on social media for updates and special offers.</p>
                </section>
            </div>
        </div>
    );
};

const styles = {
    body: {
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: "#f4f4f4",
        color: "#333"
    },
    container: {
        width: "90%",
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
        overflow: "hidden"
    },
    mainHeader: {
        backgroundColor: "#333",
        color: "#fff",
        padding: "30px 0",
        borderBottom: "#77c7fc 3px solid"
    },
    headerH1: {
        textAlign: "center",
        textTransform: "uppercase",
        margin: 0,
        fontSize: "2em"
    },
    section: {
        padding: "20px",
        margin: "20px 0",
        background: "#fff",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out"
    },
    sectionHover: {
        transform: "translateY(-5px)"
    },
    sectionH2: {
        textAlign: "center",
        color: "#77c7fc",
        fontSize: "1.5em",
        marginBottom: "10px"
    },
    sectionP: {
        lineHeight: "1.6",
        fontSize: "1em",
        color: "#666"
    },
    teamMember: {
        textAlign: "center",
        margin: "20px 0"
    },
    teamMemberImg: {
        borderRadius: "50%",
        width: "150px",
        height: "150px",
        objectFit: "cover",
        border: "2px solid #77c7fc",
        transition: "transform 0.3s ease-in-out"
    },
    teamMemberImgHover: {
        transform: "scale(1.1)"
    },
    teamMemberH3: {
        margin: "10px 0 5px 0",
        fontSize: "1.2em",
        color: "#333"
    },
    teamMemberP: {
        fontStyle: "italic",
        color: "#666"
    },
    responsiveContainer: {
        width: "95%",
        padding: "10px"
    },
    responsiveSectionH2: {
        fontSize: "1.3em"
    },
    responsiveHeaderH1: {
        fontSize: "1.5em"
    }
};

export default AboutUs;
