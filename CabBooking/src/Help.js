import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';

import { Profile_Navbar } from './ProfileInNavbar';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Help = () => {
    const cookie = new Cookies();
    const user_email = cookie.get("userEmail");
    const [userProfile, setUserProfile] = useState(true);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (user_email){
                    
                    const response = await axios.post('http://localhost:3000/api/user_profile', { email: user_email });
                    setUserProfile(response.data);
    
                }

            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        if (user_email) {
            fetchUserProfile();
        }
    }, [user_email]);    

  const handleSOSClick = () => {
    alert('SOS alert sent!');
    // Additional functionality for SOS alert can be added here.
  };

  return (
    <>
    <div>
    {userProfile && user_email ? (
            // <NavbarProfile/>
            <Profile_Navbar profile = {userProfile}/>
      ) : (
        <Navbar/>
      )}

      <header style={styles.header}>
        <div style={styles.container}>
          <h1>Help and Support</h1>
        </div>
      </header>
      <main style={styles.main}>
        <div style={styles.container}>
          <section style={styles.sosSection}>
            <div>
              <h2 style={styles.sectionTitle}><b><u>Emergency Assistance</u></b></h2>
              <p>If any emergency occurs, press the SOS button below to send an alert notification to emergency services.</p>
              <button style={styles.sosButton} onClick={handleSOSClick}>SOS</button>
            </div>
          </section>
          <section style={styles.faq}>
            <h2>Frequently Asked Questions</h2>
            {faqItems.map((item, index) => (
              <div key={index} style={styles.faqItem}>
                <div>
                  <h3 style={styles.faqTitle}>{item.question}</h3>
                  <p>{item.intro}</p>
                  <ul>
                    {item.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    margin: '0',
    padding: '0',
    backgroundColor: '#f4f4f4',
    color: '#333'
  },
  container: {
    width: '90%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  header: {
    backgroundColor: '#333',
    color: 'white',
    padding: '20px 0',
    textAlign: 'center'
  },
  main: {
    padding: '20px',
    marginTop: '20px'
  },
  sectionTitle: {
    color: '#333'
  },
  sosSection: {
    backgroundColor: '#ffe5e5',
    padding: '20px',
    border: '1px solid #ffcccc',
    marginBottom: '20px',
    textAlign: 'center'
  },
  sosButton: {
    backgroundColor: '#FF0000',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '5px'
  },
  sosButtonHover: {
    backgroundColor: '#cc0000'
  },
  faq: {
    padding: '20px'
  },
  faqItem: {
    marginBottom: '20px'
  },
  faqTitle: {
    marginTop: '0',
    fontSize: '1.2em',
    color: '#007BFF'
  },
  footer: {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '20px 0',
    marginTop: '20px'
  }
};

const faqItems = [
  {
    question: 'Q1. How can I create an account?',
    intro: 'To create an account follow these steps:',
    steps: [
      'Visit the website.',
      'Locate and click the sign-up button.',
      'Fill out the registration form.',
      'Verify your email and phone number.',
      'Set up your profile.',
      'Start booking cabs.'
    ]
  },
  {
    question: 'Q2. How can I book a ride?',
    intro: 'To book a ride follow these steps:',
    steps: [
      'Visit the website.',
      'Login to your account.',
      'Enter your pick-up location.',
      'Enter your destination.',
      'Receive booking confirmation.',
      'Track your cab.',
      'Enjoy your ride.',
      'Rate your ride.'
    ]
  },
  {
    question: 'Q3. What payment methods are accepted?',
    intro: 'The payment methods accepted by us are:',
    steps: [
      'Debit and Credit card.',
      'Digital wallets.',
      'Bank transfers.',
      'Gift cards and vouchers.'
    ]
  },
  {
    question: 'Q4. Can I cancel my booking?',
    intro: 'Yes, you can cancel your booking. The policies and processes are:',
    steps: [
      'Through the website interface.',
      'Customer Support.'
    ],
    extra: [
      {
        intro: 'Cancellation policies:',
        steps: [
          'Free cancellation window.',
          'Cancellation fees.',
          'No-show fees.',
          'Peak time and high-demand surcharges.'
        ]
      },
      {
        intro: 'Refund policies:',
        steps: [
          'Immediate refunds.',
          'Fee deductions.',
          'Processing time.'
        ]
      }
    ]
  },
  {
    question: 'Q5. How can I track my ride?',
    intro: 'To track your ride follow these steps:',
    steps: [
      'Real-time tracking feature.',
      'Driver\'s contact details.',
      'ETA updates.',
      'Navigation assistance.'
    ]
  }
];

export default Help;